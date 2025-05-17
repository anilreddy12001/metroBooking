import React from 'react';
import { ArrowUpRight, ArrowDownRight, RotateCcw, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Transaction } from '../types';

const TransactionHistory: React.FC = () => {
  const { transactions } = useAppContext();

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'PURCHASE':
        return <ArrowUpRight className="h-5 w-5 text-red-500" />;
      case 'RECHARGE':
        return <ArrowDownRight className="h-5 w-5 text-green-500" />;
      case 'REFUND':
        return <RotateCcw className="h-5 w-5 text-blue-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };

  console.log("import.meta.env.VITE_API_BASE_URL:",import.meta.env);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className={`p-2 rounded-full mr-3 ${
                  transaction.type === 'PURCHASE' 
                    ? 'bg-red-100' 
                    : transaction.type === 'RECHARGE'
                    ? 'bg-green-100'
                    : 'bg-blue-100'
                }`}>
                  {getTransactionIcon(transaction.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-900">
                      {transaction.type === 'PURCHASE' 
                        ? 'Ticket Purchase' 
                        : transaction.type === 'RECHARGE'
                        ? 'Wallet Recharge'
                        : 'Refund'
                      }
                    </h4>
                    <span className={`font-semibold ${
                      transaction.amount < 0 
                        ? 'text-red-600' 
                        : 'text-green-600'
                    }`}>
                      {transaction.amount < 0 ? '-' : '+'}INR {Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{transaction.description}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(transaction.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No recent transactions
          </div>
        )}
      </div>
      
      {transactions.length > 5 && (
        <div className="px-4 py-3 bg-gray-50 text-center">
          <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
            View All Transactions
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;