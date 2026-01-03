import { Outlet } from 'react-router-dom';

const ClassLayout = () => {
  return (
    <div>
      ClassLayout
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ClassLayout;
