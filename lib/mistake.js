class Definer{
  /** member auth related error*/
  static auth_err1 = "att: mongodb validation is failed";
  static auth_err2 = "att: no member with that mb_nick!";
  static auth_err3 = "att: your credentials do not match!";
  static auth_err4 = "att: you are not authanticated";

  /** general errors */
  static general_err1 = "att: something went wrong!";
  static general_err2 = "att: there is no data with that param!";
  static general_err3 = "att: file upload error!";

  /** product auth related error */
  static product_err1 = "att: product creation is failed!";
}

module.exports = Definer;