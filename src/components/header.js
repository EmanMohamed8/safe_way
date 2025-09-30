import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppColors from "../theme/appColors";
import Icon from "./icons";
import logo from "../assets/logo.png"; // ✅ adjust path if needed
import AppView from "../routes/paths";

const Header = ({
  title,
  showBackButton = false,
  onBack,
  bgColor = AppColors.primary,
  demo,
  goToScreen,
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
    <header
      style={{
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: AppColors.shadowGeneral,
        backgroundColor: bgColor,
        color: AppColors.white,
        width: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
        flexDirection: "row",
      }}
    >
      {/* Left side: logo + title + demo badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          textAlign: i18n.language === "ar" ? "right" : "left",
        }}
      >
        <a href={AppView.HOME} style={{ display: "inline-block" }}>
          <img
            src={logo}
            alt="App Logo"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </a>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: 0,
            direction: i18n.language === "ar" ? "rtl" : "ltr",
          }}
        >
          {t(title)}
        </h2>

        {/* Demo badge */}
        {demo && (
          <span
            style={{
              marginLeft: "8px",
              padding: "2px 6px",
              backgroundColor: "rgba(255,255,255,0.2)",
              color: AppColors.white,
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Demo Only
          </span>
        )}
      </div>

      {/* Right side: language switch */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
          ع
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
  );
};

export default Header;
