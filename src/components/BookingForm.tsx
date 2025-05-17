import React, { useState } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import StationSelector from './StationSelector';
import TicketTypeSelector from './TicketTypeSelector';
import BookingSummary from './BookingSummary';

const BookingForm: React.FC = () => {
  const { 
    selectedOrigin, 
    selectedDestination, 
    selectedTicketType,
    setSelectedOrigin,
    setSelectedDestination,
    clearSelections
  } = useAppContext();
  
  const [bookingStep, setBookingStep] = useState<number>(1);

  const goToNextStep = () => {
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  const resetForm = () => {
    clearSelections();
    setBookingStep(1);
  };

  const canProceedToRouteSelection = selectedOrigin && selectedDestination;
  const canProceedToSummary = selectedTicketType;

  return (
    <div className="bg-white rounded-xl shadow-md p-5 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Book Your Ticket</h2>
        <button
          onClick={resetForm}
          className="text-blue-600 flex items-center text-sm hover:text-blue-800"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Reset
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div 
                className={`flex flex-col items-center ${bookingStep >= step ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-medium mb-1
                    ${bookingStep >= step 
                      ? 'border-blue-600 bg-blue-50 text-blue-600' 
                      : 'border-gray-300 text-gray-400'
                    }`}
                >
                  {step}
                </div>
                <span className="text-xs hidden md:inline">
                  {step === 1 ? 'Route' : step === 2 ? 'Ticket' : 'Summary'}
                </span>
              </div>
              
              {step < 3 && (
                <div className={`flex-1 h-0.5 mx-2 ${bookingStep > step ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {bookingStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-4">
            <StationSelector
              label="From"
              placeholder="Select origin station"
              value={selectedOrigin}
              onChange={setSelectedOrigin}
              excludeStation={selectedDestination}
            />
            
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 -mt-2 -mb-2 w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center z-10">
                <ArrowRight className="h-4 w-4 text-gray-500" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 h-full border-l border-dashed border-gray-300 -mt-2 -z-10"></div>
            </div>
            
            <StationSelector
              label="To"
              placeholder="Select destination station"
              value={selectedDestination}
              onChange={setSelectedDestination}
              excludeStation={selectedOrigin}
            />
          </div>
          
          <div className="pt-6">
            <button 
              onClick={goToNextStep}
              disabled={!canProceedToRouteSelection}
              className={`w-full py-3 rounded-md font-medium text-white 
                ${canProceedToRouteSelection 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-gray-300 cursor-not-allowed'
                } transition-colors`}
            >
              Continue to Ticket Selection
            </button>
          </div>
        </div>
      )}

      {bookingStep === 2 && (
        <div className="animate-fade-in">
          <TicketTypeSelector />
          
          <div className="flex space-x-3 mt-6">
            <button 
              onClick={goToPreviousStep}
              className="flex-1 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button 
              onClick={goToNextStep}
              disabled={!canProceedToSummary}
              className={`flex-1 py-3 rounded-md font-medium text-white 
                ${canProceedToSummary 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-gray-300 cursor-not-allowed'
                } transition-colors`}
            >
              Continue to Summary
            </button>
          </div>
        </div>
      )}

      {bookingStep === 3 && (
        <div className="animate-fade-in">
          <BookingSummary />
          
          <div className="flex space-x-3 mt-6">
            <button 
              onClick={goToPreviousStep}
              className="flex-1 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;