const socketio = require('socket.io');

const io = socketio();
const User = require("./models/user")
const socketApi = { io };



let game = ""; //Başlangıçta Game durumu

let sayac = 0;

let control = 0;

let users = []

io.on("connection", (socket) => {

    socket.on("login", data => {

        if (users.length < 1) {
            let user = new User(data.nickname, "X", true);
            socket.join(user.attack);
            users.push(user);
        } else {
            let user = new User(data.nickname, "O", false);
            socket.join(user.attack);
            users.push(user)
        }
    })


    socket.on("newGame", data => {

        game = data;

        console.log(users)
        if (users.length <= 1) {
            socket.emit("newGame", users[0])

        }


        if (users.length > 1) {
            socket.emit("newGame", users[1])
        }


    })


    socket.on("attack", data => {
        game = data.game;
        control++;
        if (control == 9) {
            io.emit("finish", "FİNİSHED")
            control = 0;
        }

        if (data.user.attack == "X" && data.user.turn) {
            users[0].turn = false;
            socket.emit("turn", users[0].turn)
            io.to(users[1].attack).emit("turn", true);
            io.emit("game", game);
        }
        if (data.user.attack == "O" && data.user.turn) {
            users[1].turn = false;
            socket.emit("turn", users[1].turn)
            io.to(users[0].attack).emit("turn", true);
            io.emit("game", game);

        }

    })

    socket.on("disconnect", () => {
        console.log("User Left")
        control = 0;
        users = []
        io.emit("restart", "Refresh Page");
    })

    socket.on("restart", () => {
        console.log("Restart")
        control = 0;
        users = []
        io.emit("restart", "Refresh Page");
    })

})




module.exports = socketApi;
