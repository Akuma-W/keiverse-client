import { Outlet } from 'react-router-dom';

const QuizLayout = () => {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default QuizLayout;
