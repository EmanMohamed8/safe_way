import { useEffect, useState, useRef } from "react";
import AppView from "../routes/paths";
import AppColors from "../theme/appColors";
import Icon from "../components/icons";
import Header from "../components/header";

// const ReportScreen = ({ goToScreen }) => {
//   const [isLocationLoading, setIsLocationLoading] = useState(true);
//   const [isPhotoTaken, setIsPhotoTaken] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState('Determining GPS location...');
//   const [capturedPhotoPath, setCapturedPhotoPath] = useState(null);

//   useEffect(() => {
//     // 1. Simulate Camera Initialization
//     // 2. Simulate GPS Loading
//     const loadLocation = async () => {
//       // REAL WORLD: Use navigator.geolocation.getCurrentPosition() here
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       setCurrentLocation('123 Main St, Springfield, IL (High Accuracy)');
//       setIsLocationLoading(false);
//     };
//     loadLocation();
//   }, []);

//   const handleCapture = () => {
//     if (!isLocationLoading && !isPhotoTaken) {
//       // REAL WORLD: Capture image from video stream (canvas.toDataURL)
//       const path = `simulated_photo_${Date.now()}.jpg`;
//       setCapturedPhotoPath(path);
//       setIsPhotoTaken(true);
//       // Simulate toast message
//       console.log('Photo Captured!');
//     }
//   };

//   const goToDetails = () => {
//     if (isPhotoTaken) {
//       // Navigate to /details path, passing data as routeProps
//       goToScreen(AppView.DETAILS, { photoPath: capturedPhotoPath, location: currentLocation });
//     }
//   };

//   const isReadyToCapture = !isLocationLoading && !isPhotoTaken;
//   const isReadyToSubmit = !isLocationLoading && isPhotoTaken;

//   const buttonClass = (isPrimary) => `w-full p-4 font-semibold rounded-full text-white transition duration-200 shadow-lg ${
//     isPrimary
//       ? AppColors.primary
//       : AppColors.redReport
//   }`;

//   const buttonText = isReadyToSubmit
//     ? 'Add Details & Submit'
//     : isLocationLoading
//       ? 'Determining Location...'
//       : 'Capture Photo';

//   const buttonAction = isReadyToSubmit ? goToDetails : handleCapture;

//   const cameraAreaClass = isPhotoTaken
//     ? 'bg-gradient-to-br from-blue-100 to-gray-100'
//     : 'bg-gradient-to-br from-gray-900 to-gray-700';

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <header className={`p-6 flex items-center shadow-md text-white ${AppColors.redReport.replace('hover:bg-red-700', '')} w-full`}>
//         <button onClick={() => goToScreen(AppView.HOME)} className="p-2 mr-4 rounded-full hover:bg-white/20 transition duration-150">
//           <Icon name="chevron-left" className="w-6 h-6 text-white" />
//         </button>
//         <h2 className="text-xl font-bold">New Issue Report</h2>
//       </header>

//       {/* Simulated Camera Area - Takes full remaining space */}
//       <div className={`flex-grow relative ${cameraAreaClass} p-6`}>
//         <div className="h-full flex flex-col justify-center items-center max-w-5xl mx-auto">
//           <div className="w-full h-full bg-black/30 rounded-2xl shadow-xl flex items-center justify-center border-4 border-red-500/50">
//             <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
//               <Icon name={isPhotoTaken ? 'image' : 'camera'} className={`w-20 h-20 mx-auto ${isPhotoTaken ? AppColors.primaryText : 'text-white/70'}`} />
//               <p className={`mt-2 text-center text-lg ${isPhotoTaken ? AppColors.primaryText : 'text-white/70'}`}>
//                 {isPhotoTaken ? 'Photo Captured Preview' : 'Webcam Feed Simulated'}
//               </p>
//               {isPhotoTaken && <p className="text-xs text-center text-gray-400 mt-1">File: {capturedPhotoPath}</p>}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Capture & Details Area (Bottom Overlay) */}
//       <div className="bg-white p-6 shadow-2xl w-full">
//         <div className="max-w-xl mx-auto">
//             <div className="flex justify-center items-center mb-4">
//             <Icon name="locate-fixed" className={`w-4 h-4 mr-2 ${isLocationLoading ? 'text-gray-500' : 'text-blue-600'}`} />
//             <p className="text-sm text-gray-500">
//                 {isLocationLoading ? <Icon name="loader-2" className="w-4 h-4 animate-spin text-gray-500 inline-block mr-1" /> : ''}
//                 Location: {currentLocation}
//             </p>
//             </div>

//             <button
//             onClick={buttonAction}
//             disabled={!isReadyToCapture && !isReadyToSubmit && !isLocationLoading}
//             className={`${buttonClass(isReadyToSubmit)} ${(!isReadyToCapture && !isReadyToSubmit) ? 'opacity-50 cursor-not-allowed' : ''}`}
//             >
//             {buttonText}
//             </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ReportScreen = ({ goToScreen }) => {
//   const [isLocationLoading, setIsLocationLoading] = useState(true);
//   const [isPhotoTaken, setIsPhotoTaken] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState(
//     "Determining GPS location..."
//   );
//   const [capturedPhotoPath, setCapturedPhotoPath] = useState(null);

//   useEffect(() => {
//     const loadLocation = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       setCurrentLocation("123 Main St, Springfield, IL (High Accuracy)");
//       setIsLocationLoading(false);
//     };
//     loadLocation();
//   }, []);

//   const handleCapture = () => {
//     if (!isLocationLoading && !isPhotoTaken) {
//       const path = `simulated_photo_${Date.now()}.jpg`;
//       setCapturedPhotoPath(path);
//       setIsPhotoTaken(true);
//       console.log("Photo Captured!");
//     }
//   };

//   const goToDetails = () => {
//     if (isPhotoTaken) {
//       goToScreen(AppView.DETAILS, {
//         photoPath: capturedPhotoPath,
//         location: currentLocation,
//       });
//     }
//   };

//   const isReadyToCapture = !isLocationLoading && !isPhotoTaken;
//   const isReadyToSubmit = !isLocationLoading && isPhotoTaken;

//   const buttonStyle = {
//     width: "100%",
//     padding: "16px",
//     fontWeight: "600",
//     borderRadius: "50px",
//     color: AppColors.white,
//     transition: "all 200ms",
//     cursor: "pointer",
//     border: "none",
//     boxShadow: isReadyToSubmit ? AppColors.shadowPrimary : AppColors.shadowRed,
//     backgroundColor: isReadyToSubmit ? AppColors.primary : AppColors.redReport,
//     opacity:
//       !isReadyToCapture && !isReadyToSubmit && !isLocationLoading ? "0.5" : "1",
//     pointerEvents:
//       !isReadyToCapture && !isReadyToSubmit && !isLocationLoading
//         ? "none"
//         : "auto",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     transform: "scale(1)",
//   };

//   const buttonText = isReadyToSubmit
//     ? "Add Details & Submit"
//     : isLocationLoading
//     ? "Determining Location..."
//     : "Capture Photo";

//   const buttonAction = isReadyToSubmit ? goToDetails : handleCapture;

//   const cameraAreaStyle = {
//     flexGrow: 1,
//     position: "relative",
//     padding: "24px",
//     background: isPhotoTaken
//       ? `linear-gradient(to bottom right, ${AppColors.blueCheckBackground}, ${AppColors.grayBackground})`
//       : "linear-gradient(to bottom right, #1F2937, #4B5563)", // dark gradient
//   };

//   return (
//     <div
//       style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
//     >
//       {/* Header */}
//       <header
//         style={{
//           padding: "24px",
//           display: "flex",
//           alignItems: "center",
//           boxShadow: AppColors.shadowGeneral,
//           color: AppColors.white,
//           backgroundColor: AppColors.redReport,
//           width: "100%",
//         }}
//       >
//         <button
//           onClick={() => goToScreen(AppView.HOME)}
//           style={{
//             padding: "8px",
//             marginRight: "16px",
//             borderRadius: "50%",
//             backgroundColor: "rgba(255, 255, 255, 0.2)",
//             transition: "background-color 150ms",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           <Icon name="chevron-left" size="24px" color={AppColors.white} />
//         </button>
//         <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
//           New Issue Report
//         </h2>
//       </header>

