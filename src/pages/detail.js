import { useState } from "react";
import AppColors from "../theme/appColors";
import AppView from "../routes/paths";
import Icon from "../components/icons";
import Header from "../components/header";

const DetailsScreen = ({ goToScreen, routeProps }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");

  const locationInfo = routeProps?.location || "Location not passed.";
  const imageData = routeProps?.imageData;

  const issueTypes = [
    "Pothole",
    "Broken Street Light",
    "Graffiti/Vandalism",
    "Missing Signage",
    "Other Road Hazard",
  ];

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!issueType || !description) {
  //     alert("Please fill all required fields.");
  //     return;
  //   }
  //   if (!imageData) {
  //     alert("No photo captured!");
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     // API Simulation
  //     await new Promise((r) => setTimeout(r, 2000));

  //     console.log("Report Submitted:", {
  //       issueType,
  //       description,
  //       location: locationInfo,
  //       photoDataSize: imageData.length,
  //     });

  //     alert("Report submitted successfully!");
  //     goToScreen(AppView.HOME);
  //   } catch (err) {
  //     console.error("Error submitting report:", err);
  //     alert("❌ Failed to submit report. Please check console for details.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!issueType || !description) {
  //     alert("Please fill all required fields.");
  //     return;
  //   }
  //   if (!imageData) {
  //     alert("No photo captured!");
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     // Step 1: Get presigned URL
  //     const urlResponse = await fetch(
  //       "https://goeafzb84a.execute-api.us-west-2.amazonaws.com/dev/generate-Upload-Url",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           mimeType: "image/jpeg",
  //           lat: 30.0444,
  //           lng: 31.2357,
  //         }),
  //       }
  //     );

  //     if (!urlResponse.ok) throw new Error("Failed to get presigned URL");

  //     const { uploadUrl, requiredHeaders, reportId, objectKey, bucket } =
  //       await urlResponse.json();

  //     console.log("Presigned URL received:", uploadUrl);

  //     // Step 2: Upload image to S3
  //     const uploadResponse = await fetch(uploadUrl, {
  //       method: "PUT",
  //       headers: requiredHeaders,
  //       body: imageData, // this should be a Blob or File
  //     });

  //     if (!uploadResponse.ok) throw new Error("Failed to upload image");

  //     console.log("Upload successful:", {
  //       reportId,
  //       bucket,
  //       objectKey,
  //     });

  //     // Optional: Submit report data to your backend
  //     console.log("Report Submitted:", {
  //       issueType,
  //       description,
  //       location: { lat: 30.0444, lng: 31.2357 },
  //       reportId,
  //       photoUrl: uploadUrl.split("?")[0], // S3 object URL without query params
  //     });

  //     alert("Report submitted successfully!");
  //     goToScreen(AppView.HOME);
  //   } catch (err) {
  //     console.error("Error submitting report:", err);
  //     alert("❌ Failed to submit report. Please check console for details.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issueType || !description) {
      alert("Please fill all required fields.");
      return;
    }
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
        issueType,
        description,
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

  const formInputStyle = {
    width: "100%",
    padding: "12px",
    border: `1px solid ${AppColors.gray300}`,
    borderRadius: "12px",
    transition: "all 150ms",
    boxShadow: AppColors.shadowGeneral,
    resize: "vertical",
    outline: "none",
  };
  const submitButtonStyle = {
    width: "100%",
    padding: "16px",
    fontWeight: "600",
    borderRadius: "12px",
    color: AppColors.white,
    backgroundColor: AppColors.primary,
    transition: "all 200ms",
    cursor: "pointer",
    border: "none",
    boxShadow: AppColors.shadowPrimary,
    opacity: isSubmitting ? 0.5 : 1,
    pointerEvents: isSubmitting ? "none" : "auto",
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
        title="Report Issue Details"
        bgColor={AppColors.red600}
        showBackButton={true}
        onBack={() => goToScreen(AppView.REPORT)}
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
        <div
          style={{
            width: "100%",
            maxWidth: "512px",
            backgroundColor: AppColors.white,
            padding: "32px",
            borderRadius: "12px",
            boxShadow: AppColors.shadowGeneral,
            border: `1px solid ${AppColors.gray200}`,
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Photo Preview and Status */}
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
                    alt="Captured Preview"
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: AppColors.red600,
                    marginBottom: "4px",
                  }}
                >
                  Photo Confirmed
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: AppColors.gray600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Location: {locationInfo}
                </p>
              </div>
            </div>

            {/* 1. Issue Type Dropdown */}
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: AppColors.gray700,
                marginBottom: "4px",
              }}
            >
              Issue Type
            </label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              style={{
                ...formInputStyle,
                height: "46px",
                appearance: "none",
                marginBottom: "24px",
              }}
              required
            >
              <option value="" disabled>
                Select the main type of issue
              </option>
              {issueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {/* 2. Detailed Description */}
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: AppColors.gray700,
                marginBottom: "4px",
              }}
            >
              Detailed Description
            </label>
            <textarea
              rows="4"
              placeholder="Describe the issue (size, severity, location context)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ ...formInputStyle, marginBottom: "32px" }}
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              style={submitButtonStyle}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name="loader-2"
                    size="20px"
                    color={AppColors.white}
                    style={{
                      marginRight: "8px",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Submitting...
                </span>
              ) : (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name="send"
                    size="20px"
                    color={AppColors.white}
                    style={{ marginRight: "8px" }}
                  />
                  Submit Report
                </span>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DetailsScreen;
