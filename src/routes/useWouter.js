import { useState } from "react";
import AppView from "./paths";
import { useCallback } from "react";

const useWouter = () => {
    // Current path starts at root
    const [currentPath, setCurrentPath] = useState(AppView.REGISTRATION); 
    // State to pass props (like location data) between screens
    const [routeProps, setRouteProps] = useState(null);

    /** * Navigation function: Similar to wouter's 'navigate' or 'useRoute' return.
     * Takes a path string and optional props.
     */
    const navigate = useCallback((targetPath, props = null) => {
        setRouteProps(props);
        setCurrentPath(targetPath);
    }, []);

    // Expose the necessary API for the router and screens
    return { path: currentPath, navigate, routeProps };
}

export default useWouter