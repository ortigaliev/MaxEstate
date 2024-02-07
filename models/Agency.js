const MemberModel = require("../schema/member.model");
const assert = require("assert");
const Definer = require("../lib/mistake");

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
}

module.exports = Agency;