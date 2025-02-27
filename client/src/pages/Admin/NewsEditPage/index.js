import React, { useCallback, useEffect, useState } from "react";
import { TextEditor } from "../../../components/Admin";
import { ToastContainer, toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { useGetDetailNewsQuery } from "../../../features/newsApiSlice";
import { BASE_URL } from "../../../constants";
import { useSelector } from "react-redux";

const newsTypes = [
  "राजनीति",
  "बजार अर्थतन्त्र",
  "विचार",
  "नेपाली ब्रान्ड",
  "समाज",
  "कला",
  "खेलकुद",
  "ब्लग",
  "ग्लोबल",
];

const provinces = [
  "कोशी प्रदेश",
  "गण्डकी प्रदेश",
  "कर्णाली प्रदेश",
  "लुम्बिनी प्रदेश",
  "बागमती प्रदेश",
  "सुदूरपश्चिम प्रदेश",
  "मधेस प्रदेश",
  "अन्य",
];

const NewsEditPage = () => {
  const { token } = useSelector((state) => state.auth.userInfo || {});

  const { newsId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    province: "",
    category: "",
    images: [],
    oldImages: [],
    videos: [],
    oldVideos: [],
    tags: [],
  });

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const [tagInput, setTagInput] = useState("");
  const [newImages, setNewImages] = useState([]);

  const [newVideos, setNewVideos] = useState([]);

  const {
    data: detailNews,
    isLoading: detailNewsLoading,
    error: detailNewsError,
  } = useGetDetailNewsQuery({ newsId });

  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    if (type === "image") {
      setNewImages((prev) => [
        ...prev,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    } else if (type === "video") {
      setNewVideos((prev) => [
        ...prev,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
      setFormData((prev) => ({ ...prev, videos: [...prev.videos, ...files] }));
    }
  };

  const removeFile = (index, type) => {
    setFormData((prev) => ({
      ...prev,
      [type === "image" ? "images" : "videos"]: prev[
        type === "image" ? "images" : "videos"
      ].filter((_, i) => i !== index),
      [type === "image" ? "oldImages" : "oldVideos"]: prev[
        type === "image" ? "oldImages" : "oldVideos"
      ].filter((_, i) => i !== index),
    }));

    if (type === "image") {
      setNewImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setNewVideos((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleTagKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter" && tagInput.trim()) {
        event.preventDefault();
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
        setTagInput("");
      }
    },
    [tagInput]
  );

  const removeTag = useCallback((index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.author.trim()
    ) {
      toast.error("शीर्षक, सामग्री, र लेखक आवश्यक छ!");
      return;
    }

    setSubmitButtonLoading(true);

    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("author", formData.author);
    form.append("province", formData.province);
    form.append("category", formData.category);
    formData.images.forEach((image) => form.append("images", image));
    formData.oldImages.forEach((image) => form.append("oldImages", image));
    formData.videos.forEach((video) => form.append("videos", video));
    formData.oldVideos.forEach((video) => form.append("oldVideos", video));
    formData.tags.forEach((tag) => form.append("tags", tag));

    try {
      const response = await fetch(
        `${BASE_URL}/api/news/updateNews/${newsId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("News updated successfully");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong!");
    } finally {
      setSubmitButtonLoading(false);
    }
  };

  useEffect(() => {
    if (detailNews?.data) {
      setFormData((prev) => ({
        ...prev,
        title: detailNews.data.title || "",
        content: detailNews.data.content || "",
        author: detailNews.data.author || "",
        province: detailNews.data.province || provinces[0],
        category: detailNews.data.category || newsTypes[0],
        tags: detailNews.data.tags || [],
        oldImages: detailNews.data.media?.images || [],
        oldVideos: detailNews.data.media?.videos || [],
      }));
    }
  }, [detailNews]);

  console.log(formData);

  if (detailNewsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="mx-auto bg-white drop-shadow-md rounded">
        <h3 className="p-6 font-bold mb-8 text-black border-b">
          Edit News Article
        </h3>
        <div className="container px-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm text-gray-600">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="mt-2 p-3 bg-gray-200 focus:outline-none w-full border rounded-md"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="mb-6">
              <label htmlFor="author" className="block text-sm text-gray-600">
                Author
              </label>
              <input
                type="text"
                id="author"
                className="mt-2 p-3 bg-gray-200 focus:outline-none w-full border rounded-md"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
              />
            </div>

            <div className="mb-6">
              <label htmlFor="newsType" className="block text-sm text-gray-600">
                News Type
              </label>
              <select
                id="newsType"
                className="mt-2 p-3 bg-gray-200 focus:outline-none w-full border rounded-md"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option disabled>Select News Type</option>
                {newsTypes.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="province" className="block text-sm text-gray-600">
                Province
              </label>
              <select
                id="province"
                className="mt-2 p-3 bg-gray-200 focus:outline-none w-full border rounded-md"
                value={formData.province}
                onChange={(e) =>
                  setFormData({ ...formData, province: e.target.value })
                }
              >
                <option disabled>Select Province</option>
                {provinces.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600">Tags</label>
              <div className="flex flex-wrap gap-2 mt-2 border p-2 rounded-md bg-gray-200">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-500 text-white px-2 py-1 rounded-md flex items-center"
                  >
                    {tag}
                    <RxCross2
                      className="ml-2 cursor-pointer"
                      onClick={() => removeTag(index)}
                    />
                  </span>
                ))}
                <input
                  type="text"
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Add a tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600">
                Upload Images
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                multiple
                onChange={(e) => handleFileChange(e, "image")}
              />
              <label
                htmlFor="imageUpload"
                className="mt-2 p-2 w-full cursor-pointer border border-gray-300 rounded-md bg-gray-600 text-white hover:bg-gray-700 flex items-center justify-center"
              >
                Select Files
              </label>
              {(formData.oldImages || newImages.length > 0) && (
                <PreviewMedia
                  previewFiles={formData.oldImages}
                  newFiles={newImages}
                  removeFile={removeFile}
                  type="image"
                />
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600">
                Upload Videos
              </label>
              <input
                type="file"
                id="videoUpload"
                accept="video/*"
                className="hidden"
                multiple
                onChange={(e) => handleFileChange(e, "video")}
              />
              <label
                htmlFor="videoUpload"
                className="mt-2 p-2 w-full cursor-pointer border border-gray-300 rounded-md bg-gray-600 text-white hover:bg-gray-700 flex items-center justify-center"
              >
                Select Files
              </label>
              {(formData.oldVideos.length > 0 || newVideos.length > 0) && (
                <PreviewMedia
                  previewFiles={formData.oldVideos}
                  newFiles={newVideos}
                  removeFile={removeFile}
                  type="video"
                />
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="content" className="block text-sm text-gray-600">
                Content
              </label>
              <textarea
                id="content"
                className="mt-2 p-3 bg-gray-200 focus:outline-none w-full border rounded-md h-40"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:shadow-md hover:shadow-red-600/50 text-white w-full p-3 rounded-md"
            >
              {submitButtonLoading ? "Publishing..." : "Publish"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const PreviewMedia = ({ previewFiles, removeFile, type, newFiles }) => (
  <div className="mt-2 grid grid-cols-3 gap-2">
    {previewFiles.map((url, index) => (
      <div key={index} className="relative">
        {type === "image" ? (
          <div className="relative">
            <img
              src={`${BASE_URL}/${url}`}
              alt={`Preview ${index}`}
              className="w-full h-32 object-cover rounded-md"
            />
            <span
              onClick={() => removeFile(index, type)}
              className="absolute right-1 top-1 bg-gray-500 text-white rounded-full p-1 cursor-pointer"
            >
              <RxCross2 />
            </span>
          </div>
        ) : (
          <div className="relative">
            <video controls className="w-full h-32 rounded-md">
              <source src={`${BASE_URL}/${url}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <span
              onClick={() => removeFile(index, type)}
              className="absolute right-1 top-1 bg-gray-500 text-white rounded-full p-1 cursor-pointer"
            >
              <RxCross2 />
            </span>
          </div>
        )}
      </div>
    ))}
    {newFiles.map((url, index) => (
      <div key={index} className="relative">
        {type === "image" ? (
          <div className="relative">
            <img
              src={`${url}`}
              alt={`Preview ${index}`}
              className="w-full h-32 object-cover rounded-md"
            />
            <span
              onClick={() => removeFile(index, type)}
              className="absolute right-1 top-1 bg-gray-500 text-white rounded-full p-1 cursor-pointer"
            >
              <RxCross2 />
            </span>
          </div>
        ) : (
          <div className="relative">
            <video controls className="w-full h-32 rounded-md">
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <span
              onClick={() => removeFile(index, type)}
              className="absolute right-1 top-1 bg-gray-500 text-white rounded-full p-1 cursor-pointer"
            >
              <RxCross2 />
            </span>
          </div>
        )}
      </div>
    ))}
  </div>
);

export default NewsEditPage;
