import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppColors from "../theme/appColors";
import AppView from "../routes/paths";
import Icon from "../components/icons";
import Header from "../components/header";

const DetailsScreen = ({ goToScreen, routeProps }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportMessage, setReportMessage] = useState(""); // Message under button
  const [reportStatus, setReportStatus] = useState(""); // "success", "pending", "error"

  const locationInfo = routeProps?.location || "Location not passed.";
  const imageData = routeProps?.imageData;
  const [loading, setLoading] = useState(false); // new state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageData) {
      alert("No photo captured!");
      return;
    }

    if (isSubmitting) return; // prevent double submit
    setLoading(true); // show spinner first
    setReportMessage("");
    setReportStatus("pending");

    try {
      const lat = routeProps?.latitude ?? 0;
      const lng = routeProps?.longitude ?? 0;

      // Optional: simulate a small loading delay before disabling button
      // await new Promise((resolve) => setTimeout(resolve, 500));

      setIsSubmitting(true); // now disable button

      // Step 1: Get presigned URL
      const postBody = { mimeType: "image/jpeg", lat, lng };
      const urlResponse = await fetch(
        "https://goeafzb84a.execute-api.us-west-2.amazonaws.com/dev/generate-Upload-Url",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postBody),
        }
      );

      if (!urlResponse.ok) throw new Error("Failed to get presigned URL");

      const { uploadUrl, reportId } = await urlResponse.json();

      // Step 2: Upload image
      const putResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": "image/jpeg" },
        body: dataURLtoBlob(imageData),
      });

      if (!putResponse.ok) throw new Error("Failed to upload image");

      // Step 3: Poll report summary (max 3 tries, 3 sec apart)
      const pollReportSummary = async (attempt = 1) => {
        if (attempt > 10) {
          setReportMessage(
            "⚠️ Report not ready after attempt. Try again later."
          );
          setReportStatus("error");
          setLoading(false);
          return;
        }

        try {
          const summaryResponse = await fetch(
            `https://goeafzb84a.execute-api.us-west-2.amazonaws.com/dev/reports/${reportId}/summary`
          );
          if (!summaryResponse.ok)
            throw new Error("Failed to fetch report summary");

          const summaryData = await summaryResponse.json();

          if (summaryData.ready) {
            setReportMessage(summaryData.message);
            setReportStatus("success");
            setLoading(false);
          } else {
            setReportMessage(summaryData.message);
            setReportStatus("pending");
            const delay = (summaryData.retryAfterSec ?? 3) * 1000;
            setTimeout(() => pollReportSummary(attempt + 1), delay);
          }
        } catch (err) {
          console.error("Error polling report:", err);
          setReportMessage("❌ Failed to get report summary. Check console.");
          setReportStatus("error");
          setLoading(false);
        }
      };

      pollReportSummary();
    } catch (err) {
      console.error("Error submitting report:", err);
      setReportMessage("❌ Failed to submit report. Check console.");
      setReportStatus("error");
      setLoading(false);
    }
  };

  function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  }

  const submitButtonStyle = {
    width: "100%",
    padding: "16px",
    fontWeight: "600",
    borderRadius: "12px",
    color: AppColors.white,
    backgroundColor: AppColors.primary,
    cursor: isSubmitting ? "not-allowed" : "pointer",
    border: "none",
    boxShadow: AppColors.shadowPrimary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: isSubmitting ? 0.5 : 1,
  };

  const messageCardStyle = {
    marginTop: "16px",
    padding: "16px",
    borderRadius: "12px",
    backgroundColor:
      reportStatus === "success"
        ? AppColors.green100
        : reportStatus === "pending"
        ? AppColors.yellow100
        : AppColors.red100,
    border:
      reportStatus === "success"
        ? `1px solid ${AppColors.green600}`
        : reportStatus === "pending"
        ? `1px solid ${AppColors.yellow600}`
        : `1px solid ${AppColors.red600}`,
    color:
      reportStatus === "success"
        ? AppColors.green800
        : reportStatus === "pending"
        ? AppColors.yellow800
        : AppColors.red800,
    whiteSpace: "pre-line",
    fontSize: "14px",
    boxShadow: AppColors.shadowGeneral,
  };

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
        title={t("issues.detailsTitle")}
        bgColor={AppColors.red600}
        showBackButton={true}
        onBack={() => goToScreen(AppView.REPORT)}
      />

      <main
        style={{
          flexGrow: 1,
          padding: "32px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "512px",
            backgroundColor: AppColors.white,
            padding: "32px",
            borderRadius: "12px",
            boxShadow: AppColors.shadowGeneral,
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Photo Preview */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                border: `1px solid ${AppColors.gray300}`,
                padding: "16px",
                borderRadius: "12px",
                marginBottom: "24px",
                backgroundColor: AppColors.red50,
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  marginRight: "16px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: `2px solid ${AppColors.gray300}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: AppColors.gray200,
                }}
              >
                {imageData ? (
                  <img
                    src={imageData}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Icon name="image" size="32px" color={AppColors.gray500} />
                )}
              </div>
              <div style={{ flexGrow: 1 }}>
                <p
                  style={{
                    fontWeight: "bold",
                    color: AppColors.red600,
                    marginBottom: "4px",
                  }}
                >
                  {t("issues.photoConfirmed")}
                </p>
                <p style={{ fontSize: "14px", color: AppColors.gray600 }}>
                  {t("issues.location")}: {locationInfo}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            {/* <button
              type="submit"
              style={submitButtonStyle}
              disabled={isSubmitting}
            >
              {t("issues.submit")}
            </button> */}
            <button
              type="submit"
              style={submitButtonStyle}
              disabled={isSubmitting}
            >
              {loading ? (
                <>
                  <Icon
                    name="loader-2"
                    size="20px"
                    color={AppColors.white}
                    style={{
                      marginRight: "8px",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  {t("issues.submitting")}
                </>
              ) : (
                <>
                  <Icon
                    name="send"
                    size="20px"
                    color={AppColors.white}
                    style={{ marginRight: "8px" }}
                  />
                  {t("issues.submit")}
                </>
              )}
            </button>
            {/* Styled Report Message */}
            {reportMessage && (
              <div style={messageCardStyle}>{reportMessage}</div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default DetailsScreen;
