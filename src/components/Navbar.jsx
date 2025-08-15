import { Link, useLocation } from "react-router-dom";

const links = [
  { path: "/", label: "Dashboard" },
  { path: "/team", label: "Team" },
  { path: "/projects", label: "Projects" },
  { path: "/login", label: "Login" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex gap-4">
      {links.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={`hover:underline ${
            location.pathname === path ? "text-yellow-300" : ""
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
