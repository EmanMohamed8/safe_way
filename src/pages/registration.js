import AppColors from "../theme/appColors";
import AppView from "../routes/paths";
import Icon from "../components/icons";

const RegistrationScreen = ({ goToScreen }) => {
  const handleSignUp = (e) => {
    e.preventDefault();
    // Navigate to /home path
    goToScreen(AppView.HOME);
  };

  const inputStyle = `w-full p-3 border ${AppColors.inputBorder} rounded-xl transition duration-150`;

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-md"> {/* Centered form container */}
        <header className="text-center mb-10 pt-4">
          <div className={`inline-flex items-center justify-center ${AppColors.primary} p-3 rounded-xl mb-4 shadow-lg`}>
            <Icon name="map-pin" className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome to FixIt</h1>
          <p className="text-gray-500 mt-2">Sign up to start making your community better.</p>
        </header>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" id="name" placeholder="John Doe" className={inputStyle} required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" id="email" placeholder="you@example.com" className={inputStyle} required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" id="password" placeholder="••••••••" className={inputStyle} required />
          </div>
          <button type="submit" className={`w-full p-4 mt-8 font-semibold rounded-xl text-white ${AppColors.primary} transition duration-200 shadow-lg shadow-blue-500/50`}>
            Sign Up
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-gray-500 mt-10">
        Already have an account? <a href="#" className="text-blue-600 font-medium hover:text-blue-700">Sign In</a>
      </p>
    </div>
  );
};

export default RegistrationScreen