const BoBlogModel = require("../schema/bo_blog.model");
const Definer = require("../lib/mistake");
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
}

module.exports = Blog;
