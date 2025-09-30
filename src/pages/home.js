import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppColors from "../theme/appColors";
import AppView from "../routes/paths";
import Icon from "../components/icons";
import Header from "../components/header";

const HomeScreen = ({ goToScreen }) => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine responsive values
  const getPadding = () => {
    if (windowWidth <= 480) return 20;
    if (windowWidth <= 768) return 24;
    if (windowWidth <= 1024) return 32;
    return 32;
  };

  const getH3FontSize = () => {
    if (windowWidth <= 480) return 20;
    if (windowWidth <= 768) return 22;
    return 24;
  };

  const getH4FontSize = () => {
    if (windowWidth <= 480) return 16;
    if (windowWidth <= 768) return 18;
    return 20;
  };

  const getPFontSize = () => {
    if (windowWidth <= 480) return 14;
    if (windowWidth <= 768) return 15;
    return 16;
  };

  const getGridColumns = () => {
    if (windowWidth <= 768) return "1fr";
    return "repeat(2, 1fr)";
  };

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
        padding: getPadding(),
        backgroundColor: bgColor,
        borderRadius: 16,
        boxShadow: shadow,
        cursor: "pointer",
        minHeight: 200,
        border: `2px solid ${borderColor}`,
        boxSizing: "border-box",
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <div
          style={{
            padding: 12,
            backgroundColor: color,
            borderRadius: "50%",
            marginRight: 16,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name={iconName} size="24px" color={AppColors.white} />
        </div>
        <span
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: color,
            paddingRight: "10px",
          }}
        >
          {title}
        </span>
      </div>
      <p style={{ fontSize: 14, color: AppColors.gray600 }}>{description}</p>
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
        overflowX: "hidden",
      }}
    >
      <Header
        title="home.homeTitle"
        bgColor={AppColors.primary}
        showBackButton={false}
        goToScreen={goToScreen}
      />

      <main
        style={{
          flexGrow: 1,
          padding: `${getPadding()}px`,
          width: "100%",
          maxWidth: 1152,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <h3
          style={{
            fontSize: getH3FontSize(),
            fontWeight: 600,
            color: AppColors.gray700,
            marginBottom: 32,
            wordWrap: "break-word",
          }}
        >
          {t("home.title")}
        </h3>

        <div
          style={{
            display: "grid",
            gap: 32,
            gridTemplateColumns: getGridColumns(),
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
          <ActionButton
            iconName="users"
            title={t("home.helpCommunityTitle")}
            description={t("home.helpCommunityDescription")}
            route={AppView.HELP}
            color={AppColors.green600}
            bgColor={AppColors.green50}
            borderColor="#86EFAC"
            shadow={AppColors.shadowGreen}
          />
        </div>

        <div
          style={{
            backgroundColor: AppColors.white,
            padding: getPadding(),
            borderRadius: 12,
            marginTop: 48,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <h4
            style={{
              fontWeight: 600,
              color: AppColors.gray700,
              display: "flex",
              alignItems: "center",
              marginBottom: 16,
              fontSize: getH4FontSize(),
              wordWrap: "break-word",
            }}
          >
            <Icon
              name="activity"
              size="20px"
              color={AppColors.green600}
              style={{ marginRight: 12 }}
            />
            {t("home.snapshotTitle")}
          </h4>
          <p
            style={{
              fontSize: getPFontSize(),
              color: AppColors.gray600,
              lineHeight: 1.6,
              wordWrap: "break-word",
            }}
          >
            {t("home.snapshotMessage")}{" "}
            <a
              href="#"
              style={{
                color: AppColors.green600,
                fontWeight: 500,
                textDecoration: "underline",
                wordWrap: "break-word",
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
