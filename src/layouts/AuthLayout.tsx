import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      AuthLayout
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
