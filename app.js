const express = require("express");
require("dotenv").config();
const path = require("path");
const qr = require('qrcode');
const app = express();
const {FingerprintJsServerApiClient, Region} = require('@fingerprintjs/fingerprintjs-pro-server-api');
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get(`/scan`, async (req, res) => {
    res.sendFile(path.join(__dirname, "public", "scan", "index.html"));
})

qr.toFile('./public/qrcode.png', 'https://qr-project-p198.onrender.com/scanQr', function (err) {
    if (err) throw err;
    console.log('QR Code saved!');
});

const client = new FingerprintJsServerApiClient({
    apiKey: 'b6kQpPHs7ps7Xc09IGmJ',
    region: Region.EU,
})

app.post(`/scanQr`, async (req, res) => {
    const { visitorId } = req.body;
    client.getVisitorHistory(visitorId).then((visitorHistory) => {
        console.log(visitorHistory)
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});