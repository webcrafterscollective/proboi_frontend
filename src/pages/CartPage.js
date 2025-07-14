import { useCart } from '../contexts/CartContext';
import { Trash2Icon } from '../components/icons';

const CartPage = ({ navigateTo }) => {
  const { items, removeFromCart, total, loading, error } = useCart();

  if (loading) {
    return <div className="text-center py-16">Loading cart...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-500">Your cart is empty.</p>
          <button onClick={() => navigateTo('home')} className="mt-6 bg-[#6C63FF] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#574fcf] transition-colors">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 space-y-4">
            {items.map(item => (
              <div key={item.item_key} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={item.images[0]?.src} alt={item.name} className="w-20 h-28 object-cover rounded-md" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <span className="font-semibold w-20 text-right">{item.totals.total} $</span>
                  <button onClick={() => removeFromCart(item.item_key)} className="p-2 text-gray-400 hover:text-red-500">
                    <Trash2Icon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{total.toFixed(2)} $</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>{total.toFixed(2)} $</p>
              </div>
            </div>
            <button onClick={() => navigateTo('checkout')} className="mt-6 w-full bg-[#EF6B4A] text-white font-bold py-3 rounded-lg hover:bg-[#e05a39] transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;