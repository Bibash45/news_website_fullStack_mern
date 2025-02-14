import {
  Header,
  NavFooter,
  SmallHorizontalCard,
  BannerAdvertisement,
  NinthSection,
  ColumnHead,
  SmallAdvertisement,
} from "../../components";
import { CiUser } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import {
  useGetDetailNewsQuery,
  useGetSimilarNewsQuery,
} from "../../features/newsApiSlice";
import { formatDate } from "../../utils/Dateformatter";
import { BASE_URL } from "../../constants";
import { useEffect, useState } from "react";

const Article = () => {
  const { newsId } = useParams();

  const {
    data: newsList,
    isLoading: newsListLoading,
    error: newsListError,
  } = useGetDetailNewsQuery({ newsId });
  const {
    data: similarNewsList,
    isLoading: similarNewsListLoading,
    error: similarNewsListError,
  } = useGetSimilarNewsQuery({ newsId });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = newsList?.data?.media?.images || [];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [images]);

  if (newsListLoading || similarNewsListLoading) {
    return <div>Loading...</div>;
  }

  const sentences = newsList?.data?.content
    .split("।")
    .filter((sentence) => sentence.trim() !== "");
  const totalParagraph = [];
  for (let i = 0; i < sentences.length; i += 2) {
    totalParagraph.push(sentences.slice(i, i + 2).join(".") + ".");
  }
  const mid = totalParagraph.length / 2;
  const firstHalf = totalParagraph.slice(0, mid);
  const secondHalf = totalParagraph.slice(mid);

  const smallHorizontalCard = [
    {
      link: "/your-link-url",
      imageSrc: "images/Article/21.jpg",
      text: "Sununu endorses Haley, hoping to slow Trump’s march to ...",
      tag: "",
    },
    {
      link: "/your-link-url",
      imageSrc: "images/Article/22.jpg",
      text: "Here’s Nikki Haley’s path to the Republican ...",
      tag: "",
    },

    {
      link: "/your-link-url",
      imageSrc: "images/Article/23.jpg",
      text: "Opinion: The best way to keep Trump off the ballot",
      tag: "",
    },
  ];

  return (
    <>
      <Header />
      <div className="flex flex-wrap">
        <div className="w-full p-4 md:w-3/4 ">
          <div className="title flex justify-center">
            <h1 className="text-4xl font-bold mx-4 mt-4 pb-1 text-justify px-[65px]">
              {newsList.data.title}
            </h1>
          </div>
          <div className="pl-4 author flex text-center justify-center">
            <div className="author-name-date flex gap-2">
              <div className="author-name text-base text-gray-600 pl-2 flex items-center gap-1">
                <span>
                  <CiUser />
                </span>
                <span className="underline">{newsList.data.author}</span>
              </div>
              <div className="publish-date text-base text-gray-600 pl-2 flex items-centre justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span className="pr-2 pl-[2px]">
                  {formatDate(newsList.data.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="content pt-6 pl-4">
            <div className="image-box h-[200px] md:h-[350px] lg:h-[500px] relative">
              {images.length > 0 && (
                <img
                  src={`${BASE_URL}/${images[currentImageIndex]}`}
                  className="w-full h-full object-contain transition-opacity duration-500"
                  alt={`Slide ${currentImageIndex + 1}`}
                />
              )}
            </div>
            <div className="article-text mt-4 mx-2 md:mx-16">
              <div className="prose max-w-none">
                {firstHalf.map((paragraph, index) => (
                  <p key={index} className="mb-2 text-xl">
                    {paragraph} ।
                  </p>
                ))}
              </div>
              {newsList?.data?.media?.videos[0] && (
                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  <iframe
                    src={`${BASE_URL}/${newsList?.data?.media?.videos[0]}`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    }}
                    title="video (online-video-cutter.com)"
                  ></iframe>
                </div>
              )}

              <div className="prose max-w-none">
                {secondHalf.map((paragraph, index) => (
                  <p key={index} className="mb-2 text-xl">
                    {paragraph} ।
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-4 md:w-1/4">
          <div className="mt-12 md:mt-p12.5rem">
            <div>
              <ColumnHead columnHeadTag={"भण्डाफोरबाट थप"} />
            </div>
            <div>
              {similarNewsList.map((card, index) => (
                <SmallHorizontalCard
                  key={index}
                  text={card.title}
                  link={`/news/${card._id}`}
                  color={false}
                  imageSrc={`${BASE_URL}/${card.media.images[0]}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <NavFooter />
    </>
  );
};

export default Article;
