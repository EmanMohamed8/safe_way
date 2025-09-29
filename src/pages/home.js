import AppColors from "../theme/appColors";
import AppView from "../routes/paths";
import Icon from "../components/icons";
import Header from "../components/header";

// const HomeScreen = ({ goToScreen }) => {

//   const ActionButton = ({ iconName, title, description, route, colorClass, bgColorClass, borderColorClass, shadowColor }) => (
//     <button
//       onClick={() => goToScreen(route)}
//       className={`w-full h-full flex flex-col items-start p-6 ${bgColorClass} hover:${bgColorClass.replace('-50', '-100')} border-2 ${borderColorClass} rounded-2xl transition duration-200 shadow-md transform hover:scale-[1.01] active:scale-[0.99]`}
//     >
//       <div className="flex items-center mb-3">
//         <div className={`p-3 ${colorClass.replace('text', 'bg')} rounded-full mr-4 shadow-lg ${shadowColor}`}>
//           <Icon name={iconName} className="w-6 h-6 text-white" />
//         </div>
//         <span className={`text-xl font-bold ${colorClass}`}>{title}</span>
//       </div>
//       <p className="text-left text-sm text-gray-600">
//         {description}
//       </p>
//     </button>
//   );

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       {/* Header (Full Width) */}
//       <header className={`p-6 flex justify-between items-center shadow-lg text-white ${AppColors.primary.replace('hover:bg-blue-700', '')} w-full`}>
//         <h2 className="text-2xl font-bold">FixIt Dashboard (Web View)</h2>
//         <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition duration-150">
//           <Icon name="user" className="w-6 h-6 text-white" />
//         </button>
//       </header>

//       <main className="flex-grow p-6 md:p-12 overflow-y-auto w-full max-w-7xl mx-auto">
//         <h3 className="text-2xl font-semibold text-gray-700 mb-8">What would you like to do?</h3>

//         {/* Button container - Stacks on mobile, 2-column grid on desktop */}
//         <div className="space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
//           {/* Button 1: Report an Issue */}
//           <ActionButton
//             iconName="alert-triangle"
//             title="Report an Issue"
//             description="File a new report for a pothole, broken street light, graffiti, or other safety concern at your current location."
//             route={AppView.REPORT}
//             colorClass={AppColors.redReport.replace('bg', 'text')}
//             bgColorClass={AppColors.redReportBackground}
//             borderColorClass="border-red-300"
//             shadowColor="shadow-red-500/30"
//           />

//           {/* Button 2: Ask About Issues */}
//           <ActionButton
//             iconName="map"
//             title="Check for Issues in a Place I will Visit"
//             description="Proactively check the status and types of reported issues (e.g., crime, road closures) in a neighborhood you plan to visit."
//             route={AppView.CHECK}
//             colorClass={AppColors.primaryText}
//             bgColorClass={AppColors.blueCheckBackground}
//             borderColorClass="border-blue-300"
//             shadowColor="shadow-blue-500/30"
//           />
//         </div>

//         {/* Optional: Quick Action Card */}
//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mt-12 w-full">
//           <h4 className="font-semibold text-gray-700 flex items-center mb-2">
//             <Icon name="activity" className="w-5 h-5 mr-2 text-green-600" /> Local Activity Snapshot
//           </h4>
//           <p className="text-base text-gray-500">
//             2 new issues reported nearby today. Review the map or <a href="#" className="text-green-600 font-medium hover:underline">view all recent reports</a>.
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// };

