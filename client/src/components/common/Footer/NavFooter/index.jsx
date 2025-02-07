import { CategoryListFooter } from "../../List";
import FooterFeatures from "../FooterFeatures";
import Footer from "../Footer";

const NavFooter = ({ serachText }) => {
  const handleInputChange = (event) => {
    console.log(event.target.value);
  };

  const categoriesRow1 = [
    {
      title: "गृहपृष्ठ",
    },
    {
      title: "राजनीति",
    },
    {
      title: "बजार अर्थतन्त्र",
    },
    {
      title: "विचार",
    },
    {
      title: "नेपाली ब्रान्ड",
    },
    {
      title: "समाज",
    },
    {
      title: "कला",
    },
    {
      title: "खेलकुद",
    },
    {
      title: "ब्लग",
    },
    {
      title: "ग्लोबल ",
    },

    // Add other categories similarly
  ];

  return (
    <div className="bg-black p-8">
      <hr className="pb-5" />
      <div className="flex">
        <input
          type="text"
          value={serachText}
          className="h-8 px-2 w-full bg-white border-none rounded-l outline-none"
          onChange={handleInputChange}
        />
        <button className="h-8 bg-white text-black px-2 rounded-r flex item-center font-bold py-2">
          खोज्नुहोस्
          <span className="ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
        </button>
      </div>
      <div className="bg-black text-white p-4">
        <CategoryListFooter categoriesRow={categoriesRow1} />
      </div>
      <FooterFeatures />
      <Footer />
    </div>
  );
};

export default NavFooter;
