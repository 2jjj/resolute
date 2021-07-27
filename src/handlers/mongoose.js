const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect('mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/db', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(console.log("MongoDB conectado com sucesso!"));
}