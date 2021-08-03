const router = require('express').Router();
const authenticationRoutes = require('./authentication-routes');


router.use('/', authenticationRoutes);


module.exports = router;
