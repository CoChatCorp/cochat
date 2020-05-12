const express = require('express') // express.js 모듈을 가져온 것
const app = express()
const port = 5000

const { User } = require("./models/User")
const { auth } = require("./middleware/auth")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')

// application/x-www-form-urlencoded 라고 된 데이터를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.urlencoded({ extended: true }));

// application/json type의 데이터를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
).then(() => console.log('MonogoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!!!!!!!'))

app.get('/api/hello', (req,res) => res.send('안녕하세요!'))

// 회원가입을 위한 라우트 작성 (req, res)는 콜백함수임
app.post('/api/users/register', (req, res) => {
    // 클라이언트에서 보내는 많은 정보들을 받아온다. 가져온 것들을 데이터 베이스에 넣어준다.
    // req.body 에는 id, password: 이런 식으로 json type으로 담아온다.
    // bodyParser가 있기 때문에 request body에 들어있을 수 있고, 아래와 같이 작성 가능하다.

    const user = new User(req.body)

    // 몽고DB에서 오는 메소드, user model에 저장된다.
    // 실패 시 false와 함께 err 메세지를 클라이언트에 전달
    // 성공했으면 200(성공)과 함께 전달
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

// 로그인 라우트
app.post('/api/users/login', (req, res) => {

    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "해당하는 유저가 없습니다."
            })
        }

        //요청한 Email이 데이터베이스에 있다면 비밀번호가 같은지 확인
        //비밀번호까지 같다면 그 유저를 위한 token을 생성하기
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false, message: "비밀번호가 틀렸습니다."
                })
            //비밀번호 까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 토큰을 저장한다. 어디에 저장하냐면, 쿠키나 로컬스토리지 등에 저장 가능
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    })
            })

        })
    })
})

// Auth 라우트 만들기. callback 함수 전 auth 라는 것을 먼저 한다.(middleware)
app.get('/api/users/auth', auth, (req, res) => {

    // 여기까지 미들웨어를 통과해 왔다는 것은 인증이 True라는 말
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.rold === 0 ? false : true, // role 0 -> 일반유저, role != 0 -> admin
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image
    });
});

// 로그아웃 라우트
app.get('/api/users/logout', auth, (req, res) => {

    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            });
        });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))