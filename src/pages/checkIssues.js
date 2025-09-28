import Icon from "../components/icons";
import AppView from "../routes/paths";
import AppColors from "../theme/appColors";    

const CheckIssuesScreen = ({ goToScreen }) => {
    const issueData = [
        { id: 1, title: "Severe Pothole Cluster", percentage: 85, severity: "Critical", address: "450 E Main St, Downtown", eta: "Est. Fix: 3 Days", icon: 'alert-triangle', color: 'text-red-600', progressBarColor: 'bg-red-500' },
        { id: 2, title: "Broken Street Lamp (Inactive)", percentage: 30, severity: "Pending Review", address: "12 Elmwood Ave, near park", eta: "Est. Review: 24h", icon: 'lightbulb', color: 'text-amber-600', progressBarColor: 'bg-amber-500' },
        { id: 3, title: "Excessive Graffiti on Fence", percentage: 5, severity: "New", address: "78 Bayside Dr, West End", eta: "New Issue", icon: 'brush', color: 'text-gray-500', progressBarColor: 'bg-gray-400' },
        { id: 4, title: "Sign Down (Stop Sign)", percentage: 95, severity: "Urgent Fix Scheduled", address: "Intersection of Oak and Pine", eta: "Fixing Today", icon: 'traffic-cone', color: 'text-green-600', progressBarColor: 'bg-green-500' },
    ];
    const IssueCard = ({ issue }) => {
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-l-current transition duration-200 hover:shadow-lg" style={{ borderColor: issue.progressBarColor.replace('bg-', '#') }}>
                <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                            <Icon name={issue.icon} className={`w-5 h-5 mr-2 ${issue.color}`} />
                            <h4 className={`text-lg font-bold text-gray-800`}>{issue.title}</h4>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${issue.color} bg-current/10`} style={{ borderColor: issue.progressBarColor.replace('bg-', '#') }}>
                            {issue.severity}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2.5 w-full bg-gray-200 rounded-full mb-1">
                        <div 
                            className={`h-2.5 rounded-full ${issue.progressBarColor}`} 
                            style={{ width: `${issue.percentage}%` }}
                        ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Progress: {issue.percentage}%</span>
                        <span>{issue.eta}</span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center">
                        <Icon name="map-pin" className="w-4 h-4 mr-1 text-blue-600" />
                        <p className="text-sm text-gray-600">{issue.address}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <header className={`p-6 flex items-center shadow-md text-white ${AppColors.primary.replace('hover:bg-blue-700', '')} w-full`}>
                <button onClick={() => goToScreen(AppView.HOME)} className="p-2 mr-4 rounded-full hover:bg-white/20 transition duration-150">
                    <Icon name="chevron-left" className="w-6 h-6 text-white" />
                </button>
                <h2 className="text-xl font-bold">Issues Near Me</h2>
            </header>

            {/* Main Content */}
            <main className="flex-grow p-6 md:p-12 overflow-y-auto flex justify-center">
                <div className="w-full max-w-6xl">
                    {/* Search Bar Container */}
                    <div className="mb-8 relative">
                        <input 
                            type="text" 
                            placeholder="Search address or area I will visit..."
                            className={`w-full p-4 pl-12 text-lg ${AppColors.inputBorder} rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-md`}
                        />
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-4 pointer-events-none">
                            <Icon name="search" className="w-6 h-6 text-gray-500" />
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-700 mb-6">4 Issues Reported in the Last 7 Days:</h3>

                    {/* Issue Cards Grid - Responsive layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {issueData.map((issue) => (
                            <IssueCard key={issue.id} issue={issue} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};



export default CheckIssuesScreen