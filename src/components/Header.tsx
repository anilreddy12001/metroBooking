import React, { useState } from 'react';
import { Train, User, Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import WalletWidget from './WalletWidget';

const Header: React.FC = () => {
  const { user } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Train className="h-6 w-6" />
            <h1 className="text-xl font-bold">Blu</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-blue-200 transition-colors">Book Tickets</a>
            <a href="#" className="hover:text-blue-200 transition-colors">My Tickets</a>
            <a href="#" className="hover:text-blue-200 transition-colors">Routes</a>
            <a href="#" className="hover:text-blue-200 transition-colors">Help</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <WalletWidget />
            <div className="flex items-center space-x-2 border-l pl-4 border-blue-400">
              <div className="h-8 w-8 rounded-full bg-blue-800 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <span className="font-medium">{user.name}</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="mt-4 pb-4 md:hidden">
            <div className="flex justify-between items-center mb-4">
              <WalletWidget />
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-800 flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
            </div>
            <nav className="flex flex-col space-y-3">
              <a href="#" className="hover:text-blue-200 transition-colors py-2 border-b border-blue-500">Book Tickets</a>
              <a href="#" className="hover:text-blue-200 transition-colors py-2 border-b border-blue-500">My Tickets</a>
              <a href="#" className="hover:text-blue-200 transition-colors py-2 border-b border-blue-500">Routes</a>
              <a href="#" className="hover:text-blue-200 transition-colors py-2">Help</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;