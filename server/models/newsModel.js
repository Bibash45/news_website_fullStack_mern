import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    province: {
      type: String,
      enum: [
        "कोशी प्रदेश",
        "गण्डकी प्रदेश",
        "कर्णाली प्रदेश",
        "लुम्बिनी प्रदेश",
        "बागमती प्रदेश",
        "सुदूरपश्चिम प्रदेश",
        "मधेस प्रदेश",
        "अन्य",
      ],
    },
    category: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
    media: {
      images: [{ type: String }],
      videos: [{ type: String }],
    },
    publishedAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);
export default News;
