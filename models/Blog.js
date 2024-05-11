const BoBlogModel = require("../schema/bo_blog.model");
const Definer = require("../lib/mistake");
const assert = require("assert");
const {
  shapeIntoMongooseObjectId,
  board_id_enum_list,
  lookup_auth_member_liked,
} = require("../lib/config");
const Member = require("./Member");

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

  async getMemberBlogsData(member, mb_id, inquiry) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
      mb_id = shapeIntoMongooseObjectId(mb_id);
      const page = inquiry["page"] ? inquiry["page"] * 1 : 1;
      const limit = inquiry["limit"] ? inquiry["limit"] * 1 : 5;

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
          lookup_auth_member_liked(auth_mb_id),
        ])
        .exec();
      assert.ok(result, Definer.blog_err2);

      return result;
    } catch (err) {
      throw err;
    }
  }

  async getBlogsData(member, inquiry) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
      let matches =
        inquiry.bo_id === "all"
          ? { bo_id: { $in: board_id_enum_list }, blog_status: "active" }
          : { bo_id: inquiry.bo_id, blog_status: "active" };
      inquiry.limit *= 1;
      inquiry.page *= 1;
      const sort = inquiry.order
        ? { [`${inquiry.order}`]: -1 }
        : { createdAt: -1 };
      const result = await this.boBlogModel
        .aggregate([
          { $match: matches },
          { $sort: sort },
          { $skip: (inquiry.page - 1) * inquiry.limit },
          { $limit: inquiry.limit },
          {
            $lookup: {
              from: "members",
              localField: "mb_id",
              foreignField: "_id",
              as: "member_data",
            },
          },
          { $unwind: "$member_data" },
          lookup_auth_member_liked(auth_mb_id),
        ])
        .exec();

      assert.ok(result, Definer.blog_err3);

      return result;
    } catch (err) {
      throw err;
    }
  }

  async getChosenBlogData(member, bo_id) {
    try {
      bo_id = shapeIntoMongooseObjectId(bo_id);

      if (member) {
        const member_obj = new Member();
        await member_obj.viewChosenItemByMember(member, bo_id, "blog");
      }

      const result = await this.boBlogModel.findById({ _id: bo_id }).exec();
      assert.ok(result, Definer.blog_err3);

      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Blog;
