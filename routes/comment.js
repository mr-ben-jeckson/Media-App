const router = require('express').Router();
const controller = require('../controllers/comment');
const { AllSchema, CommentSchema } = require('../utils/schema');
const { validateParam, validateToken, validateBody } = require('../utils/validator');

router.post('/', [validateBody(CommentSchema), controller.add]);
router.route('/:id').get([validateParam(AllSchema.id, "id"), controller.all])
    .delete([validateParam(AllSchema.id, "id"), validateToken, controller.drop]);

module.exports = router;