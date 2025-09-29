import Icon from "../components/icons";
import AppView from "../routes/paths";
import AppColors from "../theme/appColors";
import Header from "../components/header";

// const CheckIssuesScreen = ({ goToScreen }) => {
//     const issueData = [
//         { id: 1, title: "Severe Pothole Cluster", percentage: 85, severity: "Critical", address: "450 E Main St, Downtown", eta: "Est. Fix: 3 Days", icon: 'alert-triangle', color: 'text-red-600', progressBarColor: 'bg-red-500' },
//         { id: 2, title: "Broken Street Lamp (Inactive)", percentage: 30, severity: "Pending Review", address: "12 Elmwood Ave, near park", eta: "Est. Review: 24h", icon: 'lightbulb', color: 'text-amber-600', progressBarColor: 'bg-amber-500' },
//         { id: 3, title: "Excessive Graffiti on Fence", percentage: 5, severity: "New", address: "78 Bayside Dr, West End", eta: "New Issue", icon: 'brush', color: 'text-gray-500', progressBarColor: 'bg-gray-400' },
//         { id: 4, title: "Sign Down (Stop Sign)", percentage: 95, severity: "Urgent Fix Scheduled", address: "Intersection of Oak and Pine", eta: "Fixing Today", icon: 'traffic-cone', color: 'text-green-600', progressBarColor: 'bg-green-500' },
//     ];
//     const IssueCard = ({ issue }) => {
//         return (
//             <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-l-current transition duration-200 hover:shadow-lg" style={{ borderColor: issue.progressBarColor.replace('bg-', '#') }}>
//                 <div className="p-4">
//                     <div className="flex justify-between items-start mb-3">
//                         <div className="flex items-center">
//                             <Icon name={issue.icon} className={`w-5 h-5 mr-2 ${issue.color}`} />
//                             <h4 className={`text-lg font-bold text-gray-800`}>{issue.title}</h4>
//                         </div>
//                         <span className={`text-xs font-semibold px-3 py-1 rounded-full ${issue.color} bg-current/10`} style={{ borderColor: issue.progressBarColor.replace('bg-', '#') }}>
//                             {issue.severity}
//                         </span>
//                     </div>

//                     {/* Progress Bar */}
//                     <div className="h-2.5 w-full bg-gray-200 rounded-full mb-1">
//                         <div
//                             className={`h-2.5 rounded-full ${issue.progressBarColor}`}
//                             style={{ width: `${issue.percentage}%` }}
//                         ></div>
//                     </div>

//                     <div className="flex justify-between text-xs text-gray-500">
//                         <span>Progress: {issue.percentage}%</span>
//                         <span>{issue.eta}</span>
//                     </div>

//                     <div className="mt-4 pt-4 border-t border-gray-100 flex items-center">
//                         <Icon name="map-pin" className="w-4 h-4 mr-1 text-blue-600" />
//                         <p className="text-sm text-gray-600">{issue.address}</p>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div className="min-h-screen flex flex-col bg-gray-100">
//             {/* Header */}
//             <header className={`p-6 flex items-center shadow-md text-white ${AppColors.primary.replace('hover:bg-blue-700', '')} w-full`}>
//                 <button onClick={() => goToScreen(AppView.HOME)} className="p-2 mr-4 rounded-full hover:bg-white/20 transition duration-150">
//                     <Icon name="chevron-left" className="w-6 h-6 text-white" />
//                 </button>
//                 <h2 className="text-xl font-bold">Issues Near Me</h2>
//             </header>

//             {/* Main Content */}
//             <main className="flex-grow p-6 md:p-12 overflow-y-auto flex justify-center">
//                 <div className="w-full max-w-6xl">
//                     {/* Search Bar Container */}
//                     <div className="mb-8 relative">
//                         <input
//                             type="text"
//                             placeholder="Search address or area I will visit..."
//                             className={`w-full p-4 pl-12 text-lg ${AppColors.inputBorder} rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-md`}
//                         />
//                         <div className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-4 pointer-events-none">
//                             <Icon name="search" className="w-6 h-6 text-gray-500" />
//                         </div>
//                     </div>

//                     <h3 className="text-xl font-semibold text-gray-700 mb-6">4 Issues Reported in the Last 7 Days:</h3>

