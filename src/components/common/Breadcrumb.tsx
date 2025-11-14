import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="bg-gray-50 p-4 text-sm text-gray-600">
      <ol className="flex space-x-2">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {paths.map((path, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          return (
            <li key={index}>
              <span>/</span>
              <Link to={href} className="ml-1 capitalize">
                {path}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
