export default function Footer() {
  return (
    <footer className="py-6 bg-white text-gray-600 shadow-md w-full border-t">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">

          {/* About Section */}
          <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 md:pr-6">
            <h3 className="text-lg font-semibold text-gray-800">CampusSynergy</h3>
            <p className="mt-2 text-sm">
              Secure buying, selling, and exchanging within verified communities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 md:px-6">
            <h3 className="text-lg font-semibold text-gray-800">Quick Link</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="/" className="hover:text-blue-500 transition">Home</a>
              </li>
              <li>
                <a href="/marketplace" className="hover:text-blue-500 transition">Marketplace</a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="md:pl-6">
            <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
            <div className="flex justify-center md:justify-start mt-3 space-x-4">
              <a href="https://facebook.com" className="hover:text-blue-600 transition">
                Facebook
              </a>
              <a href="https://twitter.com" className="hover:text-blue-600 transition">
                Twitter
              </a>
              <a href="https://instagram.com" className="hover:text-blue-600 transition">
                Instagram
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="text-center border-t mt-6 pt-4 text-sm">
          &copy; 2025 CampusSynergy | All rights reserved.
        </div>
      </div>
    </footer>
  );
}
