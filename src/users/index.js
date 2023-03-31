import express from "express";
import ExperiencesModel from "../experiences/model.js";
import PostsModel from "../posts/model.js";
import UsersModel from "./model.js";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UsersModel.findAll();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await UsersModel.findByPk(req.params.userId);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:userId/experiences", async (req, res, next) => {
  try {
    const user = await UsersModel.findByPk(req.params.userId, {
      include: {
        model: ExperiencesModel,
        attributes: [
          "role",
          "company",
          "startDate",
          "endDate",
          "description",
          "area",
        ],
      },
    });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:userId/posts", async (req, res, next) => {
  try {
    const user = await UsersModel.findByPk(req.params.userId, {
      include: {
        model: PostsModel,
        attributes: ["text", "image"],
      },
    });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = await UsersModel.create(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.put("/:userId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await UsersModel.update(
      req.body,
      { where: { userId: req.params.userId }, returning: true }
    );
    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:userId", async (req, res, next) => {
  try {
    const deletedRows = await UsersModel.destroy({
      where: { userId: req.params.userId },
    });
    if (deletedRows === 1) {
      res.send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
