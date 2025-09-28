import { useEffect, useState } from "react";
import AppView from "../routes/paths";
import AppColors from "../theme/appColors";
import Icon from "../components/icons";

const ReportScreen = ({ goToScreen }) => {
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Determining GPS location...');
  const [capturedPhotoPath, setCapturedPhotoPath] = useState(null);

  useEffect(() => {
    // 1. Simulate Camera Initialization
    // 2. Simulate GPS Loading
    const loadLocation = async () => {
      // REAL WORLD: Use navigator.geolocation.getCurrentPosition() here
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentLocation('123 Main St, Springfield, IL (High Accuracy)');
      setIsLocationLoading(false);
    };
    loadLocation();
  }, []);

  const handleCapture = () => {
    if (!isLocationLoading && !isPhotoTaken) {
      // REAL WORLD: Capture image from video stream (canvas.toDataURL)
      const path = `simulated_photo_${Date.now()}.jpg`;
      setCapturedPhotoPath(path);
      setIsPhotoTaken(true);
      // Simulate toast message
      console.log('Photo Captured!');
    }
  };

  const goToDetails = () => {
    if (isPhotoTaken) {
      // Navigate to /details path, passing data as routeProps
      goToScreen(AppView.DETAILS, { photoPath: capturedPhotoPath, location: currentLocation });
    }
  };

  const isReadyToCapture = !isLocationLoading && !isPhotoTaken;
  const isReadyToSubmit = !isLocationLoading && isPhotoTaken;

  const buttonClass = (isPrimary) => `w-full p-4 font-semibold rounded-full text-white transition duration-200 shadow-lg ${
    isPrimary 
      ? AppColors.primary 
      : AppColors.redReport
  }`;

  const buttonText = isReadyToSubmit
    ? 'Add Details & Submit'
    : isLocationLoading
      ? 'Determining Location...'
      : 'Capture Photo';
      
  const buttonAction = isReadyToSubmit ? goToDetails : handleCapture;

  const cameraAreaClass = isPhotoTaken
    ? 'bg-gradient-to-br from-blue-100 to-gray-100'
    : 'bg-gradient-to-br from-gray-900 to-gray-700';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`p-6 flex items-center shadow-md text-white ${AppColors.redReport.replace('hover:bg-red-700', '')} w-full`}>
        <button onClick={() => goToScreen(AppView.HOME)} className="p-2 mr-4 rounded-full hover:bg-white/20 transition duration-150">
          <Icon name="chevron-left" className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-xl font-bold">New Issue Report</h2>
      </header>

      {/* Simulated Camera Area - Takes full remaining space */}
      <div className={`flex-grow relative ${cameraAreaClass} p-6`}>
        <div className="h-full flex flex-col justify-center items-center max-w-5xl mx-auto">
          <div className="w-full h-full bg-black/30 rounded-2xl shadow-xl flex items-center justify-center border-4 border-red-500/50">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
              <Icon name={isPhotoTaken ? 'image' : 'camera'} className={`w-20 h-20 mx-auto ${isPhotoTaken ? AppColors.primaryText : 'text-white/70'}`} />
              <p className={`mt-2 text-center text-lg ${isPhotoTaken ? AppColors.primaryText : 'text-white/70'}`}>
                {isPhotoTaken ? 'Photo Captured Preview' : 'Webcam Feed Simulated'}
              </p>
              {isPhotoTaken && <p className="text-xs text-center text-gray-400 mt-1">File: {capturedPhotoPath}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Capture & Details Area (Bottom Overlay) */}
      <div className="bg-white p-6 shadow-2xl w-full">
        <div className="max-w-xl mx-auto">
            <div className="flex justify-center items-center mb-4">
            <Icon name="locate-fixed" className={`w-4 h-4 mr-2 ${isLocationLoading ? 'text-gray-500' : 'text-blue-600'}`} />
            <p className="text-sm text-gray-500">
                {isLocationLoading ? <Icon name="loader-2" className="w-4 h-4 animate-spin text-gray-500 inline-block mr-1" /> : ''}
                Location: {currentLocation}
            </p>
            </div>
            
            <button
            onClick={buttonAction}
            disabled={!isReadyToCapture && !isReadyToSubmit && !isLocationLoading}
            className={`${buttonClass(isReadyToSubmit)} ${(!isReadyToCapture && !isReadyToSubmit) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
            {buttonText}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ReportScreen