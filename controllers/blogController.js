const assert = require("assert");
const Definer = require("../lib/mistake");
const Blog = require("../models/Blog");

let blogController = module.exports;

blogController.imageInsertion = async (req, res) => {
  try {
    console.log(`POST: cont/imageInsertion`);
    assert.ok(req.file, Definer.general_err3);

    const image_url = req.file.path;

    res.json({ state: "success", data: image_url });
  } catch (err) {
    console.log(`ERROR, cont/imageInsertion, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

blogController.createBlog = async (req, res) => {
  try {
    console.log(`POST: cont/createBlog`);

    const blog = new Blog();
    const result = await blog.createBlogData(req.member, req.body);
    assert.ok(result, Definer.general_err1);

    res.json({ state: "sucess", data: result });
  } catch (err) {
    console.log(`ERROR, cont/createBlog, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
