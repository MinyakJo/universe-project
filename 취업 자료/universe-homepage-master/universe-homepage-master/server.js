const express = require("express")
const path = require("path")

require("dotenv").config()
const app = express()
const port = process.env.HTTP_PORT || 3004

app.use(express.static(path.join(__dirname, "./build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"))
})

app.listen(port, () => {
    console.log(`${port}번 포트에서 Client Page 실행`)
})

