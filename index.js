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

app.get('/vergessene_orte1', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/vergessene_orte1.html'));
})

app.get('/ScottsHuette', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/Vergessene_Orte1_loesung.html'));
})

app.get('/LPBeelitz', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/LPBeelitz.html'));
})

app.get('/kaffeetante', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/kaffeetante.html'));
})

app.get('/puzzlemaniaaa', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/puzzlemaniaaa.html'));
})

app.get('/agententraining', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/Agententraining.html'));
})

app.get('/tiere', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/einherzfuertiere.html'));
})

app.get('/bonus', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/bonus.html'));
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
  "/vergessene_orte1": {
    password: "antarktisscottflour1911",
    link: "/ScottsHuette",
  },
  "/LPBeelitz": {
    password: "flügel",
    link: "/kaffeetante",
  },
  "/kaffeetante": {
    password: "eiweißshake",
    link: "/puzzlemaniaaa",
  },
  "/puzzlemaniaaa": {
    password: "entspannung",
    link: "/agententraining",
  },
  "/agententraining": {
    password: "moeskeetogelb",
    link: "/tiere",
  },
  "/tiere": {
    password: "leipzigpferdhelios",
    link: "/bonus",
  },
  "/bonus": {
    password: "bonus",
    link: "/kuchen",
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

// Server setup
app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`)
})