// const HomeScreen = ({ goToScreen }) => {
//   const ActionButton = ({
//     iconName,
//     title,
//     description,
//     route,
//     color,
//     bgColor,
//     borderColor,
//     shadow,
//   }) => (
//     <button
//       onClick={() => goToScreen(route)}
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//         padding: "24px",
//         backgroundColor: bgColor,
//         border: `2px solid ${borderColor}`,
//         borderRadius: "16px",
//         transition: "all 200ms",
//         boxShadow: AppColors.shadowGeneral,
//         cursor: "pointer",
//         transform: "scale(1)",
//         minHeight: "200px",
//       }}
//       onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
//       onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//       onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.99)")}
//       onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
//     >
//       <div
//         style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}
//       >
//         <div
//           style={{
//             padding: "12px",
//             backgroundColor: color,
//             borderRadius: "50%",
//             marginRight: "16px",
//             boxShadow: shadow,
//           }}
//         >
//           <Icon name={iconName} size="24px" color={AppColors.white} />
//         </div>
//         <span style={{ fontSize: "20px", fontWeight: "bold", color: color }}>
//           {title}
//         </span>
//       </div>
//       <p style={{ textAlign: "left", fontSize: "14px", color: "#4B5563" }}>
//         {description}
//       </p>
//     </button>
//   );

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: AppColors.grayBackground,
//       }}
//     >
//       {/* Header (Full Width) */}
//       <header
//         style={{
//           padding: "24px",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           boxShadow: AppColors.shadowGeneral,
//           color: AppColors.white,
//           backgroundColor: AppColors.primary,
//           width: "100%",
//         }}
//       >
//         <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
//           FixIt Dashboard (Web View)
//         </h2>
//         <button
//           style={{
//             padding: "8px",
//             backgroundColor: "rgba(255, 255, 255, 0.2)",
//             borderRadius: "50%",
//             transition: "background-color 150ms",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           <Icon name="user" size="24px" color={AppColors.white} />
//         </button>
//       </header>

//       <main
//         style={{
//           flexGrow: 1,
//           padding: "24px 48px",
//           overflowY: "auto",
//           width: "100%",
//           maxWidth: "1152px",
//           margin: "0 auto",
//         }}
//       >
//         <h3
//           style={{
//             fontSize: "24px",
//             fontWeight: "600",
//             color: "#374151",
//             marginBottom: "32px",
//           }}
//         >
//           What would you like to do?
//         </h3>

//         {/* Button container - Responsive layout using flex/grid properties */}
//         <div
//           style={{
//             display: "grid",
//             gap: "32px",
//             gridTemplateColumns: "1fr",
//             "@media (min-width: 768px)": { gridTemplateColumns: "1fr 1fr" },
//           }}
//         >
//           {/* Button 1: Report an Issue */}
//           <ActionButton
//             iconName="alert-triangle"
//             title="Report an Issue"
//             description="File a new report for a pothole, broken street light, graffiti, or other safety concern at your current location."
//             route={AppView.REPORT}
//             color={AppColors.redReport}
//             bgColor={AppColors.redReportBackground}
//             borderColor="#FCA5A5" // red-300
//             shadow={AppColors.shadowRed}
//           />

//           {/* Button 2: Ask About Issues */}
//           <ActionButton
//             iconName="map"
//             title="Check for Issues in a Place I will Visit"
//             description="Proactively check the status and types of reported issues (e.g., crime, road closures) in a neighborhood you plan to visit."
//             route={AppView.CHECK}
//             color={AppColors.primary}
//             bgColor={AppColors.blueCheckBackground}
//             borderColor="#93C5FD" // blue-300
//             shadow={AppColors.shadowPrimary}
//           />
//         </div>

//         {/* Optional: Quick Action Card */}
//         <div
//           style={{
//             backgroundColor: AppColors.white,
//             padding: "24px",
//             borderRadius: "12px",
//             border: "1px solid #E5E7EB",
//             boxShadow: AppColors.shadowGeneral,
//             marginTop: "48px",
//             width: "100%",
//           }}
//         >
//           <h4
//             style={{
//               fontWeight: "600",
//               color: "#374151",
//               display: "flex",
//               alignItems: "center",
//               marginBottom: "8px",
//             }}
//           >
//             <Icon
//               name="activity"
//               size="20px"
//               color="#10B981"
//               style={{ marginRight: "8px" }}
//             />{" "}
//             Local Activity Snapshot
//           </h4>
//           <p style={{ fontSize: "16px", color: AppColors.grayText }}>
//             2 new issues reported nearby today. Review the map or{" "}
//             <a
//               href="#"
//               style={{
//                 color: "#10B981",
//                 fontWeight: "500",
//                 textDecoration: "underline",
//               }}
//             >
//               view all recent reports
//             </a>
//             .
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// };

