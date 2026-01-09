// Default to local dev on port 8080 unless overridden
const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1').replace(/\/$/, '');
// const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'https://universal-helpers-1.onrender.com/api/v1').replace(/\/$/, '');
const getAuthToken = () => {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  if (user) {
    const userData = JSON.parse(user);
    return userData.token;
  }
  return null;
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  let data;

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    const text = await response.text();
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(text || `HTTP error! status: ${response.status}`);
    }
  }

  if (!response.ok) {
    const errorMessage =
      data?.message ||
      (typeof data?.error === 'object' ? data?.error?.message : data?.error) ||
      `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }
  return data;
};

export const tradelineService = {
  // Public/user-facing
  async getPublicTradelines() {
    const response = await fetch(`${API_BASE}/tradelines`, { method: 'GET' });
    return handleResponse(response);
  },

  async createRequest(tradelineId, userInfo) {
    const response = await fetch(`${API_BASE}/requests`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ tradelineId, userInfo }),
    });
    return handleResponse(response);
  },

  async getMyRequests() {
    const response = await fetch(`${API_BASE}/requests/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Admin tradelines
  async getAdminTradelines(params = {}) {
    const searchParams = new URLSearchParams();
    if (params.status) searchParams.append('status', params.status);
    if (params.search) searchParams.append('search', params.search);

    const response = await fetch(`${API_BASE}/admin/tradelines?${searchParams}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  async createTradeline(payload) {
    const response = await fetch(`${API_BASE}/admin/tradelines`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  async updateTradeline(id, payload) {
    const response = await fetch(`${API_BASE}/admin/tradelines/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  async updateTradelineStatus(id, status) {
    const response = await fetch(`${API_BASE}/admin/tradelines/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },

  async deleteTradeline(id) {
    const response = await fetch(`${API_BASE}/admin/tradelines/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Admin requests
  async getAdminRequests(params = {}) {
    const searchParams = new URLSearchParams();
    if (params.status) searchParams.append('status', params.status);
    if (params.tradelineId) searchParams.append('tradelineId', params.tradelineId);

    const response = await fetch(`${API_BASE}/admin/requests?${searchParams}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  async updateRequestStatus(id, payload) {
    const response = await fetch(`${API_BASE}/admin/requests/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
};
