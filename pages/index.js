import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCampaigns, deleteCampaign, updateCampaign } from '../services/api';

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  // Fetch all campaigns
  const getCampaigns = async () => {
    try {
      const data = await fetchCampaigns();
      setCampaigns(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setLoading(false);
    }
  };

  // Handle delete campaign
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      try {
        await deleteCampaign(id);
        setCampaigns(campaigns.filter((campaign) => campaign._id !== id));
      } catch (error) {
        console.error('Error deleting campaign:', error);
      }
    }
  };

  // Handle edit campaign
  const handleEdit = (campaign) => {
    setIsEditing(true);
    setEditingCampaign({ ...campaign });
  };

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCampaign((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated campaign
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateCampaign(editingCampaign._id, editingCampaign);
      setIsEditing(false);
      setEditingCampaign(null);
      getCampaigns(); // Refresh campaigns
      alert('Campaign updated successfully!');
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <div className="container">
      <h1>Ad Campaign Management</h1>

      {/* Link to Create New Campaign */}
      <Link href="/createCampaign">
        <button style={{ marginBottom: '20px', backgroundColor: '#0070f3', color: 'white' }}>
          Create New Campaign
        </button>
      </Link>

      {/* Campaign List */}
      {loading ? (
        <p>Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p>No campaigns available. Create one!</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Title</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Type</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Budget</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Start Date</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>End Date</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id}>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{campaign.title}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{campaign.adType}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{campaign.budget} USD</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                  {new Date(campaign.startDate).toLocaleDateString()}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                  {new Date(campaign.endDate).toLocaleDateString()}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                  <button
                    onClick={() => handleDelete(campaign._id)}
                    style={{
                      backgroundColor: '#ff4d4f',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      marginRight: '5px',
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(campaign)}
                    style={{
                      backgroundColor: '#0070f3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Campaign Form */}
      {isEditing && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px' }}>
          <h2>Edit Campaign</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editingCampaign.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={editingCampaign.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="startDate"
              value={editingCampaign.startDate.split('T')[0]}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="endDate"
              value={editingCampaign.endDate.split('T')[0]}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="budget"
              placeholder="Budget (in USD)"
              value={editingCampaign.budget}
              onChange={handleInputChange}
              required
            />
            <select
              name="adType"
              value={editingCampaign.adType}
              onChange={handleInputChange}
              required
            >
              <option value="skippable">Skippable</option>
              <option value="non-skippable">Non-Skippable</option>
              <option value="overlay">Overlay</option>
              <option value="display">Display</option>
            </select>
            <button type="submit">Update Campaign</button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditingCampaign(null);
              }}
              style={{ marginLeft: '10px', backgroundColor: '#ccc', color: '#333' }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
