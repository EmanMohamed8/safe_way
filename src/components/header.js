import AppColors from "../theme/appColors";
import Icon from "./icons";

// const Header = ({ title, showBackButton, onBack, bgColor }) => (
//   <header
//     style={{
//       padding: "24px",
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
//     <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{title}</h2>
//     {!showBackButton && title.includes("Dashboard") && (
//       <div style={{ marginLeft: "auto" }}>
//         <Icon name="user" size="24px" color={AppColors.white} />
//       </div>
//     )}
//   </header>
// );

const Header = ({ title, showBackButton, onBack, bgColor }) => (
  <header
    style={{
      padding: "24px",
      display: "flex",
      alignItems: "center",
      boxShadow: AppColors.shadowGeneral,
      backgroundColor: bgColor,
      color: AppColors.white,
      width: "100%",
    }}
  >
    {showBackButton && (
      <button
        onClick={onBack}
        style={{
          padding: "8px",
          marginRight: "16px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          transition: "background-color 150ms",
        }}
      >
        <Icon name="chevron-left" size="24px" color={AppColors.white} />
      </button>
    )}
    <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{title}</h2>
    {!showBackButton && title.includes("Dashboard") && (
      <div style={{ marginLeft: "auto" }}>
        <Icon name="user" size="24px" color={AppColors.white} />
      </div>
    )}
  </header>
);

export default Header;
