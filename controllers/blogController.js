const assert = require("assert");
const Definer = require("../lib/mistake");

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
