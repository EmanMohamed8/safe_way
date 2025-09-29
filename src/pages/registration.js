import AppColors from "../theme/appColors";
import AppView from "../routes/paths";
import Icon from "../components/icons";
import { useState } from "react";

// const RegistrationScreen = ({ goToScreen }) => {
//   const handleSignUp = (e) => {
//     e.preventDefault();
//     // Navigate to /home path
//     goToScreen(AppView.HOME);
//   };

//   const inputStyle = `w-full p-3 border ${AppColors.inputBorder} rounded-xl transition duration-150`;

//   return (
//     <div className="min-h-screen bg-white flex flex-col justify-center items-center p-8">
//       <div className="w-full max-w-md">
//         {" "}
//         {/* Centered form container */}
//         <header className="text-center mb-10 pt-4">
//           <div
//             className={`inline-flex items-center justify-center ${AppColors.primary} p-3 rounded-xl mb-4 shadow-lg`}
//           >
//             <Icon name="map-pin" className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800">Welcome to FixIt</h1>
//           <p className="text-gray-500 mt-2">
//             Sign up to start making your community better.
//           </p>
//         </header>
//         <form onSubmit={handleSignUp} className="space-y-4">
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               placeholder="John Doe"
//               className={inputStyle}
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="you@example.com"
//               className={inputStyle}
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="••••••••"
//               className={inputStyle}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full p-4 mt-8 font-semibold rounded-xl text-white ${AppColors.primary} transition duration-200 shadow-lg shadow-blue-500/50`}
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>

//       <p className="text-center text-sm text-gray-500 mt-10">
//         Already have an account?{" "}
//         <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
//           Sign In
//         </a>
//       </p>
//     </div>
//   );
// };

// const RegistrationScreen = ({ goToScreen }) => {
//   const [focusedInput, setFocusedInput] = useState(null);

//   const handleSignUp = (e) => {
//     e.preventDefault();
//     goToScreen(AppView.HOME);
//   };

//   // Function to dynamically get input style based on focus state
//   const getInputStyle = (id) => {
//     const baseStyle = {
//       width: "100%",
//       padding: "12px",
//       border: `1px solid ${AppColors.inputBorder}`,
//       borderRadius: "12px",
//       transition: "all 150ms",
//       boxSizing: "border-box",
//       boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
//       outline: "none",
//     };
//     if (focusedInput === id) {
//       // Simulate focus ring and border
//       return {
//         ...baseStyle,
//         borderColor: AppColors.primary,
//         boxShadow: `0 0 0 3px ${AppColors.primary}40`, // Custom focus ring (40 is opacity)
//       };
//     }
//     return baseStyle;
//   };

//   const buttonStyle = {
//     width: "100%",
//     padding: "16px",
//     marginTop: "32px",
//     fontWeight: "600",
//     borderRadius: "12px",
//     color: AppColors.white,
//     backgroundColor: AppColors.primary,
//     transition: "background-color 200ms",
//     cursor: "pointer",
//     border: "none",
//     boxShadow: AppColors.shadowPrimary,
//     opacity: 1,
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: AppColors.white,
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "32px",
//       }}
//     >
//       <div style={{ width: "100%", maxWidth: "448px" }}>
//         <header
//           style={{
//             textAlign: "center",
//             marginBottom: "40px",
//             paddingTop: "16px",
//           }}
//         >
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: AppColors.primary,
//               padding: "12px",
//               borderRadius: "12px",
//               marginBottom: "16px",
//               boxShadow: AppColors.shadowGeneral,
//             }}
//           >
//             <Icon name="map-pin" size="32px" color={AppColors.white} />
//           </div>
//           <h1
//             style={{
//               fontSize: "30px",
//               fontWeight: "bold",
//               color: AppColors.grayHeavy,
//             }}
//           >
//             Welcome to FixIt
//           </h1>
//           <p style={{ color: AppColors.grayText, marginTop: "8px" }}>
//             Sign up to start making your community better.
//           </p>
//         </header>

