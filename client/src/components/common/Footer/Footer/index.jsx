import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="text-white text-sm flex flex-wrap items-center justify-start w-full mt-4 gap-2 lg:text-2xl opacity-90">
        <div>
          <span>प्रधान सम्पादक : </span>
          <span>अमित ढकाल</span>
        </div>
        |
        <div>
          <span>भण्डाफोरटिम : </span>
          <span>हाम्रो टिम</span>
        </div>
        |
        <div>
          <span>सम्पर्क : </span>
          <span>९८२२६२४६६, bhandaphor@gmail.com</span>
        </div>
        |
        <div>
          <span>विज्ञापनका लागि : </span>
          <span>६६५४६४६४६, ४६५४९८७९८४६ </span>
        </div>
      </div>
      <p className="text-white text-sm mt-4 text-center opacity-60">
        &copy; २०८१ भण्डाफोर निउज टिम. All Rights Reserved.
      </p>
    </>
  );
};

export default Footer;
