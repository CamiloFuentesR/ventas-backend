const { Router } = require('express');
const { getSales, createSales, getSalesById } = require('../controllers/saleController');

const router = Router();



router.get('/', getSales);

router.get('/:id', getSalesById);

router.post('/', createSales);

// router.put('/:id',updateSales);

// router.delete('/:id',deleteSales);


module.exports = router;

