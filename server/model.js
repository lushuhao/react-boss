const mongoose = require('mongoose')

// 连接mongodb并且使用boss集合
const DB_URL = 'mongodb://localhost:27017/boss'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
  console.log('mongo connect success')
})

const models = {
  user: {
    user: {type: String, require: true},
    pwd: {type: String, require: true},
    type: {type: String, require: true}, // 类型
    avatar: String, // 头像
    desc: String, // 个人简介
    title: String, // 职位
    company: String, // 公司
    money: String, // 薪资
  },
  chat: {}
}

Object.entries(models).forEach(([key, model]) => {
  mongoose.model(key, new mongoose.Schema(model))
})

module.exports = {
  getModel(name) {
    return mongoose.model(name)
  }
}