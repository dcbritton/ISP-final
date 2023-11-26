const express = require('express')
const cors = require('cors')
const mysql2 = require('mysql2')
const app = express()

app.use(cors())
app.use(express.json())

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "racine",
    database: "oxymoronica"
})

// login
app.post('/login', (req,res) => {
    const loginQuery = `SELECT * FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}';`
    db.query(loginQuery, (err,data) => {
        if (err) res.status(500).send(err)
        else { res.send({currentUser: data[0].username})
        console.log(data[0].username) }
    })
})

// like
app.post('/like', (req,res) => {
    const sql = `INSERT INTO post_likes(post_id, owner_name) VALUES (${req.body.id},'${req.body.currentUser}')`
    db.query(sql, (err,data) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        }
        else {
            //console.log(data)
            res.send(data)
        }
    })
})

// unlike
app.post('/unlike', (req,res) => {
    const sql = `DELETE FROM post_likes WHERE post_id = ${req.body.id} AND owner_name = '${req.body.currentUser}'`;
    db.query(sql, (err,data) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        }
        else {
            //console.log(data)
            res.send(data)
        }
    })
})

// CRUD!

// create
app.post('/post/create', (req,res) => {
    const sql = `INSERT INTO posts(blog_id, owner_name, post_title, content) 
                VALUES (${req.body.blog_id}, '${req.body.currentUser}', '${req.body.title}', '${req.body.content}' );`
    db.query(sql, (err,data) => {
        if (err) {
            res.status(500).send(err)
            console.log(err)
        }
        else res.send({message: "worked"})
    })
})

app.post('/blog/create', (req,res) => {
    const sql = `INSERT INTO blogs(title, owner_name, category)
                VALUES ('${req.body.title}', '${req.body.currentUser}', '${req.body.category}');
                `
    db.query(sql, (err,data) => {
        if (err) {
            res.status(500).send(err)
            console.log(err)
        }
        else res.send({message: "worked"})
        //console.log(data)
    })
})

// read
// elsewhere

// update
app.post('/update', (req,res) => {
    const sql = `UPDATE posts SET content = '${req.body.content}' WHERE post_id = ${req.body.post_id};`
    db.query(sql, (err,data) => {
        if (err) {
            res.status(500).send(err)
            console.log(err)
        }
        else res.send({message: "worked"})
    })
})

// delete
app.post('/delete', (req,res) => {
    const sql = `DELETE FROM posts WHERE post_id = ${req.body.post_id}`
    db.query(sql, (err,data) => {
        if (err) {
            res.status(500).send(err)
            console.log(err)
        }
        else res.send({message: "worked"})
    })
})

app.post('/', (req,res) => {
    const sql = `SELECT p.post_id, p.blog_id, p.owner_name, p.post_title, p.content, p.created_at, p.updated_at, j.num_likes, l.liked
                FROM posts p 
                    LEFT OUTER JOIN (SELECT post_id, COUNT(*) AS num_likes FROM post_likes GROUP BY post_id) j ON p.post_id = j.post_id
                    LEFT OUTER JOIN (SELECT post_id, owner_name AS liked FROM post_likes WHERE owner_name = '${req.body.currentUser}') l ON p.post_id = l.post_id
                ORDER BY p.created_at DESC;
                `

    db.query(sql, (err,data) => {
        if (err) {
            res.status(500).send(err)
            console.log(err)
        }
        //console.log(data)
        else res.send(data)
    })
})

app.post('/blog/:id/data', (req,res) => {
    const sql = `SELECT * FROM blogs WHERE blog_id = ${req.params.id}`
    db.query(sql, (err,data) => {
        if (err) {
            res.status(500).send(err)
            console.log(err)
        }
        //console.log(data)
        else res.send(data[0])
    })
})

app.post('/blog/:id', (req, res) => {
    const sql = `SELECT p.post_id, p.blog_id, p.owner_name, p.post_title, p.content, p.created_at, p.updated_at, j.num_likes, l.liked
                FROM posts p 
                    LEFT OUTER JOIN (SELECT post_id, COUNT(*) AS num_likes FROM post_likes GROUP BY post_id) j ON p.post_id = j.post_id
                    LEFT OUTER JOIN (SELECT post_id, owner_name AS liked FROM post_likes WHERE owner_name = '${req.body.currentUser}') l ON p.post_id = l.post_id
                WHERE p.blog_id = ${req.params.id}
                ORDER BY p.created_at DESC;
                `
    db.query(sql, (err,data) => {
        if (err) {
            res.status(500).send(err)
            console.log(err)
        }
        else {
            res.send(data)
            //console.log(data)
        }
    })
})


app.listen(8080, () => {console.log("listening on port 8080")})