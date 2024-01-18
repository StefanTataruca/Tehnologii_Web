const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const encoder = bodyParser.urlencoded({ extended: true });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/src", express.static("src"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "nodejs"
});

connection.connect(function (error) {
    if (error) throw error;
    else console.log("Connected to the database successfully!");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/reserv_room.html");
});

app.post("/rezervari", function (req, res) {
    var oras = req.body.oras;
    var numarParticipanti = req.body.numarParticipanti;
    var nrOre = req.body.nrOre;

    const query = "INSERT INTO rezervari (Oras, Nr_Participanti, Nr_Ore) VALUES (?, ?, ?)";

    connection.query(query, [oras, numarParticipanti, nrOre], function (error, results, fields) {
        if (error) {
            console.error('Eroare la inserarea în baza de date:', error);
            res.status(500).json({ error: 'Eroare internă a serverului.' });
        } else {
            console.log('Datele au fost adăugate cu succes în baza de date.');
            res.status(201).json({ message: 'Rezervarea a fost salvată cu succes.' });
        }
        res.end();
    });
});

const port = 4500;
app.listen(port, function () {
    console.log(`Serverul ascultă pe portul ${port}`);
});
