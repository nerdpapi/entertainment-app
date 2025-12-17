import User from "../models/User.js";

/**
 * GET /api/bookmarks
 */
export const getBookmarks = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found. Please login again." });
    }

    res.json(user.bookmarks);
  } catch (error) {
    console.error("Get bookmarks error:", error);
    res.status(500).json({ message: "Failed to fetch bookmarks" });
  }
};

/**
 * POST /api/bookmarks
 */
export const addBookmark = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found. Please login again." });
    }

    // Prevent duplicates (important)
    const exists = user.bookmarks.find(
      (b) => b.tmdbId === req.body.tmdbId
    );

    if (exists) {
      return res.status(400).json({ message: "Already bookmarked" });
    }

    user.bookmarks.push(req.body);
    await user.save();

    // ✅ CORRECT: get last saved bookmark
    const lastBookmark =
      user.bookmarks[user.bookmarks.length - 1];

    console.log("SAVED BOOKMARK:", lastBookmark);

    res.status(201).json(lastBookmark);
  } catch (error) {
    console.error("Add bookmark error:", error);
    res.status(500).json({ message: "Failed to add bookmark" });
  }
};

/**
 * DELETE /api/bookmarks/:id
 */
export const removeBookmark = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found. Please login again." });
    }

    user.bookmarks = user.bookmarks.filter(
      (b) => b._id.toString() !== req.params.id
    );

    await user.save();

    res.json({ message: "Removed" });
  } catch (error) {
    console.error("Remove bookmark error:", error);
    res.status(500).json({ message: "Failed to remove bookmark" });
  }
};
