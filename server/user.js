const express = require('express')
const Router = express.Router()
const utility = require('utility')
const models = require('./model')
const User = models.getModel('user')

const _filter = {pwd: 0, __v: 0}

Router.get('/list', (req, res) => {
  // User.remove({}, (e, d) => console.log(e, d))
  User.find({}, (err, doc) => {
    return res.json(doc)
  })
})

Router.get('/info', (req, res) => {
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code: 0})
  }
  User.findById(userid, _filter, (err, doc) => {
    if (err) {
      return res.json({code: 0, msg: err})
    }
    return res.json({code: 1, data: doc})
  })
})

Router.post('/update', (req, res) => {
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code: 0})
  }

  const body = req.body
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 1, data})
  })
})

Router.post('/login', (req, res) => {
  const {user, pwd} = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
    if (!doc) {
      return res.json({code: 0, msg: '用户不存在或密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code: 1, data: doc})
  })
})
Router.post('/register', (req, res) => {
  const {user, pwd, type} = req.body
  User.findOne({user}, (err, doc) => {
    if (doc) {
      return res.json({code: 0, msg: '用户名重复'})
    }
    const userModel = new User({user, pwd: md5Pwd(pwd), type})
    userModel.save((err, doc) => {
      if (err) {
        return res.json({code: 0, msg: '服务器异常'})
      }
      const {user, type, _id} = doc
      res.cookie('userid', _id)
      return res.json({code: 1, data: {user, type, _id}})
    })
  })
})

function md5Pwd(pwd) {
  const salt = 'boss'
  return utility.md5(utility.md5(salt + pwd))
}

module.exports = Router