//                     {/* Issue Cards Grid - Responsive layout */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {issueData.map((issue) => (
//                             <IssueCard key={issue.id} issue={issue} />
//                         ))}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// const CheckIssuesScreen = ({ goToScreen }) => {
//   const issueData = [
//     {
//       id: 1,
//       title: "Severe Pothole Cluster",
//       percentage: 85,
//       severity: "Critical",
//       address: "450 E Main St, Downtown",
//       eta: "Est. Fix: 3 Days",
//       icon: "alert-triangle",
//       color: "text-red-600",
//       progressBarColor: "bg-red-500",
//     },
//     {
//       id: 2,
//       title: "Broken Street Lamp (Inactive)",
//       percentage: 30,
//       severity: "Pending Review",
//       address: "12 Elmwood Ave, near park",
//       eta: "Est. Review: 24h",
//       icon: "lightbulb",
//       color: "text-amber-600",
//       progressBarColor: "bg-amber-500",
//     },
//     {
//       id: 3,
//       title: "Excessive Graffiti on Fence",
//       percentage: 5,
//       severity: "New",
//       address: "78 Bayside Dr, West End",
//       eta: "New Issue",
//       icon: "brush",
//       color: "text-gray-500",
//       progressBarColor: "bg-gray-400",
//     },
//     {
//       id: 4,
//       title: "Sign Down (Stop Sign)",
//       percentage: 95,
//       severity: "Urgent Fix Scheduled",
//       address: "Intersection of Oak and Pine",
//       eta: "Fixing Today",
//       icon: "traffic-cone",
//       color: "text-green-600",
//       progressBarColor: "bg-green-500",
//     },
//   ];
//   const IssueCard = ({ issue }) => {
//     const progressColor = issue.progressBarColor.replace("#", "");
//     const baseColor = issue.color.replace("#", "");

//     return (
//       <div
//         style={{
//           backgroundColor: AppColors.white,
//           borderRadius: "12px",
//           boxShadow: AppColors.shadowGeneral,
//           overflow: "hidden",
//           borderLeft: `4px solid ${issue.progressBarColor}`,
//         }}
//       >
//         <div style={{ padding: "16px" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "flex-start",
//               marginBottom: "12px",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <Icon
//                 name={issue.icon}
//                 size="20px"
//                 color={issue.color}
//                 style={{ marginRight: "8px" }}
//               />
//               <h4
//                 style={{
//                   fontSize: "18px",
//                   fontWeight: "bold",
//                   color: AppColors.grayHeavy,
//                 }}
//               >
//                 {issue.title}
//               </h4>
//             </div>
//             <span
//               style={{
//                 fontSize: "12px",
//                 fontWeight: "600",
//                 padding: "4px 12px",
//                 borderRadius: "50px",
//                 color: issue.color,
//                 backgroundColor: `${issue.color}1A`,
//               }}
//             >
//               {issue.severity}
//             </span>
//           </div>

//           {/* Progress Bar */}
//           <div
//             style={{
//               height: "10px",
//               width: "100%",
//               backgroundColor: "#E5E7EB",
//               borderRadius: "5px",
//               marginBottom: "4px",
//             }}
//           >
//             <div
//               style={{
//                 height: "10px",
//                 borderRadius: "5px",
//                 backgroundColor: issue.progressBarColor,
//                 width: `${issue.percentage}%`,
//               }}
//             ></div>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               fontSize: "12px",
//               color: AppColors.grayText,
//             }}
//           >
//             <span>Progress: {issue.percentage}%</span>
//             <span>{issue.eta}</span>
//           </div>

