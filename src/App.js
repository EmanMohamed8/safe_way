// // import AppView from "./routes/paths";
// // import RegistrationScreen from "./pages/home";
// // import { Route } from "react-router-dom";
// import AppView from "./routes/paths";
// import RegistrationScreen from "./pages/registration";
// import ReportScreen from "./pages/reportScreen";
// import CheckIssuesScreen from "./pages/checkIssues";
// import DetailsScreen from "./pages/detail";
// import HomeScreen from "./pages/home";
// import useWouter from "./routes/useWouter";
// import Route from "./routes/route";

// function App() {
//   const { path, navigate, routeProps } = useWouter();

//   // Wraps the application in a full-width, responsive container optimized for the web
//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-start">
//       {/* Main content container is now full width and minimum height */}
//       <div className="w-full h-full bg-white shadow-xl min-h-screen">
//          {/* Declarative Routing Structure (Wouter style) */}
//         <Route path={AppView.REGISTRATION} component={RegistrationScreen} isCurrent={path === AppView.REGISTRATION} navigate={navigate} routeProps={routeProps} />
//         <Route path={AppView.HOME} component={HomeScreen} isCurrent={path === AppView.HOME} navigate={navigate} routeProps={routeProps} />
//         <Route path={AppView.REPORT} component={ReportScreen} isCurrent={path === AppView.REPORT} navigate={navigate} routeProps={routeProps} />
//         <Route path={AppView.DETAILS} component={DetailsScreen} isCurrent={path === AppView.DETAILS} navigate={navigate} routeProps={routeProps} />
//         <Route path={AppView.CHECK} component={CheckIssuesScreen} isCurrent={path === AppView.CHECK} navigate={navigate} routeProps={routeProps} />
//       </div>
//     </div>
//   );
//   // return (
//   //   <div className="min-h-screen bg-gray-100 flex justify-center items-start">
//   //     {/* Main content container is now full width and minimum height */}
//   //     <div className="w-full h-full bg-white shadow-xl min-h-screen">
//   //        {/* Declarative Routing Structure (Wouter style) */}
//   //        <Route path={AppView.REGISTRATION} component={RegistrationScreen} isCurrent={path === AppView.REGISTRATION} navigate={navigate} routeProps={routeProps} />
//   //        {/* <Route path={AppView.HOME} component={HomeScreen} isCurrent={path === AppView.HOME} navigate={navigate} routeProps={routeProps} />
//   //        <Route path={AppView.REPORT} component={ReportScreen} isCurrent={path === AppView.REPORT} navigate={navigate} routeProps={routeProps} />
//   //        <Route path={AppView.DETAILS} component={DetailsScreen} isCurrent={path === AppView.DETAILS} navigate={navigate} routeProps={routeProps} />
//   //        <Route path={AppView.CHECK} component={CheckIssuesScreen} isCurrent={path === AppView.CHECK} navigate={navigate} routeProps={routeProps} /> */}
//   //     </div>
//   //   </div>
//     // <div className="App">
//     //   <h2>hello world</h2>
//     // </div>
//   // );
// }

// export default App;

// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import AppView from "./routes/paths";
// // import RegistrationScreen from "./pages/registration";

// // // Pages
// // // 👆 Make sure the file is named correctly (not `./pages/home` unless you really mean that)

// // function App() {
// //   return (
// //     <Router>
// //       <div className="min-h-screen bg-gray-100 flex justify-center items-start">
// //         <div className="w-full h-full bg-white shadow-xl min-h-screen">
// //           <Routes>
// //             <Route path={AppView.REGISTRATION} element={<RegistrationScreen />} />
// //             {/* <Route path={AppView.HOME} element={<HomeScreen />} />
// //             <Route path={AppView.REPORT} element={<ReportScreen />} />
// //             <Route path={AppView.DETAILS} element={<DetailsScreen />} />
// //             <Route path={AppView.CHECK} element={<CheckIssuesScreen />} /> */}
// //           </Routes>
// //         </div>
// //       </div>
// //     </Router>
// //   );
// // }

// //

// // export default function App() {
// //   // Initialize the router using the simulated hook

// // }

import AppView from "./routes/paths";
import RegistrationScreen from "./pages/registration";
import ReportScreen from "./pages/reportScreen";
import CheckIssuesScreen from "./pages/checkIssues";
import DetailsScreen from "./pages/detail";
import HomeScreen from "./pages/home";
import useWouter from "./routes/useWouter";
import Route from "./routes/route";
import AppColors from "./theme/appColors";

