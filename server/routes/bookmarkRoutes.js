import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
} from "../controllers/bookmarkController.js";

const router = express.Router();

router.get("/", protect, getBookmarks);
router.post("/", protect, addBookmark);
router.delete("/:id", protect, removeBookmark);

export default router;
