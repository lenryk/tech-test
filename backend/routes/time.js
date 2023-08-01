const express = require("express");
const router = express.Router();

/* GET time listing. */
router.get("/", function (req, res) {
  res.json({
    properties: {
      epoch: {
        value: Math.trunc(Date.now() / 1000),
        description:
          "The current server time, in epoch seconds, at time of processing the request.",
        type: "number",
      },
    },
    required: ["epoch"],
    type: "object",
  });
});

module.exports = router;
