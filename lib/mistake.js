class Definer {
  /** general errors */
  static general_err1 = "att: something went wrong!";
  static general_err2 = "att: there is no data with that param!";
  static general_err3 = "att: file upload error!";

  /** member auth related error*/
  static auth_err1 = "att: mongodb validation is failed";
  static auth_err2 = "att: jwt token creation error";
  static auth_err3 = "att: no member with that mb_nick!";
  static auth_err4 = "att: your credentials do not match!";
  static auth_err5 = "att: your are not authenticated!";

  /** product auth related error */
  static product_err1 = "att: product creation is failed!";

  /** order related error */
  static order_err1 = "att: order creation is failed!";
  static order_err2 = "att: order item creation is failed!";
}

module.exports = Definer;
