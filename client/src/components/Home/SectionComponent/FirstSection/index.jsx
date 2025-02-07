import { Link } from "react-router-dom";
import { MidCard, CardTextOnly } from "../../../common/Cards";
import { useGetAllNewsQuery } from "../../../../features/newsApiSlice";
import { BASE_URL } from "../../../../constants";

const FirstSection = () => {
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
      <div className="flex flex-col md:px-8 md:flex-row">
        <div className="w-full p-4 md:w-2/3">
          <Link to="/new-link" className="">
            <div className="max-w-screen-md mx-auto">
              <h1 className="text-3xl font-bold mb-4 text-black text-center decoration-1 hover:underline hover:underline-offset-8 hover:text-gray-500">
                {newsList.data[0].title}
              </h1>
              <div className="max-w-screen-md mx-auto mb-3">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={`${BASE_URL}/${newsList.data[0].media.images[0]}`}
                    alt=""
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2 decoration-1 hover:underline hover:underline-offset-4">
                {newsList.data[0].content.slice(0, 100)}
                <span className="text-sm  font-normal"> ....more</span>
              </h4>
              <hr />
              <h2 className="text-2xl mt-2">मुख्य समाचारहरु : </h2>
              <ul className="px-5 mt-1 text-xl">
                {newsList.data.slice(0, 6).map((news, i) => (
                  <li key={i} className="list-disc">
                    {news.title}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        </div>
        <div className="w-full p-4 md:w-1/3">
          {newsList.data.slice(1, 4).map((card, index) => (
            <MidCard
              key={index}
              title={card.title}
              imageSrc={`${BASE_URL}/${card.media.images[0]}`}
              tag={card.tags[0]}
            />
          ))}
        </div>
        <div className="w-full p-4 md:w-1/3">
          <Link className="relaitve w-305 h-171 group mb-4">
            <div>
              <video
                className="w-full h-full rounded-sm"
                autoPlay={true}
                muted
                playsInline
                loop
                controls
              >
                <source src="videos/FirstSection/video.mp4" type="video/mp4" />
              </video>
            </div>
          </Link>
          <div>
            <div className="mb-2 mt-2 font-bold text-xl decoration-1 hover:underline hover:underline-offset-4">
              ताजा अपडेट
            </div>
            <div>
              {newsList.data.slice(4, 13).map((card, index) => (
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
      </div>
    </>
  );
};

export default FirstSection;
