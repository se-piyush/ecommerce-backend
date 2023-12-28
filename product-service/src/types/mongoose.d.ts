declare namespace Mongoose {
  type Document = import("mongoose").Document & { _id: Mongoose.ObjectId };
  type Model<T> = import("mongoose").Model<T>;
}
