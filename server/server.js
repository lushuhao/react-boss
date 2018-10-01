const express = require('express')
const mongoose = require('mongoose')

// 连接mongodb并且使用boss集合
const DB_URL = 'mongodb://localhost:27017/boss'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
  console.log('mongo connect success')
})

// 类似于mysql的表，mongo里面有文档、字段的概念
const User = mongoose.model('user', new mongoose.Schema({
  name: {type: String, require: true},
  age: {type: Number, require: true}
}))

// User.create({
//   name: 'xiao',
//   age: 23
// }, (err, doc) => {
//   if (!err) {
//     console.log(doc)
//   } else {
//     console.log(err)
//   }
// })

// User.remove({age:24}, (err,doc)=> {
//   console.log(doc)
// })

// User.update({}, {$set:{user: 'lu',age: 24}}, (err, doc) => {
//   console.log(doc)
// })

// 新建app
const app = express()

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/data', (req, res) => {
  User.find({name: 'xiao'}, (err, doc) => {
    res.json(doc)
  })
})

app.listen(9093, () => {
  console.log('Node server listen on 9093!')
})