const assert = require("assert");
const {
  shapeIntoMongooseObjectId,
  lookup_auth_member_liked,
} = require("../lib/config");
const Definer = require("../lib/mistake");
const EstateModel = require("../schema/estate.model");
const Member = require("./Member");

class Estate {
  constructor() {
    this.estateModel = EstateModel;
  }

  async getAllEstateData(member, data) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectId(member?._id);

      let match = { estate_status: "PROCESS" };
      if (data.agency_mb_id) {
        match["agency_mb_id"] = shapeIntoMongooseObjectId(data.agency_mb_id);
        match["estate_collection"] = data.estate_collection;
      }

      const sort =
        data.order === "estate_price"
          ? { [data.order]: 1 }
          : { [data.order]: -1 };

      const result = await this.estateModel
        .aggregate([
          { $match: match },
          { $sort: sort },
          { $skip: (data.page * 1 - 1) * data.limit },
          { $limit: data.limit * 1 },
          lookup_auth_member_liked(auth_mb_id),
        ])
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getChosenEstateData(member, id) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectId(member?.id);
      id = shapeIntoMongooseObjectId(id);

      if (member) {
        const member_obj = new Member();
        await member_obj.viewChosenItemByMember(member, id, "estate");
      }

      const result = await this.estateModel
        .aggregate([
          { $match: { _id: id, estate_status: "PROCESS" } },
          lookup_auth_member_liked(auth_mb_id),
        ])
        .exec();

      assert.ok(result, Definer.general_err1);
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  async getAllEstateDataAgency(member) {
    try {
      member._id = shapeIntoMongooseObjectId(member._id);
      const result = await this.estateModel.find({
        agency_mb_id: member._id,
      });
      assert.ok(result, Definer.general_err1);
      /* console.log("", result) */
      return result;
    } catch (err) {
      throw err;
    }
  }

  async addNewEstateData(data, member) {
    try {
      data.agency_mb_id = shapeIntoMongooseObjectId(member._id); //mb_id turns into mobgodb _id
      console.log(data);

      const new_estate = new this.estateModel(data);
      const result = await new_estate.save();

      assert.ok(result, Definer.estate_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async updateChosenEstateData(id, updated_data, mb_id) {
    try {
      id = shapeIntoMongooseObjectId(id);
      mb_id = shapeIntoMongooseObjectId(mb_id);

      const result = await this.estateModel
        .findOneAndUpdate({ _id: id, agency_mb_id: mb_id }, updated_data, {
          runValidators: true,
          lean: true,
          returnDocument: "after",
        })
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = Estate;
