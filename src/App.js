import i18n from "./i18n";
import AppView from "./routes/paths";
import RegistrationScreen from "./pages/registration";
import ReportScreen from "./pages/reportScreen";
import CheckIssuesScreen from "./pages/checkIssues";
import DetailsScreen from "./pages/detail";
import HomeScreen from "./pages/home";
import useWouter from "./routes/useWouter";
import Route from "./routes/route";
import AppColors from "./theme/appColors";
import { useEffect } from "react";
import HelpCommunityScreen from "./pages/helpCommunity";

export default function App() {
  const { path, navigate, routeProps } = useWouter();
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

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
        <Route
          path={AppView.HELP}
          component={HelpCommunityScreen}
          isCurrent={path === AppView.HELP}
          navigate={navigate}
          routeProps={routeProps}
        />
      </div>
    </div>
  );
}
