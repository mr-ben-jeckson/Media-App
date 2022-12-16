const router = require('express').Router();

router.route("/")
    .get((req, res) => res.status(200).json({msg:"ALL POSTS"}))
    .post((req, res) => res.status(200).json(req.body))

router.route("/:id")
    .get((req, res) => res.status(200).json({msg:"Required ID is " + req.params.id}))
    .patch((req, res) => res.status(200).json({msg:"Edited ID is " + req.params.id}))
    .delete((req, res) => res.status(200).json({msg:"Deleted ID is " + req.params.id}))

// router.get("/:id", (req, res)=> {
//     res.status(200).json({msg:"Required ID is " + req.params.id});
// });



// router.patch("/:id", (req, res)=>{
//     res.status(200).json({msg:"Edited ID is" + req.params.id});
// });

// router.delete("/:id", (req, res)=>{
//     res.status(200).json({msg:"Deleted ID is" + req.params.id});
// });

module.exports = router;