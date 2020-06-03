const express = require('express');
const router = express.Router();
const { Chat } = require("../models/Chat");

router.get("/getChats", (req, res) => {
    
    Chat.find() // chat model에 있는 데이터 불러오기
        .populate("sender")
        .exec((err, chats) => {
          if(err) return res.status(400).send(err);
          res.status(200).send(chats)  
        })
});

module.exports = router;