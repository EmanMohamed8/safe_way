// const Icon = ({ name, className = "w-6 h-6" }) => {
//   // For this environment, we use a simple div placeholder for styling consistency:
//   const iconMap = {
//     'map-pin': '📍', 'user': '👤', 'alert-triangle': '⚠️', 'map': '🗺️',
//     'image': '🖼️', 'locate-fixed': '📡', 'loader-2': '⏳', 'check-circle': '✅',
//     'send': '➡️', 'square': '🧱', 'lightbulb': '💡', 'brush': '🖌️',
//     'traffic-cone': '🚧', 'activity': '🟢', 'search': '🔍', 'chevron-left': '⬅️',
//     'camera': '📷'
//   };
//   return (
//     <div className={className} aria-label={name}>
//       {iconMap[name] || '?'}
//     </div>
//   );
// };

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
