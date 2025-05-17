import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const BookingSummary: React.FC = () => {
  const { 
    selectedOrigin, 
    selectedDestination, 
    selectedTicketType,
    calculateTicketPrice,
    user,
    purchaseTicket
  } = useAppContext();

  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [purchaseError, setPurchaseError] = useState(false);

  const ticketPrice = calculateTicketPrice();
  const insufficientFunds = ticketPrice > user.walletBalance;

  const handlePurchase = () => {
    if (insufficientFunds) return;
    
    setIsPurchasing(true);
    setPurchaseError(false);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        purchaseTicket();
        setPurchaseComplete(true);
      } catch (error) {
        setPurchaseError(true);
      } finally {
        setIsPurchasing(false);
      }
    }, 1500);
  };

  if (!selectedOrigin || !selectedDestination || !selectedTicketType) {
    return <div>Please complete all previous steps</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-4">Booking Summary</h3>
      
      {purchaseComplete ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-fade-in">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h4 className="text-xl font-medium text-green-800 mb-2">Purchase Successful!</h4>
          <p className="text-green-700 mb-6">Your ticket has been added to your account</p>
          <div className="bg-white border border-green-200 rounded-lg p-4 text-left mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-500">Ticket Type</span>
              <span className="font-medium">{selectedTicketType.name}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-500">Route</span>
              <div className="text-right">
                <div>{selectedOrigin.name}</div>
                <div className="text-sm text-gray-500">to</div>
                <div>{selectedDestination.name}</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Amount Paid</span>
              <span className="font-medium">${ticketPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Book Another Ticket
          </button>
        </div>
      ) : (
        <>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="min-w-fit">
                <div className="bg-white p-2 rounded-lg border border-blue-200">
                  <div className="text-xl font-bold text-center text-blue-800">
                    {selectedOrigin.name.slice(0, 3).toUpperCase()}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 flex items-center">
                <div className="h-0.5 w-full bg-blue-200 relative">
                  <ArrowRight className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 h-5 w-5 text-blue-500" />
                </div>
              </div>
              
              <div className="min-w-fit">
                <div className="bg-white p-2 rounded-lg border border-blue-200">
                  <div className="text-xl font-bold text-center text-blue-800">
                    {selectedDestination.name.slice(0, 3).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-blue-700 block">From</span>
                <span className="font-medium block">{selectedOrigin.name}</span>
              </div>
              <div>
                <span className="text-sm text-blue-700 block">To</span>
                <span className="font-medium block">{selectedDestination.name}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="mr-3 text-blue-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <span>Ticket Type</span>
              </div>
              <span className="font-medium">{selectedTicketType.name}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="mr-3 text-blue-600">
                  <Clock className="h-5 w-5" />
                </div>
                <span>Validity</span>
              </div>
              <span className="font-medium">{selectedTicketType.validity}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span>Ticket Price</span>
              <span className="font-medium">${ticketPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="font-medium">Total</span>
              <span className="font-semibold text-lg">${ticketPrice.toFixed(2)}</span>
            </div>
          </div>
          
          {insufficientFunds && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Insufficient funds</p>
                <p className="text-red-700 text-sm">
                  Please add ${(ticketPrice - user.walletBalance).toFixed(2)} more to your wallet to complete this purchase.
                </p>
              </div>
            </div>
          )}
          
          {purchaseError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Transaction failed</p>
                <p className="text-red-700 text-sm">
                  There was an error processing your payment. Please try again.
                </p>
              </div>
            </div>
          )}
          
          <button
            onClick={handlePurchase}
            disabled={insufficientFunds || isPurchasing}
            className={`w-full py-3 rounded-md font-medium text-white 
              ${!insufficientFunds && !isPurchasing
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-300 cursor-not-allowed'
              } transition-colors`}
          >
            {isPurchasing ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                Processing...
              </span>
            ) : insufficientFunds ? (
              'Insufficient Funds'
            ) : (
              `Pay $${ticketPrice.toFixed(2)}`
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default BookingSummary;