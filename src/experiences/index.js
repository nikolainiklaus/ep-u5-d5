import express from "express";
import ExperiencesModel from "./model.js";

const experiencesRouter = express.Router();

experiencesRouter.get("/", async (req, res, next) => {
  try {
    const experiences = await ExperiencesModel.findAll();
    res.send(experiences);
  } catch (error) {
    next(error);
  }
});

experiencesRouter.post("/", async (req, res, next) => {
  try {
    const newExperience = await ExperiencesModel.create(req.body);
    res.status(201).send(newExperience);
  } catch (error) {
    next(error);
  }
});

experiencesRouter.put("/:experienceId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await ExperiencesModel.update(
      req.body,
      { where: { experienceId: req.params.experienceId }, returning: true }
    );
    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0]);
    } else {
      res.status(404).send("Experience not found");
    }
  } catch (error) {
    next(error);
  }
});

experiencesRouter.delete("/:experienceId", async (req, res, next) => {
  try {
    const numberOfDeletedRows = await ExperiencesModel.destroy({
      where: { experienceId: req.params.experienceId },
    });
    if (numberOfDeletedRows === 1) {
      res.send(
        `Experience with id ${req.params.experienceId} has been deleted`
      );
    } else {
      res.status(404).send("Experience not found");
    }
  } catch (error) {
    next(error);
  }
});

experiencesRouter.get("/:experienceId", async (req, res, next) => {
  try {
    const experience = await ExperiencesModel.findOne({
      where: { experienceId: req.params.experienceId },
    });
    if (experience) {
      res.send(experience);
    } else {
      res.status(404).send("Experience not found");
    }
  } catch (error) {
    next(error);
  }
});

export default experiencesRouter;
