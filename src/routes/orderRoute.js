const router = require("express").Router();
const orderModel = require("../models/orderModel.js");

router.get("/order/get_all", async (req, res) => {
  try {
    res.send(await orderModel.find({}));
  } catch (error) {
    console.log(error);
  }
});
router.post("/order/create", async (req, res) => {
  try {
    new orderModel(req.body).save();
    res.json(req.body);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/order/delete", async (req, res) => {
  try {
    orderModel.deleteOne({ _id: req.body._id }, (err) => {
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
router.put("/order/edit", async (req, res) => {
  try {
    orderModel.findByIdAndUpdate(
      req.body._id,
      {
        $set: req.body,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send({
            message: "successfully updated",
          });
        }
      }
    );
  } catch (error) {}
});

module.exports = router;
