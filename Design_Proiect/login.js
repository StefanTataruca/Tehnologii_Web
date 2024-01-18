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
    // Adăugare manipulare a erorilor în cazul în care există o eroare
    res.sendFile(__dirname + "/login.html", { error: null });
});



app.post("/", encoder, function (req, res) {
    // Verificarea credențialelor pentru login
    var username = req.body.username;
    var password = req.body.password;

    // Verificare dacă utilizatorul există în baza de date
    connection.query("SELECT * FROM utilizatori WHERE Username = ? AND Password = ?", [username, password], function (error, results, fields) {
        if (results.length > 0) {
            res.redirect("/home");
        } else {
            // Utilizatorul nu există, afișăm un mesaj de eroare în pagina de login
            res.sendFile(__dirname + "/login.html", { error: 'Utilizator sau parolă incorecte.' });
        }
        res.end();
    });
});

app.get("/home", function (req, res) {
    res.sendFile(__dirname + "/home.html");
});

app.get('/reserv_room.html', function (req, res) {
    res.sendFile(__dirname + '/reserv_room.html');
});

app.get('/reserv_de.html', function (req, res) {
    res.sendFile(__dirname + '/reserv_de.html');
});

app.get('/signin.html', function (req, res) {
    res.sendFile(__dirname + '/signin.html');
});



app.post("/signup", encoder, function (req, res) {
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var email = req.body.email;
    var phoneNo = req.body.phone_no;
    var username = req.body.username;
    var password = req.body.password;

    // Adăugare în baza de date dacă toate datele sunt primite
    const query = "INSERT INTO utilizatori (First_Name, Last_Name, E_mail, Nr_Tel, Username, Password) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(query, [firstName, lastName, email, phoneNo, username, password], function (error, results, fields) {
        if (error) {
            console.error('Eroare la inserarea în baza de date pentru utilizatori:', error);
            res.status(500).json({ error: 'Eroare internă a serverului.' });
        } else {
            console.log('Datele au fost adăugate cu succes în baza de date pentru utilizatori.');
            // Redirecționare către pagina de home după inserarea cu succes
            res.redirect("/home");
        }
        res.end();
    });
});


/*/ Funcții de validare

function isValidEmail(email) {
    // Implementați validarea pentru formatul adresei de e-mail
    // Exemplu simplu: verifică dacă există cel puțin un caracter '@'
    return email.includes('@');
}

function isValidPassword(password) {
    // Implementați validarea pentru parolă (8 caractere, litere mari și mici, cel puțin un simbol)
    // Exemplu simplu: verifică lungimea și utilizarea funcției test() pentru a verifica condițiile
    return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
}

function isValidPhoneNumber(phoneNo) {
    // Implementați validarea pentru numărul de telefon (exact 10 cifre)
    // Exemplu simplu: verifică dacă numărul de telefon conține doar cifre și are lungimea 10
    return /^\d{10}$/.test(phoneNo);
}

function isValidName(name) {
    // Implementați validarea pentru numele de utilizator, first name, last name (doar litere)
    // Exemplu simplu: verifică dacă numele conține doar litere
    return /^[a-zA-Z]+$/.test(name);
}
*/
app.post("/rezervari", encoder, function (req, res) {
    var oras = req.body.oras;
    var numarParticipanti = req.body.numarParticipanti;
    var nrOre = req.body.nrOre;

    const query = "INSERT INTO rezervari (Oras, Nr_Participanti, Nr_Ore) VALUES (?, ?, ?)";

    connection.query(query, [oras, numarParticipanti, nrOre], function (error, results, fields) {
        if (error) {
            console.error('Eroare la inserarea în baza de date pentru rezervari:', error);
            res.status(500).json({ error: 'Eroare internă a serverului.' });
        } else {
            console.log('Datele au fost adăugate cu succes în baza de date pentru rezervari.');
            res.status(201).json({ message: 'Rezervarea a fost salvată cu succes.' });
        }
        res.end();
    });
});

const port = 4500;
app.listen(port, function () {
    console.log(`Serverul ascultă pe portul ${port}`);
});

/*
function isValidEmail(email) {
    // Implementați validarea adresei de e-mail
    // Returnați true dacă e-mailul este valid, altfel false
    return email.includes('@');
}

function isValidPassword(password) {
    // Implementați validarea pentru parolă
    // Returnați true dacă parola este validă, altfel false
    return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
}

function isValidPhoneNumber(phoneNo) {
    // Implementați validarea pentru numărul de telefon
    // Returnați true dacă numărul de telefon este valid, altfel false
    return /^\d{10}$/.test(phoneNo);
}

function isValidName(name) {
    // Implementați validarea numelui (username, first name, last name)
    // Returnați true dacă numele este valid, altfel false
    return /^[a-zA-Z]+$/.test(name);
}*/

