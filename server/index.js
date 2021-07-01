const express = require("express");

const app = express();
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const fs = require("fs");
const path = require("path");

app.ws("/", (ws, req) => {
  console.log("success");
  ws.send("You are connected");
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "draw":
        broadcastConnection(ws, msg);
        break;
    }
  });
});

app.use(cors());
app.use(express.json());

app.post("/image", (req, res) => {
  try {
    const data = req.body.img.replace("data:image/png;base64,", "");
    fs,
      fs.writeFileSync(
        path.resolve(__dirname, "files", `${req.query.id}.jpg`),
        data,
        "base64"
      );
    return res.status(200).json("ok");
  } catch (e) {
    console.log(e);
    return res.status(500).json("error");
  }
});

app.get("/image", (req, res) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`)
    );
    const data = `data:image/png;base64,` + file.toString("base64");
    res.json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json("error");
  }
});
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

const connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};
