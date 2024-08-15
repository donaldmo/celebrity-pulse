const express = require("express")

const app = express()
const port = 5000

app.get("/", (req, res) => {
    res.send("Hello Wolrd!")
})

app.post("/webhook-url", function (req, res) {
    const requestBody = req.rawBody
    console.log(requestBody)

    // Verify and process the received data

    res.send(200)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})