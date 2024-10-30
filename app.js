const express = require("express");
require("dotenv").config();
const path = require("path");
const qr = require('qrcode');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

qr.toFile('./qrcode.png', 'Hello, World!', function (err) {
    if (err) throw err;
    console.log('QR Code saved!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});