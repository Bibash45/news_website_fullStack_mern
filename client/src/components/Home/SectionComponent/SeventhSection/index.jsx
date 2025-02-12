import { MidCard } from "../../../common/Cards";

const SeventhSection = () => {
  const midCards = [
    {
      imageSrc: "images/EighthSection/11.webp",
    },
    {
      imageSrc: "images/EighthSection/12.webp",
    },
    {
      imageSrc: "images/EighthSection/21.webp",
    },
    {
      imageSrc: "images/EighthSection/22.webp",
    },

    // Add more cards as needed
  ];

  return (
    <div className="px-8 mb-2">
      <h2 className="pt-2 px-12 pb-2 text-4xl bg-gray-900 text-white font-bold  ">
        <marquee className="p-3">हाम्रो हुम्ला, राम्रो हुम्ला</marquee>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {midCards.map((img) => (
          <div>
            <img className="w-full h-full" src={img.imageSrc} alt="pic" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeventhSection;
