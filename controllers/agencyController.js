const Member = require("../models/Member");
const Estate = require("../models/Estate");
const assert = require("assert");
const Definer = require("../lib/mistake");
let agencyController = module.exports;

agencyController.home = (req, res) => {
  try{
    console.log("GET: cont/home");
    res.render("home-page");
  } catch (err) {
    console.log(`ERROR, cont/home, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};

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
    console.log("POST: cont/signupProcess");
    assert.ok(req.file, Definer.general_err3);

    let new_member = req.body;
    new_member.mb_type = "AGENCY";
    new_member.mb_image = req.file.path;

    const member = new Member();
    const result = await member.signupData(new_member);
    assert(result, Definer.general_err1);

    req.session.member = result;
    res.redirect("/prop/estate/list");
  } catch (err) {
    console.log(`ERROR, cont/signupProcess, ${err.message}`);
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
    console.log("POST: cont/loginProcess");
    const data = req.body,
    member = new Member(),
    result = await member.loginData(data);

    req.session.member = result;
    req.session.save(function () {
      result.mb_type === "ADMIN" ? res.redirect(".prop/all-astete") : res.redirect("/prop/estate/list");
    });
  } catch (err) {
    console.log(`ERROR, const/loginProcess, ${err.message}`);
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