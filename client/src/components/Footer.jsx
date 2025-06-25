import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, ease: "easeOut", duration: 0.6 },
  }),
};

export default function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-orange-50 mt-16 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Info */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={fadeInUp}
        >
          <h3 className="text-3xl font-extrabold text-orange-500 tracking-wide">
            SB Foods
          </h3>
          <p className="text-orange-200 leading-relaxed font-light">
            <span className="italic">OrderOnTheGo</span> — Your ultimate food
            ordering solution. Delicious food, delivered fast and fresh at your
            doorstep.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          variants={fadeInUp}
        >
          <h4 className="text-xl font-semibold mb-6 border-b border-orange-500 pb-2 uppercase tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-4 text-orange-200 font-medium">
            {[
              { name: "Home", to: "/" },
              { name: "Restaurants", to: "/restaurants" },
              { name: "About", to: "/about" },
              { name: "Contact", to: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className="hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          variants={fadeInUp}
        >
          <h4 className="text-xl font-semibold mb-6 border-b border-orange-500 pb-2 uppercase tracking-wide">
            Contact Us
          </h4>
          <address className="not-italic space-y-3 text-orange-200 text-sm font-light">
            <p>
              Email:{" "}
              <a
                href="mailto:support@sbfoods.com"
                className="hover:text-orange-400 transition"
              >
                support@sbfoods.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+919876543210"
                className="hover:text-orange-400 transition"
              >
                +91 98765 43210
              </a>
            </p>
            <p>Location: Hyderabad, India</p>
          </address>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
          variants={fadeInUp}
        >
          <h4 className="text-xl font-semibold mb-6 border-b border-orange-500 pb-2 uppercase tracking-wide">
            Follow Us
          </h4>
          <div className="flex space-x-7 text-3xl text-orange-200">
            {[
              {
                href: "https://facebook.com",
                icon: <FaFacebookF />,
                color: "hover:text-blue-500",
                label: "Facebook",
              },
              {
                href: "https://instagram.com",
                icon: <FaInstagram />,
                color: "hover:text-pink-400",
                label: "Instagram",
              },
              {
                href: "https://twitter.com",
                icon: <FaTwitter />,
                color: "hover:text-sky-400",
                label: "Twitter",
              },
              {
                href: "https://linkedin.com",
                icon: <FaLinkedin />,
                color: "hover:text-blue-400",
                label: "LinkedIn",
              },
            ].map(({ href, icon, color, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${color} transition-colors duration-300`}
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Text */}
      <motion.div
        className="mt-10 border-t border-orange-600 py-6 text-center text-orange-400 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        &copy; {new Date().getFullYear()} SB Foods. All rights reserved.
      </motion.div>
    </footer>
  );
}
