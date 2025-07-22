import { MdOutlineBalance } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full backdrop-blur-md bg-black/30 border-t border-white/10 text-gray-200 px-6 lg:px-10 py-10 shadow-inner">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Brand */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <MdOutlineBalance className="text-2xl lg:text-3xl text-white" />
            <span className="text-lg font-bold text-white">JuryAI</span>
          </div>
          <p className="text-sm text-gray-300">
            Simplifying legal insights with the power of AI.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
              <FaLinkedin size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
              <FaTwitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-md font-bold text-white mb-2">Navigation</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-indigo-400 transition font-medium">Home</a></li>
            <li><a href="/about" className="hover:text-indigo-400 transition font-medium">About</a></li>
            <li><a href="/features" className="hover:text-indigo-400 transition font-medium">Features</a></li>
            <li><a href="/contact" className="hover:text-indigo-400 transition font-medium">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-md font-bold text-white mb-2">Resources</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-indigo-400 transition font-medium">Documentation</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition font-medium">Support</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition font-medium">API</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-md font-bold text-white mb-2">Get in Touch</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <span className="font-medium">Email:</span>{" "}
              <a href="mailto:contact@juryai.com" className="hover:text-indigo-400 transition font-medium">
                contact@juryai.com
              </a>
            </li>
            <li>
              <span className="font-medium">Phone:</span>{" "}
              <span className="text-gray-400">+91 98765 43210</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 border-t border-white/10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} <span className="font-semibold text-white">JuryAI</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
