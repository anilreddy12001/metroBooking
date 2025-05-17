import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface AddFundsModalProps {
  onClose: () => void;
}

const AddFundsModal: React.FC<AddFundsModalProps> = ({ onClose }) => {
  const { addFunds } = useAppContext();
  const [amount, setAmount] = useState<number>(20);
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [10, 20, 50, 100];

  const handleAddFunds = () => {
    if (amount <= 0) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      addFunds(amount);
      setIsProcessing(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden transform transition-all animate-fade-in">
        <div className="flex justify-between items-center bg-blue-600 text-white px-6 py-4">
          <h2 className="text-xl font-semibold">Add Funds to Wallet</h2>
          <button onClick={onClose} className="text-white hover:text-blue-200">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Select Amount</label>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  className={`py-3 rounded-md border ${
                    amount === preset
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:border-blue-400'
                  } transition-colors`}
                  onClick={() => setAmount(preset)}
                >
                  ${preset}
                </button>
              ))}
            </div>
            
            <label className="block text-gray-700 mb-2 font-medium">Or Enter Custom Amount</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">$</span>
              <input
                type="number"
                min="1"
                max="1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pl-8 w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Amount to Add:</span>
              <span className="font-medium">${amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Processing Fee:</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
              <span className="font-medium">Total:</span>
              <span className="font-semibold">${amount.toFixed(2)}</span>
            </div>
          </div>
          
          <button
            onClick={handleAddFunds}
            disabled={isProcessing || amount <= 0}
            className={`w-full flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-md font-medium ${
              isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            } transition-colors`}
          >
            {isProcessing ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Add ${amount.toFixed(2)} to Wallet
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFundsModal;