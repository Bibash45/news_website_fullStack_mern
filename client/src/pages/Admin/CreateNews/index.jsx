import React, { useEffect, useState } from "react";
import { TextEditor } from "../../../components/Admin";
import { ToastContainer, toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

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
  "स्वास्थ्य",
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

const CreateNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    province: "",
    category: "",
    images: [],
    videos: [],
    tags: [],
  });

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const [tagInput, setTagInput] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [previewVideos, setPreviewVideos] = useState([]);

  console.log(formData);

  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));

    if (type === "image") {
      setPreviewImages((prev) => [...prev, ...urls]);
      setFormData({ ...formData, images: files });
    } else if (type === "video") {
      setPreviewVideos((prev) => [...prev, ...urls]);
      setFormData({ ...formData, videos: files });
    }
  };

  const removeFile = (index, type) => {
    if (type === "image") {
      setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    } else if (type === "video") {
      setPreviewVideos((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleTagKeyPress = (event) => {
    if (event.key === "Enter" && tagInput.trim()) {
      event.preventDefault();
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitButtonLoading(false);
    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("author", formData.author);
    form.append("province", formData.province);
    form.append("category", formData.category);
    formData.images.forEach((image) => form.append("images", image));
    formData.videos.forEach((video) => form.append("videos", video));
    formData.tags.forEach((tag) => form.append("tags", tag));

    try {
      setSubmitButtonLoading(true);
      const response = await fetch("http://localhost:8000/api/news/", {
        method: "POST",
        body: form,
      });

      const result = await response.json();
      console.log(response);
      if (response.ok) {
        toast("news posted successfully");
        setFormData({
          title: "",
          content: "",
          author: "",
          province: provinces[0],
          category: newsTypes[0],
          images: [],
          videos: [],
          tags: [],
        });
        setTagInput("");
        setPreviewImages([]);
        setPreviewVideos([]);
        setSubmitButtonLoading(false);
      } else {
        toast.error("failed");
        setSubmitButtonLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitButtonLoading(false);
    }
  };
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      province: provinces[0],
      category: newsTypes[0],
    }));
  }, []);
  return (
    <div className="p-4">
      <ToastContainer />
      <div className="mx-auto bg-white drop-shadow-md rounded">
        <h3 className="p-6 font-bold mb-8 text-black border-b">
          Write News Article
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
              {previewImages.length > 0 && (
                <PreviewMedia
                  previewFiles={previewImages}
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
              {previewVideos.length > 0 && (
                <PreviewMedia
                  previewFiles={previewVideos}
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

const PreviewMedia = ({ previewFiles, removeFile, type }) => (
  <div className="mt-2 grid grid-cols-3 gap-2">
    {previewFiles.map((url, index) => (
      <div key={index} className="relative">
        {type === "image" ? (
          <div className="relative">
            <img
              src={url}
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

export default CreateNews;
