const router = require('express').Router();
const controller = require('../controllers/post');
const { saveFile } = require('../utils/gallery');
const { PostSchema } = require('../utils/schema');
const { validateToken, validateBody } = require('../utils/validator');

router.route("/")
    .get(controller.all)
    .post([validateToken, saveFile, validateBody(PostSchema), controller.post])

router.route("/:id")
    .get(controller.get)
    .patch([validateToken, controller.patch])
    .delete([validateToken, controller.drop])

router.route("/bycat/:id")
    .get(controller.byCatId)

module.exports = router;    