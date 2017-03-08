const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 3000;

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/view/chat.html");
});
app.get('/css/style.css', function (req, res) {
    res.sendfile(__dirname + "/css/style.css");
});

io.on("connection", function (socket) {
    console.log("a user connected");
    socket.on("chat_message", function (msg) {
        console.log("message: " + msg);
        io.emit("chat_message", msg);
    });
});

http.listen(port, function () {
    console.log("server runing on port:" + port);
});