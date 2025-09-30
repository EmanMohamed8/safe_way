// import { useState, useEffect } from "react";
// import AppView from "./paths";
// import { useCallback } from "react";

// const useWouter = () => {
//   // Initialize path from current browser URL pathname
//   const [currentPath, setCurrentPath] = useState(
//     window.location.pathname || AppView.HOME // ✅ start with HOME
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
//         setCurrentPath(window.location.pathname || AppView.HOME);
//         setRouteProps(null);
//       }
//     };

//     window.addEventListener("popstate", handlePopState);

//     // CRITICAL FIX: Ensure initial state reflects URL path without pushing new history entry
//     const pathFromUrl =
//       window.location.pathname === "/"
//         ? AppView.HOME // ✅ default to HOME instead of REGISTRATION
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

// export default useWouter;

import { useState, useEffect, useCallback } from "react";
import AppView from "./paths";

const useWouter = () => {
  // Initialize currentPath based on URL or default to HOME
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname === "/"
      ? AppView.HOME
      : window.location.pathname;
  });

  const [routeProps, setRouteProps] = useState(null);

  // Navigate to a new path with optional props
  const navigate = useCallback((targetPath, props = null) => {
    setCurrentPath(targetPath);
    setRouteProps(props);
    window.history.pushState({ path: targetPath, props }, "", targetPath);
  }, []);

  useEffect(() => {
    // Handle browser back/forward
    const handlePopState = (event) => {
      const state = event.state || {};
      if (state.path) {
        setCurrentPath(state.path);
        setRouteProps(state.props || null);
      } else {
        // fallback if no state
        const fallbackPath =
          window.location.pathname === "/"
            ? AppView.HOME
            : window.location.pathname;
        setCurrentPath(fallbackPath);
        setRouteProps(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Ensure initial state matches URL without adding a new history entry
    const initialPath =
      window.location.pathname === "/"
        ? AppView.HOME
        : window.location.pathname;
    window.history.replaceState(
      { path: initialPath, props: null },
      "",
      initialPath
    );

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return { path: currentPath, navigate, routeProps };
};

export default useWouter;
