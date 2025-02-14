import { Link, NavLink, useLocation } from "react-router-dom";

const CategoryListFooter = ({ categoriesRow }) => {
  const { pathname } = useLocation();

  return (
    <div className="grid lg:grid-cols-10 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 pb-3 text-center gap-3">
      {categoriesRow.map((category, index) => (
        <Link to={`${category.link}`}>
          <div key={index} className="border-b-3 border-white">
            <span
              className={`${
                pathname === category.link && "font-bold"
              } text-sm opacity-80`}
            >
              {category.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryListFooter;
