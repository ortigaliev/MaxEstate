const Estate = require("../models/Estate");
const assert = require("assert");
const Definer = require("../lib/mistake");

let estateController = module.exports;

estateController.getAllEstate = async (req, res) => {
  try {
    console.log("POST: cont/getAllEstate");
    const estate = new Estate();
    const result = await estate.getAllEstateData(req.member, req.body);
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getAllEstate, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

estateController.getChosenEstate = async (req, res) => {
  try {
    console.log("GET: cont/getChosenEstate");
    const estate = new Estate(),
      id = req.params.id,
      result = await estate.getChosenEstateData(req.member, id);
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`Error, GET cont/getChosenEstate, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

/******************************************
 *         BSSR RELATED MEtHODS           *
 ******************************************/

estateController.addNewEstate = async (req, res) => {
  try {
    console.log("POST: cont/addNewEstate");
    console.log(req.member);

    assert.ok(req.files, Definer.general_err3);
    const estate = new Estate();
    let data = req.body;

    data.estate_images = req.files.map((ele) => {
      return ele.path.replace(/\\/g, "/"); //Get file path and save it to DB
    });

    const result = await estate.addNewEstateData(data, req.member);
    assert.ok(result, Definer.estate_err1);

    const html = `<script>
                    alert("new estate added successfully");
                    window.location.replace("/agency/estate/list");
                  </script>`; //if estate added successfully it send a estate sucessfuly
    res.end(html);
  } catch (err) {
    console.log(`ERROR, cont/addNewEstate, ${err.message}`);
  }
};

estateController.updateChosenEstate = async (req, res) => {
  try {
    console.log("POST: cont/updateChosenEstate");
    const estate = new Estate();
    const id = req.params.id;
    const result = await estate.updateChosenEstateData(
      id,
      req.body,
      req.member._id
    );
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/updateChosenEstate, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
