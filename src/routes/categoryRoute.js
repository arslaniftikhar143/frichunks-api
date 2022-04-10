const router = require("express").Router();
const categoryModel = require("../models/categoryModel");

router.get("/category/get_all", async (req, res) => {
  try {
    res.send(await categoryModel.find({}));
  } catch (error) {
    console.log(error);
  }
});
router.post("/category/create", async (req, res) => {
  try {
    new categoryModel(req.body).save();
    res.json(req.body);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/category/delete", async (req, res) => {
  try {
    categoryModel.deleteOne({ _id: req.body._id }, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message: "successfully Deleted",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});
router.put("/category/edit", async (req, res) => {
  try {
    categoryModel.findByIdAndUpdate(
      req.body._id,
      {
        $set: req.body,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            name: req.body.name,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
