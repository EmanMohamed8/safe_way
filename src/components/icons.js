const Icon = ({ name, size = "24px", color = "currentColor", style = {} }) => {
  const iconMap = {
    "map-pin": "📍",
    user: "👤",
    "alert-triangle": "⚠️",
    map: "🗺️",
    image: "🖼️",
    "locate-fixed": "📡",
    "loader-2": "⏳",
    "check-circle": "✅",
    send: "➡️",
    square: "🧱",
    lightbulb: "💡",
    brush: "🖌️",
    "traffic-cone": "🚧",
    activity: "🟢",
    search: "🔍",
    "chevron-left": "⬅️",
    camera: "📷",
  };
  return (
    <span
      style={{
        ...style,
        fontSize: size,
        color: color,
        lineHeight: "1",
        display: "inline-block",
      }}
    >
      {iconMap[name] || "?"}
    </span>
  );
};
export default Icon;
