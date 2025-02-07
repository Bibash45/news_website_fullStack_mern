import { NavLink } from "react-router-dom";

const CategoryListFooter = ({ categoriesRow }) => {
  return (
    <div className="grid lg:grid-cols-10 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 pb-4 text-center">
      {categoriesRow.map((category, index) => (
        <div key={index} className="border-b-3 border-white">
          <span className="font-bold text-sm opacity-80">{category.title}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryListFooter;
