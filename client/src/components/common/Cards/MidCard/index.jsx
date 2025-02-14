import { Link } from "react-router-dom";

const MidCard = ({ title, imageSrc, tag, color, horizontal, link }) => {
  console.log(imageSrc);

  return (
    <Link to={link}>
      <div
        className={`${horizontal} ? "pb-2" : ""} ${color ? "bg-black" : ""}`}
      >
        <div className="relative w-305 h-171 group mb-6">
          <img
            className="w-full h-full object-cover transition-transform transform group-hover:scale-100 hover:grayscale-50"
            src={imageSrc}
            alt="pic"
          />
        </div>
      </div>
    </Link>
  );
};

export default MidCard;
