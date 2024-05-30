import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://food:65789282@cluster0.6ijkpwn.mongodb.net/food-app"
    )
    .then(() => console.log("DB Connected"));
};
