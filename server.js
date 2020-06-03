const express = require('express')
const app =  express()
const connectDB = require('./config/db')


// connect Database
connectDB()

// Init Middleware
app.use(express.json({extended:false}))

// creating endpoint
app.get('/',(req,res)=>{
    res.send('Api running')
})
app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/posts',require('./routes/api/posts'))
app.use('/api/profile',require('./routes/api/profile'))


const PORT = process.env.PORT || 5000


app.listen(PORT,()=>console.log(`server started on port ${PORT}`));
