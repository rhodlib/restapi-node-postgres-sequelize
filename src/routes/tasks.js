import { Router } from "express";
import {
  createTask,
  getTask,
  deleteTask,
  updateTask,
  getOneTask,
  getTasksByProject,
} from "../controllers/task.controller";
const router = Router();

// /api/tasks/
router.post("/", createTask);
router.get("/", getTask);

// /api/tasks/:id
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
router.get("/:id", getOneTask);

// /api/tasks/project/:projectid
router.get("/project/:projectid", getTasksByProject);

export default router;
