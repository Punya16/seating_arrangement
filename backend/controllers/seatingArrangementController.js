const express = require("express");
const router = express.Router();
const db = require("../db");

// Model
const SeatingArrangement = function(seatingArrangement) {
  this.seat_no = seatingArrangement.seat_no;
  this.Sid = seatingArrangement.Sid;
  this.CId = seatingArrangement.CId;
};

SeatingArrangement.create = (newSeatingArrangement, result) => {
  db.query("INSERT INTO SeatingArrangement SET ?", newSeatingArrangement, (err, res) => {
    if (err) {
      console.error("Error creating seating arrangement:", err);
      result(err, null);
      return;
    }

    console.log("Created seating arrangement:", { id: res.insertId, ...newSeatingArrangement });
    result(null, { id: res.insertId, ...newSeatingArrangement });
  });
};

// Controller

// Create Seating Arrangement
router.post("/", (req, res) => {
  // Validate request
  if (!req.body.seat_no || !req.body.Sid || !req.body.CId) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // Create Seating Arrangement
  const seatingArrangement = new SeatingArrangement({
    seat_no: req.body.seat_no,
    Sid: req.body.Sid,
    CId: req.body.CId
  });

  // Save Seating Arrangement in the database
  SeatingArrangement.create(seatingArrangement, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Seating Arrangement."
      });
    else res.send(data);
  });
});

module.exports = router;
