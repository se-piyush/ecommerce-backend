// Define the Product interface extending mongoose.Document
interface IProduct extends Document {
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

// Define the Review interface
interface Review {
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}
