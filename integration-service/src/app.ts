import amqplib from "amqplib";
import { updateOrderStatus, updateProductQuantity } from "./service";
import { OrderStatusEnum } from "./enum";
import fs from "fs/promises";
import path from "path";
// import http, {
//   ClientRequest,
//   IncomingMessage,
//   RequestListener,
//   ServerResponse,
// } from "http";

// const serverHandler = (req: IncomingMessage, res: ServerResponse) => {};

// const server = http.createServer(serverHandler);

const connectionUrl = `amqp://${
  process.env.RABBITMQ_USERNAME && process.env.RABBITMQ_PASSWORD
    ? process.env.RABBITMQ_USERNAME + ":" + process.env.RABBITMQ_PASSWORD + "@"
    : ""
}${process.env.RABBITMQ_HOST || "localhost"}`;

//amqp://user:SSI7AmAK8cl0QJl1@localhost
fs.writeFile(path.join("/tmp", "healthy"), "healthy").then(async () => {
  const queue = "orderStatus";
  const conn = await amqplib.connect(connectionUrl);

  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue);
  await fs.writeFile(path.join("/tmp", "ready"), "ready");
  // Listener
  ch1.consume(queue, async (msg) => {
    try {
      if (msg !== null) {
        const messageObject: messageObject = JSON.parse(msg.content.toString());
        try {
          await updateProductQuantity(
            messageObject.productId,
            parseInt(messageObject.orderId)
          );
        } catch (err) {
          console.log(err);
          await updateOrderStatus(
            messageObject.orderId,
            OrderStatusEnum.orderOutOfStock
          );
        }
        await updateOrderStatus(
          messageObject.orderId,
          OrderStatusEnum.orderConfirmed
        );
        ch1.ack(msg);
      } else {
        console.log("Consumer cancelled by server");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
