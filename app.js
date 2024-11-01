const express = require("express");
require("dotenv").config();
const path = require("path");
const qr = require('qrcode');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

qr.toFile('./public/qrcode.png', 'https://qr-project-p198.onrender.com/scanQr', function (err) {
    if (err) throw err;
    console.log('QR Code saved!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});