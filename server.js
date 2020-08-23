const express = require('express')
const app = express()
const port = 5000
var cookieParser = require('cookie-parser') 
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid');
const adapter = new FileSync('db.json')
const db = low(adapter)
const bodyParser = require('body-parser')


var userRoute = require('./routes/users.route');
var authRoute = require('./routes/auth.route');
var transaction = require('./routes/transaction.route')
var counting = require('./middleware/count.middleware')
var controller = require ('./controller/bookList.controller')
var authMiddleware = require('./middleware/auth.middleware')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cookieParser())
app.set('view engine', 'pug')
app.set('views', './views')

db.defaults({ list: [] })
  .write()
 
app.get('/',authMiddleware.requireAuth, controller.index)
app.get('/book',authMiddleware.requireAuth,controller.listBook)
app.get('/:id',authMiddleware.requireAuth,controller.view)
app.get("/:id/delete",authMiddleware.requireAuth, controller.deleteBook)

app.post('/', controller.postIndex)
app.post('/update',controller.update)


app.use('/users',authMiddleware.requireAuth, userRoute)
app.use('/transaction',authMiddleware.requireAuth, transaction)
app.use('/auth',authRoute)
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})