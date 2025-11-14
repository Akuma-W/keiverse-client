import { usePageTitle } from "../../hooks/usePageTitle";

function Dashboard() {
  usePageTitle({ title: "Dashboard" });

  return (
    <div>
      <p>ClassDashboard</p>
    </div>
  );
}

export default Dashboard;
