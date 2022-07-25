const router = require("express").Router();
const productModel = require("../models/productModel");

router.get("/product/get_all", async (req, res) => {
  try {
    res.send(await productModel.find({}));
  } catch (error) {
    console.log(error);
  }
});
router.post("/product/create", async (req, res) => {
  try {
    new productModel(req.body).save();
    res.json(req.body);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/product/delete", async (req, res) => {
  try {
    productModel.deleteOne({ _id: req.body._id }, (err) => {
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
router.put("/product/edit", async (req, res) => {
  try {
    productModel.findByIdAndUpdate(
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
