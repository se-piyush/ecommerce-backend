interface IProduct {
  title: string;
  description: string;
  price: number;
  category: string;
  seller: string;
  quantity: number;
  imageUrl: string;
  tags: string[];
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}

interface IProductDocument extends IProduct, Mongoose.Document {}

interface Review {
  product: mongoose.Schema.Types.ObjectId;
  user: string;
  rating: number;
  title: string;
  description: string;
  createdAt: Date;
}

interface ReviewDocument extends Review, Mongoose.Document {}
interface ReviewModel extends Mongoose.Model<ReviewDocument> {}
