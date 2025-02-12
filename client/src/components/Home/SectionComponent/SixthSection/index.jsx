import { BASE_URL } from "../../../../constants";
import {
  useGetNewsByArtQuery,
  useGetNewsByBlogQuery,
  useGetNewsByGlobalQuery,
} from "../../../../features/newsApiSlice";
import { CardTextOnly, ColumnHead, MidCard } from "../../../index";

const SixthSection = () => {
  const {
    data: artnewsList,
    isLoading: artnewsListLoading,
    error: artnewsListError,
  } = useGetNewsByArtQuery({ keyword: "", pageNumber: 1 });
  const {
    data: globalnewsList,
    isLoading: globalnewsListLoading,
    error: globalnewsListError,
  } = useGetNewsByGlobalQuery({ keyword: "", pageNumber: 1 });
  const {
    data: blognewsList,
    isLoading: blognewsListLoading,
    error: blognewsListError,
  } = useGetNewsByBlogQuery({ keyword: "", pageNumber: 1 });
  console.log(globalnewsList);

  if (artnewsListLoading || globalnewsListLoading || blognewsListLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col flex-wrap md:px-8 md:flex-row">
        <div className="w-full p-4 sm:w-1/2 md:w-1/3">
          <ColumnHead columnHeadTag={"कला"} />
          {artnewsList &&
            artnewsList.data
              .slice(0, 1)
              .map((card, index) => (
                <MidCard
                  key={index}
                  title={card.title}
                  imageSrc={`${BASE_URL}/${card.media.images[0]}`}
                  tag={card.tags[0]}
                />
              ))}
          {artnewsList &&
            artnewsList.data
              .slice(1, 6)
              .map((card, index) => (
                <CardTextOnly
                  key={index}
                  text={card.title}
                  link={"/"}
                  color={false}
                />
              ))}
        </div>
        <div className="w-full p-4 sm:w-1/2 md:w-1/3">
          <ColumnHead columnHeadTag={"ग्लोबल "} />
          {globalnewsList &&
            globalnewsList.data
              .slice(0, 1)
              .map((card, index) => (
                <MidCard
                  key={index}
                  title={card.title}
                  imageSrc={`${BASE_URL}/${card.media.images[0]}`}
                  tag={card.tags[0]}
                />
              ))}
          {globalnewsList &&
            globalnewsList.data
              .slice(1, 6)
              .map((card, index) => (
                <CardTextOnly
                  key={index}
                  text={card.title}
                  link={"/"}
                  color={false}
                />
              ))}
        </div>
        <div className="w-full p-4 sm:w-1/2 md:w-1/3">
          <ColumnHead columnHeadTag={"ब्लग"} />
          {blognewsList &&
            blognewsList.data
              .slice(0, 1)
              .map((card, index) => (
                <MidCard
                  key={index}
                  title={card.title}
                  imageSrc={`${BASE_URL}/${card.media.images[0]}`}
                  tag={card.tags[0]}
                />
              ))}
          {blognewsList &&
            blognewsList.data
              .slice(1, 6)
              .map((card, index) => (
                <CardTextOnly
                  key={index}
                  text={card.title}
                  link={"/"}
                  color={false}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default SixthSection;
