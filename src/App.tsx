import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import TransactionHistory from './components/TransactionHistory';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BookingForm />
            </div>
            
            <div>
              <TransactionHistory />
            </div>
          </div>
        </main>
        
        <footer className="bg-white border-t border-gray-200 py-6 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-blue-600">MetroGo</span>
                  <span className="text-gray-500">© 2025 All Rights Reserved</span>
                </div>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Help</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;