// import { usePermissions } from '@hooks/usePermissions';
import { Route, Routes } from 'react-router-dom';
import { filterRoutesByRole, routes } from './routes';
import CustomComponent from './custom_component';
import LayoutCustom from '@components/layout';

const RenderRoutes = () => {
  // const { checkPermission } = usePermissions();
  // const role = localStorage.getItem('role');
  // console.log(role);
  // const store: any = useAuthStore((state) => state);
  // console.log(store?.role);
  const role=localStorage.getItem("role") || "ADMIN"

  const filteredRoutes = filterRoutesByRole(routes, role);

  console.log(filteredRoutes);
  return (
    <LayoutCustom>
      
      <Routes>
        {filteredRoutes
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
