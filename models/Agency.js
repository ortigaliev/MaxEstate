const MemberModel = require("../schema/member.model");
const assert = require("assert");
const Definer = require("../lib/mistake");
const { shapeIntoMongooseObjectId } = require("../lib/config");

class Agency {
  constructor () {
    this.memberModel = MemberModel;
  }

  async getAllAgencyData() {
    try{
      const result = await this.memberModel
        .find({
          mb_type: "AGENCY",
        })
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;

    } catch(err) {
      throw err;
    }
  }

  async updateAgencyByAdminData(update_data) {
    try{
      const id = shapeIntoMongooseObjectId(update_data?.id);
      const result = await this.memberModel
        .findByIdAndUpdate({ _id: id}, update_data, {
          runValidators: true,
          lean: true,
          returnDocument: "after",
        })
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch(err){
      throw err;

    }
  }


}

module.exports = Agency;