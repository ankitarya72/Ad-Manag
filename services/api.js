import axios from 'axios';

const API_URL = 'http://localhost:5000/api/campaigns'; // Update this URL if needed

// Fetch all campaigns
export const fetchCampaigns = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new campaign
export const createCampaign = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

// Update an existing campaign
export const updateCampaign = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Delete a campaign
export const deleteCampaign = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
