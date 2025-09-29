import AppColors from "../theme/appColors";
import AppView from "../routes/paths";
import Icon from "../components/icons";
import { useState } from "react";

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
