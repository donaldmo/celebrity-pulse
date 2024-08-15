const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = 5000

// Middleware to capture the raw body
app.use(bodyParser.raw({ type: "*/*" }))

app.get("/", (req, res) => {
    res.send("Hello Wolrd!")
})

app.post("/webhook-endpoint", function (req, res) {
    const requestBody = req.body.toString()
    console.log(`Received body: ${requestBody}`)

    // Access the id from the query parameters
    const id = req.query.id;
    console.log(`Received id: ${id}`);

    // Verify and process the received data

    res.send(200)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})