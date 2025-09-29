import { useState, useEffect } from "react";
import AppView from "./paths";
import { useCallback } from "react";

// const useWouter = () => {
//   // Current path starts at root
//   const [currentPath, setCurrentPath] = useState(AppView.HOME);
//   // State to pass props (like location data) between screens
//   const [routeProps, setRouteProps] = useState(null);

//   /** * Navigation function: Similar to wouter's 'navigate' or 'useRoute' return.
//    * Takes a path string and optional props.
//    */
//   const navigate = useCallback((targetPath, props = null) => {
//     setRouteProps(props);
//     setCurrentPath(targetPath);
//   }, []);

//   // Expose the necessary API for the router and screens
//   return { path: currentPath, navigate, routeProps };
// };

// const useWouter = () => {
//   // Initialize path from current browser URL pathname
//   const [currentPath, setCurrentPath] = useState(
//     window.location.pathname || AppView.REGISTRATION
//   );
//   const [routeProps, setRouteProps] = useState(null);

//   const navigate = useCallback((targetPath, props = null) => {
//     setRouteProps(props);
//     setCurrentPath(targetPath);

//     // Update browser history state
//     const state = { path: targetPath, props };
//     window.history.pushState(state, "", targetPath);
//   }, []);

//   useEffect(() => {
//     const handlePopState = (event) => {
//       const state = event.state || {};

//       if (state.path) {
//         const newPath = state.path;
//         const newProps = state.props || null;

//         setCurrentPath(newPath);
//         setRouteProps(newProps);
//       } else {
//         // Fallback to reading the current pathname
//         setCurrentPath(window.location.pathname || AppView.REGISTRATION);
//         setRouteProps(null);
//       }
//     };

//     window.addEventListener("popstate", handlePopState);

//     // CRITICAL FIX: Ensure initial state reflects URL path without pushing new history entry
//     const pathFromUrl =
//       window.location.pathname === "/"
//         ? AppView.REGISTRATION
//         : window.location.pathname;
//     if (currentPath !== pathFromUrl) {
//       setCurrentPath(pathFromUrl);
//       window.history.replaceState(
//         { path: pathFromUrl, props: null },
//         "",
//         pathFromUrl
//       );
//     }

//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, []);

//   return { path: currentPath, navigate, routeProps };
// };

const useWouter = () => {
  // Initialize path from current browser URL pathname
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname || AppView.HOME // ✅ start with HOME
  );
  const [routeProps, setRouteProps] = useState(null);

  const navigate = useCallback((targetPath, props = null) => {
    setRouteProps(props);
    setCurrentPath(targetPath);

    // Update browser history state
    const state = { path: targetPath, props };
    window.history.pushState(state, "", targetPath);
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      const state = event.state || {};

      if (state.path) {
        const newPath = state.path;
        const newProps = state.props || null;

        setCurrentPath(newPath);
        setRouteProps(newProps);
      } else {
        // Fallback to reading the current pathname
        setCurrentPath(window.location.pathname || AppView.HOME);
        setRouteProps(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    // CRITICAL FIX: Ensure initial state reflects URL path without pushing new history entry
    const pathFromUrl =
      window.location.pathname === "/"
        ? AppView.HOME // ✅ default to HOME instead of REGISTRATION
        : window.location.pathname;
    if (currentPath !== pathFromUrl) {
      setCurrentPath(pathFromUrl);
      window.history.replaceState(
        { path: pathFromUrl, props: null },
        "",
        pathFromUrl
      );
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return { path: currentPath, navigate, routeProps };
};

export default useWouter;
