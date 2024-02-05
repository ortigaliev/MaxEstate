const Member = require("../models/Member");
const Estate = require("../models/Estate");
let agencyController = module.exports;

agencyController.getMyAgencyEstate = async (req, res) =>{
  try{
    console.log("GET: cont/getMyAgencyEstate");
    const estate = new Estate();
    const data = await estate.getAllEstateDataAgency(res.locals.member);
    res.render("agency-list", {agency_data: data});
  } catch (err) {
    console.log(`ERROR, cont/getMyAgencyEstate, ${err.message}`);
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

//Validate AUTH Agency
agencyController.validateAuthAgency = (req, res, next) => {
  if (req.session?.member?.mb_type === "AGENCY") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "fail", message: "Only authenticated members with agency type",
    });
};


//check-me controller
agencyController.checkSession = (req, res) => {
  if (req.session?.member){
    res.json({ state: "success", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You are not authenticated"});
  }
}