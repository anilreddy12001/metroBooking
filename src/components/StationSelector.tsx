import React, { useState } from 'react';
import { Check, ChevronDown, MapPin } from 'lucide-react';
import { Station } from '../types';
import { useAppContext } from '../context/AppContext';

interface StationSelectorProps {
  label: string;
  placeholder: string;
  value: Station | null;
  onChange: (station: Station | null) => void;
  excludeStation?: Station | null;
}

const StationSelector: React.FC<StationSelectorProps> = ({
  label,
  placeholder,
  value,
  onChange,
  excludeStation
}) => {
  const { stations } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStations = stations
    .filter(station => 
      !excludeStation || station.id !== excludeStation.id
    )
    .filter(station =>
      station.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:border-blue-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
          {value ? (
            <span>{value.name}</span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-64 overflow-auto">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search stations..."
              className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {filteredStations.length > 0 ? (
            <ul>
              {filteredStations.map((station) => (
                <li
                  key={station.id}
                  className={`px-3 py-2 cursor-pointer flex items-center justify-between hover:bg-blue-50 ${
                    value?.id === station.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(station);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <span>{station.name}</span>
                    <div className="ml-2 flex">
                      {station.lines.map((line) => (
                        <div 
                          key={line} 
                          className={`h-2 w-2 rounded-full mx-0.5 ${
                            line === 'Red' ? 'bg-red-500' :
                            line === 'Blue' ? 'bg-blue-500' :
                            line === 'Green' ? 'bg-green-500' :
                            line === 'Yellow' ? 'bg-yellow-500' :
                            'bg-purple-500'
                          }`}
                          title={`${line} Line`}
                        />
                      ))}
                    </div>
                  </div>
                  {value?.id === station.id && (
                    <Check className="h-5 w-5 text-blue-600" />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-2 text-center text-gray-500">
              No stations found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StationSelector;