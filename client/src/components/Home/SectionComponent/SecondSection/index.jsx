import { BASE_URL } from "../../../../constants";
import {
  useGetNewsByGlobalQuery,
  useGetNewsByMarketEconomyQuery,
  useGetNewsByPoliticsQuery,
} from "../../../../features/newsApiSlice";
import {
  CardTextOnly,
  MidCard,
  BigCard,
  SmallHorizontalCard,
  ColumnHead,
  SmallAdvertisement,
} from "../../../index";

const SecondSection = () => {
  const {
    data: newsList,
    isLoading: newsListLoading,
    error: newsListError,
  } = useGetNewsByPoliticsQuery({ keyword: "", pageNumber: 1 });
  const {
    data: marketEconomynewsList,
    isLoading: marketEconomynewsListLoading,
    error: marketEconomynewsListError,
  } = useGetNewsByMarketEconomyQuery({ keyword: "", pageNumber: 1 });
  const {
    data: globalnewsList,
    isLoading: globalnewsListLoading,
    error: globalnewsListError,
  } = useGetNewsByGlobalQuery({ keyword: "", pageNumber: 1 });

  if (
    newsListLoading ||
    marketEconomynewsListLoading ||
    globalnewsListLoading
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:px-8 md:flex-row">
      <div className="w-full md:w-1/3 p-4">
        <ColumnHead columnHeadTag="राजनीति" />
        {newsList &&
          newsList.data
            .slice(0, 1)
            .map((card, index) => (
              <MidCard
                key={index}
                title={card.title}
                imageSrc={`${BASE_URL}/${card.media.images[0]}`}
                tag={card.tags[0]}
              />
            ))}
        {newsList &&
          newsList.data
            .slice(2, 7)
            .map((card, index) => (
              <CardTextOnly
                key={index}
                text={card.title}
                link={"/"}
                color={false}
              />
            ))}
      </div>
      <div className="w-full md:w-1/3 p-4">
        <ColumnHead columnHeadTag="बजार अर्थतन्त्र" />
        {marketEconomynewsList &&
          marketEconomynewsList.data
            .slice(0, 1)
            .map((card, index) => (
              <BigCard
                key={index}
                text={card.title}
                imageSrc={`${BASE_URL}/${card.media.images[0]}`}
                tag={card.tags[0]}
              />
            ))}
        {marketEconomynewsList &&
          marketEconomynewsList.data
            .slice(1, 4)
            .map((card, index) => (
              <SmallHorizontalCard
                key={index}
                text={card.title}
                imageSrc={`${BASE_URL}/${card.media.images[0]}`}
                tag={card.tags[0]}
              />
            ))}
      </div>
      <div className="w-full md:w-1/3 p-4">
        <div className="pt-2">
          <h1 className="font-semibold">अन्तर्राष्ट्रिय अपडेट</h1>
          {globalnewsList &&
            globalnewsList.data
              .slice(0, 9)
              .map((card, index) => (
                <SmallHorizontalCard
                  key={index}
                  text={card.title}
                  imageSrc={`${BASE_URL}/${card.media.images[0]}`}
                  tag={card.tags[0]}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
