import { Link, NavLink } from "react-router-dom";

const FooterFeatures = () => {
  const contentFooter = [
    { src: "to-watch", title: "भिडियो हेर्नुस्" },
    { src: "to-live-tv", title: "लाईभ हेर्नुस्" },
  ];

  const socials = [
    { src: "/images/Footer/Facebook.png", url: "to-facebook" },
    { src: "/images/Footer/Instagram.png", url: "to-instagram" },
    { src: "/images/Footer/LinkedIn.png", url: "to-linkedIn" },
    { src: "/images/Footer/Tiktok.png", url: "to-tiktok" },
    { src: "/images/Footer/X.png", url: "to-x" },
  ];

  return (
    <div className="bg-black w-full py-8 px-5 flex flex-col items-start text-white border-t border-b border-gray-700">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <Link to={"/"}>
          <img className="w-[50px] h-[50px] object-contain rounded-full " src="https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/456430359_484335661016328_3546235393355045369_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=vjdPWoj0f44Q7kNvgElBfRU&_nc_oc=Adgbh63HEG9O_TzwvCezhUoLUskF9E5OD4edMQAm4GWcD5pq4QQkoUpBLSsalQG83kU_hjRyMlsqY1Wsn4nhiz0F&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AA7yXxjHt35j6e08pU1M9tr&oh=00_AYCUoVwCD_LlTc_ISEBoKB8Qw47U9DFFilGis-eGiAGkgg&oe=67A97661" alt="" />
          </Link>
          <div className="font-bold text-2xl">भोराज मल्ल</div>
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
          <div className="text-white text-[0.937rem] font-bold">फलो गर्नुहोस्</div>
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
