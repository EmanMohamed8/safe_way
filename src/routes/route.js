// const Route = ({ path, component: Component, isCurrent, routeProps, navigate }) => {
//     // Only render the component if this path matches the current active path
//     if (!isCurrent) return null;

//     // Component is rendered and receives the navigation function and props
//     // We pass 'navigate' as 'goToScreen' to keep the component props consistent
//     return <Component goToScreen={navigate} routeProps={routeProps} />;
// };

// const Route = ({ path, component: Component, isCurrent, routeProps, navigate }) => {
//     if (!isCurrent) return null;
//     return (
//       <div className="app-view-inner">
//         <Component goToScreen={navigate} routeProps={routeProps} />
//       </div>
//     );
// };

const Route = ({
  path,
  component: Component,
  isCurrent,
  routeProps,
  navigate,
}) => {
  if (!isCurrent) return null;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexGrow: 1,
        overflow: "hidden",
      }}
    >
      <Component goToScreen={navigate} routeProps={routeProps} />
    </div>
  );
};
export default Route;
