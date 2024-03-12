const assert = require("assert");
const { shapeIntoMongooseObjectId } = require("../lib/config");
const Definer = require("../lib/mistake");
const OrderModel = require("../schema/order.model");
const OrderItemModel = require("../schema/order_item.model");

class Order {
  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = OrderItemModel;
  }

  async createOrderData(member, data) {
    try {
      let order_total_amount = 0,
        insurance_cost = 0;
      const mb_id = shapeIntoMongooseObjectId(member._id);

      data.map((item) => {
        order_total_amount += item["quantity"] * item["price"];
      });

      if (order_total_amount < 100) {
        insurance_cost = 500;
        order_total_amount += insurance_cost;
      }

      const order_id = await this.saveOrderData(
        order_total_amount,
        insurance_cost,
        mb_id
      );
      console.log("order_id:::", order_id);
      //order items creation
      return order_id;
    } catch (err) {
      throw err;
    }
  }

  async saveOrderData(order_total_amount, insurance_cost, mb_id) {
    try {
      const new_order = new this.orderModel({
        order_total_amount: order_total_amount,
        order_insurance_cost: insurance_cost,
        mb_id: mb_id,
      });
      const result = await new_order.save();
      assert.ok(result, Definer.order_err1);

      return result._id;
    } catch (err) {
      console.log(err);
      throw new Error(Definer.order_err1);
    }
  }
}

module.exports = Order;
