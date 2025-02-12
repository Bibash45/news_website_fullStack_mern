import React, { useState } from "react";
import { Header, NavFooter, TenthSection } from "../../components";
import { useLocation } from "react-router-dom";
import { useGetSearchNewsQuery } from "../../features/newsApiSlice";
import { BASE_URL } from "../../constants";

const NewsSearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageNumber =
    queryParams.get("pageNumber") === null ? 1 : queryParams.get("pageNumber");
  const keyword =
    queryParams.get("keyword") === null ? "" : queryParams.get("keyword");

  const {
    data: newsList,
    isLoading: newsListLoading,
    error: newsListError,
    refetch: refetchNewsList,
  } = useGetSearchNewsQuery({ keyword, pageNumber });

  console.log(newsList);

  const [newsResults, setNewsResults] = useState([
    {
      id: 1,
      title: "Breaking News: Tech Revolution in Nepal",
      date: "2025-02-12",
      description:
        "Nepal is experiencing a tech boom with new startups emerging in AI and blockchain.",
    },
    {
      id: 2,
      title: "Government Announces New Policies",
      date: "2025-02-10",
      description:
        "The latest policies focus on economic growth and digital transformation.",
    },
    {
      id: 3,
      title: "Sports Update: Nepal Wins International Trophy",
      date: "2025-02-08",
      description:
        "The national football team secured victory in the latest international tournament.",
    },
  ]);

  if (newsListLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Header */}
      <Header />

      {/* Page Container */}
      <div className="py-8 md:px-8 px-1">
        {/* Page Title */}
        {newsList && newsList.data ? (
          <>
            {" "}
            <h2 className="text-xl font-bold text-start mb-2">
              तपाईँले खोजि गर्नुभएको शब्द 'हमासले शनिबारसम्ममा बन्धक नछोडे
              विध्वंश हुने ट्रम्पको चेतावनी' अनुसार निम्न नतिजा प्राप्त भयो ।{" "}
            </h2>
            <hr className="mb-6" />
          </>
        ) : (
          <h2 className="text-center text-gray-500 text-2xl my-5">
            तपाईँले खोजि गर्नुभएको शब्द '
            <span className="text-blue-500">{keyword}</span>' अनुसार नतिजा
            प्राप्त हुन सकेन ।
          </h2>
        )}

        {/* News List */}
        <div className="grid gap-x-6 gap-y-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {newsList &&
            newsList.data.length > 0 &&
            newsList.data.map((news) => (
              <div
                key={news._id}
                className="bg-white px-6 rounded-xl   transition "
              >
                <img
                  className="mb-2"
                  src={`${BASE_URL}/${news.media.images[0]}`}
                  alt=""
                />
                <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
              </div>
            ))}
        </div>
      </div>
      <TenthSection />
      <NavFooter />
    </div>
  );
};

export default NewsSearchPage;
