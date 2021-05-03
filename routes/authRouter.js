const { Router } = require("express");
const { loginUser, createUser,renewToken } = require("../controllers/authController");
const { validateJWT } = require("../middleware/validate-jwt");

const router = Router();

router.post('/', loginUser);

router.post('/new', createUser);

router.get('/renew',validateJWT, renewToken)

module.exports = router;
