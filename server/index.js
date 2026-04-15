import express from "express";

const app = express();

app.get('/', (_req, res) => {
    res.status(201).json({
        message: "success"
    })
})

app.listen(3000, ()=> {
    console.log(`Listening on port 3000`);
    
})