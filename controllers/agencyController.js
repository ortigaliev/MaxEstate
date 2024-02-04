const Member = require("../models/Member");
let agencyController = module.exports;

agencyController.getSignupMyAgency = async (req, res) =>{
  try{
    console.log("GET: cont/getSignupMyAgency");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR, cont/getSignupMyAgency, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
}

agencyController.signupProcess = async (req, res) => {
  try{
    console.log("POST: cont/signup");
    const data = req.body,
    member = new Member(),
    new_member = await member.signupData(data);

    res.json({state: "success", data: new_member});
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};

//login controller
agencyController.getLoginMyAgency = async (req, res) =>{
  try{
    console.log("GET: cont/getLoginMyAgency");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR, const/getLoginMyAgency, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};

agencyController.loginProcess = async (req, res) => {
  try{
    console.log("POST: cont/login");
    const data = req.body,
    member = new Member(),
    result = await member.loginData(data);

    res.json({state: "success", data: result});
  } catch (err) {
    console.log(`ERROR, const/login, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};

//loguot controller
agencyController.logout = (req, res) => {
  console.log("GET contr.logout");
  res.send("logout page");
};