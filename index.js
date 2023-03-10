require("dotenv").config();
const  express = require('express');
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 3800;
const cors = require('cors');
mongoose.set('strictQuery', true)

const teamRouter = require('./routes/teamRouter')

//middleware
app.use(teamRouter);
app.use(cors());
app.use(express.json());

//error route
app.use((req,res) => {
    res.status(404).send(`route not found try <a href="http://api/v1/teams">FOOTBALL API</a>`);
});


//DBconnections

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, 'localhost', ()=>{
            console.log(`listening on port ${PORT}..`);
        });
    }catch(error)  {
        console.log(error);
    }
};

startServer ();