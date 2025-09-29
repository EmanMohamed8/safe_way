import React from "react";
import { useTranslation } from "react-i18next";
import AppColors from "../theme/appColors";
import AppView from "../routes/paths";
import Icon from "../components/icons";
import Header from "../components/header";

// const HomeScreen = ({ goToScreen }) => {
//   const { t } = useTranslation();

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
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: AppColors.gray100,
//       }}
//     >
//       <Header
//         title={t("dashboardTitle")}
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
//           {t("homeQuestion")}
//         </h3>

//         {/* Responsive Grid for Action Buttons */}
//         <div
//           style={{
//             display: "grid",
//             gap: "32px",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//           }}
//         >
//           <ActionButton
//             iconName="alert-triangle"
//             title={t("reportIssueTitle")}
//             description={t("reportIssueDesc")}
//             route={AppView.REPORT}
//             color={AppColors.red600}
//             bgColor={AppColors.red50}
//             borderColor="#FCA5A5"
//             shadow={AppColors.shadowRed}
//           />

//           <ActionButton
//             iconName="map"
//             title={t("checkIssuesTitle")}
//             description={t("checkIssuesDesc")}
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
//             {t("localActivityTitle")}
//           </h4>
//           <p style={{ fontSize: "16px", color: AppColors.gray600 }}>
//             {t("localActivityDesc")}{" "}
//             <a
//               href="#"
//               style={{
//                 color: AppColors.green600,
//                 fontWeight: "500",
//                 textDecoration: "underline",
//               }}
//             >
//               {t("viewMap")}
//             </a>
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// };

const HomeScreen = ({ goToScreen }) => {
  const { t } = useTranslation();

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
        boxShadow: AppColors.shadowGeneral,
        cursor: "pointer",
        minHeight: "200px",
        border: `2px solid ${borderColor}`,
      }}
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
        <span style={{ fontSize: "20px", fontWeight: "bold", color: color }}>
          {title}
        </span>
      </div>
      <p style={{ fontSize: "14px", color: AppColors.gray600 }}>
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
        title="home.homeTitle"
        bgColor={AppColors.primary}
        showBackButton={false}
      />

      <main
        style={{
          flexGrow: 1,
          padding: "32px 48px",
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
          {t("home.title")}
        </h3>

        <div
          style={{
            display: "grid",
            gap: "32px",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          <ActionButton
            iconName="alert-triangle"
            title={t("home.reportTitle")}
            description={t("home.reportDescription")}
            route={AppView.REPORT}
            color={AppColors.red600}
            bgColor={AppColors.red50}
            borderColor="#FCA5A5"
            shadow={AppColors.shadowRed}
          />

          <ActionButton
            iconName="map"
            title={t("home.checkTitle")}
            description={t("home.checkDescription")}
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
            />
            {t("home.snapshotTitle")}
          </h4>
          <p style={{ fontSize: "16px", color: AppColors.gray600 }}>
            {t("home.snapshotMessage")}{" "}
            <a
              href="#"
              style={{
                color: AppColors.green600,
                fontWeight: "500",
                textDecoration: "underline",
              }}
            >
              {t("home.viewMap")}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
