import React from 'react';

const StatisticsCards = ({ stats }) => {
  const cards = [
    { 
      label: 'Total Users', 
      value: stats.totalUsers?.toLocaleString() || '0', 
      change: stats.userGrowth || '+0%', 
      positive: (stats.userGrowth || '+0%').startsWith('+'),
      icon: '👥'
    },
    { 
      label: 'Active Sessions', 
      value: stats.activeSessions?.toLocaleString() || '0', 
      change: stats.sessionGrowth || '+0%', 
      positive: (stats.sessionGrowth || '+0%').startsWith('+'),
      icon: '🔥'
    },
    { 
      label: 'Revenue', 
      value: `$${stats.revenue?.toLocaleString() || '0'}`, 
      change: stats.revenueGrowth || '+0%', 
      positive: (stats.revenueGrowth || '+0%').startsWith('+'),
      icon: '💰'
    },
    { 
      label: 'Support Tickets', 
      value: stats.supportTickets?.toLocaleString() || '0', 
      change: stats.ticketGrowth || '+0%', 
      positive: (stats.ticketGrowth || '+0%').startsWith('-'),
      icon: '🎫'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">{card.icon}</div>
            <div className={`flex items-center text-sm font-medium ${
              card.positive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="mr-1">
                {card.positive ? '↑' : '↓'}
              </span>
              {card.change}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{card.label}</p>
            <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;
