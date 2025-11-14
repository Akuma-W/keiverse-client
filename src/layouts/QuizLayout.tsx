import { Outlet } from "react-router-dom";

function QuizLayout() {
  return (
    <div>
      QuizLayout
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default QuizLayout;
