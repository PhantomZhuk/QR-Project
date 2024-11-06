const express = require("express");
require("dotenv").config();
const path = require("path");
const qr = require('qrcode');
const app = express();
const { FingerprintJsServerApiClient, Region } = require('@fingerprintjs/fingerprintjs-pro-server-api');
const mongoose = require("mongoose");
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get(`/scan`, async (req, res) => {
    res.sendFile(path.join(__dirname, "public", "scan", "index.html"));
})

app.get(`/rating`, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "rating", "index.html"));
})

app.get(`/adminAuth`, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin", "login", "index.html"));
})

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(`MongoDB connected`);
    })
    .catch((err) => {
        console.log(err);
    })

qr.toFile('./public/qrcode.png', 'https://qr-project-p198.onrender.com/scan', function (err) {
    if (err) throw err;
    console.log('QR Code saved!');
});

const client = new FingerprintJsServerApiClient({
    apiKey: process.env.API_KEY,
    region: Region.EU,
})

const numberOfScansSchena = new mongoose.Schema({
    numberOfScans: { type: Number, default: 0 }
})

const numberOfScansModel = mongoose.model("numberOfScans", numberOfScansSchena);

async function checkAndInitializeNumberOfScans() {
    const isNumberOfScans = await numberOfScansModel.findOne({});

    if (!isNumberOfScans) {
        const newNumberOfScans = new numberOfScansModel({ numberOfScans: 0 });
        await newNumberOfScans.save();
    }
}

checkAndInitializeNumberOfScans();

app.get(`/getScans`, async (req, res) => {
    const numberOfScans = await numberOfScansModel.findOne({});
    res.json({ numberOfScans });
})

const userSchema = new mongoose.Schema({
    visitorId: { type: String, required: true },
    visitorHistory: [{ time: { type: Date, required: true } }],
    userNumberOfScans: { type: Number, default: 0 }
});

const User = mongoose.model("User", userSchema);

app.post(`/scanQr`, async (req, res) => {
    const { visitorId } = req.body;

    try {
        let user = await User.findOne({ visitorId });

        if (!user) {
            await numberOfScansModel.updateOne({}, { $inc: { numberOfScans: 1 } }, { upsert: true });
            const numberOfScans = await numberOfScansModel.findOne({});
            io.emit('scanUpdate', numberOfScans);

            const newUser = new User({
                visitorId,
                visitorHistory: [{ time: new Date().toISOString() }],
                userNumberOfScans: 1
            });

            await newUser.save();
            res.json({ message: "First scan recorded" });
        } else {
            const lastVisit = user.visitorHistory[user.visitorHistory.length - 1].time;
            const lastVisitDate = lastVisit.toISOString().slice(0, lastVisit.toISOString().indexOf("T"));

            if (lastVisitDate !== new Date().toISOString().slice(0, new Date().toISOString().indexOf("T"))) {
                await numberOfScansModel.updateOne({}, { $inc: { numberOfScans: 1 } }, { upsert: true });
                const numberOfScans = await numberOfScansModel.findOne({});
                io.emit('scanUpdate', numberOfScans);

                user.userNumberOfScans++;
                user.visitorHistory.push({ time: new Date().toISOString() });
                await user.save();

                console.log("User found and updated");
                res.json({ message: "New scan recorded for today" });
            } else {
                res.json({ message: "User already scanned today" });
                console.log("User already scanned today");
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get(`/getUsers`, async (req, res) => {
    const users = await User.find({});
    io.emit('users', users);
    res.json({ users });
})

const AdminSchema = new mongoose.Schema({
    login: { type: String, required: true },
    password: { type: String, required: true }
});

const Admin = mongoose.model(`Admin`, AdminSchema);

app.post(`/admin/login`, async (req, res) => {
    const { adminName, password } = req.body;
    if (adminName && password) {
        const login = await Admin.findOne({ adminName })
        const password = await Admin.findOne({ password })
        if (login){
            if (password) {
                res.json({ message: `Admin logged in` });
            }else {
                res.json({message: `Worng admin password`})
            }
        }else {
            res.json({ message: `Worng admin name`});
        }
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});