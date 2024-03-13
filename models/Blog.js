const BoBlogModel = require("../schema/bo_blog.model");
const Definer = require("../lib/mistake");
const assert = require("assert");
const { shapeIntoMongooseObjectId } = require("../lib/config");

class Blog {
  constructor() {
    this.boBlogModel = BoBlogModel;
  }

  async createBlogData(member, data) {
    try {
      data.mb_id = shapeIntoMongooseObjectId(member._id);
      const new_blog = await this.saveBlogData(data);
      return new_blog;
    } catch (err) {
      throw err;
    }
  }

  async saveBlogData(data) {
    try {
      const blog = new this.boBlogModel(data);
      return await blog.save();
    } catch (mongo_err) {
      console.log(mongo_err);
      throw new Error(Definer.auth_err1);
    }
  }

  async getMemberBlogsData(member, mb_id, inquery) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
      mb_id = shapeIntoMongooseObjectId(mb_id);
      const page = inquery["page"] ? inquery["page"] * 1 : 1;
      const limit = inquery["limit"] ? inquery["limit"] * 1 : 5;

      const result = await this.boBlogModel
        .aggregate([
          { $match: { mb_id: mb_id, blog_status: "active" } },
          { $sort: { createdAt: -1 } },
          { $skip: (page - 1) * limit },
          { $limit: limit },
          {
            $lookup: {
              from: "members",
              localField: "mb_id",
              foreignField: "_id",
              as: "member_data",
            },
          },
          { $unwind: "$member_data" },
        ])
        .exec();
      assert.ok(result, Definer.article_err2);

      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Blog;
