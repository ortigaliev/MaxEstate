let memberController = module.exports;

memberController.home = (req, res) => {
  res.send("THis is HomePage");
};
memberController.signup = (req, res) => {
  res.send("This is sighup");
};
memberController.login = (req, res) => {
  res.send("This is login page");
};
memberController.logout = (req, res) => {
  res.send("This is logout page");
};