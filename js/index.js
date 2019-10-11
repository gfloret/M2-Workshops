
const express = require('express')
const app = express()
const InMemoryWorkshop = require("./inMemoryWorkshop")
const path = require("path")
// const ejs = require('ejs')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', '/ejs'));
app.use(express.static(path.join(__dirname , '..', 'css')));


app.get('/', function (req, res) {
    InMemoryWorkshop.getWorkshopList()
    .then(workshops => {
        res.render("index", {
            workshops: workshops
        })
    })
})

app.get('/add-workshop', function (req, res) {
    res.render('add-workshop')
})

app.get('/remove-workshop', function (req, res) {
    res.render('remove-workshop')
})

app.get('/update-workshop', function (req, res) {
    res.render('update-workshop')
})

app.post('/add-workshop', function (req, res) {
    const name = req.body.name
    const description = req.body.description
    InMemoryWorkshop.addWorkshop(name, description).then(() => {
        InMemoryWorkshop.getWorkshopList()
        .then(workshops => {
            res.render("index", {
                workshops: workshops
            })
        })
    })
    .catch(e =>res.send(e.message))
})

app.post('/remove-workshop', function (req, res) {
    const name = req.body.name
    InMemoryWorkshop.removeWorkshop(name).then(() => {
        InMemoryWorkshop.getWorkshopList()
        .then(workshops => {
            res.render("index", {
                workshops: workshops
            })
        })
    })
    .catch(e =>res.send(e.message))
})

app.post('/update-workshop', function(req, res) {
    const name = req.body.name
    const description = req.body.description
    InMemoryWorkshop.updateWorkshop(name, description).then(() => {
        InMemoryWorkshop.getWorkshopList()
        .then(workshops => {
            res.render("index", {
                workshops: workshops
            })
        })
    })
    .catch(e =>res.send(e.message))
})

app.listen(3000, function () {
  console.log('Workshop app listening on port 3000!')
})
