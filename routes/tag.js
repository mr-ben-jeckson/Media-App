const router = require("express").Router();
const controller = require("../controllers/tag");
const { saveFile } = require("../utils/gallery");
const { TagSchema, AllSchema } = require("../utils/schema");
const { validateBody, validateToken, validateParam } = require("../utils/validator");

router.get("/", controller.all);
router.post("/", [validateToken, saveFile, validateBody(TagSchema.add), controller.add]);
router.route("/:id")
    .get([validateParam(AllSchema.id, "id"), controller.get])
    .patch([validateToken, validateParam(AllSchema.id, "id"), controller.patch])
    .delete([validateToken, validateParam(AllSchema.id, "id"), controller.drop]);
module.exports = router;