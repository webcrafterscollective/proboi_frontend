import Logo from './Logo';

const FooterComponent = () => (
  <footer className="bg-footer-bg border-t border-gray-700 mt-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
        <div className="flex flex-col items-center sm:items-start">
          <Logo />
          <p className="mt-4 text-footer-text text-sm">Your favorite online bookstore.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Shop</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="/best-sellers" className="text-footer-text hover:text-footer-link">Best Sellers</a></li>
            <li><a href="/classics" className="text-footer-text hover:text-footer-link">Classics</a></li>
            <li><a href="/new-releases" className="text-footer-text hover:text-footer-link">New Releases</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="/about" className="text-footer-text hover:text-footer-link">About Us</a></li>
            <li><a href="/self-publishing" className="text-footer-text hover:text-footer-link">Self Publishing</a></li>
            <li><a href="/contact" className="text-footer-text hover:text-footer-link">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <p className="mt-4 text-footer-text text-sm">Stay connected for the latest updates.</p>
          {/* You can add social media links here */}
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} porboi.in. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default FooterComponent;