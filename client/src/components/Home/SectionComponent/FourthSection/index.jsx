import { Share2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useGetNewsByProvinceQuery } from "../../../../features/newsApiSlice";
import { formatDate } from "../../../../utils/Dateformatter";

const provinces = [
  "कोशी",
  "मधेस",
  "वाग्मती",
  "गण्डकी",
  "लुम्बिनी",
  "कर्णाली",
  "सुदुरपश्चिम",
];

const Button = ({ children, onClick, variant = "outline" }) => {
  const styles =
    variant === "default"
      ? "bg-gray-600 text-white"
      : "border border-black text-black";

  return (
    <button
      onClick={onClick}
      className={`${styles} py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

const FourthSection = () => {
  const [selectedProvince, setSelectedProvince] = useState(provinces[0]);

  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: newsList,
    isLoading: newsListLoading,
    error: newsListError,
    refetch: newsListRefetch,
  } = useGetNewsByProvinceQuery({ province: selectedProvince, pageNumber });
  console.log(newsList);

  if (newsListLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-8">
      <hr />

      {/* Province Selection */}
      <div className="mb-6 mt-3">
        <h2 className="text-2xl font-semibold ">प्रदेश छान्नुहोस्</h2>
        <div className="flex gap-2 mt-2 overflow-auto">
          {provinces.map((province) => (
            <Button
              key={province}
              variant={selectedProvince === province ? "default" : "outline"}
              onClick={() => setSelectedProvince(province)}
            >
              {province}
            </Button>
          ))}
        </div>
      </div>
      <div className=" mx-auto p-4 grid grid-cols-1 md:grid-cols-2">
        <div>
          {/* News Header */}
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedProvince}को विषेस समाचार
          </h1>

          {newsList && newsList.data && (
            <div>
              <div className="h-[400px] mb-3">
                <img
                  src={`http://localhost:8000/${newsList.data[0].media.images[0]}`}
                  className="w-full h-full rounded-xl  shadow-lg object-contain"
                  alt="img"
                />
              </div>
              {/* News Content */}
              <div className="text-gray-900 font-semibold leading-7 space-y-4 text-2xl">
                <p>{newsList.data[0].title}</p>
              </div>
            </div>
          )}
        </div>

        {newsList && newsList.data && (
          <div className="pl-5">
            {/* Related News */}
            <h2 className="text-2xl font-semibold mt-8">
              {selectedProvince}बाट सम्बन्धित समाचार
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {newsList.data.slice(1, 7).map((news) => (
                <Card key={news._id} className="cursor-pointer">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{news.title}</h3>
                    <p className="text-gray-500 text-sm">
                      {formatDate(news.createdAt)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default FourthSection;
