import { Outlet } from "react-router-dom";

function ClassLayout() {
  return (
    <div>
      ClassLayout
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default ClassLayout;