export default function App() {
  const { path, navigate, routeProps } = useWouter();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: AppColors.gray100,
        padding: "0",
      }}
    >
      {/* CRITICAL GLOBAL CSS FIXES */}
      <style>
        {`
              /* Define the custom spin animation */
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              
              /* Global reset for consistent web layout and necessary scrolling */
              html, body, #root {
                  margin: 0;
                  padding: 0;
                  font-family: 'Inter', sans-serif;
                  background-color: ${AppColors.gray100};
                  min-height: 100vh; /* FIX: Use min-height to ensure the body can scroll */
                  height: auto; 
                  overflow-x: hidden; /* FIX: Prevent horizontal scrollbars */
                  overflow-y: auto; /* FIX: Allow vertical scrolling */
              }
              /* Ensure the main React container fills the width */
              body > div { 
                  width: 100%; 
              }
            `}
      </style>

      {/* Main Application Content Container (Full Width, Responsive) */}
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Route
          path={AppView.REGISTRATION}
          component={RegistrationScreen}
          isCurrent={path === AppView.REGISTRATION || path === "/"}
          navigate={navigate}
          routeProps={routeProps}
        />
        <Route
          path={AppView.HOME}
          component={HomeScreen}
          isCurrent={path === AppView.HOME}
          navigate={navigate}
          routeProps={routeProps}
        />
        <Route
          path={AppView.REPORT}
          component={ReportScreen}
          isCurrent={path === AppView.REPORT}
          navigate={navigate}
          routeProps={routeProps}
        />
        <Route
          path={AppView.DETAILS}
          component={DetailsScreen}
          isCurrent={path === AppView.DETAILS}
          navigate={navigate}
          routeProps={routeProps}
        />
        <Route
          path={AppView.CHECK}
          component={CheckIssuesScreen}
          isCurrent={path === AppView.CHECK}
          navigate={navigate}
          routeProps={routeProps}
        />
      </div>
    </div>
  );
}

// export default function App() {
//   const { path, navigate, routeProps } = useWouter();

//   return (
//     <div className="app-wrapper">
//       {/* CRITICAL FIX: Global CSS to enforce full viewport height, styles, and fix responsive issues */}
//       <style>
//         {`
//               /* --- Global Reset and Variables (Standard CSS) --- */
//               :root {
//                   --font-inter: 'Inter', sans-serif;
//                   --color-primary: #2563EB;
//                   --color-primary-dark: #1D4ED8;
//                   --color-red-600: #DC2626;
//                   --color-red-700: #B91C1C;
//                   --color-red-300: #FCA5A5;
//                   --color-red-50: #FEF2F2;
//                   --color-blue-50: #EFF6FF;
//                   --color-gray-100: #F3F4F6;
//                   --color-gray-200: #E5E7EB;
//                   --color-gray-300: #D1D5DB;
//                   --color-gray-500: #6B7280;
//                   --color-gray-700: #374151;
//                   --color-gray-800: #1F2937;
//                   --color-green-600: #10B981;
//                   --color-amber-600: #D97706;
//                   --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
//                   --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
//               }

//               /* Ensure font loads for accurate styling */
//               @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

//               * {
//                   box-sizing: border-box;
//               }

//               /* Critical layout fix for responsiveness and scrolling issues */
//               html, body, #root, .app-wrapper {
//                   height: 100vh;
//                   margin: 0;
//                   padding: 0;
//                   font-family: var(--font-inter);
//                   background-color: var(--color-gray-100);
//                   overflow: hidden; /* Prevents global scrollbar */
//               }

//               /* --- Layout and Structure Classes --- */
//               .app-wrapper {
//                   display: flex;
//                   flex-direction: column;
//                   align-items: center;
//                   justify-content: center;
//                   padding: 16px;
//               }

//               .app-view-inner {
//                   display: flex;
//                   flex-grow: 1;
//                   width: 100%;
//                   height: 100%;
//                   max-width: 1152px; /* max-w-5xl */
//                   box-shadow: var(--shadow-lg);
//                   border-radius: 12px;
//                   overflow: hidden; /* Prevents bleed */
//               }

//               .screen-container {
//                   display: flex;
//                   flex-direction: column;
//                   flex-grow: 1;
//                   background-color: white;
//               }

