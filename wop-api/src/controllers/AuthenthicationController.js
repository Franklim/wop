const connection = require('../database/connection')
const constants = require("../utils/Constants")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const authConfig =require('../utils/authConfig')

module.exports ={

    async auth(request, response){

        const {login,password} = request.body;

        const user = await connection(constants.TABLE_USERS).where('login',login).first()  

        if(!user){
            return response.status(400).send({error: 'User not found'})
        }

        if(await bcrypt.compare(password, user.password)){

            user.password = undefined;

            const token = jwt.sign({ id: user.id}, authConfig.secret, {
                expiresIn:86400
            })
            return response.send({ user,token})

        }else{
            return response.status(400).send({error: 'Invalid password'})
        }



    }
}