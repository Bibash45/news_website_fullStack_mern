import React, { useEffect, useState } from "react";
import { Header, NavFooter, TenthSection } from "../../components";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useGetSearchNewsQuery } from "../../features/newsApiSlice";
import { BASE_URL } from "../../constants";

const NewsSearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageNumber = queryParams.get("pageNumber") || 1;
  const keyword = queryParams.get("keyword") || "";
  const fromDate = queryParams.get("fromDate") || "";
  const toDate = queryParams.get("toDate") || "";

  const {
    data: newsList,
    isLoading: newsListLoading,
    error: newsListError,
    refetch: refetchNewsList,
  } = useGetSearchNewsQuery({ keyword, pageNumber, fromDate, toDate });
  console.log(newsList);

  if (newsListLoading) {
    return <div>Loading...</div>;
  }

  if (!keyword && !fromDate && !toDate) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Header */}
      <Header />

      {/* Page Container */}
      <div className="py-8 md:px-8 px-1">
        {/* Page Title */}
        {newsList && newsList.data && newsList.data.length > 0 ? (
          <>
            {keyword && (
              <h2 className="text-xl font-bold text-start mb-2">
                तपाईँले खोजि गर्नुभएको शब्द '
                <span className="text-blue-500">{keyword}</span>' अनुसार निम्न
                नतिजा प्राप्त भयो ।{" "}
              </h2>
            )}
            {fromDate && toDate && (
              <h2 className="text-xl font-bold text-start mb-2">
                तपाईँले खोजि गर्नुभएको समयावधि '
                <span className="text-blue-500">
                  {fromDate} - {toDate}
                </span>
                ' अनुसार निम्न नतिजा प्राप्त भयो ।
              </h2>
            )}
            {fromDate && toDate === "" && (
              <h2 className="text-xl font-bold text-start mb-2">
                तपाईँले खोजि गर्नुभएको समयावधि '
                <span className="text-blue-500">{fromDate}</span>' देखि आजसम्म
                निम्न नतिजा प्राप्त भयो ।
              </h2>
            )}
            {toDate && fromDate === "" && (
              <h2 className="text-xl font-bold text-start mb-2">
                तपाईँले खोजि गर्नुभएको समयावधि '
                <span className="text-blue-500">{toDate}</span>' अनुसार निम्न
                नतिजा प्राप्त भयो ।
              </h2>
            )}
            <hr className="mb-6" />
          </>
        ) : (
          <>
            {keyword && (
              <h2 className="text-center text-gray-500 text-2xl my-5">
                तपाईँले खोजि गर्नुभएको शब्द '
                <span className="text-blue-500">{keyword}</span>' अनुसार नतिजा
                प्राप्त हुन सकेन ।
              </h2>
            )}

            {fromDate && toDate && (
              <h2 className="text-center text-gray-500 text-2xl my-5">
                तपाईँले खोजि गर्नुभएको समयावधि '
                <span className="text-blue-500">
                  {fromDate} - {toDate}
                </span>
                ' अनुसार निम्न नतिजा प्राप्त हुन सकेन ।
              </h2>
            )}
            {fromDate && toDate === "" && (
              <h2 className="text-center text-gray-500 text-2xl my-5">
                तपाईँले खोजि गर्नुभएको समयावधि '
                <span className="text-blue-500">{fromDate}</span>' देखि आजसम्म
                निम्न नतिजा प्राप्त हुन सकेन ।
              </h2>
            )}
            {toDate && fromDate === "" && (
              <h2 className="text-center text-gray-500 text-2xl my-5">
                तपाईँले खोजि गर्नुभएको समयावधि '
                <span className="text-blue-500">{toDate}</span>' अनुसार निम्न
                नतिजा प्राप्त हुन सकेन ।
              </h2>
            )}
          </>
        )}

        {/* News List */}
        <div className="grid gap-x-6 gap-y-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {newsList &&
            newsList.data &&
            newsList.data.map((news) => (
              <Link to={`/news/${news._id}`}>
                <div
                  key={news._id}
                  className="bg-white px-6 rounded-xl transition "
                >
                  <img
                    className="mb-2"
                    src={`${BASE_URL}/${
                      news.media?.images?.[0] || "default-image.jpg"
                    }`}
                    alt={news.title}
                  />
                  <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                </div>
              </Link>
            ))}
        </div>
      </div>

      <TenthSection />
      <NavFooter />
    </div>
  );
};

export default NewsSearchPage;