//               .app-main {
//                   flex-grow: 1;
//                   overflow-y: auto; /* Allows content within main to scroll */
//               }

//               /* --- Component Styles --- */

//               /* Header */
//               .header-bar {
//                   padding: 24px;
//                   display: flex;
//                   align-items: center;
//                   box-shadow: var(--shadow-md);
//                   width: 100%;
//               }
//               .header-icon-button {
//                   padding: 8px;
//                   background-color: rgba(255, 255, 255, 0.2);
//                   border-radius: 50%;
//                   transition: background-color 150ms;
//                   border: none;
//                   cursor: pointer;
//                   margin-right: 16px;
//               }
//               .header-icon-button:hover { background-color: rgba(255, 255, 255, 0.3); }

//               /* Buttons */
//               .app-button-primary {
//                   padding: 16px;
//                   font-weight: 600;
//                   border-radius: 12px;
//                   color: white;
//                   background-color: var(--color-primary);
//                   transition: background-color 200ms;
//                   cursor: pointer;
//                   border: none;
//                   box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.5);
//               }
//               .app-button-primary:hover {
//                   background-color: var(--color-primary-dark);
//               }

//               /* Registration Icon Wrapper */
//               .icon-wrapper {
//                   display: inline-flex;
//                   align-items: center;
//                   justify-content: center;
//                   padding: 12px;
//                   border-radius: 12px;
//                   margin-bottom: 16px;
//                   box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
//               }

//               /* Inputs */
//               .input-label {
//                   display: block;
//                   font-size: 14px;
//                   font-weight: 500;
//                   color: var(--color-gray-700);
//                   margin-bottom: 4px;
//               }
//               .app-input {
//                   width: 100%;
//                   padding: 12px;
//                   border: 1px solid var(--color-gray-300);
//                   border-radius: 12px;
//                   transition: all 150ms;
//                   box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
//                   outline: none;
//               }
//               .app-input:focus {
//                   border-color: var(--color-primary);
//                   box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.4);
//               }

//               /* Action Grid (Home Screen) */
//               .action-grid {
//                   display: grid;
//                   grid-template-columns: 1fr;
//                   gap: 32px;
//               }
//               @media (min-width: 768px) {
//                   .action-grid {
//                       grid-template-columns: repeat(2, 1fr);
//                   }
//               }

//               /* Action Card */
//               .action-card {
//                   display: flex;
//                   flex-direction: column;
//                   align-items: flex-start;
//                   padding: 32px;
//                   border-radius: 16px;
//                   transition: all 200ms;
//                   box-shadow: var(--shadow-md);
//                   height: 100%;
//                   border: 2px solid;
//                   cursor: pointer;
//               }
//               .action-card:hover {
//                   transform: scale(1.01);
//               }
//               .border-red-300 { border-color: var(--color-red-300); }
//               .border-blue-300 { border-color: #93C5FD; }
//               .bg-red-50 { background-color: var(--color-red-50); }
//               .bg-blue-50 { background-color: var(--color-blue-50); }
//               .text-red-700 { color: var(--color-red-700); }
//               .text-blue-700 { color: var(--color-primary); }
//               .shadow-red { box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.25); }
//               .shadow-primary { box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.25); }

//               /* Report Screen */
//               .camera-area-wrapper {
//                   width: 100%;
//                   height: 100%;
//                   max-width: 640px;
//                   display: flex;
//                   flex-direction: column;
//                   align-items: center;
//                   justify-content: center;
//               }
//               .camera-viewport {
//                   position: relative;
//                   width: 100%;
//                   height: 100%;
//                   min-height: 300px;
//                   max-height: 500px;
//                   background-color: black;
//                   border-radius: 16px;
//                   box-shadow: var(--shadow-lg);
//                   border: 4px solid;
//                   display: flex;
//                   align-items: center;
//                   justify-content: center;
//                   overflow: hidden;
//               }
//               .camera-video-stream {
//                   width: 100%;
//                   height: 100%;
//                   object-fit: cover;
//               }
//               .camera-message {
//                   padding: 16px;
//                   text-align: center;
//                   color: white;
//               }
//               .report-footer {
//                   padding: 24px;
//                   box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
//                   width: 100%;
//               }
//               .upload-button {
//                   width: 100%;
//                   padding: 16px;
//                   font-weight: 500;
//                   border-radius: 50px;
//                   background-color: white;
//                   border: 2px solid var(--color-primary);
//                   color: var(--color-primary);
//                   cursor: pointer;
//                   box-shadow: var(--shadow-md);
//                   transition: all 200ms;
//               }

