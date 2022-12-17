const router = require('express').Router();
const controller = require('../controllers/user');

router.route("/")
    .get(controller.all)
    .post(controller.add)
    
router.route("/:id")
    .get(controller.get)
    .patch(controller.patch)
    .delete(controller.drop)
    
module.exports = router;