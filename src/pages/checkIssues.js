import Icon from "../components/icons";
import AppView from "../routes/paths";
import AppColors from "../theme/appColors";
import Header from "../components/header";

const CheckIssuesScreen = ({ goToScreen }) => {
  const issueData = [
    {
      id: 1,
      title: "Severe Pothole Cluster",
      percentage: 85,
      severity: "Critical",
      address: "450 E Main St, Downtown",
      eta: "Est. Fix: 3 Days",
      icon: "alert-triangle",
      color: "text-red-600",
      progressBarColor: "bg-red-500",
    },
    {
      id: 2,
      title: "Broken Street Lamp (Inactive)",
      percentage: 30,
      severity: "Pending Review",
      address: "12 Elmwood Ave, near park",
      eta: "Est. Review: 24h",
      icon: "lightbulb",
      color: "text-amber-600",
      progressBarColor: "bg-amber-500",
    },
    {
      id: 3,
      title: "Excessive Graffiti on Fence",
      percentage: 5,
      severity: "New",
      address: "78 Bayside Dr, West End",
      eta: "New Issue",
      icon: "brush",
      color: "text-gray-500",
      progressBarColor: "bg-gray-400",
    },
    {
      id: 4,
      title: "Sign Down (Stop Sign)",
      percentage: 95,
      severity: "Urgent Fix Scheduled",
      address: "Intersection of Oak and Pine",
      eta: "Fixing Today",
      icon: "traffic-cone",
      color: "text-green-600",
      progressBarColor: "bg-green-500",
    },
  ];

  const IssueCard = ({ issue }) => {
    const severityColor = issue.severity.includes("Critical")
      ? AppColors.red600
      : issue.severity.includes("Pending")
      ? AppColors.amber600
      : AppColors.green600;

    return (
      <div
        style={{
          backgroundColor: AppColors.white,
          borderRadius: "12px",
          boxShadow: AppColors.shadowGeneral,
          overflow: "hidden",
          borderLeft: `4px solid ${issue.progressBarColor}`,
        }}
      >
        <div style={{ padding: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Icon
                name={issue.icon}
                size="20px"
                color={severityColor}
                style={{ marginRight: "8px" }}
              />
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: AppColors.gray800,
                }}
              >
                {issue.title}
              </h4>
            </div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                padding: "4px 12px",
                borderRadius: "50px",
                color: severityColor,
                backgroundColor: severityColor + "1A",
              }}
            >
              {issue.severity}
            </span>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              height: "10px",
              width: "100%",
              backgroundColor: AppColors.gray200,
              borderRadius: "5px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                height: "10px",
                borderRadius: "5px",
                backgroundColor: issue.progressBarColor,
                width: `${issue.percentage}%`,
              }}
            ></div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              color: AppColors.gray500,
            }}
          >
            <span>Progress: {issue.percentage}%</span>
            <span>{issue.eta}</span>
          </div>

          <div
            style={{
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: `1px solid ${AppColors.gray200}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon
              name="map-pin"
              size="16px"
              color={AppColors.primary}
              style={{ marginRight: "4px" }}
            />
            <p style={{ fontSize: "14px", color: AppColors.gray600 }}>
              {issue.address}
            </p>
          </div>
        </div>
      </div>
    );
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
        title="Issues Near Me"
        bgColor={AppColors.primary}
        // showBackButton={true}
        onBack={() => goToScreen(AppView.HOME)}
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
        <div style={{ width: "100%", maxWidth: "1152px" }}>
          {/* Search Bar */}
          <div style={{ marginBottom: "32px", position: "relative" }}>
            <input
              type="text"
              placeholder="Search address or area I will visit..."
              style={{
                width: "100%",
                padding: "16px 16px 16px 48px",
                fontSize: "16px",
                border: `1px solid ${AppColors.gray300}`,
                borderRadius: "12px",
                boxShadow: AppColors.shadowGeneral,
                outline: "none",
              }}
            />
            <Icon
              name="search"
              size="24px"
              color={AppColors.gray500}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            />
          </div>

          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: AppColors.gray700,
              marginBottom: "24px",
            }}
          >
            4 Issues Reported in the Last 7 Days:
          </h3>

          {/* Issue Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {issueData.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckIssuesScreen;
