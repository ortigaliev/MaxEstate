const ViewModel = require("../schema/view.model");
const MemberModel = require("../schema/member.model");
const EstateModel = require("../schema/estate.model");
const BoBlogModel = require("../schema/bo_blog.model");
class View {
  constructor(mb_id) {
    this.viewModel = ViewModel;
    this.memberModel = MemberModel;
    this.estateModel = EstateModel;
    this.boBlogModel = BoBlogModel;
    this.mb_id = mb_id;
  }

  async validateChosenTarget(view_ref_id, group_type) {
    try {
      let result;
      switch (group_type) {
        //Member view logic
        case "member":
          result = await this.memberModel
            .findOne({ _id: view_ref_id, mb_status: "ACTIVE" })
            .exec();
          break;
        //Estate view logic
        case "estate":
          result = await this.estateModel
            .findOne({ _id: view_ref_id, estate_status: "PROCESS" })
            .exec();
          break;
        //Blog view logic
        case "blog":
          result = await this.boBlogModel
            .findOne({
              _id: view_ref_id,
              blog_status: "active",
            })
            .exec();
          break;
      }

      return !!result;
    } catch (err) {
      throw err;
    }
  }

  async inserMemberView(view_ref_id, group_type) {
    try {
      const new_view = new this.viewModel({
        mb_id: this.mb_id,
        view_ref_id: view_ref_id,
        view_group: group_type,
      });
      const result = await new_view.save();

      // increase target items view count by 1
      await this.modifyItemViewCounts(view_ref_id, group_type);

      return result;
    } catch (err) {
      throw err;
    }
  }

  async modifyItemViewCounts(view_ref_id, group_type) {
    try {
      switch (group_type) {
        //Member view increment logic
        case "member":
          await this.memberModel
            .findByIdAndUpdate({ _id: view_ref_id }, { $inc: { mb_views: 1 } })
            .exec();
          break;

        //Estate view increment logic
        case "estate":
          await this.estateModel
            .findByIdAndUpdate(
              { _id: view_ref_id },
              { $inc: { estate_views: 1 } }
            )
            .exec();
          break;
        //Blog view increment logic
        case "blog":
          await this.boBlogModel
            .findByIdAndUpdate(
              { _id: view_ref_id },
              { $inc: { blog_views: 1 } }
            )
            .exec();
          break;
      }

      return true;
    } catch (err) {
      throw err;
    }
  }

  /* if user seen target item before does not increase by 1 */
  async checkViewExistence(view_ref_id) {
    try {
      const view = await this.viewModel
        .findOne({
          mb_id: this.mb_id,
          view_ref_id: view_ref_id,
        })
        .exec();
      return view ? true : false;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = View;
