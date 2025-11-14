import { NavLink } from "react-router-dom";

function Navbar() {
  const links = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Classes" },
    { path: "/quiz", label: "Quiz" },
    { path: "/random", label: "Random" },
    { path: "/contact", label: "Contact" },
  ];
  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto flex space-x-4 p-3">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) => (isActive ? "font-bold underline" : "")}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
