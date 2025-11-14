import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      AdminLayout
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
