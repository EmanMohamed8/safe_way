// import AppColors from "../theme/appColors";
// import Icon from "./icons";
// import logo from "../assets/logo.png"; // ✅ adjust path if needed

// const Header = ({
//   title,
//   showBackButton = false,
//   onBack,
//   bgColor = AppColors.primary,
// }) => (
//   <header
//     style={{
//       padding: "16px 24px",
//       display: "flex",
//       alignItems: "center",
//       boxShadow: AppColors.shadowGeneral,
//       backgroundColor: bgColor,
//       color: AppColors.white,
//       width: "100%",
//     }}
//   >
//     {showBackButton && (
//       <button
//         onClick={onBack}
//         style={{
//           padding: "8px",
//           marginRight: "16px",
//           borderRadius: "50%",
//           border: "none",
//           cursor: "pointer",
//           backgroundColor: "rgba(255, 255, 255, 0.2)",
//           transition: "background-color 150ms",
//         }}
//       >
//         <Icon name="chevron-left" size="24px" color={AppColors.white} />
//       </button>
//     )}

//     {/* ✅ Circular Logo */}
//     <img
//       src={logo}
//       alt="App Logo"
//       style={{
//         width: "40px",
//         height: "40px",
//         borderRadius: "50%", // makes it circular
//         objectFit: "cover", // ensures the image fits nicely
//         marginRight: "12px",
//       }}
//     />

//     {/* ✅ Title */}
//     <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>{title}</h2>

//     {/* ✅ User icon (only on Dashboard without back button) */}
//     {!showBackButton && title.includes("Dashboard") && (
//       <div style={{ marginLeft: "auto" }}>
//         <Icon name="user" size="24px" color={AppColors.white} />
//       </div>
//     )}
//   </header>
// );

// export default Header;

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppColors from "../theme/appColors";
import Icon from "./icons";
import logo from "../assets/logo.png"; // ✅ adjust path if needed