// const HomeScreen = ({ goToScreen }) => {
//   const ActionButton = ({
//     iconName,
//     title,
//     description,
//     route,
//     color,
//     bgColor,
//     borderColor,
//     shadow,
//   }) => (
//     <button
//       onClick={() => goToScreen(route)}
//       style={{
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//         padding: "32px",
//         backgroundColor: bgColor,
//         borderRadius: "16px",
//         transition: "all 200ms",
//         boxShadow: AppColors.shadowGeneral,
//         cursor: "pointer",
//         minHeight: "200px",
//         border: `2px solid ${borderColor}`,
//         transform: "scale(1)",
//       }}
//       onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
//       onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//     >
//       <div
//         style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
//       >
//         <div
//           style={{
//             padding: "12px",
//             backgroundColor: color,
//             borderRadius: "50%",
//             marginRight: "16px",
//             boxShadow: shadow,
//           }}
//         >
//           <Icon name={iconName} size="24px" color={AppColors.white} />
//         </div>
//         <span
//           style={{
//             fontSize: "20px",
//             fontWeight: "bold",
//             color: color,
//             textAlign: "left",
//           }}
//         >
//           {title}
//         </span>
//       </div>
//       <p
//         style={{
//           textAlign: "left",
//           fontSize: "14px",
//           color: AppColors.gray600,
//         }}
//       >
//         {description}
//       </p>
//     </button>
//   );

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: AppColors.gray100,
//       }}
//     >
//       <Header
//         title="FixIt Dashboard"
//         bgColor={AppColors.primary}
//         showBackButton={false}
//       />

//       <main
//         style={{
//           flexGrow: 1,
//           padding: "32px 48px",
//           overflowY: "auto",
//           width: "100%",
//           maxWidth: "1152px",
//           margin: "0 auto",
//         }}
//       >
//         <h3
//           style={{
//             fontSize: "24px",
//             fontWeight: "600",
//             color: AppColors.gray700,
//             marginBottom: "32px",
//           }}
//         >
//           What would you like to do?
//         </h3>

//         {/* Responsive Grid for Action Buttons */}
//         <div
//           style={{
//             display: "grid",
//             gap: "32px",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//           }}
//         >
//           {/* Button 1: Report an Issue */}
//           <ActionButton
//             iconName="alert-triangle"
//             title="Report an Issue"
//             description="File a new report for a pothole, broken street light, graffiti, or other safety concern at your current location."
//             route={AppView.REPORT}
//             color={AppColors.red600}
//             bgColor={AppColors.red50}
//             borderColor="#FCA5A5"
//             shadow={AppColors.shadowRed}
//           />

//           {/* Button 2: Check for Issues */}
//           <ActionButton
//             iconName="map"
//             title="Check for Issues in a Place I will Visit"
//             description="Proactively check the status and types of reported issues (e.g., crime, road closures) in a neighborhood you plan to visit."
//             route={AppView.CHECK}
//             color={AppColors.primary}
//             bgColor={AppColors.blue50}
//             borderColor="#93C5FD"
//             shadow={AppColors.shadowPrimary}
//           />
//         </div>

