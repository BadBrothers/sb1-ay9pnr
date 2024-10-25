import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-primary">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-sm text-gray-300">
              Tracking cryptocurrency legislation and the politicians and SuperPACs shaping its future.
              All data is sourced from public records and updated regularly.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#methodology" className="hover:text-white transition">Rating Methodology</a></li>
              <li><a href="https://www.fec.gov" className="hover:text-white transition">FEC Data Source</a></li>
              <li><a href="#disclaimer" className="hover:text-white transition">Legal Disclaimer</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#twitter" className="hover:text-white transition">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#github" className="hover:text-white transition">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Ungovernable Crypto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;