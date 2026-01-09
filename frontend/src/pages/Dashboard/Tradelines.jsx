import React, { useEffect, useMemo, useState } from 'react';
import { CreditCard, Calendar, TrendingUp, DollarSign, Search, Shield, Clock } from 'lucide-react';
import { tradelineService } from '../../services/tradelineService';

const Tradelines = () => {
  const [tradelines, setTradelines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedLimit, setSelectedLimit] = useState('all');
  const [sortBy, setSortBy] = useState('age');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await tradelineService.getPublicTradelines();
        setTradelines(res.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load tradelines');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredTradelines = useMemo(() => {
    return tradelines
      .filter((tradeline) => {
        // Only show active with available slots
        if (tradeline.status !== 'active' || (tradeline.availableSlots ?? 0) <= 0) return false;

        const bank = (tradeline.bankName || '').toLowerCase();
        const matchesSearch = bank.includes(searchTerm.toLowerCase());

        const ageYears = (tradeline.cardAgeMonths || 0) / 12;
        const matchesAge =
          selectedAge === 'all' ||
          (selectedAge === '2-4' && ageYears >= 2 && ageYears <= 4) ||
          (selectedAge === '5-7' && ageYears >= 5 && ageYears <= 7) ||
          (selectedAge === '8+' && ageYears >= 8);

        const limitVal = tradeline.creditLimitMax ?? tradeline.creditLimitMin ?? 0;
        const matchesLimit =
          selectedLimit === 'all' ||
          (selectedLimit === '10k-15k' && limitVal >= 10000 && limitVal <= 15000) ||
          (selectedLimit === '15k-20k' && limitVal >= 15000 && limitVal <= 20000) ||
          (selectedLimit === '20k+' && limitVal >= 20000);

        return matchesSearch && matchesAge && matchesLimit;
      })
      .sort((a, b) => {
        const ageA = (a.cardAgeMonths || 0) / 12;
        const ageB = (b.cardAgeMonths || 0) / 12;
        const limitA = a.creditLimitMax ?? a.creditLimitMin ?? 0;
        const limitB = b.creditLimitMax ?? b.creditLimitMin ?? 0;
        const priceA = a.placementFee ?? 0;
        const priceB = b.placementFee ?? 0;

        if (sortBy === 'age') return ageB - ageA;
        if (sortBy === 'limit') return limitB - limitA;
        if (sortBy === 'price') return priceA - priceB;
        return 0;
      });
  }, [tradelines, searchTerm, selectedAge, selectedLimit, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3">
          {error}
        </div>
      )}
      {loading && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3">
          Loading tradelines...
        </div>
      )}
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
              key={tradeline._id}
              className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border ${
                tradeline.featured ? 'border-amber-400' : 'border-gray-200'
              } ${(tradeline.availableSlots ?? 0) <= 0 ? 'opacity-75' : ''}`}
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
                    <h3 className="text-lg font-semibold text-gray-900">{tradeline.bankName}</h3>
                    <p className="text-sm text-gray-600">Slots available: {tradeline.availableSlots}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {tradeline.featured && (
                      <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Age: {(tradeline.cardAgeMonths || 0) / 12} yrs</span>
                    </div>
                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      Status: {tradeline.status}
                    </div>
                  </div>
                </div>

                {/* Credit Limit and Price */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Credit Limit</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${(tradeline.creditLimitMax ?? tradeline.creditLimitMin ?? 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="text-2xl font-bold text-amber-600">
                        ${tradeline.placementFee ?? 0}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  {(tradeline.availableSlots ?? 0) > 0 ? (
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
