import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    tmdbId: {
      type: Number,
      required: true,
    },

    title: String,

    poster: String,

    backdrop: String, // ⭐ optional but recommended

    type: {
      type: String,
      enum: ["movie", "tv"],
      required: true,
    },

    // ✅ ADD THESE
    release_date: String,     // for movies
    first_air_date: String,   // for TV shows
  },
  { _id: true }
);

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  bookmarks: [bookmarkSchema],
});

export default mongoose.model("User", userSchema);
