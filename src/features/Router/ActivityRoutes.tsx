import React, { Activity, Children } from 'react';
import { useLocation, matchPath, resolvePath, useParams, type RouteProps } from 'react-router-dom';

const RouteItem = ({ 
  path, 
  element, 
  currentPath,
  basePath
}: { 
  path?: string; 
  element: React.ReactNode; 
  currentPath: string;
  basePath: string;
}) => {
  const resolved = resolvePath(path || "", basePath);
  const isMatch = !!matchPath({ path: resolved.pathname, end: true }, currentPath);

  return (
    <Activity key={resolved.pathname} mode={isMatch ? "visible" : "hidden"}>
      {element}
    </Activity>
  );
};

const ActivityRoutes = ({ children }: { children: React.ReactNode }) => {
  const childrenArray = Children.toArray(children);
  const location = useLocation();
  const params = useParams();
  const splat = params["*"];
  const basePath = splat 
    ? location.pathname.replace(new RegExp(`/${splat}$`), "") 
    : location.pathname;

  return (
    <>
      {childrenArray.map((child) => {
        if (!React.isValidElement<RouteProps>(child)) return null;
        
        return (
          <RouteItem 
            key={child.props.path || 'index'} 
            path={child.props.path} 
            element={child.props.element} 
            currentPath={location.pathname}
            basePath={basePath}
          />
        );
      })}
    </>
  );
};

export default ActivityRoutes;