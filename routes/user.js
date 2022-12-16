const router = require('express').Router();

router.get("/", (req, res)=> {
    res.status(200).json({msg:"ALL USERS"})
});

router.get("/:id", (req, res)=> {
    res.status(200).json({msg:"Required ID is " + req.params.id});
});

router.post("/", (req, res)=> {
    res.status(200).json(req.body);
});

router.patch("/:id", (req, res)=>{
    res.status(200).json({msg:"Edited ID is" + req.params.id});
});

router.delete("/:id", (req, res)=>{
    res.status(200).json({msg:"Deleted ID is" + req.params.id});
});

module.exports = router;