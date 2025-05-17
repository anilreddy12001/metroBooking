import React, { useState } from 'react';
import { Wallet, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AddFundsModal from './AddFundsModal';

const WalletWidget: React.FC = () => {
  const { user } = useAppContext();
  const [showAddFunds, setShowAddFunds] = useState(false);
  
  return (
    <div className="relative">
      <div 
        className="flex items-center space-x-2 bg-blue-800 bg-opacity-50 rounded-full px-4 py-1.5 cursor-pointer hover:bg-opacity-70 transition-all"
        onClick={() => setShowAddFunds(true)}
      >
        <Wallet className="h-4 w-4" />
        <span className="font-medium">${user.walletBalance.toFixed(2)}</span>
        <Plus className="h-4 w-4" />
      </div>
      
      {showAddFunds && (
        <AddFundsModal onClose={() => setShowAddFunds(false)} />
      )}
    </div>
  );
};

export default WalletWidget;