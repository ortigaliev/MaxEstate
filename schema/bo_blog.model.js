const mongoose = require("mongoose");
const {
  board_id_enum_list,
  board_blog_status_enum_list,
} = require("../lib/config");
const Schema = mongoose.Schema;

const boArticleSchema = new mongoose.Schema(
  {
    blog_subject: { type: String, required: true },
    blog_content: { type: String, required: true },
    blog_image: { type: String, required: false },
    blog_id: {
      type: String,
      required: true,
      enum: {
        values: board_id_enum_list,
        message: "{VALUE} is not among permitted values",
      },
    },
    blog_status: {
      type: String,
      required: false,
      default: "active",
      enum: {
        values: board_blog_status_enum_list,
        message: "{VALUE} is not among permitted values",
      },
    },
    blog_likes: { type: String, required: false, default: 0 },
    blog_views: { type: String, required: false, default: 0 },
    mb_id: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BoArticle", boArticleSchema);
