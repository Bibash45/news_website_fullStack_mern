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
import ShareButtons from "../../components/Home/Share";
import { Helmet } from "react-helmet";

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

  const shareUrl = "https://pabitraschool.onrender.com/"
  // const shareUrl = `${window.location.origin}/news/${newsId}`;
  const shareTitle = newsList.data.title;
  
  // const shareImage = `${BASE_URL}/${images[0]}`;
  const shareImage = "https://img.setoparty.com/uploads/posts/482007148_1161387218853436_8128905589642537453_n-1740895054.jpg"

  return (
    <>
      <Helmet>
        <meta property="og:title" content={shareTitle} />
        <meta
          property="og:description"
          content={
            newsList?.data?.description ||
            "A news article about current events."
          }
        />
        <meta property="og:image" content={shareImage} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={shareTitle} />
        <meta
          name="twitter:description"
          content={
            newsList?.data?.description ||
            "A news article about current events."
          }
        />
        <meta name="twitter:image" content={shareImage} />
      </Helmet>
      <Header />
      <div className="flex flex-wrap items-center">
        <div className="w-full p-4 md:w-3/4 ">
          <div className="title flex justify-center items-center">
            <h1 className="text-2xl md:text-4xl font-bold mx-4 mt-4 pb-1 text-justify px-[65px]">
              {newsList.data.title}
            </h1>
          </div>
          <div className="pl-4 author flex text-center justify-center items-center flex-wrap">
            <div className="author-name-date flex gap-2">
              <div className="author-name text-base text-gray-600 pl-2 flex items-center gap-1">
                <span>
                  <CiUser />
                </span>
                <span className="underline">{newsList.data.author}</span>
              </div>
              <div className="publish-date text-base text-gray-600 pl-2 flex items-center justify-center">
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

              <ShareButtons
                url={shareUrl}
                title={shareTitle}
                image={shareImage}
              />
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
