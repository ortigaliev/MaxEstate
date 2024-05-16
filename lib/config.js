const mongoose = require("mongoose");

exports.member_type_enums = ["USER", "ADMIN", "AGENCY"];
exports.member_status_enums = ["ONPAUSE", "ACTIVE", "DELETED"];
exports.ordinary_enums = ["Y", "N"];

/* Estate enums */

/* exports.estate_collection_enums = [
  "apartment",
  "willa",
  "family",
  "office",
  "penthouse",
  "etc",
]; */
exports.estate_status_enums = ["PAUSED", "PROCESS", "DELETED"];

exports.estate_type_enums = [
  "house",
  "office",
  "willa",
  "luxary home",
  "apartment",
  "studio",
  "single family",
  "business center",
  "penthouse",
  "etc",
];

exports.estate_amenity_enums = [
  "swimming-pool",
  "parking",
  "library",
  "medical-center",
  "kids-playground",
  "private-security",
  "smart-home",
];

exports.estate_price_range_enums = ["low-budget", "medium", "height-budget"];

exports.estate_bed_bath_count_enums = ["single", "double", "more-than-double"];

exports.estate_category_enums = [
  "For Buy",
  "For Rent",
  "For Sell",
  "For Sale",
];

exports.like_view_group_list = ["estate", "member", "blog"];

/* BLOG enums */
exports.board_id_enum_list = ["Real Estate", "Business", "Decorate"];
exports.board_blog_status_enum_list = ["active", "deleted"];

/* Order enums */
exports.order_status_enums = ["PAUSED", "PROCESS", "FINISHED", "DELETED"];

/* *****************************
 *    MongoDb Related Commands  *
 ********************************/

exports.shapeIntoMongooseObjectId = (target) => {
  if (typeof target === "string") {
    return new mongoose.Types.ObjectId(target);
  } else return target;
};

exports.lookup_auth_member_following = (mb_id, origin) => {
  const follow_id = origin === "follows" ? "$subscriber_id" : "$_id";
  return {
    $lookup: {
      from: "follows",
      let: {
        lc_follow_id: follow_id,
        lc_subscriber_id: mb_id,
        me_my_following: true,
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$follow_id", "$$lc_follow_id"] },
                { $eq: ["$subscriber_id", "$$lc_subscriber_id"] },
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            subscriber_id: 1,
            follow_id: 1,
            my_following: "$$me_my_following",
          },
        },
      ],
      as: "me_followed",
    },
  };
};

exports.lookup_auth_member_liked = (mb_id) => {
  return {
    $lookup: {
      from: "likes",
      let: {
        lc_liken_item_id: "$_id",
        lc_mb_id: mb_id,
        me_my_favorite: true,
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$like_ref_id", "$$lc_liken_item_id"] },
                { $eq: ["$mb_id", "$$lc_mb_id"] },
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            mb_id: 1,
            like_ref_id: 1,
            my_favorite: "$$me_my_favorite",
          },
        },
      ],
      as: "me_liked",
    },
  };
};