//         <form
//           onSubmit={handleSignUp}
//           style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//         >
//           <div>
//             <label
//               htmlFor="name"
//               style={{
//                 display: "block",
//                 fontSize: "14px",
//                 fontWeight: "500",
//                 color: AppColors.labelColor,
//                 marginBottom: "4px",
//               }}
//             >
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               placeholder="John Doe"
//               style={getInputStyle("name")}
//               onFocus={() => setFocusedInput("name")}
//               onBlur={() => setFocusedInput(null)}
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="email"
//               style={{
//                 display: "block",
//                 fontSize: "14px",
//                 fontWeight: "500",
//                 color: AppColors.labelColor,
//                 marginBottom: "4px",
//               }}
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="you@example.com"
//               style={getInputStyle("email")}
//               onFocus={() => setFocusedInput("email")}
//               onBlur={() => setFocusedInput(null)}
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               style={{
//                 display: "block",
//                 fontSize: "14px",
//                 fontWeight: "500",
//                 color: AppColors.labelColor,
//                 marginBottom: "4px",
//               }}
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="••••••••"
//               style={getInputStyle("password")}
//               onFocus={() => setFocusedInput("password")}
//               onBlur={() => setFocusedInput(null)}
//               required
//             />
//           </div>
//           <button type="submit" style={buttonStyle}>
//             Sign Up
//           </button>
//         </form>
//       </div>

//       <p
//         style={{
//           textAlign: "center",
//           fontSize: "14px",
//           color: AppColors.grayText,
//           marginTop: "40px",
//         }}
//       >
//         Already have an account?{" "}
//         <a
//           href="#"
//           style={{
//             color: AppColors.primary,
//             fontWeight: "500",
//             textDecoration: "none",
//           }}
//         >
//           Sign In
//         </a>
//       </p>
//     </div>
//   );
// };

// const RegistrationScreen = ({ goToScreen }) => {
//   const [focusedInput, setFocusedInput] = useState(null);

//   const handleSignUp = (e) => {
//     e.preventDefault();
//     goToScreen(AppView.HOME);
//   };

//   const getInputStyle = (id) => {
//     const baseStyle = {
//       width: "100%",
//       padding: "12px",
//       border: `1px solid ${AppColors.gray300}`,
//       borderRadius: "12px",
//       transition: "all 150ms",
//       boxSizing: "border-box",
//       boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
//       outline: "none",
//     };
//     if (focusedInput === id) {
//       return {
//         ...baseStyle,
//         borderColor: AppColors.primary,
//         boxShadow: `0 0 0 3px ${AppColors.primary}40`,
//       };
//     }
//     return baseStyle;
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: "32px",
//         backgroundColor: AppColors.white,
//         overflowY: "auto",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "448px",
//           margin: "0 auto",
//           flexGrow: 1,
//         }}
//       >
//         <header
//           style={{
//             textAlign: "center",
//             marginBottom: "40px",
//             paddingTop: "16px",
//           }}
//         >
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: AppColors.primary,
//               padding: "12px",
//               borderRadius: "12px",
//               marginBottom: "16px",
//               boxShadow: AppColors.shadowPrimary,
//             }}
//           >
//             <Icon name="map-pin" size="32px" color={AppColors.white} />
//           </div>
//           <h1
//             style={{
//               fontSize: "30px",
//               fontWeight: "bold",
//               color: AppColors.gray800,
//             }}
//           >
//             Welcome to FixIt
//           </h1>
//           <p style={{ color: AppColors.gray500, marginTop: "8px" }}>
//             Sign up to start making your community better.
//           </p>
//         </header>

//         <form
//           onSubmit={handleSignUp}
//           style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//         >
//           {["Full Name", "Email Address", "Password"].map((label, index) => (
//             <div key={label}>
//               <label
//                 htmlFor={label}
//                 style={{
//                   display: "block",
//                   fontSize: "14px",
//                   fontWeight: "500",
//                   color: AppColors.gray700,
//                   marginBottom: "4px",
//                 }}
//               >
//                 {label}
//               </label>
//               <input
//                 type={
//                   label.includes("Password")
//                     ? "password"
//                     : label.includes("Email")
//                     ? "email"
//                     : "text"
//                 }
//                 id={label}
//                 placeholder={
//                   label.includes("Password")
//                     ? "••••••••"
//                     : label.includes("Email")
//                     ? "you@example.com"
//                     : "John Doe"
//                 }
//                 style={getInputStyle(label)}
//                 onFocus={() => setFocusedInput(label)}
//                 onBlur={() => setFocusedInput(null)}
//                 required
//               />
//             </div>
//           ))}
//           <button
//             type="submit"
//             style={{
//               width: "100%",
//               padding: "16px",
//               marginTop: "32px",
//               fontWeight: "600",
//               borderRadius: "12px",
//               color: AppColors.white,
//               backgroundColor: AppColors.primary,
//               transition: "background-color 200ms",
//               border: "none",
//               boxShadow: AppColors.shadowPrimary,
//               cursor: "pointer",
//             }}
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>

//       <p
//         style={{
//           textAlign: "center",
//           fontSize: "14px",
//           color: AppColors.gray500,
//           marginTop: "40px",
//         }}
//       >
//         Already have an account?{" "}
//         <a
//           href="#"
//           style={{
//             color: AppColors.primary,
//             fontWeight: "500",
//             textDecoration: "none",
//           }}
//         >
//           Sign In
//         </a>
//       </p>
//     </div>
//   );
// };

// const RegistrationScreen = ({ goToScreen }) => {
//   const [focusedInput, setFocusedInput] = useState(null);

//   const handleSignUp = (e) => {
//     e.preventDefault();
//     goToScreen(AppView.HOME);
//   };

//   const getInputStyle = (id) => {
//     const baseStyle = {
//       width: "100%",
//       padding: "12px",
//       border: `1px solid ${AppColors.gray300}`,
//       borderRadius: "12px",
//       transition: "all 150ms",
//       boxSizing: "border-box",
//       boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
//       outline: "none",
//     };
//     if (focusedInput === id) {
//       return {
//         ...baseStyle,
//         borderColor: AppColors.primary,
//         boxShadow: `0 0 0 3px ${AppColors.primary}40`,
//       };
//     }
//     return baseStyle;
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         minHeight: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: "32px",
//         backgroundColor: AppColors.white,
//         overflowY: "auto",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "448px",
//           margin: "0 auto",
//           flexGrow: 0,
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <header
//           style={{
//             textAlign: "center",
//             marginBottom: "40px",
//             paddingTop: "16px",
//           }}
//         >
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: AppColors.primary,
//               padding: "12px",
//               borderRadius: "12px",
//               marginBottom: "16px",
//               boxShadow: AppColors.shadowPrimary,
//             }}
//           >
//             <Icon name="map-pin" size="32px" color={AppColors.white} />
//           </div>
//           <h1
//             style={{
//               fontSize: "30px",
//               fontWeight: "bold",
//               color: AppColors.gray800,
//             }}
//           >
//             Welcome to FixIt
//           </h1>
//           <p style={{ color: AppColors.gray500, marginTop: "8px" }}>
//             Sign up to start making your community better.
//           </p>
//         </header>

//         <form
//           onSubmit={handleSignUp}
//           style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//         >
//           {["Full Name", "Email Address", "Password"].map((label, index) => (
//             <div key={label}>
//               <label
//                 htmlFor={label}
//                 style={{
//                   display: "block",
//                   fontSize: "14px",
//                   fontWeight: "500",
//                   color: AppColors.gray700,
//                   marginBottom: "4px",
//                 }}
//               >
//                 {label}
//               </label>
//               <input
//                 type={
//                   label.includes("Password")
//                     ? "password"
//                     : label.includes("Email")
//                     ? "email"
//                     : "text"
//                 }
//                 id={label}
//                 placeholder={
//                   label.includes("Password")
//                     ? "••••••••"
//                     : label.includes("Email")
//                     ? "you@example.com"
//                     : "John Doe"
//                 }
//                 style={getInputStyle(label)}
//                 onFocus={() => setFocusedInput(label)}
//                 onBlur={() => setFocusedInput(null)}
//                 required
//               />
//             </div>
//           ))}
//           <button
//             type="submit"
//             style={{
//               width: "100%",
//               padding: "16px",
//               marginTop: "32px",
//               fontWeight: "600",
//               borderRadius: "12px",
//               color: AppColors.white,
//               backgroundColor: AppColors.primary,
//               transition: "background-color 200ms",
//               border: "none",
//               boxShadow: AppColors.shadowPrimary,
//               cursor: "pointer",
//             }}
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>

//       <p
//         style={{
//           textAlign: "center",
//           fontSize: "14px",
//           color: AppColors.gray500,
//           marginTop: "40px",
//         }}
//       >
//         Already have an account?{" "}
//         <a
//           href="#"
//           style={{
//             color: AppColors.primary,
//             fontWeight: "500",
//             textDecoration: "none",
//           }}
//         >
//           Sign In
//         </a>
//       </p>
//     </div>
//   );
// };
const RegistrationScreen = ({ goToScreen }) => {
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();
    goToScreen(AppView.HOME);
  };

  const getInputStyle = (id) => {
    const baseStyle = {
      width: "100%",
      padding: "12px",
      border: `1px solid ${AppColors.gray300}`,
      borderRadius: "12px",
      transition: "all 150ms",
      boxSizing: "border-box",
      boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
      outline: "none",
    };
    if (focusedInput === id) {
      return {
        ...baseStyle,
        borderColor: AppColors.primary,
        boxShadow: `0 0 0 3px ${AppColors.primary}40`,
      };
    }
    return baseStyle;
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px",
        backgroundColor: AppColors.white,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "448px",
          margin: "0 auto",
          flexGrow: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            textAlign: "center",
            marginBottom: "40px",
            paddingTop: "16px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: AppColors.primary,
              padding: "12px",
              borderRadius: "12px",
              marginBottom: "16px",
              boxShadow: AppColors.shadowPrimary,
            }}
          >
            <Icon name="map-pin" size="32px" color={AppColors.white} />
          </div>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: AppColors.gray800,
            }}
          >
            Welcome to FixIt
          </h1>
          <p style={{ color: AppColors.gray500, marginTop: "8px" }}>
            Sign up to start making your community better.
          </p>
        </header>

        <form
          onSubmit={handleSignUp}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {["Full Name", "Email Address", "Password"].map((label, index) => (
            <div key={label}>
              <label
                htmlFor={label}
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: AppColors.gray700,
                  marginBottom: "4px",
                }}
              >
                {label}
              </label>
              <input
                type={
                  label.includes("Password")
                    ? "password"
                    : label.includes("Email")
                    ? "email"
                    : "text"
                }
                id={label}
                placeholder={
                  label.includes("Password")
                    ? "••••••••"
                    : label.includes("Email")
                    ? "you@example.com"
                    : "John Doe"
                }
                style={getInputStyle(label)}
                onFocus={() => setFocusedInput(label)}
                onBlur={() => setFocusedInput(null)}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              marginTop: "32px",
              fontWeight: "600",
              borderRadius: "12px",
              color: AppColors.white,
              backgroundColor: AppColors.primary,
              transition: "background-color 200ms",
              border: "none",
              boxShadow: AppColors.shadowPrimary,
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </form>
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: "14px",
          color: AppColors.gray500,
          marginTop: "40px",
        }}
      >
        Already have an account?{" "}
        <a
          href="#"
          style={{
            color: AppColors.primary,
            fontWeight: "500",
            textDecoration: "none",
          }}
        >
          Sign In
        </a>
      </p>
    </div>
  );
};

export default RegistrationScreen;
