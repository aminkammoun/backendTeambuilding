const express = require("express");
const router = express.Router();
const app = express();
const addBuilding = require("../models/addBuilding");
const multer = require("multer")
// const checkAuth = require("../middleware/check_auth");

router.get("/", async (req, res) => {
  const addBuild = await addBuilding.find();
  res.send(addBuild);
});
router.get("/:id", async (req, res) => {
  const addBuild = await addBuilding.findById(req.params.id);
  if (!addBuild)
      {return res.status(404).send("The genre with the given ID was not found.");}
      
      
      res.send(addBuild);
});
/* router.get("/owner/:id", async (req, res) => {
  const addBuild = await addBuilding.find({ idUserPoster: req.params.id });
  res.send(addBuild);
}); */

var storage = multer.diskStorage({
    destination: "uploads",
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    },
  });
const upload = multer({ storage: storage });

router.post("/postBuilding", upload.array("image[]"), async (req, res) => {
  console.log(req.file);
  let addbuild = new addBuilding({
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    
  });
  if(req.files){
      let path= []
      req.files.forEach((files)=>{
          path.push(files.filename)
          console.log(files)
      })
      
      addbuild.image = path
  }
  await addbuild.save();
  res.send(addbuild);
});
router.delete("/:id", async (req, res) => {
    const addbuild = await addBuilding.findByIdAndRemove(req.params.id);
  
    if (!addbuild)
      return res.status(404).send("The genre with the given ID was not found.");
    
    res.send(addbuild);
  });
/* router.get("/distination/:distination", async (req, res) => {
  const distination = await Covoiturage.find({ arrive: req.params.distination });
  if (!distination) return res.status(404).send("The distination not found.");
  res.send(distination);
});
router.put("/:id", async (req, res) => {
  const genre = await Covoiturage.findByIdAndUpdate(req.params.id, {
    depart: req.body.depart,
    arrive: req.body.arrive,
    new: true,
  });

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

 */
module.exports = router;
