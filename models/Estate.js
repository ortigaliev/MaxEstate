const assert = require("assert");
const { shapeIntoMongooseObjectId } = require("../lib/config");
const Definer =  require("../lib/mistake");
const EstateModel = require("../schema/estate.model");


class Estate {
  constructor() {
    this.estateModel = EstateModel;
  }
  async addNewEstateData(data, member) {
    try {
      data.agency_mb_id = shapeIntoMongooseObjectId(member._id);//mb_id turns into mobgodb _id
      console.log(data);

      const new_estate = new this.estateModel(data);
      const result = await new_estate.save();

      assert.ok(result, Definer.product_err1);
      return result;

    } catch(err) {
      throw err;
    }
  }

  async updateChosenEstateData(id, updated_data, mb_id) {
    try {
      id = shapeIntoMongooseObjectId(id);
      mb_id = shapeIntoMongooseObjectId(mb_id);

      const result = await this.estateModel.findOneAndUpdate(
        {_id: id,agency_mb_id: mb_id},
        updated_data,
        {
          runValidators: true,
          lean: true,
          returnDocument: "after",
        })
        .exec();

        assert.ok(result,Definer.general_err1);
        return result;
      } catch(err) {
        throw err;
      }
    }
  }
  module.exports = Estate;