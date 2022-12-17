const router = require('express').Router();
const controller = require('../controllers/post');

router.route("/")
    .get(controller.all)
    .post(controller.post)

router.route("/:id")
    .get(controller.get)
    .patch(controller.patch)
    .delete(controller.drop)

module.exports = router;    