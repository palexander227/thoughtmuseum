exports.renderDashboard = (req, res) => {
    res.render("dashboard", {
        role: req.user.role,
        name: req.user.username,
        students: res.locals.students,
        workspace: res.locals.workspace,
    });
};