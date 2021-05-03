const { Router } = require('express');

const {  getSUser, updateUser, deleteUser, getUserById } = require('../controllers/userController')
const router = Router();



router.get('/', getSUser);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;