import { useState } from "react";
import AppColors from "../theme/appColors";
import AppView from "../routes/paths";
import Icon from "../components/icons";
import Header from "../components/header";

// const DetailsScreen = ({ goToScreen, routeProps }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [issueType, setIssueType] = useState('');
//   const [description, setDescription] = useState('');

//   const locationInfo = routeProps?.location || "Location not passed.";

//   const issueTypes = [
//     'Pothole', 'Broken Street Light', 'Graffiti/Vandalism', 'Missing Signage', 'Other Road Hazard'
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!issueType || !description) return; // Simple validation

//     setIsSubmitting(true);

//     // -------------------------------------------------------------------------
//     // REAL WORLD: API Call Simulation
//     // -------------------------------------------------------------------------

//     await new Promise(resolve => setTimeout(resolve, 3000));
//     setIsSubmitting(false);

//     // Simulate success message (in real React, this would be a toast library call)
//     console.log('Report submitted!');

//     // Navigate back to /home path
//     goToScreen(AppView.HOME);
//   };

//   const formInputStyle = `w-full p-3 ${AppColors.inputBorder} rounded-xl transition duration-150`;

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       {/* Header */}
//       <header className={`p-6 flex items-center shadow-md text-white ${AppColors.redReport.replace('hover:bg-red-700', '')} w-full`}>
//         <button onClick={() => goToScreen(AppView.REPORT)} className="p-2 mr-4 rounded-full hover:bg-white/20 transition duration-150">
//           <Icon name="chevron-left" className="w-6 h-6 text-white" />
//         </button>
//         <h2 className="text-xl font-bold">Report Issue Details</h2>
//       </header>

//       {/* Main Content: Form - Centered on desktop */}
//       <main className="flex-grow p-6 overflow-y-auto flex justify-center">
//         <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
//             <form onSubmit={handleSubmit}>
//               {/* Status Info Card */}
//               <div className={`${AppColors.redReportBackground} p-4 rounded-xl border border-red-200 mb-6 flex items-center`}>
//                 <Icon name="check-circle" className="w-6 h-6 mr-3 text-green-600" />
//                 <div className='flex flex-col'>
//                     <p className="font-bold text-red-600">Photo Captured</p>
//                     <p className="text-xs text-gray-500">Location: {locationInfo}</p>
//                 </div>
//               </div>

//               {/* 1. Issue Type Dropdown */}
//               <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
//               <select
//                 value={issueType}
//                 onChange={(e) => setIssueType(e.target.value)}
//                 className={`${formInputStyle} h-[46px] appearance-none`}
//                 required
//               >
//                 <option value="" disabled>Select the main type of issue</option>
//                 {issueTypes.map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//               <div className="h-4"></div>

//               {/* 2. Detailed Description */}
//               <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
//               <textarea
//                 rows="5"
//                 placeholder="Describe the issue (size, severity, location context)"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className={`${formInputStyle} resize-none`}
//                 required
//               />
//               <div className="h-8"></div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full p-4 font-semibold rounded-xl text-white ${AppColors.primary} transition duration-200 shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 {isSubmitting ? (
//                   <span className='flex items-center justify-center'>
//                     <Icon name="loader-2" className="w-5 h-5 animate-spin mr-2" />
//                     Submitting...
//                   </span>
//                 ) : (
//                   <span className='flex items-center justify-center'>
//                     <Icon name="send" className="w-5 h-5 mr-2" />
//                     Submit Report
//                   </span>
//                 )}
//               </button>
//             </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// const DetailsScreen = ({ goToScreen, routeProps }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [issueType, setIssueType] = useState("");
//   const [description, setDescription] = useState("");

//   const locationInfo = routeProps?.location || "Location not passed.";

//   const issueTypes = [
//     "Pothole",
//     "Broken Street Light",
//     "Graffiti/Vandalism",
//     "Missing Signage",
//     "Other Road Hazard",
//   ];

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!issueType || !description) return;

