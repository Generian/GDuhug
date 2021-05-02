const express = require('express')
var bodyParser = require('body-parser')
const path = require('path')
const livereload = require("livereload")
const connectLivereload = require("connect-livereload")

const PORT = process.env.PORT || 3000

const liveReloadServer = livereload.createServer()
liveReloadServer.watch(path.join(__dirname, 'web'))
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const app = express()

app.use(connectLivereload())
app.use(express.static('web/public'))

var jsonParser = bodyParser.json()

// Serve pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/open_box.html'));
})

app.get('/kuchen', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/kuchen.html'));
})

app.get('/sachertorte', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/kuchen_loesung.html'));
})

app.get('/raetseljunkie', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/raetseljunkie.html'));
})

app.get('/gc5pw12', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/raetseljunkie_loesung.html'));
})

// API methods

const correctPassword = {
  "/kuchen": {
    password: "sachertorte",
    link: "/sachertorte",
  },
  "/raetseljunkie": {
    password: "gc5pw12",
    link: "/gc5pw12",
  },
}

app.post('/api/password/', jsonParser, (req, res) => {
  try {
    const pw = req.body.password
    const page = req.body.page
    console.log("Submitted password:", pw, "Submitted page: ", page)
    if (correctPassword[page] && pw === correctPassword[page].password) {
      return res.json({
        correct_pw: true,
        link: correctPassword[page].link,
      })
    } else {
      return res.json({
        correct_pw: false,
        link: "",
      })
    }
  } catch {
    return res.status(400).json({ error: 'no password sent' })
  }
})

app.post('/api/password/first/', jsonParser, (req, res) => {
  try {
    const pw = req.body.password
    console.log("Submitted password:", pw)
    if (pw === 'gc5pw12') {
      return res.json({
        correct_pw: true,
        link: "/raetseljunkie_loesung",
      })
    } else {
      return res.json({
        correct_pw: false,
        link: "",
      })
    }
  } catch {
    return res.status(400).json({ error: 'no password sent' })
  }
})

// Server setup
app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`)
})