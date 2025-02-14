import { BASE_URL } from "../../../../constants";
import {
  useGetNewsByIdeaQuery,
  useGetNewsBySocietyQuery,
  useGetNewsBySportsQuery,
} from "../../../../features/newsApiSlice";
import { CardTextOnly, ColumnHead, MidCard } from "../../../index";

const FifthSection = () => {
  const {
    data: sportsnewsList,
    isLoading: sportsnewsListLoading,
    error: sportsnewsListError,
  } = useGetNewsBySportsQuery({ keyword: "", pageNumber: 1 });
  const {
    data: ideanewsList,
    isLoading: ideanewsListLoading,
    error: ideanewsListError,
  } = useGetNewsByIdeaQuery({ keyword: "", pageNumber: 1 });
  const {
    data: societynewsList,
    isLoading: societynewsListLoading,
    error: societynewsListError,
  } = useGetNewsBySocietyQuery({ keyword: "", pageNumber: 1 });

  if (sportsnewsListLoading || ideanewsListLoading || societynewsListLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col flex-wrap md:px-8 md:flex-row">
        <div className="w-full p-4 sm:w-1/2 md:w-1/3">
          <ColumnHead columnHeadTag={"खेलकुद"} />
          {sportsnewsList &&
            sportsnewsList.data
              .slice(0, 1)
              .map((card, index) => (
                <MidCard
                  key={index}
                  title={card.title}
                  imageSrc={`${BASE_URL}/${card.media.images[0]}`}
                  tag={card.tags[0]}
                  link={`/news/${card._id}`}
                />
              ))}
          {sportsnewsList &&
            sportsnewsList.data
              .slice(1, 6)
              .map((card, index) => (
                <CardTextOnly
                  key={index}
                  text={card.title}
                  color={false}
                  link={`/news/${card._id}`}
                />
              ))}
        </div>
        <div className="w-full p-4 sm:w-1/2 md:w-1/3">
          <ColumnHead columnHeadTag={"विचार"} />
          {ideanewsList &&
            ideanewsList.data
              .slice(0, 1)
              .map((card, index) => (
                <MidCard
                  key={index}
                  title={card.title}
                  imageSrc={`${BASE_URL}/${card.media.images[0]}`}
                  tag={card.tags[0]}
                  link={`/news/${card._id}`}
                />
              ))}
          {ideanewsList &&
            ideanewsList.data
              .slice(1, 6)
              .map((card, index) => (
                <CardTextOnly
                  key={index}
                  text={card.title}
                  color={false}
                  link={`/news/${card._id}`}
                />
              ))}
        </div>
        <div className="w-full p-4 sm:w-1/2 md:w-1/3">
          <ColumnHead columnHeadTag={"समाज"} />
          {societynewsList &&
            societynewsList.data
              .slice(0, 1)
              .map((card, index) => (
                <MidCard
                  key={index}
                  title={card.title}
                  imageSrc={`${BASE_URL}/${card.media.images[0]}`}
                  tag={card.tags[0]}
                  link={`/news/${card._id}`}
                />
              ))}
          {societynewsList &&
            societynewsList.data
              .slice(1, 6)
              .map((card, index) => (
                <CardTextOnly
                  key={index}
                  text={card.title}
                  link={`/news/${card._id}`}
                  color={false}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default FifthSection;
