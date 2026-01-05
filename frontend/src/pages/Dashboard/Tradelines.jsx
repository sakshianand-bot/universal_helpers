import React, { useState } from 'react';
import { CreditCard, Calendar, TrendingUp, DollarSign, Filter, Search, Star, Shield, Clock } from 'lucide-react';

const Tradelines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedLimit, setSelectedLimit] = useState('all');
  const [sortBy, setSortBy] = useState('age');

  // Sample tradeline data based on the reference website
  const tradelines = [
    {
      id: 'TL-009',
      bank: 'PNC Core',
      lastFour: '7442',
      statementDate: 11,
      utilization: 2,
      age: 9,
      creditLimit: 25000,
      price: 515,
      rating: 4.8,
      available: true,
      featured: true
    },
    {
      id: 'TL-005',
      bank: 'Wells Fargo Active Cash',
      lastFour: '5532',
      statementDate: 6,
      utilization: 3,
      age: 8,
      creditLimit: 22000,
      price: 480,
      rating: 4.7,
      available: true,
      featured: true
    },
    {
      id: 'TL-003',
      bank: 'Discover It',
      lastFour: '2210',
      statementDate: 3,
      utilization: 4,
      age: 5,
      creditLimit: 18000,
      price: 410,
      rating: 4.6,
      available: true,
      featured: false
    },
    {
      id: 'TL-008',
      bank: 'Amex Blue Cash',
      lastFour: '3054',
      statementDate: 25,
      utilization: 8,
      age: 5,
      creditLimit: 14000,
      price: 360,
      rating: 4.5,
      available: true,
      featured: false
    },
    {
      id: 'TL-010',
      bank: 'Barclays Arrival',
      lastFour: '9820',
      statementDate: 28,
      utilization: 6,
      age: 4,
      creditLimit: 13000,
      price: 335,
      rating: 4.4,
      available: true,
      featured: false
    },
    {
      id: 'TL-001',
      bank: 'Chase Sapphire',
      lastFour: '4821',
      statementDate: 12,
      utilization: 5,
      age: 6,
      creditLimit: 15000,
      price: 389,
      rating: 4.9,
      available: true,
      featured: true
    },
    {
      id: 'TL-007',
      bank: 'Capital One Venture',
      lastFour: '6405',
      statementDate: 21,
      utilization: 5,
      age: 7,
      creditLimit: 16000,
      price: 430,
      rating: 4.7,
      available: true,
      featured: false
    },
    {
      id: 'TL-002',
      bank: 'Bank of America Cash Rewards',
      lastFour: '9034',
      statementDate: 9,
      utilization: 7,
      age: 4,
      creditLimit: 12000,
      price: 345,
      rating: 4.3,
      available: true,
      featured: false
    },
    {
      id: 'TL-006',
      bank: 'US Bank Altitude',
      lastFour: '1188',
      statementDate: 18,
      utilization: 9,
      age: 2,
      creditLimit: 9000,
      price: 275,
      rating: 4.2,
      available: false,
      featured: false
    },
    {
      id: 'TL-004',
      bank: 'Citi Premier',
      lastFour: '7719',
      statementDate: 15,
      utilization: 6,
      age: 3,
      creditLimit: 10000,
      price: 320,
      rating: 4.4,
      available: true,
      featured: false
    }
  ];

  // Filter tradelines based on search and filters
  const filteredTradelines = tradelines.filter(tradeline => {
    const matchesSearch = tradeline.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tradeline.lastFour.includes(searchTerm);
    const matchesAge = selectedAge === 'all' || 
                      (selectedAge === '2-4' && tradeline.age >= 2 && tradeline.age <= 4) ||
                      (selectedAge === '5-7' && tradeline.age >= 5 && tradeline.age <= 7) ||
                      (selectedAge === '8+' && tradeline.age >= 8);
    const matchesLimit = selectedLimit === 'all' ||
                        (selectedLimit === '10k-15k' && tradeline.creditLimit >= 10000 && tradeline.creditLimit <= 15000) ||
                        (selectedLimit === '15k-20k' && tradeline.creditLimit >= 15000 && tradeline.creditLimit <= 20000) ||
                        (selectedLimit === '20k+' && tradeline.creditLimit >= 20000);
    
    return matchesSearch && matchesAge && matchesLimit;
  }).sort((a, b) => {
    if (sortBy === 'age') return b.age - a.age;
    if (sortBy === 'limit') return b.creditLimit - a.creditLimit;
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const getUtilizationColor = (util) => {
    if (util <= 3) return 'text-emerald-600 bg-emerald-50';
    if (util <= 6) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getAgeBadgeColor = (age) => {
    if (age >= 8) return 'bg-purple-100 text-purple-800';
    if (age >= 5) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <CreditCard className="h-8 w-8 text-amber-600 mr-3" />
                Tradeline Exchange
              </h1>
              <p className="text-gray-600 mt-2">
                Browse verified, high-quality tradelines. Filter by age and limit, then book instantly.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
              <Shield className="h-4 w-4" />
              <span>Verified Tradelines</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by bank name or last 4 digits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="all">All Ages</option>
                <option value="2-4">2-4 Years</option>
                <option value="5-7">5-7 Years</option>
                <option value="8+">8+ Years</option>
              </select>

              <select
                value={selectedLimit}
                onChange={(e) => setSelectedLimit(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="all">All Limits</option>
                <option value="10k-15k">$10K - $15K</option>
                <option value="15k-20k">$15K - $20K</option>
                <option value="20k+">$20K+</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="age">Sort by Age</option>
                <option value="limit">Sort by Limit</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredTradelines.length} of {tradelines.length} tradelines
          </div>
        </div>
      </div>

      {/* Tradeline Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTradelines.map((tradeline) => (
            <div
              key={tradeline.id}
              className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border ${
                tradeline.featured ? 'border-amber-400' : 'border-gray-200'
              } ${!tradeline.available ? 'opacity-75' : ''}`}
            >
              {/* Featured Badge */}
              {tradeline.featured && (
                <div className="bg-amber-400 text-amber-900 text-xs font-semibold px-3 py-1 rounded-b-lg text-center">
                  FEATURED
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{tradeline.bank}</h3>
                    <p className="text-sm text-gray-600">****{tradeline.lastFour}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-amber-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{tradeline.rating}</span>
                  </div>
                </div>

                {/* Key Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Statement: {tradeline.statementDate}th</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getUtilizationColor(tradeline.utilization)}`}>
                      Util: {tradeline.utilization}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">Age: {tradeline.age} yrs</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAgeBadgeColor(tradeline.age)}`}>
                      {tradeline.age >= 8 ? 'Excellent' : tradeline.age >= 5 ? 'Good' : 'Fair'}
                    </span>
                  </div>
                </div>

                {/* Credit Limit and Price */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Credit Limit</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${tradeline.creditLimit.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="text-2xl font-bold text-amber-600">
                        ${tradeline.price}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  {tradeline.available ? (
                    <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      View Details
                    </button>
                  ) : (
                    <button disabled className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Currently Unavailable
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTradelines.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tradelines found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verified Tradelines</h3>
              <p className="text-sm text-gray-600">All tradelines are verified and authenticated for your safety</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-sm text-gray-600">Join thousands who have improved their credit score with our tradelines</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-sm text-gray-600">Competitive pricing with no hidden fees or charges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tradelines;
