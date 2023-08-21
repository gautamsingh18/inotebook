const express = require("express");
const app = express();
const connectToMongo = require("./db");
connectToMongo();

app.use(express.json());

//routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
