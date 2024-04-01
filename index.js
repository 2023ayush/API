const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs");
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
// REST API TO GET ALL FAKE USERS
app.get("/api/users", (req, res) => {
  return res.json(users);
});
//API TO GET SINGLE USER WITH ID
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })

  .patch((req, res) => {
    return res.json({});
  })
  .delete((req, res) => {
    return res.json(users);
  });
// API TO CREATE USER
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });

  //console.log("Body", body);
});
app.listen(PORT, () => console.log(`Server started at port:${PORT}`));
