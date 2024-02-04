const Member = require("../models/Member");
let agencyController = module.exports;

agencyController.getMyAgencyData = async (req, res) =>{
  try{
    console.log("GET: cont/getMyAgencyData");

    //TODO: Get my restaurant products
    res.render("agency-list");
  } catch {
    console.log(`ERROR, cont/getMyAgencyData, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
}

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

    req.session.member = new_member;
    res.redirect("/prop/estate/list");
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

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/prop/estate/list");
    });
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

//check-me controller
agencyController.checkSession = (req, res) => {
  if (req.session?.member){
    res.json({ state: "success", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You are not authenticated"});
  }
}