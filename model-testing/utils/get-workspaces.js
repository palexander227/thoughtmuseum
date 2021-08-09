const { Workspace } = require("../models/");

async function getAllWorkspaces() {
    const allWorkspaces = await Workspace.findAll();
    return allWorkspaces;
}

async function getWorkspacesByTeacherId(id) {
    const workspaces = await Workspace.findAll({where: {"teacher_id": id}});
    return workspaces;
}

async function getWorkspacesByStudentId(id) {
    const workspaces = await Workspace.findAll({where: {"student_id": id}});
    return workspaces;
}

module.exports = {getAllWorkspaces, getWorkspacesByTeacherId, getWorkspacesByStudentId}