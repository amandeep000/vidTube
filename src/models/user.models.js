/* id string pk
  watchedHistory ObjectId[] videos
  userName string
  email string
  fullName string
  avatar string
  coverimage string
  password string
  refreshtoken string
  createdAt string
  updatedAt string*/

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary string
      required: true,
    },
    coverImage: {
      type: String, // cloudinary string
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
