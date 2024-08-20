// import { usePermissions } from '@hooks/usePermissions';
import { Route, Routes } from 'react-router-dom';
import { filterRoutesByRole, routes } from './routes';
import CustomComponent from './custom_component';
import LayoutCustom from '@components/layout';
import PartnerStats from '@pages/partnerStats';
import ParentStats from '@pages/parentStats';
import PartnerParentStats from '@pages/partnerParentStats';

const RenderRoutes = () => {
  // const { checkPermission } = usePermissions();
  // const role = localStorage.getItem('role');
  // console.log(role);
  // const store: any = useAuthStore((state) => state);
  // console.log(store?.role);
  const role = localStorage.getItem('role') || 'ADMIN';

  const filteredRoutes = filterRoutesByRole(routes, role);

  return (
    <LayoutCustom>
      <Routes>
        {filteredRoutes
          .flatMap((item) => (item.children?.length ? [item, ...item.children] : item))
          // .filter((item) => checkPermission(item.config.key))
          .map((item, index) => (
            <Route key={index} path={item.path} element={<CustomComponent component={item.element} />} />
          ))}
        <Route path="partnerStats" element={<PartnerStats />} />
        <Route path="parentStats" element={<ParentStats />} />
        <Route path="partnerParentStats" element={<PartnerParentStats/>} />
      </Routes>
    </LayoutCustom>
  );
};

export default RenderRoutes;