//   //   setIsSubmitting(true);

//   //   // API Call Simulation
//   //   await new Promise((resolve) => setTimeout(resolve, 3000));
//   //   setIsSubmitting(false);

//   //   console.log("Report submitted!");

//   //   goToScreen(AppView.HOME);
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!issueType || !description) return;

//   //   setIsSubmitting(true);

//   //   try {
//   //     // 1. Get Upload URL from API Gateway
//   //     const response = await fetch(
//   //       "https://goeafzb84a.execute-api.us-west-2.amazonaws.com/dev/generate-Upload-Url",
//   //       {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify({ mimeType: "image/jpeg" }),
//   //       }
//   //     );

//   //     if (!response.ok) throw new Error("Failed to generate upload URL");
//   //     const { uploadUrl } = await response.json();

//   //     // 2. Convert captured image (base64) to Blob
//   //     const base64Data = routeProps?.imageData.replace(
//   //       /^data:image\/\w+;base64,/,
//   //       ""
//   //     );
//   //     const byteCharacters = atob(base64Data);
//   //     const byteNumbers = new Array(byteCharacters.length);
//   //     for (let i = 0; i < byteCharacters.length; i++) {
//   //       byteNumbers[i] = byteCharacters.charCodeAt(i);
//   //     }
//   //     const byteArray = new Uint8Array(byteNumbers);
//   //     const blob = new Blob([byteArray], { type: "image/jpeg" });

//   //     // 3. Upload photo to presigned URL
//   //     const uploadResponse = await fetch(uploadUrl, {
//   //       method: "PUT",
//   //       headers: { "Content-Type": "image/jpeg" },
//   //       body: blob,
//   //     });
//   //     if (!uploadResponse.ok) throw new Error("Upload failed!");

//   //     console.log("")
//   //     console.log("✅ Photo uploaded successfully!");

//   //     // (Optional) Call another API to analyze photo
//   //     // const analysisResponse = await fetch("https://...", { method: "POST", body: JSON.stringify({ fileKey }) });

