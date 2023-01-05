const express = require('express')
const cors = require('cors')
const path = require('path')
const { all } = require('axios')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(`public`))

const allPosts = []

function createPost (req, res) {
    if (allPosts.length < 5) {
        allPosts.push(req.body)
    }else{
        allPosts.shift()
        allPosts.push(req.body)
    }
    res.sendStatus(200)
}

function sendPosts (req,res) {
    res.status(200).send(allPosts)
}

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
})

app.get(`/api/posts`, sendPosts)

app.post(`/api/posts`, createPost)

app.listen(4000, console.log('Server running on 4000'))