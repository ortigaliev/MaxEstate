const mongoose = require("mongoose");
const {
  estate_collection_enums,
  estate_status_enums,
  estate_owner_enums,
  estate_rental_enums,
} = require("../lib/config");
const Schema = mongoose.Schema;

estateSchema = new mongoose.Schema({
  estate_name: {type: String, required: true},
  estate_collection: {
    type: String,
    required: true,
    enum: {
      values: estate_collection_enums,
      message: "{VALUE} is not among permitted enum values",
    },
  },
  estate_status: {
    type: String,
    required: false,
    default: "PAUSED",
    enums: {
      values: estate_status_enums,
      message: "{VALUE} is not among permitted enum values",
    },
  },
  estate_price: {
    type: Number,
    required: true
  },
  estate_discount: {
    type: Number,
    required: false,
    default: 0,
  },
  estate_left_cnt: {
    type: Number,
    required: true,
  },
  estate_type: {
    type: String,
    default: "two-room",
    required: function() {
      const type_list = ["apartment","willa","house","pent-house", "office"];
      return type_list.includes(this.estate_collectiont)
    },
    enum: {
      values: estate_owner_enums,
      message: "{VALUE}, is not among permitted enum values",
    },
  },
  estate_rental: {
    type: String,
    default: "월세",
    required: function () {
    return (this.estate_collection === "rent")
    },
    enum: {
      values: estate_rental_enums,
      message: "{VALUE}, is not among permitted enum values",
    },
  },
  estate_description: {
    type: String,
    required: true,
  },
  estate_images: {
    type: Array,
    required: false,
    default: []
  },
  estate_likes: {
    type: Number,
    required: false,
    default: 0
  },
  estate_views: {
    type: Number,
    required: false,
    default: 0
  },
  agency_mb_id: {
    type:Schema.Types.ObjectId,
    ref: "Member",
    required: false
  }
},
  {timestamps: true});//createdAt, updeatedAt

estate_Schema.index(
  {agency_mb_id: 1, estate_name: 1, estate_size: 1, estate_volume: 1},
  {unique: true}
);

  module.exports = mongoose.model("Estate", estateSchema);