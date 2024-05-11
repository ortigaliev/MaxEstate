class Definer {
  /** general errors */
  static general_err1 = "att: something went wrong!";
  static general_err2 = "att: there is no data with that param!";
  static general_err3 = "att: file upload error!";

  /** member auth related error*/
  static auth_err2 = "att: mongodb validation is failed";
  static auth_err2 = "att: jwt token creation error";
  static auth_err3 = "att: no member with that mb_nick!";
  static auth_err4 = "att: your credentials do not match!";
  static auth_err5 = "att: your are not authenticated!";

  /** estate auth related error */
  static estate_err1 = "att: estate creation is failed!";

  /** order related error */
  static order_err1 = "att: order creation is failed!";
  static order_err2 = "att: order item creation is failed!";
  static order_err3 = "att: no order with that param exists!";

  // blogs related errors
  static blog_err1 = "att: author member for blogs not provided";
  static blog_err2 = "att: no blog found for that member";
  static blog_err3 = "att: no blog found for that target";

  //follow related errors
  static follow_err1 = "att: self subscription is denied!";
  static follow_err2 = "att: new folow subscription is failed!";
  static follow_err3 = "att: no follow data found";

  //Mongo DB error
  static mongo_validation_err1 = "att: mongodb validation is failed";
}

module.exports = Definer;
