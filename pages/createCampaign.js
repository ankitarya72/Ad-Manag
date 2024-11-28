import { useState } from 'react';
import { createCampaign } from '../services/api';

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: 0,
    adType: 'skippable',
    targetAudience: {
      age: '',
      gender: '',
      location: '',
      language: '',
    },
    keywords: '',
    videoUrl: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAudienceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      targetAudience: {
        ...prev.targetAudience,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCampaign({
        ...formData,
        keywords: formData.keywords.split(',').map((kw) => kw.trim()),
      });
      alert('Campaign created successfully!');
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        budget: 0,
        adType: 'skippable',
        targetAudience: {
          age: '',
          gender: '',
          location: '',
          language: '',
        },
        keywords: '',
        videoUrl: '',
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <div className="container">
      <h1>Create a New Campaign</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="budget"
          placeholder="Budget (in USD)"
          value={formData.budget}
          onChange={handleInputChange}
          required
        />
        <select name="adType" value={formData.adType} onChange={handleInputChange}>
          <option value="skippable">Skippable</option>
          <option value="non-skippable">Non-Skippable</option>
          <option value="overlay">Overlay</option>
          <option value="display">Display</option>
        </select>
        <h2>Target Audience</h2>
        <input
          type="text"
          name="age"
          placeholder="Age (e.g., 18-35)"
          value={formData.targetAudience.age}
          onChange={handleAudienceChange}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.targetAudience.gender}
          onChange={handleAudienceChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.targetAudience.location}
          onChange={handleAudienceChange}
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={formData.targetAudience.language}
          onChange={handleAudienceChange}
        />
        <input
          type="text"
          name="keywords"
          placeholder="Keywords (comma-separated)"
          value={formData.keywords}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL"
          value={formData.videoUrl}
          onChange={handleInputChange}
        />
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
};

export default CreateCampaign;
