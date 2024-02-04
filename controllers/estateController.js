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

    //TODO Product creation development;
  } catch (err) {
    console.log(`ERROR, cont/addNewEstate, ${err.message}`);
  }
};

estateController.updateChosenEstate = async (req, res) =>{
  try{
    console.log("POST: cont/updateChosenEstate");

  } catch (err) {
    console.log(`ERROR, cont/updateChosenEstate, ${err.message}`);
  }
};