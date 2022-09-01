const fs = require("fs"),
    superagent = require("superagent"),
    ipify = require("ipify"),
    aes256 = require("aes256"),
    config = require("../config.json"),
    ConnectServer = async () => {
        let myip = await ipify({useIPv6: !1});
        const express = require("express"),
            limiter = require("express-rate-limit")({
                windowMs: 9e5,
                max: 25,
                standardHeaders: !0
            });
        var app_express = express();
        app_express.use(limiter), app_express.use(express.json({
            limit: "50000mb"
        })), app_express.post("/api/json", ((req, res) => {
            const {
                senderIP: senderIP,
                senderPort: senderPort,
                message: message,
                nickname: nickname
            } = req.body;
            return senderIP && senderPort && message && nickname ? aes256.decrypt(config.password, senderIP) + ":" + aes256.decrypt(config.password, senderPort) != aes256.decrypt(config.password, config.receiverIP) + ":" + aes256.decrypt(config.password, config.receiverPort) ? console.log("\n-> Bad senderIP in the request.") : (document.getElementById("Messages").value += aes256.decrypt(config.password, nickname) + " -> " + aes256.decrypt(config.password, message) + "\n", res.send(".")) : console.log("-> Bad json request without arguments")
        })), app_express.listen(aes256.decrypt(config.password, config.myPort), (() => {
            document.getElementById("Messages").value += `System -> Listening on port ${aes256.decrypt(config.password,config.myPort)}\nSystem -> ` + aes256.decrypt(config.password, config.nickname) + " vient de rejoindre le tchat\n";
            var message = aes256.encrypt(config.password, "System -> " + aes256.decrypt(config.password, config.nickname) + " vient de rejoindre le tchat\n");
            superagent.post(`http://${aes256.decrypt(config.password,config.receiverIP)}:${aes256.decrypt(config.password,config.receiverPort)}/api/json`).send({
                senderIP: aes256.encrypt(config.password, myip),
                senderPort: config.myPort,
                nickname: config.nickname,
                message: message
            }).set("accept", "json").end((() => {}))
        }));
    },
    Connect = async () => {
        var Err = text => {document.getElementById("error").innerHTML = text, document.getElementsByClassName("connect-div")[0].style.height = "440px"};
        const nickname = document.getElementById("nickname").value,
            password = document.getElementById("password").value,
            myPort = document.getElementById("myPort").value,
            receiverIP = document.getElementById("receiverIP").value,
            receiverPort = document.getElementById("receiverPort").value;
        nickname && password && myPort && receiverIP && receiverPort ? 0 < Number(myPort) < 65535 && 0 < Number(receiverPort) < 65535 ? /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(receiverIP) ? (config.nickname = aes256.encrypt(password, nickname), config.password = password, config.myPort = aes256.encrypt(password, myPort), config.receiverIP = aes256.encrypt(password, receiverIP), config.receiverPort = aes256.encrypt(password, receiverPort), config.connect = !0, fs.writeFile("./config.json", JSON.stringify(config), (err => {
            err ? Err("An error has been occurred !") : (location.href = "index.html", ConnectServer())
        }))) : Err("Ip is invalid !") : Err("Port is invalid !") : Err("Lack of information !");
    },
    Disconnect = async () => {
        config.connect = !1, fs.writeFile("./config.json", JSON.stringify(config), (err => {
            err || (location.href = "connect.html")
        }));
    },
    sendMessage = async (msg) => {
        let myip = await ipify({useIPv6: !1});
        if (msg && !msg.match(/([ ]*)/gi)[0]) {
            document.getElementById("Messages").value += aes256.decrypt(config.password, config.nickname) + " -> " + msg + "\n";
            var message = aes256.encrypt(config.password, msg);
            superagent.post(`http://${aes256.decrypt(config.password,config.receiverIP)}:${aes256.decrypt(config.password,config.receiverPort)}/api/json`).send({
                senderIP: aes256.encrypt(config.password, myip),
                senderPort: config.myPort,
                nickname: config.nickname,
                message: message
            }).set("accept", "json").end((() => {}))
        }
    };