import express from "express";
import PostsModel from "./model.js";
import UsersModel from "../users/model.js";
const postsRouter = express.Router();

postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await PostsModel.findAll();
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/:postId", async (req, res, next) => {
  try {
    const post = await PostsModel.findByPk(req.params.postId, {
      include: UsersModel,
    });

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.send(post);
  } catch (error) {
    next(error);
  }
});

postsRouter.post("/", async (req, res, next) => {
  try {
    const newPost = await PostsModel.create(req.body);
    res.status(201).send(newPost);
  } catch (error) {
    next(error);
  }
});

postsRouter.put("/:postId", async (req, res, next) => {
  try {
    console.log("postId", req.params.postId);
    const [numberOfUpdatedRows, updatedRecords] = await PostsModel.update(
      req.body,
      { where: { postId: req.params.postId }, returning: true }
    );
    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0]);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.delete("/:postId", async (req, res, next) => {
  try {
    const deletedRowCount = await PostsModel.destroy({
      where: { postId: req.params.postId },
    });

    if (deletedRowCount === 0) {
      return res.status(404).send("Post not found");
    }
    res.send("Post deleted successfully");
  } catch (error) {
    next(error);
  }
});

export default postsRouter;
