import News from "../models/newsModel.js";
import asyncHandler from "./../middleware/asyncHandler.js";
import fs from "fs";
import path from "path";

export const testFunction = asyncHandler(async (req, res) => {
  res.send("test");
});

/**
 * @desc   Create a new news article
 * @route  POST /api/news
 * @access Public
 */
export const createNews = asyncHandler(async (req, res) => {
  try {
    const { title, content, author, category, province, tags } = req.body;

    console.log(req.files);

    const images = req.files["images"]?.map((file) => file.path);
    const videos = req.files["videos"]?.map((file) => file.path);

    const newNews = new News({
      title,
      content,
      author: author.trim(),
      province: province.trim(),
      category: category.trim(),
      tags,
      media: {
        images,
        videos,
      },
      publishedAt: Date.now(),
    });

    await newNews.save();
    res.status(201).json({
      success: true,
      message: "News article created successfully",
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

export const deleteNews = asyncHandler(async (req, res) => {
  const { newsId } = req.params;

  try {
    const news = await News.findById(newsId);
    if (!news) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }

    // Helper function to delete files
    const deleteFiles = (files) => {
      files.forEach((filePath) => {
        const fullPath = path.join(process.cwd(), filePath); // Ensure correct path
        fs.unlink(fullPath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error(`Failed to delete file: ${fullPath}`, err);
          }
        });
      });
    };

    // Delete images and videos if they exist
    if (news.media?.images?.length) {
      deleteFiles(news.media.images);
    }
    if (news.media?.videos?.length) {
      deleteFiles(news.media.videos);
    }

    // Remove news from the database
    await News.findByIdAndDelete(newsId);

    res.json({
      success: true,
      message: "News removed successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to remove news item" });
  }
});

export const getNewsDetails = asyncHandler(async (req, res) => {
  const id = req.params.newsId;
  console.log(id);
  const news = await News.findById(id);
  if (!news) {
    res.status(404);
    throw new Error("News not found");
  } else {
    return res.json({
      success: true,
      data: news,
    });
  }
});

export const getAllNews = asyncHandler(async (req, res) => {
  const pageNumber = Number(req.query.pageNumber) || 1;

  const pageSize = 30;

  // Construct the keyword query

  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: "i" } },

          { content: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  // Count the total number of documents matching the query

  const count = await News.countDocuments(keyword);

  // Fetch the news articles with pagination

  const news = await News.find(keyword)
    .sort({
      createdAt: -1,
    })
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1));

  // Check if any news articles were found

  if (!news || news.length === 0) {
    return res.status(404).json({ success: false, message: "News not found" });
  }

  // Return the response with the news articles

  return res.status(200).json({
    success: true,

    page: pageNumber,

    pages: Math.ceil(count / pageSize),

    data: news,
  });
});

export const searchNews = asyncHandler(async (req, res) => {
  const pageNumber = Number(req.query.pageNumber) || 1;
  const pageSize = Number(process.env.PAGINATION_LIMIT) || 8;

  // Construct the keyword query
  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: "i" } },
          { content: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  // Construct the date query
  let dateQuery = {};

  const fromDate = req.query.fromDate ? new Date(req.query.fromDate) : null;
  const toDate = req.query.toDate ? new Date(req.query.toDate) : null;
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Ensure the end of the day

  if (fromDate && !isNaN(fromDate)) {
    dateQuery.createdAt = {
      $gte: fromDate,
      $lte: toDate && !isNaN(toDate) ? toDate : today,
    };
  } else if (toDate && !isNaN(toDate)) {
    const startOfDay = new Date(toDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(toDate);
    endOfDay.setHours(23, 59, 59, 999);
    dateQuery.createdAt = { $gte: startOfDay, $lte: endOfDay };
  }

  // Combine keyword and date queries
  const query = { ...keyword, ...dateQuery };

  // Count total matching documents
  const count = await News.countDocuments(query);

  // Fetch the news articles with pagination
  const news = await News.find(query)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1));

  // Check if any news articles were found
  if (!news.length) {
    return res
      .status(200)
      .json({ success: false, data: [], message: "News not found" });
  }

  // Return the response with the news articles
  return res.status(200).json({
    success: true,
    page: pageNumber,
    pages: Math.ceil(count / pageSize),
    data: news,
  });
});

// Function to get news articles by category with pagination and keyword search
const getNewsByCategory = (category) => {
  return asyncHandler(async (req, res) => {
    const pageNumber = Number(req.query.pageNumber) || 1;
    console.log(req.query);

    const pageSize = Number(process.env.PAGINATION_LIMIT) || 8; // Ensure it's a number

    // Construct the keyword query

    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: "i" } },

            { content: { $regex: req.query.keyword, $options: "i" } },
          ],

          $and: [{ category }],
        }
      : { category };

    // Count the total number of documents matching the query

    const count = await News.countDocuments(keyword);

    // Fetch the news articles with pagination

    const news = await News.find(keyword)
      .sort({
        createdAt: -1,
      })
      .limit(pageSize)

      .skip(pageSize * (pageNumber - 1));

    // Check if any news articles were found

    if (!news || news.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }

    // Return the response with the news articles

    return res.status(200).json({
      success: true,

      page: pageNumber,

      pages: Math.ceil(count / pageSize),

      data: news,
    });
  });
};

// Exporting the controllers for different categories

export const getNewsByPolitics = getNewsByCategory("राजनीति");

export const getNewsByNepaliBrand = getNewsByCategory("नेपाली ब्रान्ड");

export const getNewsByMarkeyEconomy = getNewsByCategory("बजार अर्थतन्त्र");

export const getNewsBySociety = getNewsByCategory("समाज");

export const getNewsByArt = getNewsByCategory("कला");

export const getNewsBySports = getNewsByCategory("खेलकुद");

export const getNewsByBlog = getNewsByCategory("ब्लग");

export const getNewsByGlobal = getNewsByCategory("ग्लोबल");

export const getNewsByIdea = getNewsByCategory("विचार");

export const getNewsByProvince = asyncHandler(async (req, res) => {
  const pageNumber = Number(req.query.pageNumber) || 1;
  const pageSize = 7;
  const province = req.query.province?.trim(); // Trim whitespace if present

  // If no province is provided, return an empty response
  if (!province) {
    return res
      .status(200)
      .json({ success: true, page: pageNumber, pages: 0, data: [] });
  }

  // Define filter criteria (case-insensitive search)
  const filter = { province: new RegExp(province, "i") };

  // Count total documents matching the criteria
  const count = await News.countDocuments(filter);

  // Fetch the news articles with pagination
  const news = await News.find(filter)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1));

  return res.status(200).json({
    success: true,
    page: pageNumber,
    pages: Math.ceil(count / pageSize),
    data: news,
  });
});

export const similarNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const news = await News.findById(id);
  if (!news) {
    return res.status(404).json({ message: "News not found" });
  }

  const similarNews = await News.find({
    category: news.category,
    _id: { $ne: id },
  })
    .limit(10)
    .sort({ createdAt: -1 });

  if (similarNews.length === 0) {
    return res.status(404).json({ message: "No similar news found" });
  }

  res.json(similarNews);
});
