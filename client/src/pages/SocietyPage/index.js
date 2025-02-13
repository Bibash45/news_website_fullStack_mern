import React from "react";
import { Header, NavFooter, TenthSection } from "../../components";
import {
  useGetNewsByPoliticsQuery,
  useGetNewsBySocietyQuery,
} from "../../features/newsApiSlice";
import { BASE_URL } from "../../constants";
import { formatDate } from "../../utils/Dateformatter";
import Pagination from "../../components/Home/Paginate";
import { Link, useLocation } from "react-router-dom";

const PoliticsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageNumber = queryParams.get("pageNumber") || 1;
  const {
    data: newsList,
    isLoading: newsListLoading,
    error: newsListError,
  } = useGetNewsBySocietyQuery({ keyword: "", pageNumber });

  if (newsListLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Header */}
      <Header />

      {/* Page Container */}
      <div className="py-8 md:px-8 px-1">
        {/* News List */}
        <div className="grid gap-x-6 gap-y-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {newsList?.data?.map((news) => (
            <Link to={`/news/${news._id}`}>
              <div
                key={news._id}
                className="bg-white px-6 rounded-xl transition mb-3"
              >
                <img
                  className="mb-2"
                  src={`${BASE_URL}/${
                    news.media?.images?.[0] || "default-image.jpg"
                  }`}
                  alt={news.title}
                />
                <h3 className="text-xl font-semibold mb-1 hover:underline">
                  {news.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {formatDate(news.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Pagination
          page={newsList.page}
          pages={newsList.pages}
          state="society"
        />
      </div>

      <TenthSection />
      <NavFooter />
    </div>
  );
};

export default PoliticsPage;
