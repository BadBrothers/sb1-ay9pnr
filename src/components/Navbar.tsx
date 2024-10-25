import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bitcoin, Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-secondary text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Bitcoin className="h-8 w-8" />
            <span className="font-bold text-xl">Ungovernable Crypto</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/politicians" className="hover:text-white transition">Politicians</Link>
            <Link to="/superpacs" className="hover:text-white transition">SuperPACs</Link>
            <Link to="/blog" className="hover:text-white transition">Blog</Link>
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-1 hover:text-white transition"
              >
                <span>More</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                  <a 
                    href="https://ballotpedia.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Find Politicians Running in Your Area
                  </a>
                  <Link 
                    to="/methodology" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Methodology
                  </Link>
                  <Link 
                    to="/resources" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Resources
                  </Link>
                  <Link 
                    to="/legislation" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Legislation
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/politicians" 
              className="block px-3 py-2 hover:bg-primary hover:text-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Politicians
            </Link>
            <Link 
              to="/superpacs" 
              className="block px-3 py-2 hover:bg-primary hover:text-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              SuperPACs
            </Link>
            <Link 
              to="/blog" 
              className="block px-3 py-2 hover:bg-primary hover:text-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <a 
              href="https://ballotpedia.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-3 py-2 hover:bg-primary hover:text-secondary rounded-md"
            >
              Find Politicians Running in Your Area
            </a>
            <Link 
              to="/methodology" 
              className="block px-3 py-2 hover:bg-primary hover:text-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Methodology
            </Link>
            <Link 
              to="/resources" 
              className="block px-3 py-2 hover:bg-primary hover:text-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Resources
            </Link>
            <Link 
              to="/legislation" 
              className="block px-3 py-2 hover:bg-primary hover:text-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Legislation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;