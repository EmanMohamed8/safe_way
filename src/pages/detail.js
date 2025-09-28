import { useState } from "react";
import AppColors from "../theme/appColors";
import AppView from "../routes/paths";
import Icon from "../components/icons";

const DetailsScreen = ({ goToScreen, routeProps }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');

  const locationInfo = routeProps?.location || "Location not passed.";

  const issueTypes = [
    'Pothole', 'Broken Street Light', 'Graffiti/Vandalism', 'Missing Signage', 'Other Road Hazard'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issueType || !description) return; // Simple validation

    setIsSubmitting(true);
    
    // -------------------------------------------------------------------------
    // REAL WORLD: API Call Simulation
    // -------------------------------------------------------------------------

    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsSubmitting(false);

    // Simulate success message (in real React, this would be a toast library call)
    console.log('Report submitted!');

    // Navigate back to /home path
    goToScreen(AppView.HOME);
  };
  
  const formInputStyle = `w-full p-3 ${AppColors.inputBorder} rounded-xl transition duration-150`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className={`p-6 flex items-center shadow-md text-white ${AppColors.redReport.replace('hover:bg-red-700', '')} w-full`}>
        <button onClick={() => goToScreen(AppView.REPORT)} className="p-2 mr-4 rounded-full hover:bg-white/20 transition duration-150">
          <Icon name="chevron-left" className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-xl font-bold">Report Issue Details</h2>
      </header>
      
      {/* Main Content: Form - Centered on desktop */}
      <main className="flex-grow p-6 overflow-y-auto flex justify-center">
        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit}>
              {/* Status Info Card */}
              <div className={`${AppColors.redReportBackground} p-4 rounded-xl border border-red-200 mb-6 flex items-center`}>
                <Icon name="check-circle" className="w-6 h-6 mr-3 text-green-600" />
                <div className='flex flex-col'>
                    <p className="font-bold text-red-600">Photo Captured</p>
                    <p className="text-xs text-gray-500">Location: {locationInfo}</p>
                </div>
              </div>

              {/* 1. Issue Type Dropdown */}
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
              <select 
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className={`${formInputStyle} h-[46px] appearance-none`}
                required
              >
                <option value="" disabled>Select the main type of issue</option>
                {issueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="h-4"></div>

              {/* 2. Detailed Description */}
              <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
              <textarea
                rows="5"
                placeholder="Describe the issue (size, severity, location context)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${formInputStyle} resize-none`}
                required
              />
              <div className="h-8"></div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full p-4 font-semibold rounded-xl text-white ${AppColors.primary} transition duration-200 shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className='flex items-center justify-center'>
                    <Icon name="loader-2" className="w-5 h-5 animate-spin mr-2" />
                    Submitting...
                  </span>
                ) : (
                  <span className='flex items-center justify-center'>
                    <Icon name="send" className="w-5 h-5 mr-2" />
                    Submit Report
                  </span>
                )}
              </button>
            </form>
        </div>
      </main>
    </div>
  );
};

export default DetailsScreen