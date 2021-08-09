const { Person } = require("../models/");

module.exports = async function getStudents() {
    const allUsers = await Person.findAll();
    return allUsers.filter(({ role }) => role === 'Student')
}