//           <div
//             style={{
//               marginTop: "16px",
//               paddingTop: "16px",
//               borderTop: `1px solid #E5E7EB`,
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <Icon
//               name="map-pin"
//               size="16px"
//               color={AppColors.primary}
//               style={{ marginRight: "4px" }}
//             />
//             <p style={{ fontSize: "14px", color: "#4B5563" }}>
//               {issue.address}
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const searchInputStyle = {
//     width: "100%",
//     padding: "16px 16px 16px 48px",
//     fontSize: "18px",
//     border: `1px solid ${AppColors.inputBorder}`,
//     borderRadius: "12px",
//     transition: "all 150ms",
//     boxShadow: AppColors.shadowGeneral,
//     boxSizing: "border-box",
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
//           backgroundColor: AppColors.primary,
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
//         <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Issues Near Me</h2>
//       </header>

//       {/* Main Content */}
//       <main
//         style={{
//           flexGrow: 1,
//           padding: "24px 48px",
//           overflowY: "auto",
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <div style={{ width: "100%", maxWidth: "1152px" }}>
//           {/* Search Bar Container */}
//           <div style={{ marginBottom: "32px", position: "relative" }}>
//             <input
//               type="text"
//               placeholder="Search address or area I will visit..."
//               style={searchInputStyle}
//             />
//             <div
//               style={{
//                 position: "absolute",
//                 left: "16px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 pointerEvents: "none",
//               }}
//             >
//               <Icon name="search" size="24px" color={AppColors.grayText} />
//             </div>
//           </div>

//           <h3
//             style={{
//               fontSize: "20px",
//               fontWeight: "600",
//               color: "#374151",
//               marginBottom: "24px",
//             }}
//           >
//             4 Issues Reported in the Last 7 Days:
//           </h3>

//           {/* Issue Cards Grid - Responsive layout */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//               gap: "24px",
//             }}
//           >
//             {issueData.map((issue) => (
//               <IssueCard key={issue.id} issue={issue} />
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// const CheckIssuesScreen = ({ goToScreen }) => {
//   const issueData = [
//     {
//       id: 1,
//       title: "Severe Pothole Cluster",
//       percentage: 85,
//       severity: "Critical",
//       address: "450 E Main St, Downtown",
//       eta: "Est. Fix: 3 Days",
//       icon: "alert-triangle",
//       color: "text-red-600",
//       progressBarColor: "bg-red-500",
//     },
//     {
//       id: 2,
//       title: "Broken Street Lamp (Inactive)",
//       percentage: 30,
//       severity: "Pending Review",
//       address: "12 Elmwood Ave, near park",
//       eta: "Est. Review: 24h",
//       icon: "lightbulb",
//       color: "text-amber-600",
//       progressBarColor: "bg-amber-500",
//     },
//     {
//       id: 3,
//       title: "Excessive Graffiti on Fence",
//       percentage: 5,
//       severity: "New",
//       address: "78 Bayside Dr, West End",
//       eta: "New Issue",
//       icon: "brush",
//       color: "text-gray-500",
//       progressBarColor: "bg-gray-400",
//     },
//     {
//       id: 4,
//       title: "Sign Down (Stop Sign)",
//       percentage: 95,
//       severity: "Urgent Fix Scheduled",
//       address: "Intersection of Oak and Pine",
//       eta: "Fixing Today",
//       icon: "traffic-cone",
//       color: "text-green-600",
//       progressBarColor: "bg-green-500",
//     },
//   ];
//   const IssueCard = ({ issue }) => {
//     const iconMap = {
//       "alert-triangle": "text-red-600",
//       lightbulb: "text-amber-600",
//       brush: "text-gray-500",
//       "traffic-cone": "text-green-600",
//     };

//     return (
//       <div
//         className="issue-card"
//         style={{ borderLeftColor: issue.progressBarColor }}
//       >
//         <div className="p-4">
//           <div className="flex justify-between items-start mb-3">
//             <div className="flex items-center">
//               <Icon
//                 name={issue.icon}
//                 className={`icon-default mr-2 ${iconMap[issue.icon]}`}
//               />
//               <h4 className="text-lg font-bold text-gray-800">{issue.title}</h4>
//             </div>
//             <span
//               className="issue-severity-tag"
//               style={{
//                 color: issue.color,
//                 backgroundColor: `${issue.progressBarColor}1A`,
//               }}
//             >
//               {issue.severity}
//             </span>
//           </div>

//           {/* Progress Bar */}
//           <div className="progress-bar-container bg-gray-200">
//             <div
//               className="progress-bar-fill"
//               style={{
//                 backgroundColor: issue.progressBarColor,
//                 width: `${issue.percentage}%`,
//               }}
//             ></div>
//           </div>

//           <div className="flex justify-between text-xs text-gray-500 mt-1">
//             <span>Progress: {issue.percentage}%</span>
//             <span>{issue.eta}</span>
//           </div>

//           <div className="mt-4 pt-4 border-t border-gray-200 flex items-center">
//             <Icon name="map-pin" className="w-4 h-4 text-blue-600 mr-2" />
//             <p className="text-sm text-gray-600">{issue.address}</p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="screen-container check-screen flex-col">
//       {/* Header */}
//       <header className="header-bar bg-primary shadow-md">
//         <button
//           onClick={() => goToScreen(AppView.HOME)}
//           className="header-icon-button"
//         >
//           <Icon name="chevron-left" className="text-white icon-default mr-4" />
//         </button>
//         <h2 className="text-2xl font-bold text-white">Issues Near Me</h2>
//       </header>

//       {/* Main Content */}
//       <main className="app-main p-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Search Bar */}
//           <div className="relative mb-8">
//             <input
//               type="text"
//               placeholder="Search address or area I will visit..."
//               className="app-input w-full p-4 pl-12 shadow-sm"
//             />
//             <Icon
//               name="search"
//               className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
//             />
//           </div>

//           <h3 className="text-xl font-semibold text-gray-700 mb-6">
//             4 Issues Reported in the Last 7 Days:
//           </h3>

//           {/* Issue Cards Grid */}
//           <div className="issue-cards-grid">
//             {issueData.map((issue) => (
//               <IssueCard key={issue.id} issue={issue} />
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

const CheckIssuesScreen = ({ goToScreen }) => {
  const issueData = [
    {
      id: 1,
      title: "Severe Pothole Cluster",
      percentage: 85,
      severity: "Critical",
      address: "450 E Main St, Downtown",
      eta: "Est. Fix: 3 Days",
      icon: "alert-triangle",
      color: "text-red-600",
      progressBarColor: "bg-red-500",
    },
    {
      id: 2,
      title: "Broken Street Lamp (Inactive)",
      percentage: 30,
      severity: "Pending Review",
      address: "12 Elmwood Ave, near park",
      eta: "Est. Review: 24h",
      icon: "lightbulb",
      color: "text-amber-600",
      progressBarColor: "bg-amber-500",
    },
    {
      id: 3,
      title: "Excessive Graffiti on Fence",
      percentage: 5,
      severity: "New",
      address: "78 Bayside Dr, West End",
      eta: "New Issue",
      icon: "brush",
      color: "text-gray-500",
      progressBarColor: "bg-gray-400",
    },
    {
      id: 4,
      title: "Sign Down (Stop Sign)",
      percentage: 95,
      severity: "Urgent Fix Scheduled",
      address: "Intersection of Oak and Pine",
      eta: "Fixing Today",
      icon: "traffic-cone",
      color: "text-green-600",
      progressBarColor: "bg-green-500",
    },
  ];

  const IssueCard = ({ issue }) => {
    const severityColor = issue.severity.includes("Critical")
      ? AppColors.red600
      : issue.severity.includes("Pending")
      ? AppColors.amber600
      : AppColors.green600;

    return (
      <div
        style={{
          backgroundColor: AppColors.white,
          borderRadius: "12px",
          boxShadow: AppColors.shadowGeneral,
          overflow: "hidden",
          borderLeft: `4px solid ${issue.progressBarColor}`,
        }}
      >
        <div style={{ padding: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Icon
                name={issue.icon}
                size="20px"
                color={severityColor}
                style={{ marginRight: "8px" }}
              />
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: AppColors.gray800,
                }}
              >
                {issue.title}
              </h4>
            </div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                padding: "4px 12px",
                borderRadius: "50px",
                color: severityColor,
                backgroundColor: severityColor + "1A",
              }}
            >
              {issue.severity}
            </span>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              height: "10px",
              width: "100%",
              backgroundColor: AppColors.gray200,
              borderRadius: "5px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                height: "10px",
                borderRadius: "5px",
                backgroundColor: issue.progressBarColor,
                width: `${issue.percentage}%`,
              }}
            ></div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              color: AppColors.gray500,
            }}
          >
            <span>Progress: {issue.percentage}%</span>
            <span>{issue.eta}</span>
          </div>

          <div
            style={{
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: `1px solid ${AppColors.gray200}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon
              name="map-pin"
              size="16px"
              color={AppColors.primary}
              style={{ marginRight: "4px" }}
            />
            <p style={{ fontSize: "14px", color: AppColors.gray600 }}>
              {issue.address}
            </p>
          </div>
        </div>
      </div>
    );
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
        title="Issues Near Me"
        bgColor={AppColors.primary}
        showBackButton={true}
        onBack={() => goToScreen(AppView.HOME)}
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
        <div style={{ width: "100%", maxWidth: "1152px" }}>
          {/* Search Bar */}
          <div style={{ marginBottom: "32px", position: "relative" }}>
            <input
              type="text"
              placeholder="Search address or area I will visit..."
              style={{
                width: "100%",
                padding: "16px 16px 16px 48px",
                fontSize: "16px",
                border: `1px solid ${AppColors.gray300}`,
                borderRadius: "12px",
                boxShadow: AppColors.shadowGeneral,
                outline: "none",
              }}
            />
            <Icon
              name="search"
              size="24px"
              color={AppColors.gray500}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            />
          </div>

          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: AppColors.gray700,
              marginBottom: "24px",
            }}
          >
            4 Issues Reported in the Last 7 Days:
          </h3>

          {/* Issue Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {issueData.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckIssuesScreen;
