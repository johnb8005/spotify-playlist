import { Link } from "react-router-dom";
import { menus } from "../links";
import { title } from "../config";

export default () => (
  <header>
    <div className="bg-gray-900 text-white">
      <h5 className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <Link to={"/"}>{title}</Link>
      </h5>
      <nav className="my-2 my-md-0 mr-md-3">
        {menus.map((menu, i) => (
          <Link className="p-2 text-dark" key={i} to={menu.link}>
            {menu.name}
          </Link>
        ))}
      </nav>
    </div>
  </header>
);
