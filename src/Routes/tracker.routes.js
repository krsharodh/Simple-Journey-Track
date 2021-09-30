const express = require('express');
const router = express.Router();
const { generateTripsFromTaps } = require('../Controllers/tracker.controllers');
const multer = require('multer');
const upload = multer();

// Route to generate Trips from Taps
router.post('/generateTripsFromTaps', upload.single('file'), (req, res) => {
    const outCSV = generateTripsFromTaps(req.file.buffer.toString('utf8'))
    // res.attachment('customers.csv').send(outCSV)
    res.json(outCSV)
})

module.exports = router
