import AppColors from "../theme/appColors";
import AppView from "../routes/paths";
import Icon from "../components/icons";

const HomeScreen = ({ goToScreen }) => {

  const ActionButton = ({ iconName, title, description, route, colorClass, bgColorClass, borderColorClass, shadowColor }) => (
    <button
      onClick={() => goToScreen(route)}
      className={`w-full h-full flex flex-col items-start p-6 ${bgColorClass} hover:${bgColorClass.replace('-50', '-100')} border-2 ${borderColorClass} rounded-2xl transition duration-200 shadow-md transform hover:scale-[1.01] active:scale-[0.99]`}
    >
      <div className="flex items-center mb-3">
        <div className={`p-3 ${colorClass.replace('text', 'bg')} rounded-full mr-4 shadow-lg ${shadowColor}`}>
          <Icon name={iconName} className="w-6 h-6 text-white" />
        </div>
        <span className={`text-xl font-bold ${colorClass}`}>{title}</span>
      </div>
      <p className="text-left text-sm text-gray-600">
        {description}
      </p>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header (Full Width) */}
      <header className={`p-6 flex justify-between items-center shadow-lg text-white ${AppColors.primary.replace('hover:bg-blue-700', '')} w-full`}>
        <h2 className="text-2xl font-bold">FixIt Dashboard (Web View)</h2>
        <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition duration-150">
          <Icon name="user" className="w-6 h-6 text-white" />
        </button>
      </header>

      <main className="flex-grow p-6 md:p-12 overflow-y-auto w-full max-w-7xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-700 mb-8">What would you like to do?</h3>

        {/* Button container - Stacks on mobile, 2-column grid on desktop */}
        <div className="space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
          {/* Button 1: Report an Issue */}
          <ActionButton
            iconName="alert-triangle"
            title="Report an Issue"
            description="File a new report for a pothole, broken street light, graffiti, or other safety concern at your current location."
            route={AppView.REPORT}
            colorClass={AppColors.redReport.replace('bg', 'text')}
            bgColorClass={AppColors.redReportBackground}
            borderColorClass="border-red-300"
            shadowColor="shadow-red-500/30"
          />

          {/* Button 2: Ask About Issues */}
          <ActionButton
            iconName="map"
            title="Check for Issues in a Place I will Visit"
            description="Proactively check the status and types of reported issues (e.g., crime, road closures) in a neighborhood you plan to visit."
            route={AppView.CHECK}
            colorClass={AppColors.primaryText}
            bgColorClass={AppColors.blueCheckBackground}
            borderColorClass="border-blue-300"
            shadowColor="shadow-blue-500/30"
          />
        </div>

        {/* Optional: Quick Action Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mt-12 w-full">
          <h4 className="font-semibold text-gray-700 flex items-center mb-2">
            <Icon name="activity" className="w-5 h-5 mr-2 text-green-600" /> Local Activity Snapshot
          </h4>
          <p className="text-base text-gray-500">
            2 new issues reported nearby today. Review the map or <a href="#" className="text-green-600 font-medium hover:underline">view all recent reports</a>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen