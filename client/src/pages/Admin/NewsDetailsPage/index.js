import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGetDetailNewsQuery } from "../../../features/newsApiSlice";
import { formatDate } from "../../../utils/Dateformatter";
import { BASE_URL } from "../../../constants";

const AdminNewsDetails = () => {
  const { newsId } = useParams();

  const {
    data: detailNews,
    isLoading: detailNewsLoading,
    error: detailNewsError,
  } = useGetDetailNewsQuery({ newsId });

  if (detailNewsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {detailNews.data.title}
        </h1>
        <div className="space-x-2">
          <Link to={`/admin/edit/${detailNews.data._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">
            Edit
          </Link>
        </div>
      </div>

      {/* Category & Date */}
      <div className="flex items-center gap-3 text-gray-600 text-sm mb-4">
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md">
          {detailNews.data.category}
        </span>
        <p>
          <span className="font-bold">{detailNews.data.author}</span> |{" "}
          {formatDate(detailNews.data.createdAt)}
        </p>
      </div>

      {/* Image Slider */}
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        className="w-full h-64 rounded-lg overflow-hidden shadow-lg"
      >
        {detailNews.data.media.images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={`${BASE_URL}/${img}`}
              alt={`News ${index}`}
              className="w-full h-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content */}
      <div className="mt-6">
        <p className="text-gray-800 leading-relaxed">
          {detailNews.data.content}
        </p>
      </div>

      {/* Video Section */}
      {detailNews.data.media.videos.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {detailNews.data.media.videos.map((video, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <video controls className="w-full rounded-lg">
                  <source src={`${BASE_URL}/${video}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsDetails;
