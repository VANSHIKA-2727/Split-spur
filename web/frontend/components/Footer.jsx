import { ArrowRight, Twitter, Github, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-6">

        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-6">

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-2">Stay Updated</h3>
            <p className="text-sm text-gray-600 mb-3">
              Get the latest guides and testing insights
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-2">Product</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li onClick={() => navigate("/features")} className="cursor-pointer hover:text-gray-900">Features</li>
              <li onClick={() => navigate("/pricing")} className="cursor-pointer hover:text-gray-900">Pricing</li>
              <li onClick={() => navigate("/docs")} className="cursor-pointer hover:text-gray-900">Documentation</li>
              <li onClick={() => navigate("/api")} className="cursor-pointer hover:text-gray-900">API Reference</li>
              <li onClick={() => navigate("/integrations")} className="cursor-pointer hover:text-gray-900">Integrations</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li onClick={() => navigate("/about")} className="cursor-pointer hover:text-gray-900">About Us</li>
              <li onClick={() => navigate("/blog")} className="cursor-pointer hover:text-gray-900">Blog</li>
              <li onClick={() => navigate("/contact")} className="cursor-pointer hover:text-gray-900">Contact Us</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li onClick={() => navigate("/help")} className="cursor-pointer hover:text-gray-900">Help</li>
              <li onClick={() => navigate("/community")} className="cursor-pointer hover:text-gray-900">Community</li>
              <li onClick={() => navigate("/tutorials")} className="cursor-pointer hover:text-gray-900">Tutorials</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Splitspur. All rights reserved.
          </p>

          <div className="flex gap-3 text-gray-500">
            <span onClick={() => navigate("/twitter")} className="cursor-pointer hover:text-gray-900">
              <Twitter className="w-4 h-4" />
            </span>
            <span onClick={() => navigate("/github")} className="cursor-pointer hover:text-gray-900">
              <Github className="w-4 h-4" />
            </span>
            <span onClick={() => navigate("/linkedin")} className="cursor-pointer hover:text-gray-900">
              <Linkedin className="w-4 h-4" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
