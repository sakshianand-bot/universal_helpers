import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Trash2, Edit2, Search, DollarSign, Star, AlertCircle, CheckCircle, Filter } from 'lucide-react';
import { tradelineService } from '../../services/tradelineService';

const TradelineManagement = () => {
  const [tradelines, setTradelines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTradeline, setEditingTradeline] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [formData, setFormData] = useState({
    bankName: '',
    cardAgeMonths: '',
    creditLimitMin: '',
    creditLimitMax: '',
    placementFee: '',
    totalSlots: '',
    availableSlots: '',
    status: 'active',
    featured: false,
  });

  const loadTradelines = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await tradelineService.getAdminTradelines();
      setTradelines(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load tradelines');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTradelines();
  }, []);

  const filteredTradelines = tradelines.filter((tradeline) => {
    const matchesSearch = tradeline.bankName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || tradeline.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddTradeline = async () => {
    // basic client-side validation to avoid avoidable 400s
    const creditLimitMin = parseInt(formData.creditLimitMin, 10);
    const creditLimitMax = parseInt(formData.creditLimitMax, 10);
    if (Number.isFinite(creditLimitMin) && Number.isFinite(creditLimitMax) && creditLimitMax < creditLimitMin) {
      setError('Credit Limit Max must be greater than or equal to Credit Limit Min');
      return;
    }

    try {
      setLoading(true);
      await tradelineService.createTradeline({
        ...formData,
        cardAgeMonths: parseInt(formData.cardAgeMonths, 10),
        creditLimitMin: parseInt(formData.creditLimitMin, 10),
        creditLimitMax: parseInt(formData.creditLimitMax, 10),
        placementFee: parseInt(formData.placementFee, 10),
        totalSlots: parseInt(formData.totalSlots, 10),
        availableSlots: parseInt(formData.availableSlots, 10),
      });
      setShowAddForm(false);
      resetForm();
      await loadTradelines();
    } catch (err) {
      setError(err.message || 'Failed to add tradeline');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTradeline = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tradeline?')) return;
    try {
      setLoading(true);
      await tradelineService.deleteTradeline(id);
      await loadTradelines();
    } catch (err) {
      setError(err.message || 'Failed to delete tradeline');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTradeline = (tradeline) => {
    setEditingTradeline(tradeline);
    setFormData({
      bankName: tradeline.bankName || '',
      cardAgeMonths: tradeline.cardAgeMonths?.toString() || '',
      creditLimitMin: tradeline.creditLimitMin?.toString() || '',
      creditLimitMax: tradeline.creditLimitMax?.toString() || '',
      placementFee: tradeline.placementFee?.toString() || '',
      totalSlots: tradeline.totalSlots?.toString() || '',
      availableSlots: tradeline.availableSlots?.toString() || '',
      status: tradeline.status || 'active',
      featured: !!tradeline.featured,
    });
  };

  const handleUpdateTradeline = async () => {
    // basic client-side validation to avoid avoidable 400s
    const creditLimitMin = parseInt(formData.creditLimitMin, 10);
    const creditLimitMax = parseInt(formData.creditLimitMax, 10);
    if (Number.isFinite(creditLimitMin) && Number.isFinite(creditLimitMax) && creditLimitMax < creditLimitMin) {
      setError('Credit Limit Max must be greater than or equal to Credit Limit Min');
      return;
    }

    try {
      setLoading(true);
      await tradelineService.updateTradeline(editingTradeline._id, {
        ...formData,
        cardAgeMonths: parseInt(formData.cardAgeMonths, 10),
        creditLimitMin: parseInt(formData.creditLimitMin, 10),
        creditLimitMax: parseInt(formData.creditLimitMax, 10),
        placementFee: parseInt(formData.placementFee, 10),
        totalSlots: parseInt(formData.totalSlots, 10),
        availableSlots: parseInt(formData.availableSlots, 10),
      });
      setEditingTradeline(null);
      resetForm();
      await loadTradelines();
    } catch (err) {
      setError(err.message || 'Failed to update tradeline');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      setLoading(true);
      await tradelineService.updateTradelineStatus(id, status);
      await loadTradelines();
    } catch (err) {
      setError(err.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      bankName: '',
      cardAgeMonths: '',
      creditLimitMin: '',
      creditLimitMax: '',
      placementFee: '',
      totalSlots: '',
      availableSlots: '',
      status: 'active',
      featured: false,
    });
  };

  const getStatusBadge = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tradeline Management</h2>
          <p className="text-gray-600 mt-1">Manage tradelines, add new ones, and monitor availability</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Tradeline
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tradelines</p>
              <p className="text-2xl font-bold text-gray-900">{tradelines.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {tradelines.filter((t) => t.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="h-8 w-8 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-gray-900">
                {tradelines.filter((t) => t.featured).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Fee</p>
              <p className="text-2xl font-bold text-gray-900">
                {tradelines.length
                  ? `$${Math.round(
                      tradelines.reduce((sum, t) => sum + (t.placementFee || 0), 0) / tradelines.length
                    )}`
                  : '$0'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by bank name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tradeline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slots
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Financial
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTradelines.map((tradeline) => (
                <tr key={tradeline._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{tradeline.bankName}</div>
                      {tradeline.featured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 mt-1">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>Total: {tradeline.totalSlots}</div>
                      <div className="font-semibold text-green-700">Available: {tradeline.availableSlots}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>Limit: ${Math.max(tradeline.creditLimitMin || 0, tradeline.creditLimitMax || 0).toLocaleString()}</div>
                      <div className="font-semibold text-blue-600">Fee: ${tradeline.placementFee}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(tradeline.status)}`}>
                      {tradeline.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTradeline(tradeline)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(tradeline._id, tradeline.status === 'active' ? 'inactive' : 'active')}
                        className="text-amber-600 hover:text-amber-800"
                      >
                        {tradeline.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteTradeline(tradeline._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(showAddForm || editingTradeline) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-lg border-b border-blue-200">
              <h3 className="text-lg font-semibold text-white">
                {editingTradeline ? 'Edit Tradeline' : 'Add New Tradeline'}
              </h3>
            </div>

            <div className="px-6 py-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., Chase Sapphire"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age (months)</label>
                  <input
                    type="number"
                    value={formData.cardAgeMonths}
                    onChange={(e) => setFormData({ ...formData, cardAgeMonths: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., 72"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Placement Fee ($)</label>
                  <input
                    type="number"
                    value={formData.placementFee}
                    onChange={(e) => setFormData({ ...formData, placementFee: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., 350"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Credit Limit Min</label>
                  <input
                    type="number"
                    value={formData.creditLimitMin}
                    onChange={(e) => setFormData({ ...formData, creditLimitMin: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., 10000"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Credit Limit Max</label>
                  <input
                    type="number"
                    value={formData.creditLimitMax}
                    onChange={(e) => setFormData({ ...formData, creditLimitMax: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., 15000"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Slots</label>
                  <input
                    type="number"
                    value={formData.totalSlots}
                    onChange={(e) => setFormData({ ...formData, totalSlots: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., 3"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Available Slots</label>
                  <input
                    type="number"
                    value={formData.availableSlots}
                    onChange={(e) => setFormData({ ...formData, availableSlots: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., 3"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3 pt-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Featured</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingTradeline(null);
                    resetForm();
                  }}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={editingTradeline ? handleUpdateTradeline : handleAddTradeline}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                  disabled={loading}
                >
                  {editingTradeline ? 'Update Tradeline' : 'Add Tradeline'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-sm text-gray-500">Processing...</div>
      )}
    </div>
  );
};

export default TradelineManagement;
