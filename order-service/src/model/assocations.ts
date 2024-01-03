import Order from "./order.model";
import OrderStatus from "./orderStatus.model";

OrderStatus.belongsTo(Order);
Order.hasMany(OrderStatus);
