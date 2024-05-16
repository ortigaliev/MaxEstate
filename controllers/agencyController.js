const Member = require("../models/Member");
const Estate = require("../models/Estate");
const Agency = require("../models/Agency");
const assert = require("assert");
const Definer = require("../lib/mistake");

let agencyController = module.exports;

agencyController.getAgencies = async (req, res) => {
  try {
    console.log("GET: cont/getAgencies");
    const data = req.query,
      agency = new Agency(),
      result = await agency.getAgenciesData(req.member, data);
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getAgencies, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

agencyController.getChosenAgency = async (req, res) => {
  try {
    console.log("GET: cont/getChosenAgency");
    const id = req.params.id,
      agency = new Agency(),
      result = await agency.getChosenAgencyData(req.member, id);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getChosenAgency, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
/****************************************
 *          BSSR RELATED METHODS        *
 ****************************************/

agencyController.home = (req, res) => {
  try {
    console.log("GET: cont/home");
    res.render("home-page");
  } catch (err) {
    console.log(`ERROR, cont/home, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

agencyController.getMyAgencyEstate = async (req, res) => {
  try {
    console.log("GET: cont/getMyAgencyEstate");
    const estate = new Estate();
    const data = await estate.getAllEstateDataAgency(res.locals.member);
    res.render("agency-list", { agency_data: data });
  } catch (err) {
    console.log(`ERROR, cont/getMyAgencyEstate, ${err.message}`);
    res.redirect("/agency");
  }
};

agencyController.getSignupMyAgency = async (req, res) => {
  try {
    console.log("GET: cont/getSignupMyAgency");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR, cont/getSignupMyAgency, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

agencyController.signupProcess = async (req, res) => {
  try {
    console.log("POST: cont/signupProcess");
    assert.ok(req.file, Definer.general_err2);

    let new_member = req.body;
    new_member.mb_type = "AGENCY";
    // new_member.mb_image = req.file.path;
    new_member.mb_image = req.file.path.replace(/\\/g, "/");

    const member = new Member();
    const result = await member.signupData(new_member);
    assert(result, Definer.general_err1);

    req.session.member = result;
    res.redirect("/agency/estate/list");
  } catch (err) {
    console.log(`ERROR, cont/signupProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

//login controller
agencyController.getLoginMyAgency = async (req, res) => {
  try {
    console.log("GET: cont/getLoginMyAgency");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR, const/getLoginMyAgency, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

agencyController.loginProcess = async (req, res) => {
  try {
    console.log("POST: cont/loginProcess");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data);

    req.session.member = result;
    req.session.save(function () {
      result.mb_type === "ADMIN"
        ? res.redirect("/agency/all-agency")
        : res.redirect("/agency/estate/list");
    });
  } catch (err) {
    console.log(`ERROR, const/loginProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

//loguot controller
agencyController.logout = (req, res) => {
  try {
    console.log("GET cont/logout");
    req.session.destroy(function () {
      res.redirect("/agency");
    });
  } catch (err) {
    console.log(`ERROR, cont/logout, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

//Validate AUTH Agency
agencyController.validateAuthAgency = (req, res, next) => {
  if (req.session?.member?.mb_type === "AGENCY") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "fail",
      message: "Only authenticated members with agency type",
    });
};

//check-me controller
agencyController.checkSession = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "success", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You are not authenticated" });
  }
};

//Admin user controll logic.
agencyController.validateAdmin = (req, res, next) => {
  if (req.session?.member?.mb_type === "ADMIN") {
    req.member = req.session.member;
    next();
  } else {
    const html = `<script>
                    alert('Admin page: Permission denied!');
                    window.location.replace('/agency');
                  </script>`;
    res.end(html);
  }
};

//All Agency control panel for admin
agencyController.getAllAgency = async (req, res) => {
  try {
    console.log("GET cont/getAllAgency");

    const agency = new Agency();
    const agency_data = await agency.getAllAgencyData();
    console.log("agency_data:", agency_data);
    res.render("all-agency", { agency_data: agency_data });
  } catch (err) {
    console.log(`ERROR, cont/getAllAgency, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

agencyController.updateAgencyByAdmin = async (req, res) => {
  try {
    console.log("GET cont/updateAgencyByAdmin");
    const agency = new Agency();
    const result = await agency.updateAgencyByAdminData(req.body);
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/updateAgencyByAdmin, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
