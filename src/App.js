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

export default function App() {
  const { path, navigate, routeProps } = useWouter();

  return (
    <>
      <Route
        path={AppView.REGISTRATION}
        component={RegistrationScreen}
        isCurrent={path === AppView.REGISTRATION}
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
    </>
  );
}
