const bcrypt = require("bcryptjs")

const users = [

    { 
        id:1,
        username: "lais",
        role: "user",
        passwordHash: bcrypt.hashSync("123", 10)
        
    },
    {
        id: 2,
        username: "admin",
        role: "admin",
        passwordHash: bcrypt.hashSync("123", 10)
    }
];

function findByUsername(username){

    return username.find((u) => u.username === username)
}

module.exports = {findByUsername};