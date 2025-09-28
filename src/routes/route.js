
const Route = ({ path, component: Component, isCurrent, routeProps, navigate }) => {
    // Only render the component if this path matches the current active path
    if (!isCurrent) return null;

    // Component is rendered and receives the navigation function and props
    // We pass 'navigate' as 'goToScreen' to keep the component props consistent
    return <Component goToScreen={navigate} routeProps={routeProps} />;
};
export default Route