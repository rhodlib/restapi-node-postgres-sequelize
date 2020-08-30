import Task from "../models/Task";

export async function createTask(req, res) {
  try {
    const { name, done, projectid } = req.body;
    const newTask = await Task.create(
      {
        name,
        done,
        projectid,
      },
      {
        fields: ["name", "done", "projectid"],
      }
    );
    res.json({
      message: "New task created",
      data: newTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
}

export async function getTask(req, res) {
  try {
    const tasks = await Task.findAll({
      attributes: ["id", "projectid", "name", "done"],
      order: [["id", "DESC"]],
    });
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
}

export async function getOneTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: { id },
      attributes: ["id", "projectid", "name", "done"],
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
}

export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { projectid, name, done } = req.body;

    const task = await Task.findOne({
      attributes: ["name", "projectid", "done", "id"],
      where: {
        id,
      },
    });

    const updatedTask = await task.update(
      {
        name,
        done,
        projectid,
      },
      {
        where: { id },
      }
    );

    res.json({
      message: "Task Updated",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
}

export async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    await Task.destroy({
      where: {
        id,
      },
    });
    res.json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
}

export async function getTasksByProject(req, res) {
  try {
    const { projectid } = req.params;
    const tasks = await Task.findAll({
      attributes: ["id", "projectid", "done", "name"],
      where: { projectid },
    });
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
}