//               /* Details Screen */
//               .details-form-wrapper {
//                   width: 100%;
//                   max-width: 512px;
//                   background-color: white;
//                   padding: 32px;
//                   border-radius: 12px;
//                   box-shadow: var(--shadow-lg);
//                   border: 1px solid var(--color-gray-200);
//               }
//               .preview-container {
//                   width: 64px;
//                   height: 64px;
//                   margin-right: 16px;
//                   border-radius: 8px;
//                   overflow: hidden;
//                   border: 2px solid var(--color-red-300);
//                   display: flex;
//                   align-items: center;
//                   justify-content: center;
//               }

//               /* Check Issues Screen */
//               .issue-cards-grid {
//                   display: grid;
//                   grid-template-columns: 1fr;
//                   gap: 24px;
//               }
//               @media (min-width: 768px) {
//                   .issue-cards-grid {
//                       grid-template-columns: repeat(2, 1fr);
//                   }
//               }
//               .issue-card {
//                   background-color: white;
//                   border-radius: 12px;
//                   box-shadow: var(--shadow-md);
//                   overflow: hidden;
//                   border-left: 4px solid;
//               }
//               .issue-severity-tag {
//                   font-size: 12px;
//                   font-weight: 600;
//                   padding: 4px 12px;
//                   border-radius: 50px;
//               }

//               /* Icons and Fonts */
//               .icon-default { width: 24px; height: 24px; }
//               .icon-large { width: 48px; height: 48px; }
//               .link-primary { color: var(--color-primary); text-decoration: none; font-weight: 500; }
//               .link-green { color: var(--color-green-600); text-decoration: none; font-weight: 500; }

//               /* Animation */
//               @keyframes spin {
//                 from { transform: rotate(0deg); }
//                 to { transform: rotate(360deg); }
//               }
//               .animate-spin-slow {
//                 animation: spin 2s linear infinite;
//               }
//             `}
//       </style>

//       <div className="w-full h-full flex flex-col flex-grow">
//         <Route
//           path={AppView.REGISTRATION}
//           component={RegistrationScreen}
//           isCurrent={path === AppView.REGISTRATION || path === "/"}
//           navigate={navigate}
//           routeProps={routeProps}
//         />
//         <Route
//           path={AppView.HOME}
//           component={HomeScreen}
//           isCurrent={path === AppView.HOME}
//           navigate={navigate}
//           routeProps={routeProps}
//         />
//         <Route
//           path={AppView.REPORT}
//           component={ReportScreen}
//           isCurrent={path === AppView.REPORT}
//           navigate={navigate}
//           routeProps={routeProps}
//         />
//         <Route
//           path={AppView.DETAILS}
//           component={DetailsScreen}
//           isCurrent={path === AppView.DETAILS}
//           navigate={navigate}
//           routeProps={routeProps}
//         />
//         <Route
//           path={AppView.CHECK}
//           component={CheckIssuesScreen}
//           isCurrent={path === AppView.CHECK}
//           navigate={navigate}
//           routeProps={routeProps}
//         />
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   const { path, navigate, routeProps } = useWouter();

//   return (
//     <>
//       <Route
//         path={AppView.REGISTRATION}
//         component={RegistrationScreen}
//         isCurrent={path === AppView.REGISTRATION}
//         navigate={navigate}
//         routeProps={routeProps}
//       />
//       <Route
//         path={AppView.HOME}
//         component={HomeScreen}
//         isCurrent={path === AppView.HOME}
//         navigate={navigate}
//         routeProps={routeProps}
//       />
//       <Route
//         path={AppView.REPORT}
//         component={ReportScreen}
//         isCurrent={path === AppView.REPORT}
//         navigate={navigate}
//         routeProps={routeProps}
//       />
//       <Route
//         path={AppView.DETAILS}
//         component={DetailsScreen}
//         isCurrent={path === AppView.DETAILS}
//         navigate={navigate}
//         routeProps={routeProps}
//       />
//       <Route
//         path={AppView.CHECK}
//         component={CheckIssuesScreen}
//         isCurrent={path === AppView.CHECK}
//         navigate={navigate}
//         routeProps={routeProps}
//       />
//     </>
//   );
// }
