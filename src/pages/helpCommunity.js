import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AppColors from "../theme/appColors";
import Icon from "../components/icons";
import Header from "../components/header";

const HelpCommunityScreen = ({ goToScreen }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const dir = isRTL ? "rtl" : "ltr";
  const align = isRTL ? "right" : "left";

  const initialIssues = [
    {
      id: 1,
      titleEn: "Street Damage / Hole",
      titleAr: "كسر أو حفرة في الشارع",
      type: "Repair",
      status: "Pending",
      location: "450 E Main St, Downtown",
      icon: "alert-triangle",
    },
    {
      id: 2,
      titleEn: "Danger in Lamp Post",
      titleAr: "خطر في عمود الإنارة",
      type: "Repair",
      status: "Pending",
      location: "12 Elmwood Ave, near park",
      icon: "lightbulb",
    },
    {
      id: 3,
      titleEn: "Open Manhole",
      titleAr: "بلاعة مفتوحة",
      type: "Repair",
      status: "Pending",
      location: "78 Bayside Dr, West End",
      icon: "brush",
    },
    {
      id: 4,
      titleEn: "Lamp Post Left On in Morning",
      titleAr: "عمود الإنارة مفتوح صباحًا",
      type: "Repair",
      status: "Pending",
      location: "Intersection of Oak and Pine",
      icon: "traffic-cone",
    },
  ];

  const [helpIssues, setHelpIssues] = useState(initialIssues);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMarkSolved = (id) => {
    setHelpIssues((prev) =>
      prev.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              status: issue.status === "Pending" ? "Solved" : "Pending",
            }
          : issue
      )
    );
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const getLocalizedIssues = () =>
    helpIssues.map((issue) => ({
      ...issue,
      title: isRTL ? `${issue.titleAr}` : `${issue.titleEn}`,
      status: isRTL
        ? issue.status === "Pending"
          ? "معلق"
          : "تم الحل"
        : issue.status,
      location: issue.location,
    }));

  const filteredIssues = getLocalizedIssues().filter(
    (issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const IssueActionCard = ({ issue }) => {
    const isSolved = issue.status === "Solved" || issue.status === "تم الحل";
    const statusColor = isSolved ? AppColors.green600 : AppColors.red600;
    const buttonColor = isSolved ? AppColors.red600 : AppColors.green600;
    const statusBg = statusColor + "1A";

    return (
      <div
        style={{
          backgroundColor: AppColors.white,
          borderRadius: "12px",
          boxShadow: AppColors.shadowGeneral,
          padding: "24px",
          border: `1px solid ${AppColors.gray300}`,
          transition: "all 0.2s",
          direction: dir,
          textAlign: align,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            <Icon
              name={issue.icon}
              size="24px"
              color={AppColors.primary}
              style={{
                marginRight: isRTL ? 0 : "12px",
                marginLeft: isRTL ? "12px" : 0,
              }}
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
              color: statusColor,
              backgroundColor: statusBg,
            }}
          >
            {issue.status}
          </span>
        </div>

        <p
          style={{
            fontSize: "14px",
            color: AppColors.gray600,
            marginBottom: "16px",
            display: "flex",
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <Icon
            name="map-pin"
            size="14px"
            color={AppColors.gray500}
            style={{
              marginRight: isRTL ? 0 : "4px",
              marginLeft: isRTL ? "4px" : 0,
            }}
          />
          {issue.location}
        </p>

        <button
          onClick={() => handleMarkSolved(issue.id)}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "600",
            cursor: "pointer",
            backgroundColor: buttonColor,
            color: AppColors.white,
            transition: "background-color 0.2s",
          }}
        >
          {isSolved
            ? isRTL
              ? "وضع كـ معلق"
              : "Mark as Pending"
            : isRTL
            ? "وضع كـ تم الحل"
            : "Mark as Solved"}
        </button>
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
        direction: dir,
      }}
    >
      <Header
        title={isRTL ? "إجراءات مساعدة المجتمع" : "Community Help Actions"}
        bgColor={AppColors.green600}
        showBackButton={false}
        demo={true}
      />

      <main
        style={{
          flexGrow: 1,
          padding: "32px 16px",
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "1152px" }}>
          <div
            style={{
              marginBottom: "32px",
              position: "relative",
              width: "100%",
            }}
          >
            <input
              type="text"
              placeholder={
                isRTL
                  ? "ابحث عن مشكلة أو موقع للمساعدة به..."
                  : "Search issue or location to help with..."
              }
              value={searchTerm}
              onChange={handleSearch}
              style={{
                width: "100%",
                padding: isRTL ? "16px 48px 16px 16px" : "16px 16px 16px 48px",
                fontSize: "16px",
                border: `1px solid ${AppColors.gray300}`,
                borderRadius: "12px",
                boxShadow: AppColors.shadowGeneral,
                outline: "none",
                boxSizing: "border-box",
                textAlign: align,
                direction: dir,
              }}
            />
            <Icon
              name="search"
              size="24px"
              color={AppColors.gray500}
              style={{
                position: "absolute",
                left: isRTL ? "unset" : "16px",
                right: isRTL ? "16px" : "unset",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
              direction: dir,
            }}
          >
            {filteredIssues.length > 0 ? (
              (isRTL ? [...filteredIssues].reverse() : filteredIssues).map(
                (issue) => <IssueActionCard key={issue.id} issue={issue} />
              )
            ) : (
              <p
                style={{
                  color: AppColors.gray600,
                  fontSize: "18px",
                  textAlign: align,
                }}
              >
                {isRTL
                  ? "لم يتم العثور على قضايا مطابقة لمعايير البحث الخاصة بك."
                  : "No issues found matching your search criteria."}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpCommunityScreen;
