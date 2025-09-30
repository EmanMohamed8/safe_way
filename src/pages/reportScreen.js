import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import AppView from "../routes/paths";
import AppColors from "../theme/appColors";
import Icon from "../components/icons";
import Header from "../components/header";

const ReportScreen = ({ goToScreen }) => {
  const { t } = useTranslation();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const [stream, setStream] = useState(null);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(
    t("report.findingGps")
  );
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedPhotoPath, setCapturedPhotoPath] = useState(null);

  // ---------------- Reverse Geocoding ----------------
  const fetchAddressFromCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      if (data && data.address) {
        const { road, city, town, village, state, country } = data.address;
        return `${road ? road + ", " : ""}${city || town || village || ""}${
          state ? ", " + state : ""
        }, ${country || ""}`;
      }
      return "Location not found";
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return "Failed to get location";
    }
  };

  // ---------------- Camera Initialization ----------------
  useEffect(() => {
    let activeStream = null;
    if (isPhotoTaken || capturedImage) return;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((newStream) => {
          activeStream = newStream;
          if (videoRef.current) {
            videoRef.current.srcObject = newStream;
            videoRef.current.onloadedmetadata = () => videoRef.current.play();
          }
          setStream(newStream);
        })
        .catch(() => setStream(false));
    } else {
      setStream(false);
    }

    return () => {
      if (activeStream)
        activeStream.getTracks().forEach((track) => track.stop());
      else if (stream && stream !== false)
        stream.getTracks().forEach((track) => track.stop());
    };
  }, [isPhotoTaken, capturedImage]);

  // ---------------- Geolocation & Reverse Geocoding ----------------
  useEffect(() => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const coords = pos.coords;
          setLatitude(coords.latitude);
          setLongitude(coords.longitude);

          // Display coordinates first
          setCurrentLocation(
            `Lat: ${coords.latitude.toFixed(
              4
            )}, Lon: ${coords.longitude.toFixed(4)}`
          );

          // Fetch human-readable address
          const address = await fetchAddressFromCoords(
            coords.latitude,
            coords.longitude
          );
          setCurrentLocation(address);
          setIsLocationLoading(false);
        },
        (err) => {
          const message =
            err.code === err.PERMISSION_DENIED
              ? t("report.locationDenied")
              : t("report.locationFailed");
          setCurrentLocation(message);
          setIsLocationLoading(false);
        },
        options
      );
    } else {
      setCurrentLocation(t("report.noGps"));
      setIsLocationLoading(false);
    }
  }, [t]);

  // ---------------- Photo Capture ----------------
  const handleCapture = () => {
    if (isLocationLoading || isPhotoTaken) return;

    if (videoRef.current && canvasRef.current && stream) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const photoDataUrl = canvas.toDataURL("image/png");

      setCapturedImage(photoDataUrl);
      setCapturedPhotoPath(
        `${t("report.capturedAt")} ${new Date().toLocaleTimeString()}`
      );
      setIsPhotoTaken(true);

      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    } else if (stream === false) {
      setCapturedImage("data:image/svg+xml;charset=UTF-8,..."); // fallback
      setCapturedPhotoPath(
        `${t("report.simulatedAt")} ${new Date().toLocaleTimeString()}`
      );
      setIsPhotoTaken(true);
    }
  };

  // ---------------- File Upload ----------------
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (stream) stream.getTracks().forEach((track) => track.stop());
        setStream(null);

        setCapturedImage(uploadEvent.target.result);
        setCapturedPhotoPath(`${t("report.uploadedFile")}: ${file.name}`);
        setIsPhotoTaken(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  // ---------------- Navigate to Details ----------------
  const goToDetails = () => {
    if (isPhotoTaken) {
      goToScreen(AppView.DETAILS, {
        photoPath: capturedPhotoPath,
        location: currentLocation,
        latitude,
        longitude,
        imageData: capturedImage,
      });
    }
  };

  const isReadyToSubmit = !isLocationLoading && isPhotoTaken;
  const buttonAction = isReadyToSubmit ? goToDetails : handleCapture;
  const showUploadOption = !isPhotoTaken && !isLocationLoading;

  const getButtonText = () => {
    if (isReadyToSubmit) return t("report.addDetails");
    if (isLocationLoading) return t("report.findingGps");
    if (stream === false && !isPhotoTaken) return t("report.cameraUnavailable");
    return t("report.capture");
  };

  // ---------------- Render Camera UI ----------------
  const renderCameraStateUI = () => {
    if (capturedImage) {
      return (
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src={capturedImage}
          alt={t("report.altPhoto")}
        />
      );
    }
    if (stream === false) {
      return (
        <div style={{ padding: "16px", textAlign: "center" }}>
          <Icon name="square" size="80px" color={AppColors.red600} />
          <p style={{ fontSize: "18px", color: AppColors.red600 }}>
            {t("report.cameraBlocked")}
          </p>
          <p
            style={{
              fontSize: "14px",
              color: AppColors.gray600,
              marginTop: "8px",
            }}
          >
            {t("report.useUpload")}
          </p>
        </div>
      );
    }
    if (stream === null || isLocationLoading) {
      return (
        <div style={{ padding: "16px", textAlign: "center" }}>
          <Icon
            name="loader-2"
            size="80px"
            color="rgba(255,255,255,0.7)"
            style={{ animation: "spin 1s linear infinite" }}
          />
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)" }}>
            {t("report.awaiting")}
          </p>
        </div>
      );
    }
    return (
      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        autoPlay
        playsInline
        muted
      />
    );
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />

      <Header
        title={t("report.title")}
        bgColor={AppColors.red600}
        showBackButton={false}
        onBack={() => goToScreen(AppView.HOME)}
      />

      {/* Camera / Preview */}
      <div
        style={{
          flexGrow: 1,
          padding: "24px",
          backgroundColor: AppColors.gray100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "640px",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxHeight: "500px",
              backgroundColor: "black",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {renderCameraStateUI()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: AppColors.white, padding: "24px" }}>
        <div style={{ maxWidth: "448px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
              fontSize: "14px",
              color: AppColors.gray500,
            }}
          >
            <Icon
              name="locate-fixed"
              size="16px"
              color={isLocationLoading ? AppColors.gray500 : AppColors.primary}
            />
            <span style={{ marginLeft: "8px" }}>{currentLocation}</span>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <button
              onClick={buttonAction}
              style={{
                padding: "16px",
                borderRadius: "50px",
                backgroundColor: isReadyToSubmit
                  ? AppColors.primary
                  : AppColors.red600,
                color: "#fff",
              }}
            >
              <Icon
                name={isReadyToSubmit ? "send" : "camera"}
                size="20px"
                color="#fff"
                style={{ marginRight: "8px" }}
              />
              {getButtonText()}
            </button>

            {showUploadOption && (
              <>
                <p
                  style={{
                    textAlign: "center",
                    color: AppColors.gray500,
                    fontSize: "12px",
                  }}
                >
                  {t("report.or")}
                </p>
                <button
                  onClick={triggerFileInput}
                  style={{
                    padding: "16px",
                    borderRadius: "50px",
                    border: `2px solid ${AppColors.primary}`,
                  }}
                >
                  <Icon
                    name="image"
                    size="20px"
                    color={AppColors.primary}
                    style={{ marginRight: "8px" }}
                  />
                  {t("report.upload")}
                </button>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReportScreen;
