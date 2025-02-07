import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDeleteNewsMutation, useGetNewsByPoliticsQuery } from "../../../features/newsApiSlice";
import { BASE_URL } from "../../../constants";
import { formatDate } from "./../../../utils/Dateformatter";
import Paginate from "../../../components/Admin/Pagination/Paginate";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast , ToastContainer} from "react-toastify";

const PoliticsNews = () => {
  const { token } = useSelector((state) => state.auth.userInfo || {});
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { pathname } = useLocation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageNumber =
    queryParams.get("pageNumber") === null ? 1 : queryParams.get("pageNumber");
  const keyword =
    queryParams.get("keyword") === null ? "" : queryParams.get("keyword");

  console.log(keyword);

  const {
    data: newsList,
    isLoading: newsListLoading,
    error: newsListError,
    refetch: refetchNewsList,
  } = useGetNewsByPoliticsQuery({ keyword, pageNumber });

   const [deleteNews, { isLoading: deleteNewsLoading }] =
      useDeleteNewsMutation();
  
    const handleDeleteNews = async (newsId) => {
      try {
        const response = await deleteNews({
          newsId,
          token,
        }).unwrap();
        await refetchNewsList();
        console.log(response);
        toast.success(response.message);
      } catch (error) {
        console.log(error);
      }
    };



  if (newsListLoading) {
    return <div>Loading...</div>;
  }
  if (!newsList) {
    return (
      <div className="text-center my-2">
        <h1 className="text-xl">No news found</h1>
      </div>
    );
  }

  return (
    <>
    <ToastContainer />
      <div className="flex items-center justify-center ml-4 px-8 py-5 relative w-2/3 lg:w-1/3">
        <div className="w-full">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`?keyword=${searchValue}`);
                setSearchValue("");
              }
            }}
            type="text"
            className="border-gray-300 focus:outline-none px-4 py-2 w-full rounded-md"
            placeholder="Type to Search..."
          />
        </div>
        <div
          className="flex items-center justify-center ml-4 absolute right-6"
          onClick={() => {
            navigate(`?keyword=${searchValue}`);
            setSearchValue("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>

      <div className="w-full mx-auto px-4 py-3">
        {/* News List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList &&
            newsList.data.map((news, index) => (
              <div
                key={news._id}
                className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >
                {/* Image Carousel */}
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  className="w-full h-52"
                >
                  {news.media.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={`${BASE_URL}/${img}`}
                        alt={`News ${i}`}
                        className="w-full h-52 object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* News Content */}
                <div className="p-5">
                  <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-md">
                    {news.category}
                  </span>
                  <h2 className="text-xl font-semibold text-gray-900 mt-3">
                    {news.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    By {news.author} • {formatDate(news.createdAt)}
                  </p>
                 
                  {/* Video List for Each News */}
                  <div className="flex flex-wrap justify-start items-center mt-4">
                    {news.media.videos.map((video, i) => (
                      <div
                        key={i}
                        className="bg-gray-100 p-4 rounded-lg shadow-lg w-[200px]"
                      >
                        <video controls className="w-full rounded-lg">
                          <source
                            src={`${BASE_URL}/${video}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ))}
                  </div>
                </div>

                {/* View Details Button */}
                {/* View Details Button */}
                <div className="text-end w-full flex flex-wrap justify-around items-center">
                  <div className="w-2/4">
                    <Link to={`/admin/newsdetails/${news._id}`}>
                      <button className="text-white bg-purple-400 px-3 py-2 rounded-md hover:shadow-md hover:shadow-purple-500 cursor-pointer w-full">
                        View Details
                      </button>
                    </Link>
                  </div>
                  <div className="w-1/4 flex justify-end items-center">
                    <button className="text-blue-500  px-3 py-2 rounded-md cursor-pointer w-full text-end flex justify-end">
                      <FaEdit size={25} />
                    </button>
                  </div>
                  <div className="w-1/4 flex justify-end items-center">
                    <button 
                    onClick={() => handleDeleteNews(news._id)}className="text-red-500  px-3 py-2 rounded-md cursor-pointer w-full text-end flex justify-end">
                      <MdDelete size={25} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <Paginate
          pages={newsList.pages}
          page={newsList.page}
          isAdmin={true}
          state="politics"
        />
      </div>
    </>
  );
};

export default PoliticsNews;
