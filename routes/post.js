const router = require('express').Router();
const controller = require('../controllers/post');
const { saveFile } = require('../utils/gallery');
const { PostSchema, AllSchema } = require('../utils/schema');
const { validateToken, validateBody, validateParam } = require('../utils/validator');

router.route("/")
    .get(controller.all)
    .post([validateToken, saveFile, validateBody(PostSchema), controller.post])

router.route('/paginate/:page')
    .get([validateParam(AllSchema.page, 'page'), controller.paginate])

router.route("/:id")
    .get(controller.get)
    .patch([validateToken, controller.patch])
    .delete([validateToken, controller.drop])

router.route("/bycat/:id")
    .get([validateParam(AllSchema.id, 'id'), controller.byCatId])

router.route("/byuser/:id")
    .get([validateParam(AllSchema.id, 'id'), controller.byUserId])

router.route("/bytag/:id")
    .get([validateParam(AllSchema.id, 'id'), controller.byTagId])

router.route("/like/toggle/:id/:page")
    .get([validateParam(AllSchema.id, 'id'), validateParam(AllSchema.like, 'page'), controller.toggleLike])

module.exports = router;    