//       {/* Simulated Camera Area */}
//       <div style={cameraAreaStyle}>
//         <div
//           style={{
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             maxWidth: "640px",
//             margin: "0 auto",
//           }}
//         >
//           <div
//             style={{
//               width: "100%",
//               height: "80%",
//               backgroundColor: "rgba(0, 0, 0, 0.3)",
//               borderRadius: "16px",
//               boxShadow: AppColors.shadowGeneral,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               border: `4px solid ${AppColors.redReport}`,
//             }}
//           >
//             <div
//               style={{
//                 padding: "16px",
//                 backgroundColor: "rgba(255, 255, 255, 0.1)",
//                 backdropFilter: "blur(3px)",
//                 borderRadius: "12px",
//                 textAlign: "center",
//               }}
//             >
//               <Icon
//                 name={isPhotoTaken ? "image" : "camera"}
//                 size="80px"
//                 color={
//                   isPhotoTaken ? AppColors.primary : "rgba(255, 255, 255, 0.7)"
//                 }
//               />
//               <p
//                 style={{
//                   marginTop: "8px",
//                   fontSize: "18px",
//                   color: isPhotoTaken
//                     ? AppColors.primary
//                     : "rgba(255, 255, 255, 0.7)",
//                 }}
//               >
//                 {isPhotoTaken
//                   ? "Photo Captured Preview"
//                   : "Webcam Feed Simulated"}
//               </p>
//               {isPhotoTaken && (
//                 <p
//                   style={{
//                     fontSize: "12px",
//                     color: AppColors.grayText,
//                     marginTop: "4px",
//                   }}
//                 >
//                   File: {capturedPhotoPath}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Capture & Details Area (Bottom Overlay) */}
//       <div
//         style={{
//           backgroundColor: AppColors.white,
//           padding: "24px",
//           boxShadow: AppColors.shadowGeneral,
//           width: "100%",
//         }}
//       >
//         <div style={{ maxWidth: "512px", margin: "0 auto" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginBottom: "16px",
//             }}
//           >
//             <Icon
//               name="locate-fixed"
//               size="16px"
//               color={isLocationLoading ? AppColors.grayText : AppColors.primary}
//               style={{ marginRight: "8px" }}
//             />
//             <p
//               style={{
//                 fontSize: "14px",
//                 color: AppColors.grayText,
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               {isLocationLoading && (
//                 <Icon
//                   name="loader-2"
//                   size="16px"
//                   color={AppColors.grayText}
//                   style={{
//                     animation: "spin 1s linear infinite",
//                     marginRight: "4px",
//                   }}
//                 />
//               )}
//               Location: {currentLocation}
//             </p>
//           </div>

//           <button onClick={buttonAction} style={buttonStyle}>
//             {buttonText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ReportScreen = ({ goToScreen }) => {
//   // Refs for video element and canvas capture
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // State for location, photo, and camera stream
//   const [isLocationLoading, setIsLocationLoading] = useState(true);
//   const [stream, setStream] = useState(null); // null: initializing, false: failed, object: active stream
//   const [isPhotoTaken, setIsPhotoTaken] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState(
//     "Determining GPS location..."
//   );
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [capturedPhotoPath, setCapturedPhotoPath] = useState(null);

//   // 1. Camera Initialization and Cleanup
//   useEffect(() => {
//     let activeStream = null;

//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices
//         .getUserMedia({
//           video: {
//             // Prefer environment camera on mobile
//             facingMode: "environment",
//           },
//         })
//         .then((newStream) => {
//           activeStream = newStream;
//           if (videoRef.current) {
//             videoRef.current.srcObject = newStream;
//             // IMPORTANT: Set initial video size dynamically
//             videoRef.current.onloadedmetadata = () => {
//               videoRef.current.play();
//             };
//           }
//           setStream(newStream);
//         })
//         .catch((err) => {
//           console.error(
//             "Could not access the camera (Access Denied/Blocked): ",
//             err
//           );
//           setStream(false); // Signal that real camera failed
//         });
//     } else {
//       console.error("Browser does not support the MediaDevices API.");
//       setStream(false); // Signal lack of support
//     }

//     // Cleanup function: stops the camera tracks when the component unmounts
//     return () => {
//       if (activeStream) {
//         activeStream.getTracks().forEach((track) => track.stop());
//       } else if (stream && stream !== false) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []); // Run only on mount and unmount

//   // 2. Location Simulation
//   useEffect(() => {
//     const loadLocation = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       // In a real app, this is where you'd call a Geolocation API
//       setCurrentLocation("123 Main St, Springfield, IL (High Accuracy)");
//       setIsLocationLoading(false);
//     };
//     loadLocation();
//   }, []);

//   // 3. Photo Capture Logic
//   const handleCapture = () => {
//     if (isLocationLoading || isPhotoTaken) return;

//     if (videoRef.current && canvasRef.current && stream) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;

//       // Ensure canvas dimensions match video dimensions for correct capture
//       // Note: We use fixed values for portrait capture aspect ratio consistency if possible,
//       // but rely on video's inherent size for maximum quality.
//       canvas.width = video.videoWidth || 640;
//       canvas.height = video.videoHeight || 480;

//       const context = canvas.getContext("2d");
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       const photoDataUrl = canvas.toDataURL("image/png");

//       // Store image data and stop the live stream
//       setCapturedImage(photoDataUrl);
//       setCapturedPhotoPath(
//         `Captured Photo @ ${new Date().toLocaleTimeString()}`
//       );
//       setIsPhotoTaken(true);

//       // Stop the camera stream after capture
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     } else if (stream === false) {
//       // Handle fallback simulation if camera access failed
//       setCapturedImage(
//         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23DC2626'/%3E%3Ctext x='50%25' y='50%25' font-size='15' fill='white' text-anchor='middle' dominant-baseline='middle'%3ESimulated Photo%3C/text%3E%3C/svg%3E"
//       ); // Use SVG as placeholder image
//       setCapturedPhotoPath(
//         `Simulated Photo @ ${new Date().toLocaleTimeString()} (Camera Failed)`
//       );
//       setIsPhotoTaken(true);
//     }
//   };

//   const goToDetails = () => {
//     if (isPhotoTaken) {
//       goToScreen(AppView.DETAILS, {
//         photoPath: capturedPhotoPath,
//         location: currentLocation,
//         imageData: capturedImage,
//       });
//     }
//   };

//   const isReadyToCapture =
//     !isLocationLoading && !isPhotoTaken && stream !== false;
//   const isReadyToSubmit = !isLocationLoading && isPhotoTaken;

//   const buttonStyle = {
//     width: "100%",
//     padding: "16px",
//     fontWeight: "600",
//     borderRadius: "50px",
//     color: AppColors.white,
//     transition: "all 200ms",
//     cursor: "pointer",
//     border: "none",
//     boxShadow: isReadyToSubmit ? AppColors.shadowPrimary : AppColors.shadowRed,
//     backgroundColor: isReadyToSubmit ? AppColors.primary : AppColors.redReport,
//     opacity:
//       isLocationLoading || (stream === false && !isPhotoTaken) ? "0.5" : "1",
//     pointerEvents:
//       (isLocationLoading || (stream === false && !isPhotoTaken)) &&
//       !isReadyToSubmit
//         ? "none"
//         : "auto",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     transform: "scale(1)",
//   };

//   let buttonText = "Capture Photo";
//   if (isReadyToSubmit) {
//     buttonText = "Add Details & Submit";
//   } else if (isLocationLoading) {
//     buttonText = "Determining Location...";
//   } else if (stream === false && !isPhotoTaken) {
//     buttonText = "Camera Unavailable (Capture Simulated)";
//   } else if (stream && !isPhotoTaken) {
//     buttonText = "Capture Photo";
//   }

//   const buttonAction = isReadyToSubmit ? goToDetails : handleCapture;

//   return (
//     <div
//       style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
//     >
//       {/* Hidden Canvas for capture */}
//       <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

//       {/* Header */}
//       <header
//         style={{
//           padding: "24px",
//           display: "flex",
//           alignItems: "center",
//           boxShadow: AppColors.shadowGeneral,
//           color: AppColors.white,
//           backgroundColor: AppColors.redReport,
//           width: "100%",
//         }}
//       >
//         <button
//           onClick={() => goToScreen(AppView.HOME)}
//           style={{
//             padding: "8px",
//             marginRight: "16px",
//             borderRadius: "50%",
//             backgroundColor: "rgba(255, 255, 255, 0.2)",
//             transition: "background-color 150ms",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           <Icon name="chevron-left" size="24px" color={AppColors.white} />
//         </button>
//         <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
//           New Issue Report
//         </h2>
//       </header>

//       {/* Camera Area / Preview */}
//       <div
//         style={{
//           flexGrow: 1,
//           position: "relative",
//           padding: "24px",
//           backgroundColor: AppColors.grayBackground,
//         }}
//       >
//         <div
//           style={{
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             maxWidth: "640px",
//             margin: "0 auto",
//           }}
//         >
//           {/* Camera Viewport Container */}
//           <div
//             style={{
//               width: "100%",
//               height: "80vh",
//               maxHeight: "500px",
//               backgroundColor: "rgba(0, 0, 0, 0.3)",
//               borderRadius: "16px",
//               boxShadow: AppColors.shadowGeneral,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               border: `4px solid ${AppColors.redReport}`,
//               overflow: "hidden",
//             }}
//           >
//             {/* Conditional rendering for camera/image/fallback */}
//             {capturedImage ? (
//               // SHOW CAPTURED IMAGE
//               <img
//                 src={capturedImage}
//                 alt="Captured Issue"
//                 style={{
//                   height: "100%",
//                   width: "100%",
//                   objectFit: "contain",
//                   borderRadius: "12px",
//                 }}
//               />
//             ) : stream === false ? (
//               // CAMERA FAILED OR DENIED
//               <div
//                 style={{
//                   padding: "16px",
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                   backdropFilter: "blur(3px)",
//                   borderRadius: "12px",
//                   textAlign: "center",
//                 }}
//               >
//                 <Icon name="square" size="80px" color={AppColors.redReport} />
//                 <p
//                   style={{
//                     marginTop: "8px",
//                     fontSize: "18px",
//                     color: AppColors.redReport,
//                   }}
//                 >
//                   Camera Disabled/Blocked
//                 </p>
//                 <p style={{ fontSize: "14px", color: AppColors.grayText }}>
//                   Using simulated mode for capture.
//                 </p>
//               </div>
//             ) : stream === null || isLocationLoading ? (
//               // INITIAL LOADING STATE (Camera and GPS)
//               <div
//                 style={{
//                   padding: "16px",
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                   backdropFilter: "blur(3px)",
//                   borderRadius: "12px",
//                   textAlign: "center",
//                 }}
//               >
//                 <Icon
//                   name="loader-2"
//                   size="80px"
//                   color="rgba(255, 255, 255, 0.7)"
//                   style={{ animation: "spin 1s linear infinite" }}
//                 />
//                 <p
//                   style={{
//                     marginTop: "8px",
//                     fontSize: "18px",
//                     color: "rgba(255, 255, 255, 0.7)",
//                   }}
//                 >
//                   Awaiting Camera and Location...
//                 </p>
//               </div>
//             ) : (
//               // LIVE CAMERA FEED
//               <video
//                 ref={videoRef}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 autoPlay
//                 playsInline
//                 muted
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Capture & Details Area (Bottom Overlay) */}
//       <div
//         style={{
//           backgroundColor: AppColors.white,
//           padding: "24px",
//           boxShadow: AppColors.shadowGeneral,
//           width: "100%",
//         }}
//       >
//         <div style={{ maxWidth: "512px", margin: "0 auto" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginBottom: "16px",
//             }}
//           >
//             <Icon
//               name="locate-fixed"
//               size="16px"
//               color={isLocationLoading ? AppColors.grayText : AppColors.primary}
//               style={{ marginRight: "8px" }}
//             />
//             <p
//               style={{
//                 fontSize: "14px",
//                 color: AppColors.grayText,
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               {isLocationLoading && (
//                 <Icon
//                   name="loader-2"
//                   size="16px"
//                   color={AppColors.grayText}
//                   style={{
//                     animation: "spin 1s linear infinite",
//                     marginRight: "4px",
//                   }}
//                 />
//               )}
//               Location: {currentLocation}
//             </p>
//           </div>

//           <button onClick={buttonAction} style={buttonStyle}>
//             {buttonText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ReportScreen = ({ goToScreen }) => {
//   // Refs for video element and canvas capture
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // State for location, photo, and camera stream
//   const [isLocationLoading, setIsLocationLoading] = useState(true);
//   const [stream, setStream] = useState(null); // null: initializing, false: failed, object: active stream
//   const [isPhotoTaken, setIsPhotoTaken] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState(
//     "Determining GPS location..."
//   );
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [capturedPhotoPath, setCapturedPhotoPath] = useState(null);

//   // 1. Camera Initialization and Cleanup
//   useEffect(() => {
//     let activeStream = null;

//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices
//         .getUserMedia({
//           video: {
//             // Prefer environment camera on mobile
//             facingMode: "environment",
//           },
//         })
//         .then((newStream) => {
//           activeStream = newStream;
//           if (videoRef.current) {
//             videoRef.current.srcObject = newStream;
//             // IMPORTANT: Set initial video size dynamically
//             videoRef.current.onloadedmetadata = () => {
//               videoRef.current.play();
//             };
//           }
//           setStream(newStream);
//         })
//         .catch((err) => {
//           console.error(
//             "Could not access the camera (Access Denied/Blocked): ",
//             err
//           );
//           setStream(false); // Signal that real camera failed
//         });
//     } else {
//       console.error("Browser does not support the MediaDevices API.");
//       setStream(false); // Signal lack of support
//     }

//     // Cleanup function: stops the camera tracks when the component unmounts
//     return () => {
//       if (activeStream) {
//         activeStream.getTracks().forEach((track) => track.stop());
//       } else if (stream && stream !== false) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []); // Run only on mount and unmount

//   // 2. Determine Real User Location (Geolocation API)
//   // useEffect(() => {
//   //   if (navigator.geolocation) {
//   //     const options = {
//   //       enableHighAccuracy: true,
//   //       timeout: 5000,
//   //       maximumAge: 0,
//   //     };

//   //     const success = (pos) => {
//   //       const coords = pos.coords;
//   //       setCurrentLocation(
//   //         `Lat: ${coords.latitude.toFixed(4)}, Lon: ${coords.longitude.toFixed(
//   //           4
//   //         )} (GPS)`
//   //       );
//   //       setIsLocationLoading(false);
//   //     };

//   //     const error = (err) => {
//   //       let message = "Location access denied or timed out.";
//   //       if (err.code === err.PERMISSION_DENIED) {
//   //         message = "Location access denied by user.";
//   //       } else if (err.code === err.TIMEOUT) {
//   //         message = "Location request timed out.";
//   //       }
//   //       console.error(`Geolocation Error (${err.code}): ${err.message}`);
//   //       setCurrentLocation(`Location failed: ${message}`);
//   //       setIsLocationLoading(false);
//   //     };

//   //     navigator.geolocation.getCurrentPosition(success, error, options);
//   //   } else {
//   //     // Geolocation not supported by the browser
//   //     setCurrentLocation("Geolocation not supported by your browser.");
//   //     setIsLocationLoading(false);
//   //   }
//   // }, []);
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setCurrentLocation("Geolocation not supported by your browser.");
//       setIsLocationLoading(false);
//       return;
//     }

//     const options = {
//       enableHighAccuracy: true,
//       timeout: 10000,
//       maximumAge: 0,
//     };

//     const success = async (pos) => {
//       const { latitude, longitude } = pos.coords;

//       try {
//         // Fetch human-readable address from OpenStreetMap
//         const res = await fetch(
//           `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//         );
//         const data = await res.json();

//         const address = data?.display_name || "Unknown location";

//         setCurrentLocation(
//           `📍 ${address}\n(Lat: ${latitude.toFixed(
//             4
//           )}, Lon: ${longitude.toFixed(4)})`
//         );
//       } catch (err) {
//         console.error("Error fetching address:", err);
//         setCurrentLocation(
//           `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)} (GPS)`
//         );
//       } finally {
//         setIsLocationLoading(false);
//       }
//     };

//     const error = (err) => {
//       let message = "Location access denied or timed out.";
//       if (err.code === err.PERMISSION_DENIED) {
//         message = "Location access denied by user.";
//       } else if (err.code === err.TIMEOUT) {
//         message = "Location request timed out.";
//       }
//       console.error(`Geolocation Error (${err.code}): ${err.message}`);
//       setCurrentLocation(`Location failed: ${message}`);
//       setIsLocationLoading(false);
//     };

//     navigator.geolocation.getCurrentPosition(success, error, options);
//   }, []);

//   // 3. Photo Capture Logic
//   const handleCapture = () => {
//     if (isLocationLoading || isPhotoTaken) return;

//     if (videoRef.current && canvasRef.current && stream) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;

//       // Ensure canvas dimensions match video dimensions for correct capture
//       // Note: We use fixed values for portrait capture aspect ratio consistency if possible,
//       // but rely on video's inherent size for maximum quality.
//       canvas.width = video.videoWidth || 640;
//       canvas.height = video.videoHeight || 480;

//       const context = canvas.getContext("2d");
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       const photoDataUrl = canvas.toDataURL("image/png");

//       // Store image data and stop the live stream
//       setCapturedImage(photoDataUrl);
//       setCapturedPhotoPath(
//         `Captured Photo @ ${new Date().toLocaleTimeString()}`
//       );
//       setIsPhotoTaken(true);

//       // Stop the camera stream after capture
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     } else if (stream === false) {
//       // Handle fallback simulation if camera access failed
//       setCapturedImage(
//         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23DC2626'/%3E%3Ctext x='50%25' y='50%25' font-size='15' fill='white' text-anchor='middle' dominant-baseline='middle'%3ESimulated Photo%3C/text%3E%3C/svg%3E"
//       ); // Use SVG as placeholder image
//       setCapturedPhotoPath(
//         `Simulated Photo @ ${new Date().toLocaleTimeString()} (Camera Failed)`
//       );
//       setIsPhotoTaken(true);
//     }
//   };

//   const goToDetails = () => {
//     if (isPhotoTaken) {
//       goToScreen(AppView.DETAILS, {
//         photoPath: capturedPhotoPath,
//         location: currentLocation,
//         imageData: capturedImage,
//       });
//     }
//   };

//   const isReadyToCapture =
//     !isLocationLoading && !isPhotoTaken && stream !== false;
//   const isReadyToSubmit = !isLocationLoading && isPhotoTaken;

//   const buttonStyle = {
//     width: "100%",
//     padding: "16px",
//     fontWeight: "600",
//     borderRadius: "50px",
//     color: AppColors.white,
//     transition: "all 200ms",
//     cursor: "pointer",
//     border: "none",
//     boxShadow: isReadyToSubmit ? AppColors.shadowPrimary : AppColors.shadowRed,
//     backgroundColor: isReadyToSubmit ? AppColors.primary : AppColors.redReport,
//     opacity:
//       isLocationLoading || (stream === false && !isPhotoTaken) ? "0.5" : "1",
//     pointerEvents:
//       (isLocationLoading || (stream === false && !isPhotoTaken)) &&
//       !isReadyToSubmit
//         ? "none"
//         : "auto",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     transform: "scale(1)",
//   };

//   let buttonText = "Capture Photo";
//   if (isReadyToSubmit) {
//     buttonText = "Add Details & Submit";
//   } else if (isLocationLoading) {
//     buttonText = "Determining Location...";
//   } else if (stream === false && !isPhotoTaken) {
//     buttonText = "Camera Unavailable (Capture Simulated)";
//   } else if (stream && !isPhotoTaken) {
//     buttonText = "Capture Photo";
//   }

//   const buttonAction = isReadyToSubmit ? goToDetails : handleCapture;

//   return (
//     <div
//       style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
//     >
//       {/* Hidden Canvas for capture */}
//       <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

//       {/* Header */}
//       <header
//         style={{
//           padding: "24px",
//           display: "flex",
//           alignItems: "center",
//           boxShadow: AppColors.shadowGeneral,
//           color: AppColors.white,
//           backgroundColor: AppColors.redReport,
//           width: "100%",
//         }}
//       >
//         <button
//           onClick={() => goToScreen(AppView.HOME)}
//           style={{
//             padding: "8px",
//             marginRight: "16px",
//             borderRadius: "50%",
//             backgroundColor: "rgba(255, 255, 255, 0.2)",
//             transition: "background-color 150ms",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           <Icon name="chevron-left" size="24px" color={AppColors.white} />
//         </button>
//         <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
//           New Issue Report
//         </h2>
//       </header>

//       {/* Camera Area / Preview */}
//       <div
//         style={{
//           flexGrow: 1,
//           position: "relative",
//           padding: "24px",
//           backgroundColor: AppColors.grayBackground,
//         }}
//       >
//         <div
//           style={{
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             maxWidth: "640px",
//             margin: "0 auto",
//           }}
//         >
//           {/* Camera Viewport Container */}
//           <div
//             style={{
//               width: "100%",
//               height: "80vh",
//               maxHeight: "500px",
//               backgroundColor: "rgba(0, 0, 0, 0.3)",
//               borderRadius: "16px",
//               boxShadow: AppColors.shadowGeneral,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               border: `4px solid ${AppColors.redReport}`,
//               overflow: "hidden",
//             }}
//           >
//             {/* Conditional rendering for camera/image/fallback */}
//             {capturedImage ? (
//               // SHOW CAPTURED IMAGE
//               <img
//                 src={capturedImage}
//                 alt="Captured Issue"
//                 style={{
//                   height: "100%",
//                   width: "100%",
//                   objectFit: "contain",
//                   borderRadius: "12px",
//                 }}
//               />
//             ) : stream === false ? (
//               // CAMERA FAILED OR DENIED
//               <div
//                 style={{
//                   padding: "16px",
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                   backdropFilter: "blur(3px)",
//                   borderRadius: "12px",
//                   textAlign: "center",
//                 }}
//               >
//                 <Icon name="square" size="80px" color={AppColors.redReport} />
//                 <p
//                   style={{
//                     marginTop: "8px",
//                     fontSize: "18px",
//                     color: AppColors.redReport,
//                   }}
//                 >
//                   Camera Disabled/Blocked
//                 </p>
//                 <p style={{ fontSize: "14px", color: AppColors.grayText }}>
//                   Using simulated mode for capture.
//                 </p>
//               </div>
//             ) : stream === null || isLocationLoading ? (
//               // INITIAL LOADING STATE (Camera and GPS)
//               <div
//                 style={{
//                   padding: "16px",
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                   backdropFilter: "blur(3px)",
//                   borderRadius: "12px",
//                   textAlign: "center",
//                 }}
//               >
//                 <Icon
//                   name="loader-2"
//                   size="80px"
//                   color="rgba(255, 255, 255, 0.7)"
//                   style={{ animation: "spin 1s linear infinite" }}
//                 />
//                 <p
//                   style={{
//                     marginTop: "8px",
//                     fontSize: "18px",
//                     color: "rgba(255, 255, 255, 0.7)",
//                   }}
//                 >
//                   Awaiting Camera and Location...
//                 </p>
//               </div>
//             ) : (
//               // LIVE CAMERA FEED
//               <video
//                 ref={videoRef}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 autoPlay
//                 playsInline
//                 muted
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Capture & Details Area (Bottom Overlay) */}
//       <div
//         style={{
//           backgroundColor: AppColors.white,
//           padding: "24px",
//           boxShadow: AppColors.shadowGeneral,
//           width: "100%",
//         }}
//       >
//         <div style={{ maxWidth: "512px", margin: "0 auto" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginBottom: "16px",
//             }}
//           >
//             <Icon
//               name="locate-fixed"
//               size="16px"
//               color={isLocationLoading ? AppColors.grayText : AppColors.primary}
//               style={{ marginRight: "8px" }}
//             />
//             <p
//               style={{
//                 fontSize: "14px",
//                 color: AppColors.grayText,
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               {isLocationLoading && (
//                 <Icon
//                   name="loader-2"
//                   size="16px"
//                   color={AppColors.grayText}
//                   style={{
//                     animation: "spin 1s linear infinite",
//                     marginRight: "4px",
//                   }}
//                 />
//               )}
//               Location: {currentLocation}
//             </p>
//           </div>

//           <button onClick={buttonAction} style={buttonStyle}>
//             {buttonText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ReportScreen = ({ goToScreen }) => {
//   // Refs for video element, canvas capture, and file input
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null); // Ref for the hidden file input

//   // State for location, photo, and camera stream
//   const [isLocationLoading, setIsLocationLoading] = useState(true);
//   const [stream, setStream] = useState(null); // null: initializing, false: failed, object: active stream
//   const [isPhotoTaken, setIsPhotoTaken] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState(
//     "Determining GPS location..."
//   );
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [capturedPhotoPath, setCapturedPhotoPath] = useState(null);

//   // 1. Camera Initialization and Cleanup
//   useEffect(() => {
//     let activeStream = null;

//     if (
//       !isPhotoTaken &&
//       navigator.mediaDevices &&
//       navigator.mediaDevices.getUserMedia
//     ) {
//       navigator.mediaDevices
//         .getUserMedia({
//           video: {
//             // Prefer environment camera on mobile
//             facingMode: "environment",
//           },
//         })
//         .then((newStream) => {
//           activeStream = newStream;
//           if (videoRef.current) {
//             videoRef.current.srcObject = newStream;
//             // IMPORTANT: Set initial video size dynamically
//             videoRef.current.onloadedmetadata = () => {
//               videoRef.current.play();
//             };
//           }
//           setStream(newStream);
//         })
//         .catch((err) => {
//           console.error(
//             "Could not access the camera (Access Denied/Blocked): ",
//             err
//           );
//           setStream(false); // Signal that real camera failed
//         });
//     } else {
//       // If photo is already taken (e.g. from upload), do not try to start camera
//       if (!isPhotoTaken) {
//         console.error("Browser does not support the MediaDevices API.");
//         setStream(false); // Signal lack of support
//       }
//     }

//     // Cleanup function: stops the camera tracks when the component unmounts
//     return () => {
//       if (activeStream) {
//         activeStream.getTracks().forEach((track) => track.stop());
//       } else if (stream && stream !== false) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [isPhotoTaken]); // Depend on isPhotoTaken to avoid starting camera if upload occurs

//   // 2. Determine Real User Location (Geolocation API)
//   useEffect(() => {
//     if (navigator.geolocation) {
//       const options = {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0,
//       };

//       const success = (pos) => {
//         const coords = pos.coords;
//         setCurrentLocation(
//           `Lat: ${coords.latitude.toFixed(4)}, Lon: ${coords.longitude.toFixed(
//             4
//           )} (GPS)`
//         );
//         setIsLocationLoading(false);
//       };

//       const error = (err) => {
//         let message = "Location access denied or timed out.";
//         if (err.code === err.PERMISSION_DENIED) {
//           message = "Location access denied by user.";
//         } else if (err.code === err.TIMEOUT) {
//           message = "Location request timed out.";
//         }
//         console.error(`Geolocation Error (${err.code}): ${err.message}`);
//         setCurrentLocation(`Location failed: ${message}`);
//         setIsLocationLoading(false);
//       };

//       navigator.geolocation.getCurrentPosition(success, error, options);
//     } else {
//       // Geolocation not supported by the browser
//       setCurrentLocation("Geolocation not supported by your browser.");
//       setIsLocationLoading(false);
//     }
//   }, []);

//   // 3. Photo Capture Logic (from Live Camera)
//   const handleCapture = () => {
//     if (isLocationLoading || isPhotoTaken) return;

//     if (videoRef.current && canvasRef.current && stream) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;

//       // Ensure canvas dimensions match video dimensions for correct capture
//       canvas.width = video.videoWidth || 640;
//       canvas.height = video.videoHeight || 480;

//       const context = canvas.getContext("2d");
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       const photoDataUrl = canvas.toDataURL("image/png");

//       // Store image data and stop the live stream
//       setCapturedImage(photoDataUrl);
//       setCapturedPhotoPath(
//         `Captured Photo @ ${new Date().toLocaleTimeString()}`
//       );
//       setIsPhotoTaken(true);

//       // Stop the camera stream after capture
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     } else if (stream === false) {
//       // Handle fallback simulation if camera access failed
//       setCapturedImage(
//         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23DC2626'/%3E%3Ctext x='50%25' y='50%25' font-size='15' fill='white' text-anchor='middle' dominant-baseline='middle'%3ESimulated Photo%3C/text%3E%3C/svg%3E"
//       ); // Use SVG as placeholder image
//       setCapturedPhotoPath(
//         `Simulated Photo @ ${new Date().toLocaleTimeString()} (Camera Failed)`
//       );
//       setIsPhotoTaken(true);
//     }
//   };

//   // 4. Photo Upload Logic (from File Input)
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (uploadEvent) => {
//         // Stop any active camera stream if the user uploads a photo
//         if (stream) {
//           stream.getTracks().forEach((track) => track.stop());
//           setStream(null);
//         }

//         setCapturedImage(uploadEvent.target.result); // Base64 Data URL
//         setCapturedPhotoPath(`Uploaded File: ${file.name}`);
//         setIsPhotoTaken(true);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Helper to trigger the hidden file input
//   const triggerFileInput = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const goToDetails = () => {
//     if (isPhotoTaken) {
//       goToScreen(AppView.DETAILS, {
//         photoPath: capturedPhotoPath,
//         location: currentLocation,
//         imageData: capturedImage,
//       });
//     }
//   };

//   const isReadyToCapture =
//     !isLocationLoading && !isPhotoTaken && stream !== false;
//   const isReadyToSubmit = !isLocationLoading && isPhotoTaken;

//   const mainButtonStyle = {
//     width: "100%",
//     padding: "16px",
//     fontWeight: "600",
//     borderRadius: "50px",
//     color: AppColors.white,
//     transition: "all 200ms",
//     cursor: "pointer",
//     border: "none",
//     boxShadow: isReadyToSubmit ? AppColors.shadowPrimary : AppColors.shadowRed,
//     backgroundColor: isReadyToSubmit ? AppColors.primary : AppColors.redReport,
//     opacity: isLocationLoading && !isPhotoTaken ? "0.5" : "1",
//     pointerEvents: isLocationLoading && !isPhotoTaken ? "none" : "auto",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     transform: "scale(1)",
//   };

//   const uploadButtonStyle = {
//     width: "100%",
//     padding: "16px",
//     fontWeight: "500",
//     borderRadius: "50px",
//     color: AppColors.primary,
//     backgroundColor: AppColors.white,
//     border: `2px solid ${AppColors.primary}`,
//     cursor: "pointer",
//     boxShadow: AppColors.shadowGeneral,
//     transition: "all 200ms",
//   };

//   let buttonText = "Capture Photo";
//   if (isReadyToSubmit) {
//     buttonText = "Add Details & Submit";
//   } else if (isLocationLoading) {
//     buttonText = "Determining Location...";
//   } else if (stream === false && !isPhotoTaken) {
//     buttonText = "Camera Unavailable (Capture Simulated)";
//   } else if (stream && !isPhotoTaken) {
//     buttonText = "Capture Photo";
//   }

//   const buttonAction = isReadyToSubmit ? goToDetails : handleCapture;
//   const showUploadOption = !isPhotoTaken && !isLocationLoading;

//   return (
//     <div
//       style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
//     >
//       {/* Hidden Canvas for capture & Hidden File Input */}
//       <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleFileUpload}
//         style={{ display: "none" }}
//       />

//       {/* Header */}
//       <header
//         style={{
//           padding: "24px",
//           display: "flex",
//           alignItems: "center",
//           boxShadow: AppColors.shadowGeneral,
//           color: AppColors.white,
//           backgroundColor: AppColors.redReport,
//           width: "100%",
//         }}
//       >
//         <button
//           onClick={() => goToScreen(AppView.HOME)}
//           style={{
//             padding: "8px",
//             marginRight: "16px",
//             borderRadius: "50%",
//             backgroundColor: "rgba(255, 255, 255, 0.2)",
//             transition: "background-color 150ms",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           <Icon name="chevron-left" size="24px" color={AppColors.white} />
//         </button>
//         <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
//           New Issue Report
//         </h2>
//       </header>

//       {/* Camera Area / Preview */}
//       <div
//         style={{
//           flexGrow: 1,
//           position: "relative",
//           padding: "24px",
//           backgroundColor: AppColors.grayBackground,
//         }}
//       >
//         <div
//           style={{
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             maxWidth: "640px",
//             margin: "0 auto",
//           }}
//         >
//           {/* Camera Viewport Container */}
//           <div
//             style={{
//               width: "100%",
//               height: "80vh",
//               maxHeight: "500px",
//               backgroundColor: "rgba(0, 0, 0, 0.3)",
//               borderRadius: "16px",
//               boxShadow: AppColors.shadowGeneral,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               border: `4px solid ${AppColors.redReport}`,
//               overflow: "hidden",
//             }}
//           >
//             {/* Conditional rendering for camera/image/fallback */}
//             {capturedImage ? (
//               // SHOW CAPTURED IMAGE
//               <img
//                 src={capturedImage}
//                 alt="Captured Issue"
//                 style={{
//                   height: "100%",
//                   width: "100%",
//                   objectFit: "contain",
//                   borderRadius: "12px",
//                 }}
//               />
//             ) : stream === false ? (
//               // CAMERA FAILED OR DENIED
//               <div
//                 style={{
//                   padding: "16px",
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                   backdropFilter: "blur(3px)",
//                   borderRadius: "12px",
//                   textAlign: "center",
//                 }}
//               >
//                 <Icon name="square" size="80px" color={AppColors.redReport} />
//                 <p
//                   style={{
//                     marginTop: "8px",
//                     fontSize: "18px",
//                     color: AppColors.redReport,
//                   }}
//                 >
//                   Camera Disabled/Blocked
//                 </p>
//                 <p style={{ fontSize: "14px", color: AppColors.grayText }}>
//                   Please use the "Upload Photo" option below.
//                 </p>
//               </div>
//             ) : stream === null || isLocationLoading ? (
//               // INITIAL LOADING STATE (Camera and GPS)
//               <div
//                 style={{
//                   padding: "16px",
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                   backdropFilter: "blur(3px)",
//                   borderRadius: "12px",
//                   textAlign: "center",
//                 }}
//               >
//                 <Icon
//                   name="loader-2"
//                   size="80px"
//                   color="rgba(255, 255, 255, 0.7)"
//                   style={{ animation: "spin 1s linear infinite" }}
//                 />
//                 <p
//                   style={{
//                     marginTop: "8px",
//                     fontSize: "18px",
//                     color: "rgba(255, 255, 255, 0.7)",
//                   }}
//                 >
//                   Awaiting Camera and Location...
//                 </p>
//               </div>
//             ) : (
//               // LIVE CAMERA FEED
//               <video
//                 ref={videoRef}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 autoPlay
//                 playsInline
//                 muted
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Capture & Details Area (Bottom Overlay) */}
//       <div
//         style={{
//           backgroundColor: AppColors.white,
//           padding: "24px",
//           boxShadow: AppColors.shadowGeneral,
//           width: "100%",
//         }}
//       >
//         <div style={{ maxWidth: "512px", margin: "0 auto" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginBottom: "16px",
//             }}
//           >
//             <Icon
//               name="locate-fixed"
//               size="16px"
//               color={isLocationLoading ? AppColors.grayText : AppColors.primary}
//               style={{ marginRight: "8px" }}
//             />
//             <p
//               style={{
//                 fontSize: "14px",
//                 color: AppColors.grayText,
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               {isLocationLoading && (
//                 <Icon
//                   name="loader-2"
//                   size="16px"
//                   color={AppColors.grayText}
//                   style={{
//                     animation: "spin 1s linear infinite",
//                     marginRight: "4px",
//                   }}
//                 />
//               )}
//               Location: {currentLocation}
//             </p>
//           </div>

//           {/* Main Action Button */}
//           <button onClick={buttonAction} style={mainButtonStyle}>
//             {buttonText}
//           </button>

//           {/* Upload Option (Only visible when no photo is taken and location is done) */}
//           {showUploadOption && (
//             <div style={{ marginTop: "12px" }}>
//               <p
//                 style={{
//                   textAlign: "center",
//                   color: AppColors.grayText,
//                   fontSize: "12px",
//                   marginBottom: "8px",
//                 }}
//               >
//                 — OR —
//               </p>
//               <button onClick={triggerFileInput} style={uploadButtonStyle}>
//                 <Icon
//                   name="image"
//                   size="16px"
//                   color={AppColors.primary}
//                   style={{ marginRight: "8px" }}
//                 />
//                 Upload Photo from Device
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const ReportScreen = ({ goToScreen }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null);

//   const [isLocationLoading, setIsLocationLoading] = useState(true);
//   const [stream, setStream] = useState(null);
//   const [isPhotoTaken, setIsPhotoTaken] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState(
//     "Determining GPS location..."
//   );
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [capturedPhotoPath, setCapturedPhotoPath] = useState(null);

//   // 1. Camera Initialization and Cleanup
//   useEffect(() => {
//     let activeStream = null;
//     if (isPhotoTaken || capturedImage) return;

//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices
//         .getUserMedia({ video: { facingMode: "environment" } })
//         .then((newStream) => {
//           activeStream = newStream;
//           if (videoRef.current) {
//             videoRef.current.srcObject = newStream;
//             videoRef.current.onloadedmetadata = () => videoRef.current.play();
//           }
//           setStream(newStream);
//         })
//         .catch(() => {
//           setStream(false);
//         });
//     } else {
//       setStream(false);
//     }

//     return () => {
//       if (activeStream) {
//         activeStream.getTracks().forEach((track) => track.stop());
//       } else if (stream && stream !== false) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [isPhotoTaken, capturedImage]);

//   // 2. Determine Real User Location (Geolocation API)
//   useEffect(() => {
//     if (navigator.geolocation) {
//       const options = {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0,
//       };
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const coords = pos.coords;
//           setCurrentLocation(
//             `Lat: ${coords.latitude.toFixed(
//               4
//             )}, Lon: ${coords.longitude.toFixed(4)} (GPS)`
//           );
//           setIsLocationLoading(false);
//         },
//         (err) => {
//           let message =
//             err.code === err.PERMISSION_DENIED
//               ? "Location access denied."
//               : "Location failed.";
//           setCurrentLocation(message);
//           setIsLocationLoading(false);
//         },
//         options
//       );
//     } else {
//       setCurrentLocation("Geolocation not supported.");
//       setIsLocationLoading(false);
//     }
//   }, []);

//   // 3. Photo Capture Logic (from Live Camera)
//   const handleCapture = () => {
//     if (isLocationLoading || isPhotoTaken) return;

//     if (videoRef.current && canvasRef.current && stream) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;

//       canvas.width = video.videoWidth || 640;
//       canvas.height = video.videoHeight || 480;

//       const context = canvas.getContext("2d");
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       const photoDataUrl = canvas.toDataURL("image/png");

//       setCapturedImage(photoDataUrl);
//       setCapturedPhotoPath(
//         `Captured Photo @ ${new Date().toLocaleTimeString()}`
//       );
//       setIsPhotoTaken(true);

//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     } else if (stream === false) {
//       // Fallback simulation for failed camera
//       setCapturedImage(
//         "data:image/svg+xml;charset=UTF-8,%3Csvg%20width='200'%20height='200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Crect%20width='200'%20height='200'%20fill='%23DC2626'/%3E%3Ctext%20x='50%25'%20y='50%25'%20font-size='20'%20fill='white'%20text-anchor='middle'%20dominant-baseline='middle'%3ESimulated%20Photo%3C/text%3E%3C/svg%3E"
//       );
//       setCapturedPhotoPath(
//         `Simulated Photo @ ${new Date().toLocaleTimeString()} (Camera Failed)`
//       );
//       setIsPhotoTaken(true);
//     }
//   };

//   // 4. Photo Upload Logic (from File Input)
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (uploadEvent) => {
//         if (stream) {
//           stream.getTracks().forEach((track) => track.stop());
//           setStream(null);
//         }
//         setCapturedImage(uploadEvent.target.result);
//         setCapturedPhotoPath(`Uploaded File: ${file.name}`);
//         setIsPhotoTaken(true);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const triggerFileInput = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const goToDetails = () => {
//     if (isPhotoTaken) {
//       goToScreen(AppView.DETAILS, {
//         photoPath: capturedPhotoPath,
//         location: currentLocation,
//         imageData: capturedImage,
//       });
//     }
//   };

//   const isReadyToSubmit = !isLocationLoading && isPhotoTaken;
//   const isReadyToCapture =
//     !isLocationLoading && !isPhotoTaken && stream !== false;

//   const getButtonText = () => {
//     if (isReadyToSubmit) return "Add Details & Submit";
//     if (isLocationLoading) return "Determining Location...";
//     if (stream === false && !isPhotoTaken)
//       return "Camera Unavailable (Simulated)";
//     return "Capture Photo";
//   };

//   const buttonAction = isReadyToSubmit ? goToDetails : handleCapture;
//   const showUploadOption = !isPhotoTaken && !isLocationLoading;

//   // --- Rendering States for Camera Viewport ---
//   const renderCameraStateUI = () => {
//     if (capturedImage) {
//       return (
//         <img
//           id="captured-image-preview"
//           style={{ width: "100%", height: "100%", objectFit: "contain" }}
//           src={capturedImage}
//           alt="Captured issue photo"
//         />
//       );
//     }

//     if (
//       stream === false ||
//       !navigator.mediaDevices ||
//       !navigator.mediaDevices.getUserMedia
//     ) {
//       return (
//         <div style={{ padding: "16px", textAlign: "center" }}>
//           <Icon
//             name="square"
//             size="80px"
//             color={AppColors.red600}
//             style={{ display: "block", margin: "0 auto 16px" }}
//           />
//           <p style={{ fontSize: "18px", color: AppColors.red600 }}>
//             Camera Disabled/Blocked
//           </p>
//           <p
//             style={{
//               fontSize: "14px",
//               color: AppColors.gray600,
//               marginTop: "8px",
//             }}
//           >
//             Use the "Upload Photo" option below.
//           </p>
//         </div>
//       );
//     }

//     if (stream === null || isLocationLoading) {
//       return (
//         <div style={{ padding: "16px", textAlign: "center" }}>
//           <Icon
//             name="loader-2"
//             size="80px"
//             color="rgba(255, 255, 255, 0.7)"
//             style={{
//               animation: "spin 1s linear infinite",
//               display: "block",
//               margin: "0 auto 16px",
//             }}
//           />
//           <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.7)" }}>
//             Awaiting Camera and Location...
//           </p>
//         </div>
//       );
//     }

//     // Live stream is ready
//     return (
//       <video
//         ref={videoRef}
//         id="camera-video"
//         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//         autoPlay
//         playsInline
//         muted
//       />
//     );
//   };

//   const mainButtonStyle = {
//     width: "100%",
//     padding: "16px",
//     fontWeight: "600",
//     borderRadius: "50px",
//     color: AppColors.white,
//     transition: "all 200ms",
//     border: "none",
//     boxShadow: isReadyToSubmit ? AppColors.shadowPrimary : AppColors.shadowRed,
//     backgroundColor: isReadyToSubmit ? AppColors.primary : AppColors.red600,
//     opacity: isLocationLoading && !isPhotoTaken ? 0.5 : 1,
//     pointerEvents: isLocationLoading && !isPhotoTaken ? "none" : "auto",
//     cursor: "pointer",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   };
//   const uploadButtonStyle = {
//     width: "100%",
//     padding: "16px",
//     fontWeight: "500",
//     borderRadius: "50px",
//     color: AppColors.primary,
//     backgroundColor: AppColors.white,
//     border: `2px solid ${AppColors.primary}`,
//     cursor: "pointer",
//     boxShadow: AppColors.shadowGeneral,
//     transition: "all 200ms",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Hidden Canvas for capture & Hidden File Input */}
//       <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleFileUpload}
//         style={{ display: "none" }}
//       />

//       <Header
//         title="New Issue Report"
//         bgColor={AppColors.red600}
//         showBackButton={true}
//         onBack={() => goToScreen(AppView.HOME)}
//       />

//       {/* Main Content: Camera/Preview Area */}
//       <div
//         style={{
//           flexGrow: 1,
//           padding: "24px",
//           backgroundColor: AppColors.gray100,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <div
//           style={{
//             width: "100%",
//             height: "100%",
//             maxWidth: "640px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {/* Camera Viewport / Image Preview */}
//           <div
//             style={{
//               position: "relative",
//               width: "100%",
//               height: "100%",
//               flexGrow: 1,
//               maxHeight: "500px",
//               backgroundColor: "black",
//               borderRadius: "16px",
//               boxShadow: AppColors.shadowGeneral,
//               border: `4px solid ${
//                 capturedImage ? AppColors.primary : AppColors.red600
//               }`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               overflow: "hidden",
//             }}
//           >
//             {renderCameraStateUI()}
//           </div>
//         </div>
//       </div>

//       {/* Footer: Controls and Location Status */}
//       <footer
//         style={{
//           backgroundColor: AppColors.white,
//           padding: "24px",
//           boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
//           width: "100%",
//         }}
//       >
//         <div style={{ maxWidth: "448px", margin: "0 auto" }}>
//           {/* Location Status */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginBottom: "16px",
//               fontSize: "14px",
//               color: AppColors.gray500,
//             }}
//           >
//             <Icon
//               name="locate-fixed"
//               size="16px"
//               color={isLocationLoading ? AppColors.gray500 : AppColors.primary}
//               style={{ marginRight: "8px" }}
//             />
//             <span id="location-status">{currentLocation}</span>
//           </div>

//           {/* Action Buttons */}
//           <div
//             style={{ display: "flex", flexDirection: "column", gap: "12px" }}
//           >
//             <button onClick={buttonAction} style={mainButtonStyle}>
//               <Icon
//                 name={isReadyToSubmit ? "send" : "camera"}
//                 size="20px"
//                 color={AppColors.white}
//                 style={{ marginRight: "8px" }}
//               />
//               {getButtonText()}
//             </button>

//             {/* Upload Option */}
//             {showUploadOption && (
//               <>
//                 <p
//                   style={{
//                     textAlign: "center",
//                     color: AppColors.gray500,
//                     fontSize: "12px",
//                     margin: "8px 0",
//                   }}
//                 >
//                   — OR —
//                 </p>
//                 <button onClick={triggerFileInput} style={uploadButtonStyle}>
//                   <Icon
//                     name="image"
//                     size="20px"
//                     color={AppColors.primary}
//                     style={{ marginRight: "8px" }}
//                   />
//                   Upload Photo from Device
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// const ReportScreen = ({ goToScreen }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null);

//   const [isLocationLoading, setIsLocationLoading] = useState(true);
//   const [stream, setStream] = useState(null);
//   const [isPhotoTaken, setIsPhotoTaken] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState(
//     "Determining GPS location..."
//   );
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [capturedPhotoPath, setCapturedPhotoPath] = useState(null);

//   // 1. Camera Initialization and Cleanup
//   useEffect(() => {
//     let activeStream = null;
//     if (isPhotoTaken || capturedImage) return;

//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices
//         .getUserMedia({ video: { facingMode: "environment" } })
//         .then((newStream) => {
//           activeStream = newStream;
//           if (videoRef.current) {
//             videoRef.current.srcObject = newStream;
//             videoRef.current.onloadedmetadata = () => videoRef.current.play();
//           }
//           setStream(newStream);
//         })
//         .catch(() => {
//           setStream(false);
//         });
//     } else {
//       setStream(false);
//     }

//     return () => {
//       if (activeStream) {
//         activeStream.getTracks().forEach((track) => track.stop());
//       } else if (stream && stream !== false) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [isPhotoTaken, capturedImage]);

//   // 2. Determine Real User Location (Geolocation API)
//   useEffect(() => {
//     if (navigator.geolocation) {
//       const options = {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0,
//       };
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const coords = pos.coords;
//           setCurrentLocation(
//             `Lat: ${coords.latitude.toFixed(
//               4
//             )}, Lon: ${coords.longitude.toFixed(4)} (GPS)`
//           );
//           setIsLocationLoading(false);
//         },
//         (err) => {
//           let message =
//             err.code === err.PERMISSION_DENIED
//               ? "Location access denied."
//               : "Location failed.";
//           setCurrentLocation(message);
//           setIsLocationLoading(false);
//         },
//         options
//       );
//     } else {
//       setCurrentLocation("Geolocation not supported.");
//       setIsLocationLoading(false);
//     }
//   }, []);

//   // 3. Photo Capture Logic (from Live Camera)
//   const handleCapture = () => {
//     if (isLocationLoading || isPhotoTaken) return;

//     if (videoRef.current && canvasRef.current && stream) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;

//       canvas.width = video.videoWidth || 640;
//       canvas.height = video.videoHeight || 480;

//       const context = canvas.getContext("2d");
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       const photoDataUrl = canvas.toDataURL("image/png");

//       setCapturedImage(photoDataUrl);
//       setCapturedPhotoPath(
//         `Captured Photo @ ${new Date().toLocaleTimeString()}`
//       );
//       setIsPhotoTaken(true);

//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     } else if (stream === false) {
//       // Fallback simulation for failed camera
//       setCapturedImage(
//         "data:image/svg+xml;charset=UTF-8,%3Csvg%20width='200'%20height='200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Crect%20width='200'%20height='200'%20fill='%23DC2626'/%3E%3Ctext%20x='50%25'%20y='50%25'%20font-size='20'%20fill='white'%20text-anchor='middle'%20dominant-baseline='middle'%3ESimulated%20Photo%3C/text%3E%3C/svg%3E"
//       );
//       setCapturedPhotoPath(
//         `Simulated Photo @ ${new Date().toLocaleTimeString()} (Camera Failed)`
//       );
//       setIsPhotoTaken(true);
//     }
//   };

//   // 4. Photo Upload Logic (from File Input)
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (uploadEvent) => {
//         if (stream) {
//           stream.getTracks().forEach((track) => track.stop());
//           setStream(null);
//         }
//         setCapturedImage(uploadEvent.target.result);
//         setCapturedPhotoPath(`Uploaded File: ${file.name}`);
//         setIsPhotoTaken(true);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const triggerFileInput = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const goToDetails = () => {
//     if (isPhotoTaken) {
//       goToScreen(AppView.DETAILS, {
//         photoPath: capturedPhotoPath,
//         location: currentLocation,
//         imageData: capturedImage,
//       });
//     }
//   };

//   const isReadyToSubmit = !isLocationLoading && isPhotoTaken;
//   const isReadyToCapture =
//     !isLocationLoading && !isPhotoTaken && stream !== false;

//   const getButtonText = () => {
//     if (isReadyToSubmit) return "Add Details & Submit";
//     if (isLocationLoading) return "Determining Location...";
//     if (stream === false && !isPhotoTaken)
//       return "Camera Unavailable (Simulated)";
//     return "Capture Photo";
//   };

//   const buttonAction = isReadyToSubmit ? goToDetails : handleCapture;
//   const showUploadOption = !isPhotoTaken && !isLocationLoading;

//   // --- Rendering States for Camera Viewport ---
//   const renderCameraStateUI = () => {
//     if (capturedImage) {
//       return (
//         <img
//           id="captured-image-preview"
//           style={{ width: "100%", height: "100%", objectFit: "contain" }}
//           src={capturedImage}
//           alt="Captured issue photo"
//         />
//       );
//     }

//     if (
//       stream === false ||
//       !navigator.mediaDevices ||
//       !navigator.mediaDevices.getUserMedia
//     ) {
//       return (
//         <div style={{ padding: "16px", textAlign: "center" }}>
//           <Icon
//             name="square"
//             size="80px"
//             color={AppColors.red600}
//             style={{ display: "block", margin: "0 auto 16px" }}
//           />
//           <p style={{ fontSize: "18px", color: AppColors.red600 }}>
//             Camera Disabled/Blocked
//           </p>
//           <p
//             style={{
//               fontSize: "14px",
//               color: AppColors.gray600,
//               marginTop: "8px",
//             }}
//           >
//             Use the "Upload Photo" option below.
//           </p>
//         </div>
//       );
//     }

//     if (stream === null || isLocationLoading) {
//       return (
//         <div style={{ padding: "16px", textAlign: "center" }}>
//           <Icon
//             name="loader-2"
//             size="80px"
//             color="rgba(255, 255, 255, 0.7)"
//             style={{
//               animation: "spin 1s linear infinite",
//               display: "block",
//               margin: "0 auto 16px",
//             }}
//           />
//           <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.7)" }}>
//             Awaiting Camera and Location...
//           </p>
//         </div>
//       );
//     }

//     // Live stream is ready
//     return (
//       <video
//         ref={videoRef}
//         id="camera-video"
//         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//         autoPlay
//         playsInline
//         muted
//       />
//     );
//   };

//   const mainButtonStyle = {
//     width: "100%",
//     padding: "16px",
//     fontWeight: "600",
//     borderRadius: "50px",
//     color: AppColors.white,
//     transition: "all 200ms",
//     border: "none",
//     boxShadow: isReadyToSubmit ? AppColors.shadowPrimary : AppColors.shadowRed,
//     backgroundColor: isReadyToSubmit ? AppColors.primary : AppColors.red600,
//     opacity: isLocationLoading && !isPhotoTaken ? 0.5 : 1,
//     pointerEvents: isLocationLoading && !isPhotoTaken ? "none" : "auto",
//     cursor: "pointer",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   };
//   const uploadButtonStyle = {
//     width: "100%",
//     padding: "16px",
//     fontWeight: "500",
//     borderRadius: "50px",
//     color: AppColors.primary,
//     backgroundColor: AppColors.white,
//     border: `2px solid ${AppColors.primary}`,
//     cursor: "pointer",
//     boxShadow: AppColors.shadowGeneral,
//     transition: "all 200ms",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Hidden Canvas for capture & Hidden File Input */}
//       <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleFileUpload}
//         style={{ display: "none" }}
//       />

//       <Header
//         title="New Issue Report"
//         bgColor={AppColors.red600}
//         showBackButton={true}
//         onBack={() => goToScreen(AppView.HOME)}
//       />

//       {/* Main Content: Camera/Preview Area */}
//       <div
//         style={{
//           flexGrow: 1,
//           padding: "24px",
//           backgroundColor: AppColors.gray100,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           overflowY: "auto",
//         }}
//       >
//         <div
//           style={{
//             width: "100%",
//             height: "100%",
//             maxWidth: "640px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {/* Camera Viewport / Image Preview */}
//           <div
//             style={{
//               position: "relative",
//               width: "100%",
//               height: "100%",
//               flexGrow: 1,
//               maxHeight: "500px",
//               backgroundColor: "black",
//               borderRadius: "16px",
//               boxShadow: AppColors.shadowGeneral,
//               border: `4px solid ${
//                 capturedImage ? AppColors.primary : AppColors.red600
//               }`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               overflow: "hidden",
//             }}
//           >
//             {renderCameraStateUI()}
//           </div>
//         </div>
//       </div>

//       {/* Footer: Controls and Location Status */}
//       <footer
//         style={{
//           backgroundColor: AppColors.white,
//           padding: "24px",
//           boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
//           width: "100%",
//         }}
//       >
//         <div style={{ maxWidth: "448px", margin: "0 auto" }}>
//           {/* Location Status */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginBottom: "16px",
//               fontSize: "14px",
//               color: AppColors.gray500,
//             }}
//           >
//             <Icon
//               name="locate-fixed"
//               size="16px"
//               color={isLocationLoading ? AppColors.gray500 : AppColors.primary}
//               style={{ marginRight: "8px" }}
//             />
//             <span id="location-status">{currentLocation}</span>
//           </div>

//           {/* Action Buttons */}
//           <div
//             style={{ display: "flex", flexDirection: "column", gap: "12px" }}
//           >
//             <button onClick={buttonAction} style={mainButtonStyle}>
//               <Icon
//                 name={isReadyToSubmit ? "send" : "camera"}
//                 size="20px"
//                 color={AppColors.white}
//                 style={{ marginRight: "8px" }}
//               />
//               {getButtonText()}
//             </button>

//             {/* Upload Option */}
//             {showUploadOption && (
//               <>
//                 <p
//                   style={{
//                     textAlign: "center",
//                     color: AppColors.gray500,
//                     fontSize: "12px",
//                     margin: "8px 0",
//                   }}
//                 >
//                   — OR —
//                 </p>
//                 <button onClick={triggerFileInput} style={uploadButtonStyle}>
//                   <Icon
//                     name="image"
//                     size="20px"
//                     color={AppColors.primary}
//                     style={{ marginRight: "8px" }}
//                   />
//                   Upload Photo from Device
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

const ReportScreen = ({ goToScreen }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const [stream, setStream] = useState(null);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(
    "Determining GPS location..."
  );
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedPhotoPath, setCapturedPhotoPath] = useState(null);

  // 1. Camera Initialization and Cleanup
  useEffect(() => {
    let activeStream = null;
    if (isPhotoTaken || capturedImage) return;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((newStream) => {
          activeStream = newStream;
          if (videoRef.current) {
            videoRef.current.srcObject = newStream;
            videoRef.current.onloadedmetadata = () => videoRef.current.play();
          }
          setStream(newStream);
        })
        .catch(() => {
          setStream(false);
        });
    } else {
      setStream(false);
    }

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      } else if (stream && stream !== false) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isPhotoTaken, capturedImage]);

  // 2. Determine Real User Location (Geolocation API)
  useEffect(() => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = pos.coords;
          setCurrentLocation(
            `Lat: ${coords.latitude.toFixed(
              4
            )}, Lon: ${coords.longitude.toFixed(4)} (GPS)`
          );
          setIsLocationLoading(false);
        },
        (err) => {
          let message =
            err.code === err.PERMISSION_DENIED
              ? "Location access denied."
              : "Location failed.";
          setCurrentLocation(message);
          setIsLocationLoading(false);
        },
        options
      );
    } else {
      setCurrentLocation("Geolocation not supported.");
      setIsLocationLoading(false);
    }
  }, []);

  // 3. Photo Capture Logic (from Live Camera)
  const handleCapture = () => {
    if (isLocationLoading || isPhotoTaken) return;

    if (videoRef.current && canvasRef.current && stream) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const photoDataUrl = canvas.toDataURL("image/png");

      setCapturedImage(photoDataUrl);
      setCapturedPhotoPath(
        `Captured Photo @ ${new Date().toLocaleTimeString()}`
      );
      setIsPhotoTaken(true);

      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    } else if (stream === false) {
      // Fallback simulation for failed camera
      setCapturedImage(
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20width='200'%20height='200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Crect%20width='200'%20height='200'%20fill='%23DC2626'/%3E%3Ctext%20x='50%25'%20y='50%25'%20font-size='20'%20fill='white'%20text-anchor='middle'%20dominant-baseline='middle'%3ESimulated%20Photo%3C/text%3E%3C/svg%3E"
      );
      setCapturedPhotoPath(
        `Simulated Photo @ ${new Date().toLocaleTimeString()} (Camera Failed)`
      );
      setIsPhotoTaken(true);
    }
  };

  // 4. Photo Upload Logic (from File Input)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
          setStream(null);
        }
        setCapturedImage(uploadEvent.target.result);
        setCapturedPhotoPath(`Uploaded File: ${file.name}`);
        setIsPhotoTaken(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const goToDetails = () => {
    if (isPhotoTaken) {
      goToScreen(AppView.DETAILS, {
        photoPath: capturedPhotoPath,
        location: currentLocation,
        imageData: capturedImage,
      });
    }
  };

  const isReadyToSubmit = !isLocationLoading && isPhotoTaken;
  const isReadyToCapture =
    !isLocationLoading && !isPhotoTaken && stream !== false;

  const getButtonText = () => {
    if (isReadyToSubmit) return "Add Details & Submit";
    if (isLocationLoading) return "Determining Location...";
    if (stream === false && !isPhotoTaken)
      return "Camera Unavailable (Simulated)";
    return "Capture Photo";
  };

  const buttonAction = isReadyToSubmit ? goToDetails : handleCapture;
  const showUploadOption = !isPhotoTaken && !isLocationLoading;

  // --- Rendering States for Camera Viewport ---
  const renderCameraStateUI = () => {
    if (capturedImage) {
      return (
        <img
          id="captured-image-preview"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src={capturedImage}
          alt="Captured issue photo"
        />
      );
    }

    if (
      stream === false ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      return (
        <div style={{ padding: "16px", textAlign: "center" }}>
          <Icon
            name="square"
            size="80px"
            color={AppColors.red600}
            style={{ display: "block", margin: "0 auto 16px" }}
          />
          <p style={{ fontSize: "18px", color: AppColors.red600 }}>
            Camera Disabled/Blocked
          </p>
          <p
            style={{
              fontSize: "14px",
              color: AppColors.gray600,
              marginTop: "8px",
            }}
          >
            Use the "Upload Photo" option below.
          </p>
        </div>
      );
    }

    if (stream === null || isLocationLoading) {
      return (
        <div style={{ padding: "16px", textAlign: "center" }}>
          <Icon
            name="loader-2"
            size="80px"
            color="rgba(255, 255, 255, 0.7)"
            style={{
              animation: "spin 1s linear infinite",
              display: "block",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.7)" }}>
            Awaiting Camera and Location...
          </p>
        </div>
      );
    }

    // Live stream is ready
    return (
      <video
        ref={videoRef}
        id="camera-video"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        autoPlay
        playsInline
        muted
      />
    );
  };

  const mainButtonStyle = {
    width: "100%",
    padding: "16px",
    fontWeight: "600",
    borderRadius: "50px",
    color: AppColors.white,
    transition: "all 200ms",
    border: "none",
    boxShadow: isReadyToSubmit ? AppColors.shadowPrimary : AppColors.shadowRed,
    backgroundColor: isReadyToSubmit ? AppColors.primary : AppColors.red600,
    opacity: isLocationLoading && !isPhotoTaken ? 0.5 : 1,
    pointerEvents: isLocationLoading && !isPhotoTaken ? "none" : "auto",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const uploadButtonStyle = {
    width: "100%",
    padding: "16px",
    fontWeight: "500",
    borderRadius: "50px",
    color: AppColors.primary,
    backgroundColor: AppColors.white,
    border: `2px solid ${AppColors.primary}`,
    cursor: "pointer",
    boxShadow: AppColors.shadowGeneral,
    transition: "all 200ms",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Hidden Canvas for capture & Hidden File Input */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />

      <Header
        title="New Issue Report"
        bgColor={AppColors.red600}
        showBackButton={true}
        onBack={() => goToScreen(AppView.HOME)}
      />

      {/* Main Content: Camera/Preview Area */}
      <div
        style={{
          flexGrow: 1,
          padding: "24px",
          backgroundColor: AppColors.gray100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "640px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Camera Viewport / Image Preview */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              flexGrow: 1,
              maxHeight: "500px",
              backgroundColor: "black",
              borderRadius: "16px",
              boxShadow: AppColors.shadowGeneral,
              border: `4px solid ${
                capturedImage ? AppColors.primary : AppColors.red600
              }`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {renderCameraStateUI()}
          </div>
        </div>
      </div>

      {/* Footer: Controls and Location Status */}
      <footer
        style={{
          backgroundColor: AppColors.white,
          padding: "24px",
          boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "448px", margin: "0 auto" }}>
          {/* Location Status */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "16px",
              fontSize: "14px",
              color: AppColors.gray500,
            }}
          >
            <Icon
              name="locate-fixed"
              size="16px"
              color={isLocationLoading ? AppColors.gray500 : AppColors.primary}
              style={{ marginRight: "8px" }}
            />
            <span id="location-status">{currentLocation}</span>
          </div>

          {/* Action Buttons */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <button onClick={buttonAction} style={mainButtonStyle}>
              <Icon
                name={isReadyToSubmit ? "send" : "camera"}
                size="20px"
                color={AppColors.white}
                style={{ marginRight: "8px" }}
              />
              {getButtonText()}
            </button>

            {/* Upload Option */}
            {showUploadOption && (
              <>
                <p
                  style={{
                    textAlign: "center",
                    color: AppColors.gray500,
                    fontSize: "12px",
                    margin: "8px 0",
                  }}
                >
                  — OR —
                </p>
                <button onClick={triggerFileInput} style={uploadButtonStyle}>
                  <Icon
                    name="image"
                    size="20px"
                    color={AppColors.primary}
                    style={{ marginRight: "8px" }}
                  />
                  Upload Photo from Device
                </button>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};
export default ReportScreen;
