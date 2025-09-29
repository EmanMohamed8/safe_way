import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppColors from "../theme/appColors";
import AppView from "../routes/paths";
import Icon from "../components/icons";
import Header from "../components/header";

const DetailsScreen = ({ goToScreen, routeProps }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const locationInfo = routeProps?.location || "Location not passed.";
  const imageData = routeProps?.imageData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageData) {
      alert("No photo captured!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Parse coordinates from locationInfo string passed from previous screen
      // Example: "Lat: 30.0444, Lon: 31.2357 (GPS)"
      const coordsMatch = locationInfo.match(
        /Lat:\s*([\d.]+),\s*Lon:\s*([\d.]+)/
      );
      const lat = coordsMatch ? parseFloat(coordsMatch[1]) : 0;
      const lng = coordsMatch ? parseFloat(coordsMatch[2]) : 0;

      // Step 1: Get presigned URL
      const urlResponse = await fetch(
        "https://goeafzb84a.execute-api.us-west-2.amazonaws.com/dev/generate-Upload-Url",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mimeType: "image/jpeg",
            lat,
            lng,
          }),
        }
      );

      if (!urlResponse.ok) throw new Error("Failed to get presigned URL");

      const { uploadUrl, requiredHeaders, reportId, objectKey, bucket } =
        await urlResponse.json();

      console.log("Presigned URL received:", uploadUrl);

      // Convert base64 imageData to Blob if needed
      let fileBlob;
      if (imageData.startsWith("data:")) {
        const res = await fetch(imageData);
        fileBlob = await res.blob();
      } else {
        fileBlob = imageData; // already a File/Blob
      }

      // Step 2: Upload image to S3
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: requiredHeaders,
        body: fileBlob,
      });

      if (!uploadResponse.ok) throw new Error("Failed to upload image");

      console.log("Upload successful:", { reportId, bucket, objectKey });

      // Optional: Submit report data to your backend
      console.log("Report Submitted:", {
        // issueType,
        // description,
        location: { lat, lng },
        reportId,
        photoUrl: uploadUrl.split("?")[0], // S3 object URL without query params
      });

      alert("Report submitted successfully!");
      goToScreen(AppView.HOME);
    } catch (err) {
      console.error("Error submitting report:", err);
      alert("❌ Failed to submit report. Please check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitButtonStyle = {
    width: "100%",
    padding: "16px",
    fontWeight: "600",
    borderRadius: "12px",
    color: AppColors.white,
    backgroundColor: AppColors.primary,
    cursor: "pointer",
    border: "none",
    boxShadow: AppColors.shadowPrimary,
    opacity: isSubmitting ? 0.5 : 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
            <button
              type="submit"
              style={submitButtonStyle}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
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
          </form>
        </div>
      </main>
    </div>
  );
};

export default DetailsScreen;
