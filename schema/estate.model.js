const mongoose = require("mongoose");
const {
  estate_collection_enums,
  estate_status_enums,
  estate_type_enums,
} = require("../lib/config");
const Schema = mongoose.Schema;

estateSchema = new mongoose.Schema(
  {
    estate_name: { type: String, required: true },
    estate_collection: {
      type: String,
      required: true,
      enum: {
        values: estate_collection_enums,
        message: "{VALUE} is not among permitted enum values collection",
      },
    },
    estate_status: {
      type: String,
      required: false,
      default: "PAUSED",
      enums: {
        values: estate_status_enums,
        message: "{VALUE} is not among permitted enum values status",
      },
    },
    estate_price: {
      type: Number,
      required: true,
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
      //product size
      type: String,
      default: "for sale",
      enum: {
        values: estate_type_enums,
        message: "{VALUE}, is not among permitted enum values type",
      },
    },
    /* estate_rent: {
      //product volume
      type: String,
      default: "apartment",
      enum: {
        values: estate_rent_enums,
        message: "{VALUE}, is not among permitted enum values",
      },
    }, */
    estate_description: {
      type: String,
      required: true,
    },
    estate_images: {
      type: Array,
      required: false,
      default: [],
    },
    estate_likes: {
      type: Number,
      required: false,
      default: 0,
    },
    estate_views: {
      type: Number,
      required: false,
      default: 0,
    },
    agency_mb_id: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: false,
    },
  },
  { timestamps: true }
); //createdAt, updeatedAt

estateSchema.index(
  { agency_mb_id: 1, estate_name: 1, estate_size: 1, estate_rent: 1 }, //Doesnt allow add new product with same param 2 restaurant
  { unique: true }
);

module.exports = mongoose.model("Estate", estateSchema);
