import { Outlet } from 'react-router-dom';

const QuizLayout = () => {
  return (
    <div>
      QuizLayout
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default QuizLayout;
