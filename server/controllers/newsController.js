import News from "../models/newsModel.js";
import asyncHandler from "./../middleware/asyncHandler.js";

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
  const newsId = req.params.newsId;
  const news = await News.findByIdAndDelete(newsId);
  if (!news) {
    res.status(404);
    throw new Error("News article not found");
  }
  return res.json({
    success: true,
    message: "News article deleted successfully",
  });
});

export const getNewsDetails = asyncHandler(async (req, res) => {
  const id = req.params.newsId;
  console.log(id);
  f;
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

  const pageSize = Number(process.env.PAGINATION_LIMIT) || 8; // Ensure it's a number

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
  const pageSize = Number(process.env.PAGINATION_LIMIT) || 20;

  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: 'i' } },
          { content: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : null;

  // If no keyword is provided, return an empty response
  if (!keyword) {
    return res.status(200).json({
      success: true,
      message: 'No keyword provided, returning empty results.',
      data: [],
    });
  }

  // Count the total number of documents matching the query
  const count = await News.countDocuments(keyword);

  // Fetch the news articles with pagination
  const news = await News.find(keyword)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1));

  // Check if any news articles were found
  if (!news || news.length === 0) {
    return res.status(404).json({ success: false, message: 'News not found' });
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
