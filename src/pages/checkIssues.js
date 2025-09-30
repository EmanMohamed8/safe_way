import React from "react";
import Icon from "../components/icons";
import AppView from "../routes/paths";
import AppColors from "../theme/appColors";
import Header from "../components/header";
import { useTranslation } from "react-i18next";

const CheckIssuesScreen = ({ goToScreen }) => {
  const { t, i18n } = useTranslation();

  const issueData = [
    {
      id: 1,
      title: t("checkIssues.issue1Title") || "كسر او نقرة فى الشارع", // Street damage / hole
      percentage: 85,
      severity: t("checkIssues.severityCritical") || "حرج",
      address: "450 E Main St, Downtown",
      eta: t("checkIssues.issue1Eta") || "اليوم",
      icon: "alert-triangle",
      progressBarColor: AppColors.red500,
    },
    {
      id: 2,
      title: t("checkIssues.issue2Title") || "خطر فى عمود نور", // Danger in lamp post
      percentage: 30,
      severity: t("checkIssues.severityPending") || "قيد الانتظار",
      address: "12 Elmwood Ave, near park",
      eta: t("checkIssues.issue2Eta") || "غداً",
      icon: "lightbulb",
      progressBarColor: AppColors.amber500,
    },
    {
      id: 3,
      title: t("checkIssues.issue3Title") || "بلاعة مفتوحة", // Open manhole
      percentage: 5,
      severity: t("checkIssues.severityNew") || "جديد",
      address: "78 Bayside Dr, West End",
      eta: t("checkIssues.issue3Eta") || "بعد أسبوع",
      icon: "brush",
      progressBarColor: AppColors.gray400,
    },
    {
      id: 4,
      title: t("checkIssues.issue4Title") || "عمود نور مفتوح الصبح", // Lamp post left on in morning
      percentage: 95,
      severity: t("checkIssues.severityUrgent") || "عاجل",
      address: "Intersection of Oak and Pine",
      eta: t("checkIssues.issue4Eta") || "اليوم",
      icon: "traffic-cone",
      progressBarColor: AppColors.green500,
    },
  ];
  //     issue.severity === t("checkIssues.severityCritical")
  //       ? AppColors.red600
  //       : issue.severity === t("checkIssues.severityPending")
  //       ? AppColors.amber600
  //       : AppColors.green600;

  //   return (
  //     <div
  //       style={{
  //         backgroundColor: AppColors.white,
  //         borderRadius: "12px",
  //         boxShadow: AppColors.shadowGeneral,
  //         overflow: "hidden",
  //         borderLeft: `4px solid ${issue.progressBarColor}`,
  //         direction: i18n.language === "ar" ? "rtl" : "ltr",
  //         textAlign: i18n.language === "ar" ? "right" : "left",
  //       }}
  //     >
  //       <div style={{ padding: "16px" }}>
  //         <div
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             alignItems: "flex-start",
  //             marginBottom: "12px",
  //             flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
  //           }}
  //         >
  //           <div
  //             style={{
  //               display: "flex",
  //               alignItems: "center",
  //               flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
  //             }}
  //           >
  //             <Icon
  //               name={issue.icon}
  //               size="20px"
  //               color={severityColor}
  //               style={{
  //                 marginRight: i18n.language === "ar" ? "8px" : 0,
  //                 marginLeft: i18n.language === "ar" ? 0 : "8px",
  //               }}
  //             />
  //             <h4
  //               style={{
  //                 fontSize: "18px",
  //                 fontWeight: "bold",
  //                 color: AppColors.gray800,
  //               }}
  //             >
  //               {issue.title}
  //             </h4>
  //           </div>
  //           <span
  //             style={{
  //               fontSize: "12px",
  //               fontWeight: "600",
  //               padding: "4px 12px",
  //               borderRadius: "50px",
  //               color: severityColor,
  //               backgroundColor: severityColor + "1A",
  //             }}
  //           >
  //             {issue.severity}
  //           </span>
  //         </div>

  //         <div
  //           style={{
  //             height: "10px",
  //             width: "100%",
  //             backgroundColor: AppColors.gray200,
  //             borderRadius: "5px",
  //             marginBottom: "4px",
  //           }}
  //         >
  //           <div
  //             style={{
  //               height: "10px",
  //               borderRadius: "5px",
  //               backgroundColor: issue.progressBarColor,
  //               width: `${issue.percentage}%`,
  //             }}
  //           ></div>
  //         </div>

  //         <div
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             fontSize: "12px",
  //             color: AppColors.gray500,
  //           }}
  //         >
  //           <span>
  //             {t("checkIssues.progress")}: {issue.percentage}%
  //           </span>
  //           <span>{issue.eta}</span>
  //         </div>

  //         <div
  //           style={{
  //             marginTop: "16px",
  //             paddingTop: "16px",
  //             borderTop: `1px solid ${AppColors.gray200}`,
  //             display: "flex",
  //             alignItems: "center",
  //             flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
  //           }}
  //         >
  //           <Icon
  //             name="map-pin"
  //             size="16px"
  //             color={AppColors.primary}
  //             style={{
  //               marginRight: i18n.language === "ar" ? "8px" : 0,
  //               marginLeft: i18n.language === "ar" ? 0 : "8px",
  //             }}
  //           />
  //           <p style={{ fontSize: "14px", color: AppColors.gray600 }}>
  //             {issue.address}
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  const IssueCard = ({ issue }) => {
    // Determine severity color based on the issue severity
    const severityColor =
      issue.severity === t("checkIssues.severityCritical") ||
      issue.percentage >= 75
        ? AppColors.green600
        : issue.severity === t("checkIssues.severityPending") ||
          issue.percentage >= 30
        ? AppColors.amber600
        : AppColors.red600;

    // Progress bar background changes dynamically
    let progressBackgroundColor =
      issue.percentage >= 75
        ? AppColors.red100
        : issue.percentage >= 30
        ? AppColors.amber100
        : AppColors.green100;

    return (
      <div
        style={{
          backgroundColor: AppColors.white,
          borderRadius: "12px",
          boxShadow: AppColors.shadowGeneral,
          overflow: "hidden",
          // borderLeft: `4px solid ${severityColor}`, // line matches severity
          direction: i18n.language === "ar" ? "rtl" : "ltr",
          textAlign: i18n.language === "ar" ? "right" : "left",
        }}
      >
        <div style={{ padding: "16px" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "12px",
              flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
              }}
            >
              <Icon
                name={issue.icon}
                size="20px"
                color={severityColor}
                style={{
                  marginRight: i18n.language === "ar" ? "8px" : 0,
                  marginLeft: i18n.language === "ar" ? 0 : "8px",
                }}
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

          {/* Progress bar */}
          <div
            style={{
              height: "10px",
              width: "100%",
              backgroundColor: progressBackgroundColor,
              borderRadius: "5px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                height: "10px",
                borderRadius: "5px",
                backgroundColor: severityColor,
                width: `${issue.percentage}%`,
              }}
            ></div>
          </div>

          {/* Info row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              color: AppColors.gray500,
            }}
          >
            <span>
              {t("checkIssues.progress")}: {issue.percentage}%
            </span>
            <span>{issue.eta}</span>
          </div>

          {/* Address */}
          <div
            style={{
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: `1px solid ${AppColors.gray200}`,
              display: "flex",
              alignItems: "center",
              flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
            }}
          >
            <Icon
              name="map-pin"
              size="16px"
              color={AppColors.primary}
              style={{
                marginRight: i18n.language === "ar" ? "8px" : 0,
                marginLeft: i18n.language === "ar" ? 0 : "8px",
              }}
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
        direction: i18n.language === "ar" ? "rtl" : "ltr",
      }}
    >
      <Header
        title={t("checkIssues.title")}
        bgColor={AppColors.primary}
        onBack={() => goToScreen(AppView.HOME)}
        demo={true}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                i18n.language === "ar" ? "flex-end" : "flex-start",
              marginBottom: "32px",
              gap: "16px", // space between input and toggle
            }}
          >
            {/* Search input */}
            <div style={{ position: "relative", flex: 1 }}>
              <input
                type="text"
                placeholder={t("checkIssues.checkDescription")}
                style={{
                  width: "100%",
                  padding:
                    i18n.language === "ar"
                      ? "16px 48px 16px 16px"
                      : "16px 16px 16px 48px",
                  fontSize: "16px",
                  border: `1px solid ${AppColors.gray300}`,
                  borderRadius: "12px",
                  boxShadow: AppColors.shadowGeneral,
                  outline: "none",
                  boxSizing: "border-box",
                  textAlign: i18n.language === "ar" ? "right" : "left",
                }}
              />
              <Icon
                name="search"
                size="24px"
                color={AppColors.gray500}
                style={{
                  position: "absolute",
                  left: i18n.language === "ar" ? "unset" : "16px",
                  right: i18n.language === "ar" ? "16px" : "unset",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Toggle switch */}
            <label
              style={{
                position: "relative",
                display: "inline-block",
                width: "40px",
                height: "20px",
              }}
            >
              <input
                type="checkbox"
                onChange={() => console.log("Toggle journey")}
                style={{
                  opacity: 0,
                  width: 0,
                  height: 0,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "#ccc",
                  transition: "0.4s",
                  borderRadius: "34px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    height: "16px",
                    width: "16px",
                    left: "2px",
                    bottom: "2px",
                    backgroundColor: "white",
                    transition: "0.4s",
                    borderRadius: "50%",
                  }}
                />
              </span>
            </label>
          </div>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: AppColors.gray700,
              marginBottom: "24px",
              textAlign: i18n.language === "ar" ? "right" : "left",
            }}
          >
            {t("checkIssues.reportedIssuesTitle")}
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
              direction: i18n.language === "ar" ? "rtl" : "ltr",
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
