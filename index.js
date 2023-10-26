const express = require('express')
const app = express()
const cors = require('cors')
const pool = require("./db")

// middleware Cors
app.use(cors())
app.use(express.json())



// Wyswietelenie 
app.get('/', async (req, res) => {
    try {
        const my_calendar = await pool.query("SELECT * FROM my_calendar");
        res.json(my_calendar.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Wystąpił błąd podczas pobierania danych z bazy danych." });
    }
});

// Edycja 
app.put ('/:data', async (req, res) => {
    try {
        const {data} = req.params
        const {training, time} = req.body;
        const updateCalendar = await pool.query(
            "UPDATE my_calendar SET training = $1, time = $2 WHERE data = $3",
            [training, time, data]
        );
        res.json({message: "Rekord został zaktualizowany"})
    }
    catch (err){
        console.error(err)
    }
})


// Port serwera
app.listen(5000, () => {
    console.log('serwer działa')
})