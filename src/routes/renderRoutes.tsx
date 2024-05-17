// import { usePermissions } from '@hooks/usePermissions';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import CustomComponent from './custom_component';
import LayoutCustom from "@components/layout";

const RenderRoutes = () => {
  // const { checkPermission } = usePermissions();
  return (
    <LayoutCustom>
    
      <Routes>
        {routes
          .flatMap((item) => (item.children.length ? [item, ...item.children] : item))
          // .filter((item) => checkPermission(item.config.key))
          .map((item, index) => (
            <Route key={index} path={item.path} element={<CustomComponent component={item.element} />} />
          ))}
      </Routes>
    </LayoutCustom>
  );
};

export default RenderRoutes;