//   //     alert("Report submitted & photo uploaded!");
//   //     goToScreen(AppView.HOME);
//   //   } catch (err) {
//   //     console.error("Error submitting report:", err);
//   //     alert("❌ Failed to submit report. Please try again.");
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!issueType || !description) {
//       alert("Please fill all required fields.");
//       return;
//     }
//     if (!routeProps?.imageData) {
//       alert("No photo captured!");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // 1. Get presigned URL
//       const response = await fetch(
//         "https://goeafzb84a.execute-api.us-west-2.amazonaws.com/dev/generate-Upload-Url",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ mimeType: "image/jpeg" }),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to generate upload URL");
//       const { uploadUrl, fileUrl } = await response.json();
//       console.log("Presigned URL:", uploadUrl);
//       console.log("File will be at:", fileUrl);

//       // 2. Convert base64 to Blob
//       const base64Data = routeProps.imageData.replace(
//         /^data:image\/\w+;base64,/,
//         ""
//       );
//       const byteCharacters = atob(base64Data);
//       const byteNumbers = new Array(byteCharacters.length);
//       for (let i = 0; i < byteCharacters.length; i++) {
//         byteNumbers[i] = byteCharacters.charCodeAt(i);
//       }
//       const byteArray = new Uint8Array(byteNumbers);
//       const blob = new Blob([byteArray], { type: "image/jpeg" });

//       // 3. Upload to S3
//       const uploadResponse = await fetch(uploadUrl, {
//         method: "PUT",
//         headers: { "Content-Type": "image/jpeg" },
//         body: blob,
//       });

//       if (!uploadResponse.ok) {
//         console.error(
//           "Upload failed:",
//           uploadResponse.status,
//           uploadResponse.statusText
//         );
//         throw new Error("Upload failed!");
//       }

//       console.log("✅ Photo uploaded successfully to:", fileUrl);

//       // 4. (Optional) Send metadata to your backend
//       // await fetch("/save-report", { method: "POST", body: JSON.stringify({ issueType, description, photoUrl: fileUrl }) });

//       alert("Report submitted & photo uploaded!");
//       goToScreen(AppView.HOME);
//     } catch (err) {
//       console.error("Error submitting report:", err);
//       alert("❌ Failed to submit report. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const formInputStyle = {
//     width: "100%",
//     padding: "12px",
//     border: `1px solid ${AppColors.inputBorder}`,
//     borderRadius: "12px",
//     transition: "all 150ms",
//     boxSizing: "border-box",
//     resize: "vertical",
//     boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
//   };

//   const submitButtonStyle = {
//     width: "100%",
//     padding: "16px",
//     fontWeight: "600",
//     borderRadius: "12px",
//     color: AppColors.white,
//     backgroundColor: AppColors.primary,
//     transition: "all 200ms",
//     cursor: "pointer",
//     border: "none",
//     boxShadow: AppColors.shadowPrimary,
//     opacity: isSubmitting ? "0.5" : "1",
//     pointerEvents: isSubmitting ? "none" : "auto",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: AppColors.grayBackground,
//       }}
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
//           onClick={() => goToScreen(AppView.REPORT)}
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
//           Report Issue Details
//         </h2>
//       </header>

//       {/* Main Content: Form - Centered on desktop */}
//       <main
//         style={{
//           flexGrow: 1,
//           padding: "24px",
//           overflowY: "auto",
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <div
//           style={{
//             width: "100%",
//             maxWidth: "640px",
//             backgroundColor: AppColors.white,
//             padding: "32px",
//             borderRadius: "12px",
//             boxShadow: AppColors.shadowGeneral,
//           }}
//         >
//           <form onSubmit={handleSubmit}>
//             {/* Status Info Card */}
//             <div
//               style={{
//                 backgroundColor: AppColors.redReportBackground,
//                 padding: "16px",
//                 borderRadius: "12px",
//                 border: `1px solid #FCA5A5`,
//                 marginBottom: "24px",
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <Icon
//                 name="check-circle"
//                 size="24px"
//                 color="#10B981"
//                 style={{ marginRight: "12px" }}
//               />
//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <p style={{ fontWeight: "bold", color: AppColors.redReport }}>
//                   Photo Captured
//                 </p>
//                 <p style={{ fontSize: "12px", color: AppColors.grayText }}>
//                   Location: {locationInfo}
//                 </p>
//               </div>
//             </div>

//             {/* 1. Issue Type Dropdown */}
//             <label
//               style={{
//                 display: "block",
//                 fontSize: "14px",
//                 fontWeight: "500",
//                 color: "#374151",
//                 marginBottom: "4px",
//               }}
//             >
//               Issue Type
//             </label>
//             <select
//               value={issueType}
//               onChange={(e) => setIssueType(e.target.value)}
//               style={{
//                 ...formInputStyle,
//                 height: "46px",
//                 appearance: "none",
//                 marginBottom: "16px",
//               }}
//               required
//             >
//               <option value="" disabled>
//                 Select the main type of issue
//               </option>
//               {issueTypes.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>

//             {/* 2. Detailed Description */}
//             <label
//               style={{
//                 display: "block",
//                 fontSize: "14px",
//                 fontWeight: "500",
//                 color: "#374151",
//                 marginBottom: "4px",
//               }}
//             >
//               Detailed Description
//             </label>
//             <textarea
//               rows="5"
//               placeholder="Describe the issue (size, severity, location context)"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               style={{ ...formInputStyle, marginBottom: "32px" }}
//               required
//             />

//             {/* Submit Button */}
//             <button type="submit" style={submitButtonStyle}>
//               {isSubmitting ? (
//                 <span
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Icon
//                     name="loader-2"
//                     size="20px"
//                     color={AppColors.white}
//                     style={{
//                       animation: "spin 1s linear infinite",
//                       marginRight: "8px",
//                     }}
//                   />
//                   Submitting...
//                 </span>
//               ) : (
//                 <span
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Icon
//                     name="send"
//                     size="20px"
//                     color={AppColors.white}
//                     style={{ marginRight: "8px" }}
//                   />
//                   Submit Report
//                 </span>
//               )}
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// const DetailsScreen = ({ goToScreen, routeProps }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [issueType, setIssueType] = useState("");
//   const [description, setDescription] = useState("");

//   const locationInfo = routeProps?.location || "Location not passed.";
//   const imageData = routeProps?.imageData;

//   const issueTypes = [
//     "Pothole",
//     "Broken Street Light",
//     "Graffiti/Vandalism",
//     "Missing Signage",
//     "Other Road Hazard",
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!issueType || !description) {
//       alert("Please fill all required fields.");
//       return;
//     }
//     if (!routeProps?.imageData) {
//       alert("No photo captured!");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // API Simulation (Skipping actual fetch calls to avoid external dependency errors)
//       await new Promise((r) => setTimeout(r, 2000));

//       console.log("Report Submitted:", {
//         issueType,
//         description,
//         location: locationInfo,
//         photoDataSize: imageData.length,
//       });

//       alert("Report submitted successfully!");
//       goToScreen(AppView.HOME);
//     } catch (err) {
//       console.error("Error submitting report:", err);
//       alert("❌ Failed to submit report. Please check console for details.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="screen-container details-screen flex-col">
//       {/* Header */}
//       <header className="header-bar bg-red-600 shadow-md">
//         <button
//           onClick={() => goToScreen(AppView.REPORT)}
//           className="header-icon-button"
//         >
//           <Icon name="chevron-left" className="text-white icon-default mr-4" />
//         </button>
//         <h2 className="text-2xl font-bold text-white">Report Issue Details</h2>
//       </header>

//       {/* Main Content: Form - Centered on desktop */}
//       <main className="app-main p-8 flex justify-center">
//         <div className="details-form-wrapper bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//           <form onSubmit={handleSubmit}>
//             {/* Photo Preview and Status */}
//             <div className="flex items-start border border-red-300 p-4 rounded-xl mb-6 bg-red-50">
//               <div className="preview-container bg-gray-200">
//                 {imageData ? (
//                   <img
//                     src={imageData}
//                     alt="Captured Preview"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <Icon name="image" className="icon-large text-gray-500" />
//                 )}
//               </div>
//               <div className="flex flex-col flex-grow">
//                 <p className="font-bold text-red-600 mb-1">Photo Confirmed</p>
//                 <p className="text-sm text-gray-600 truncate">
//                   Location: {locationInfo}
//                 </p>
//               </div>
//             </div>

//             {/* 1. Issue Type Dropdown */}
//             <label className="input-label">Issue Type</label>
//             <select
//               value={issueType}
//               onChange={(e) => setIssueType(e.target.value)}
//               className="app-input h-[46px] appearance-none mb-6"
//               required
//             >
//               <option value="" disabled>
//                 Select the main type of issue
//               </option>
//               {issueTypes.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>

//             {/* 2. Detailed Description */}
//             <label className="input-label">Detailed Description</label>
//             <textarea
//               rows="4"
//               placeholder="Describe the issue (size, severity, location context)"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="app-input resize-y mb-8"
//               required
//             />

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className={`app-button-primary w-full ${
//                 isSubmitting ? "opacity-50 pointer-events-none" : ""
//               }`}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center justify-center">
//                   <Icon
//                     name="loader-2"
//                     className="w-5 h-5 mr-3 text-white animate-spin-slow"
//                   />
//                   Submitting...
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center">
//                   <Icon name="send" className="w-5 h-5 mr-3 text-white" />
//                   Submit Report
//                 </span>
//               )}
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

const DetailsScreen = ({ goToScreen, routeProps }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");

  const locationInfo = routeProps?.location || "Location not passed.";
  const imageData = routeProps?.imageData;

  const issueTypes = [
    "Pothole",
    "Broken Street Light",
    "Graffiti/Vandalism",
    "Missing Signage",
    "Other Road Hazard",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issueType || !description) {
      alert("Please fill all required fields.");
      return;
    }
    if (!imageData) {
      alert("No photo captured!");
      return;
    }

    setIsSubmitting(true);

    try {
      // API Simulation
      await new Promise((r) => setTimeout(r, 2000));

      console.log("Report Submitted:", {
        issueType,
        description,
        location: locationInfo,
        photoDataSize: imageData.length,
      });

      alert("Report submitted successfully!");
      goToScreen(AppView.HOME);
    } catch (err) {
      console.error("Error submitting report:", err);
      alert("❌ Failed to submit report. Please check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formInputStyle = {
    width: "100%",
    padding: "12px",
    border: `1px solid ${AppColors.gray300}`,
    borderRadius: "12px",
    transition: "all 150ms",
    boxShadow: AppColors.shadowGeneral,
    resize: "vertical",
    outline: "none",
  };
  const submitButtonStyle = {
    width: "100%",
    padding: "16px",
    fontWeight: "600",
    borderRadius: "12px",
    color: AppColors.white,
    backgroundColor: AppColors.primary,
    transition: "all 200ms",
    cursor: "pointer",
    border: "none",
    boxShadow: AppColors.shadowPrimary,
    opacity: isSubmitting ? 0.5 : 1,
    pointerEvents: isSubmitting ? "none" : "auto",
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
        backgroundColor: AppColors.gray100,
      }}
    >
      <Header
        title="Report Issue Details"
        bgColor={AppColors.red600}
        showBackButton={true}
        onBack={() => goToScreen(AppView.REPORT)}
      />

      <main
        style={{
          flexGrow: 1,
          padding: "32px",
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "512px",
            backgroundColor: AppColors.white,
            padding: "32px",
            borderRadius: "12px",
            boxShadow: AppColors.shadowGeneral,
            border: `1px solid ${AppColors.gray200}`,
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Photo Preview and Status */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                border: `1px solid ${AppColors.gray300}`,
                padding: "16px",
                borderRadius: "12px",
                marginBottom: "24px",
                backgroundColor: AppColors.red50,
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  marginRight: "16px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: `2px solid ${AppColors.gray300}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: AppColors.gray200,
                }}
              >
                {imageData ? (
                  <img
                    src={imageData}
                    alt="Captured Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Icon name="image" size="32px" color={AppColors.gray500} />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: AppColors.red600,
                    marginBottom: "4px",
                  }}
                >
                  Photo Confirmed
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: AppColors.gray600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Location: {locationInfo}
                </p>
              </div>
            </div>

            {/* 1. Issue Type Dropdown */}
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: AppColors.gray700,
                marginBottom: "4px",
              }}
            >
              Issue Type
            </label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              style={{
                ...formInputStyle,
                height: "46px",
                appearance: "none",
                marginBottom: "24px",
              }}
              required
            >
              <option value="" disabled>
                Select the main type of issue
              </option>
              {issueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {/* 2. Detailed Description */}
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: AppColors.gray700,
                marginBottom: "4px",
              }}
            >
              Detailed Description
            </label>
            <textarea
              rows="4"
              placeholder="Describe the issue (size, severity, location context)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ ...formInputStyle, marginBottom: "32px" }}
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              style={submitButtonStyle}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name="loader-2"
                    size="20px"
                    color={AppColors.white}
                    style={{
                      marginRight: "8px",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Submitting...
                </span>
              ) : (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name="send"
                    size="20px"
                    color={AppColors.white}
                    style={{ marginRight: "8px" }}
                  />
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

export default DetailsScreen;