//         <div
//           style={{
//             backgroundColor: AppColors.white,
//             padding: "24px",
//             borderRadius: "12px",
//             border: `1px solid ${AppColors.gray300}`,
//             boxShadow: AppColors.shadowGeneral,
//             marginTop: "48px",
//             width: "100%",
//           }}
//         >
//           <h4
//             style={{
//               fontWeight: "600",
//               color: AppColors.gray700,
//               display: "flex",
//               alignItems: "center",
//               marginBottom: "8px",
//             }}
//           >
//             <Icon
//               name="activity"
//               size="20px"
//               color={AppColors.green600}
//               style={{ marginRight: "12px" }}
//             />{" "}
//             Local Activity Snapshot
//           </h4>
//           <p style={{ fontSize: "16px", color: AppColors.gray600 }}>
//             2 new issues reported nearby today.{" "}
//             <a
//               href="#"
//               style={{
//                 color: AppColors.green600,
//                 fontWeight: "500",
//                 textDecoration: "underline",
//               }}
//             >
//               View Map
//             </a>
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// };

const HomeScreen = ({ goToScreen }) => {
  const ActionButton = ({
    iconName,
    title,
    description,
    route,
    color,
    bgColor,
    borderColor,
    shadow,
  }) => (
    <button
      onClick={() => goToScreen(route)}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "32px",
        backgroundColor: bgColor,
        borderRadius: "16px",
        transition: "all 200ms",
        boxShadow: AppColors.shadowGeneral,
        cursor: "pointer",
        minHeight: "200px",
        border: `2px solid ${borderColor}`,
        transform: "scale(1)",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        <div
          style={{
            padding: "12px",
            backgroundColor: color,
            borderRadius: "50%",
            marginRight: "16px",
            boxShadow: shadow,
          }}
        >
          <Icon name={iconName} size="24px" color={AppColors.white} />
        </div>
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: color,
            textAlign: "left",
          }}
        >
          {title}
        </span>
      </div>
      <p
        style={{
          textAlign: "left",
          fontSize: "14px",
          color: AppColors.gray600,
        }}
      >
        {description}
      </p>
    </button>
  );

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
        title="FixIt Dashboard"
        bgColor={AppColors.primary}
        showBackButton={false}
      />

      <main
        style={{
          flexGrow: 1,
          padding: "32px 48px",
          overflowY: "auto",
          width: "100%",
          maxWidth: "1152px",
          margin: "0 auto",
        }}
      >
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: AppColors.gray700,
            marginBottom: "32px",
          }}
        >
          What would you like to do?
        </h3>

        {/* Responsive Grid for Action Buttons */}
        <div
          style={{
            display: "grid",
            gap: "32px",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {/* Button 1: Report an Issue */}
          <ActionButton
            iconName="alert-triangle"
            title="Report an Issue"
            description="File a new report for a pothole, broken street light, graffiti, or other safety concern at your current location."
            route={AppView.REPORT}
            color={AppColors.red600}
            bgColor={AppColors.red50}
            borderColor="#FCA5A5"
            shadow={AppColors.shadowRed}
          />

          {/* Button 2: Check for Issues */}
          <ActionButton
            iconName="map"
            title="Check for Issues in a Place I will Visit"
            description="Proactively check the status and types of reported issues (e.g., crime, road closures) in a neighborhood you plan to visit."
            route={AppView.CHECK}
            color={AppColors.primary}
            bgColor={AppColors.blue50}
            borderColor="#93C5FD"
            shadow={AppColors.shadowPrimary}
          />
        </div>

        <div
          style={{
            backgroundColor: AppColors.white,
            padding: "24px",
            borderRadius: "12px",
            border: `1px solid ${AppColors.gray300}`,
            boxShadow: AppColors.shadowGeneral,
            marginTop: "48px",
            width: "100%",
          }}
        >
          <h4
            style={{
              fontWeight: "600",
              color: AppColors.gray700,
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <Icon
              name="activity"
              size="20px"
              color={AppColors.green600}
              style={{ marginRight: "12px" }}
            />{" "}
            Local Activity Snapshot
          </h4>
          <p style={{ fontSize: "16px", color: AppColors.gray600 }}>
            2 new issues reported nearby today.{" "}
            <a
              href="#"
              style={{
                color: AppColors.green600,
                fontWeight: "500",
                textDecoration: "underline",
              }}
            >
              View Map
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
