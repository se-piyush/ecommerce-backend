import amqplib, { Channel } from "amqplib";

const connectionUrl = `amqp://${
  process.env.RABBITMQ_USERNAME && process.env.RABBITMQ_PASSWORD
    ? process.env.RABBITMQ_USERNAME + ":" + process.env.RABBITMQ_PASSWORD + "@"
    : ""
}${process.env.RABBITMQ_HOST || "localhost"}`;

//"amqp://user:SSI7AmAK8cl0QJl1@localhost";

export class Connection {
  private static connection: Channel;
  private constructor() {}
  static getConnection = async (): Promise<Channel> => {
    if (!Connection.connection) {
      const connection = await amqplib.connect(connectionUrl);
      Connection.connection = await connection.createChannel();
    }
    return Connection.connection;
  };
}

export default class Publisher {
  publish = (message: string, connection: Channel, queueName: string) => {
    connection.sendToQueue(queueName, Buffer.from(message));
  };
}
