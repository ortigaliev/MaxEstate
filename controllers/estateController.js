const Estate = require("../models/Estate");
const assert = require("assert");
const Definer = require("../lib/mistake");
let estateController = module.exports;

estateController.getAllEstate = async (req, res) =>{
  try{
    console.log("GET: cont/getAllEstate");
  } catch (err) {
    console.log(`ERROR, const/getAllEstate, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};

estateController.addNewEstate = async (req, res) =>{
  try{
    console.log("POST: cont/addNewEstate");
    console.log(req.member);

    assert.ok(req.files, Definer.general_err3);
    const estate = new Estate();
    let data = req.body;

    data.estate_images = req.files.map((ele) =>{
      return ele.path; //Get file path and save it to DB
    });
    const result = await estate.addNewEstateData(data, req.member);
    assert.ok(result, Definer.estate_err1);
    const html = `<script>
                    alert("new estate added successfully");
                    window.location.replace("/prop/estate/list");
                  </script>`; //if estate added successfully it send a estate sucessfuly
    res.end(html);
    res.send("ok");
  } catch (err) {
    console.log(`ERROR, cont/addNewEstate, ${err.message}`);
  }
};

estateController.updateChosenEstate = async (req, res) =>{
  try{
    console.log("POST: cont/updateChosenEstate");
    const estate = new Estate();
    const id = req.params.id;
    const result = await estate.updateChosenEstateData(
        id,
        req.body,
        req.member._id);
    await res.json ({state: "success", data: result});

  } catch (err) {
    console.log(`ERROR, cont/updateChosenEstate, ${err.message}`);
    res.json({state: 'fail', message: err.message});
  }
};