const Member =require("../models/Member");
let memberController = module.exports;

/* Member Controller */
memberController.signup = async (req, res) => {
  try{
    console.log("POST: cont/signup");
    const data = req.body;
    const member = new Member();
    const new_member = await member.signupData(data);

    res.json({ state: "success", data: new_member});
  }catch(err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message});
  }
};

memberController.login = (req, res) => {
  res.send("This is login page");
};
memberController.logout = (req, res) => {
  res.send("This is logout page");
};