const Header = ({
  title,
  showBackButton = false,
  onBack,
  bgColor = AppColors.primary,
}) => {
  const { t, i18n } = useTranslation();

  // Update direction (RTL for Arabic, LTR for English)
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const switchToArabic = () => {
    i18n.changeLanguage("ar");
    localStorage.setItem("lang", "ar");
  };
  const switchToEnglish = () => {
    i18n.changeLanguage("en");
    localStorage.setItem("lang", "en");
  };

  return (
    // <header
    //   style={{
    //     padding: "16px 24px",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "space-between", // ✅ keeps left and right apart
    //     flexDirection: i18n.language === "ar" ? "row-reverse" : "row", // ✅ flip order in Arabic
    //     boxShadow: AppColors.shadowGeneral,
    //     backgroundColor: bgColor,
    //     color: AppColors.white,
    //     width: "100%",
    //     overflowX: "hidden",
    //     boxSizing: "border-box",
    //   }}
    // >
    //   {/* Left side: back + logo + title */}
    //   <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    //     {showBackButton && (
    //       <button
    //         onClick={onBack}
    //         style={{
    //           padding: "8px",
    //           borderRadius: "50%",
    //           border: "none",
    //           cursor: "pointer",
    //           backgroundColor: "rgba(255, 255, 255, 0.2)",
    //           transition: "background-color 150ms",
    //         }}
    //       >
    //         <Icon name="chevron-left" size="24px" color={AppColors.white} />
    //       </button>
    //     )}

    //     <img
    //       src={logo}
    //       alt="App Logo"
    //       style={{
    //         width: "40px",
    //         height: "40px",
    //         borderRadius: "50%",
    //         objectFit: "cover",
    //       }}
    //     />

    //     <h2
    //       style={{
    //         fontSize: "24px",
    //         fontWeight: "bold",
    //         margin: 0,
    //         whiteSpace: "nowrap",
    //         overflow: "hidden",
    //         textOverflow: "ellipsis",
    //         maxWidth: "300px",
    //       }}
    //     >
    //       {t(title)}
    //     </h2>
    //   </div>

    //   {/* Right side: user + language switch */}
    //   <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    //     {!showBackButton && title.includes("Dashboard") && (
    //       <Icon name="user" size="24px" color={AppColors.white} />
    //     )}

    //     <button
    //       onClick={switchToArabic}
    //       style={{
    //         background: "transparent",
    //         border: "none",
    //         color: AppColors.white,
    //         cursor: "pointer",
    //         fontWeight: i18n.language === "ar" ? "bold" : "normal",
    //       }}
    //     >
    //       Ar
    //     </button>
    //     <button
    //       onClick={switchToEnglish}
    //       style={{
    //         background: "transparent",
    //         border: "none",
    //         color: AppColors.white,
    //         cursor: "pointer",
    //         fontWeight: i18n.language === "en" ? "bold" : "normal",
    //       }}
    //     >
    //       En
    //     </button>
    //   </div>
    // </header>

    <header
      style={{
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // ✅ keeps left & right apart
        boxShadow: AppColors.shadowGeneral,
        backgroundColor: bgColor,
        color: AppColors.white,
        width: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
        flexDirection: "row", // ✅ always row (don’t flip logo)
      }}
    >
      {/* Left side: logo + title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          textAlign: i18n.language === "ar" ? "right" : "left", // ✅ text flips
        }}
      >
        <img
          src={logo}
          alt="App Logo"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: 0,
            direction: i18n.language === "ar" ? "rtl" : "ltr", // ✅ flip only text direction
          }}
        >
          {t(title)}
        </h2>
      </div>

      {/* Right side: user + language switch */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* {!showBackButton && title.includes("Dashboard") && (
          <Icon name="user" size="24px" color={AppColors.white} />
        )} */}

        <button
          onClick={switchToArabic}
          style={{
            background: "transparent",
            border: "none",
            color: AppColors.white,
            cursor: "pointer",
            fontWeight: i18n.language === "ar" ? "bold" : "normal",
          }}
        >
          Ar
        </button>
        <button
          onClick={switchToEnglish}
          style={{
            background: "transparent",
            border: "none",
            color: AppColors.white,
            cursor: "pointer",
            fontWeight: i18n.language === "en" ? "bold" : "normal",
          }}
        >
          En
        </button>
      </div>
    </header>

    // <header
    //   // style={{
    //   //   padding: "16px 24px",
    //   //   display: "flex",
    //   //   alignItems: "center",
    //   //   boxShadow: AppColors.shadowGeneral,
    //   //   backgroundColor: bgColor,
    //   //   color: AppColors.white,
    //   //   width: "100%",
    //   // }}
    //   style={{
    //     padding: "16px 24px",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent:
    //       i18n.language === "ar" ? "space-between" : "space-between",
    //     boxShadow: AppColors.shadowGeneral,
    //     backgroundColor: bgColor,
    //     color: AppColors.white,
    //     width: "100%",
    //     overflowX: "hidden",
    //     boxSizing: "border-box",
    //     flexDirection: i18n.language === "ar" ? "row-reverse" : "row", // ✅ flip layout
    //   }}
    // >
    //   {showBackButton && (
    //     <button
    //       onClick={onBack}
    //       style={{
    //         padding: "8px",
    //         marginRight: "16px",
    //         borderRadius: "50%",
    //         border: "none",
    //         cursor: "pointer",
    //         backgroundColor: "rgba(255, 255, 255, 0.2)",
    //         transition: "background-color 150ms",
    //       }}
    //     >
    //       <Icon name="chevron-left" size="24px" color={AppColors.white} />
    //     </button>
    //   )}

    //   {/* ✅ Circular Logo */}
    //   <img
    //     src={logo}
    //     alt="App Logo"
    //     style={{
    //       width: "40px",
    //       height: "40px",
    //       borderRadius: "50%",
    //       objectFit: "cover",
    //       marginRight: "12px",
    //     }}
    //   />

    //   {/* ✅ Title */}
    //   <h2
    //     style={{
    //       fontSize: "24px",
    //       fontWeight: "bold",
    //       margin: 0,
    //       whiteSpace: "nowrap", // ✅ prevent wrapping
    //       overflow: "hidden", // ✅ trim overflow
    //       textOverflow: "ellipsis", // ✅ show … if too long
    //       maxWidth: "60%", // ✅ don’t push buttons outside
    //     }}
    //   >
    //     {/* // style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}> */}
    //     {t(title)}
    //   </h2>

    //   {/* ✅ Right Section */}
    //   <div
    //     style={{
    //       marginLeft: "auto",
    //       display: "flex",
    //       alignItems: "center",
    //       gap: "8px",
    //     }}
    //   >
    //     {/* User icon (only on Dashboard without back button) */}
    //     {!showBackButton && title.includes("Dashboard") && (
    //       <Icon name="user" size="24px" color={AppColors.white} />
    //     )}

    //     {/* ✅ Language Switcher */}
    //     <button
    //       onClick={switchToArabic}
    //       style={{
    //         background: "transparent",
    //         border: "none",
    //         color: AppColors.white,
    //         cursor: "pointer",
    //       }}
    //     >
    //       Ar
    //     </button>
    //     <button
    //       onClick={switchToEnglish}
    //       style={{
    //         background: "transparent",
    //         border: "none",
    //         color: AppColors.white,
    //         cursor: "pointer",
    //       }}
    //     >
    //       En
    //     </button>
    //   </div>
    // </header>
  );
};

export default Header;
