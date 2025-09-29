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
