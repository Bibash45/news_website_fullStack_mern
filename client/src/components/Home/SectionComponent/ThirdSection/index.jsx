import { BASE_URL } from "../../../../constants";
import { useGetAllNewsQuery } from "../../../../features/newsApiSlice";
import { BannerAdvertisement } from "../../../common/Advertisement";
import { BigCard, MidCard, SmallHorizontalCard } from "../../../index";

const ThirdSection = () => {
  const {
    data: newsList,
    isLoading: newsListLoading,
    error: newsListError,
  } = useGetAllNewsQuery({ keyword: "", pageNumber: 1 });



  if (newsListLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* <BannerAdvertisement /> */}
      <div className="flex flex-col mx-auto md:px-8 md:flex-row">
        <div className="w-full p-4 md:w-1/3">
        {newsList.data.slice(13, 14).map((card, index) => (
            <MidCard
              key={index}
              text={card.title}
              imageSrc={`${BASE_URL}/${card.media.images[0]}`}
              tag={card.tags[0]}
            />
          ))}
          {newsList.data.slice(14, 18).map((card, index) => (
            <SmallHorizontalCard
              key={index}
              text={card.title}
              imageSrc={`${BASE_URL}/${card.media.images[0]}`}
              tag={card.tags[0]}
            />
          ))}
        </div>
        <div className="w-full p-4 md:w-2/3">
          {newsList.data.slice(18, 19).map((card, index) => (
            <BigCard
              key={index}
              text={card.title}
              imageSrc={`${BASE_URL}/${card.media.images[0]}`}
              tag={card.tags[0]}
            />
          ))}
          {newsList.data.slice(19, 21).map((card, index) => (
            <SmallHorizontalCard
              key={index}
              text={card.title}
              imageSrc={`${BASE_URL}/${card.media.images[0]}`}
              tag={card.tags[0]}
            />
          ))}
        </div>
        <div className="w-full p-4 md:w-1/3">
          {newsList.data.slice(21, 22).map((card, index) => (
            <MidCard
              key={index}
              text={card.title}
              imageSrc={`${BASE_URL}/${card.media.images[0]}`}
              tag={card.tags[0]}
            />
          ))}
          {newsList.data.slice(22, 26).map((card, index) => (
            <SmallHorizontalCard
              key={index}
              text={card.title}
              imageSrc={`${BASE_URL}/${card.media.images[0]}`}
              tag={card.tags[0]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ThirdSection;
