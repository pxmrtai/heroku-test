require("dotenv").config();
console.log(process.env.SESSION_SECRET);
const express = require("express");

const app = express();
const port = 5000;
var cookieParser = require("cookie-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const shortid = require("shortid");
const adapter = new FileSync("db.json");
const db = low(adapter);
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

var userRoute = require("./routes/users.route");
var authRoute = require("./routes/auth.route");
var transaction = require("./routes/transaction.route");
var counting = require("./middleware/count.middleware");
var controller = require("./controller/bookList.controller");
var authMiddleware = require("./middleware/auth.middleware");
var adminMiddleware = require("./middleware/admin.middleware");


app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
console.log(process.env.SESSION_SECRET)

db.defaults({ list: [] }).write();

app.get("/",authMiddleware.requireAuth, adminMiddleware.admin , controller.index);
app.get("/book", authMiddleware.requireAuth, controller.listBook);
app.get("/:id", authMiddleware.requireAuth, controller.view);
app.get("/:id/delete", authMiddleware.requireAuth, controller.deleteBook);

app.post("/", controller.postIndex);
app.post("/update", controller.update);

app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/transaction", authMiddleware.requireAuth, transaction);
app.use("/auth", authRoute);
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
