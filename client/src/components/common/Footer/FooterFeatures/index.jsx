import { Link, NavLink } from "react-router-dom";

const FooterFeatures = () => {
  const contentFooter = [
    // { src: "to-watch", title: "भिडियो हेर्नुस्" },
    { src: "", title: "लाईभ हेर्नुस्" },
  ];

  const socials = [
    { src: "/images/Footer/Facebook.png", url: "" },
    { src: "/images/Footer/Instagram.png", url: "" },
    { src: "/images/Footer/LinkedIn.png", url: "" },
    { src: "/images/Footer/Tiktok.png", url: "" },
    { src: "/images/Footer/X.png", url: "" },
  ];

  return (
    <div className="bg-black w-full py-8 px-5 flex flex-col items-start text-white border-t border-b border-gray-700">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          {/* logo */}
          {/* <Link to={"/"}>
            <img
              className="w-[50px] h-[50px] object-contain rounded-full "
              src="https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/456430359_484335661016328_3546235393355045369_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=jd937vpI-uIQ7kNvgF6Kakb&_nc_oc=AdixKPpOGV_4BduEtDYulnwBtagtCbpJaRdG5R2pspSfa7GO3Wz8Ob9GlMXUHAGAs6S0DfrYdKmxnJPc8XuWRpGs&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&_nc_gid=Agb0orSQw81xUVdoVg04y_g&oh=00_AYCWN8rBYx0WK4VwMzXHGO4wyz_KOhWGe-rkknYc2dFDpw&oe=67B472E1"
              alt=""
            />
          </Link> */}
          <Link to="/" className="font-bold text-2xl bg-gradient-to-r from-amber-500 to-gray-300 bg-clip-text text-transparent">भण्डाफोर</Link>
        </div>
        <div className="flex items-center">
          {contentFooter.map((content, index) => (
            <NavLink
              key={index}
              to={content.src}
              className="text-white text-[0.937rem] font-bold ml-7"
            >
              {content.title}
            </NavLink>
          ))}
          <div className="border-r border-gray-500 w-1 h-6 mx-4"></div>
          <div className="text-white text-[0.937rem] font-bold">
            फलो गर्नुहोस्
          </div>
          {socials.map((social, index) => (
            <NavLink
              key={index}
              to={social.url}
              className="text-white text-[0.937rem] font-bold mx-4"
            >
              <img src={social.src} className="h-full w-full" alt="" />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterFeatures;
