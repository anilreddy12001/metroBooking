import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Ticket, Clock, Calendar, CreditCard } from 'lucide-react';

const TicketTypeSelector: React.FC = () => {
  const { ticketTypes, selectedTicketType, setSelectedTicketType } = useAppContext();

  const getIcon = (id: string) => {
    switch (id) {
      case '1': return <Ticket className="h-5 w-5" />;
      case '2': return <Clock className="h-5 w-5" />;
      case '3': return <Calendar className="h-5 w-5" />;
      case '4': return <Calendar className="h-5 w-5" />;
      default: return <Ticket className="h-5 w-5" />;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-3">Select Ticket Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ticketTypes.map((type) => (
          <div
            key={type.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all transform hover:shadow-md ${
              selectedTicketType?.id === type.id 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedTicketType(type)}
          >
            <div className="flex items-start">
              <div className={`p-2 rounded-full mr-3 ${
                selectedTicketType?.id === type.id 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {getIcon(type.id)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900">{type.name}</h4>
                  <span className="font-semibold text-gray-900">INR {type.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Valid for: {type.validity}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketTypeSelector;