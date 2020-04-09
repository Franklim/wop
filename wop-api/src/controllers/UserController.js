const connection = require('../database/connection')
const constants = require("../utils/Constants")

module.exports ={
    
       async create(request, response){
            const {login,password,active,groupId,personId} = request.body;

            try {
                const [id] = await connection(constants.TABLE_USERS).insert({
                    login,
                    password,
                    active,
                    groupId,
                    personId
                });
        
                return response.json({id});
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot insert user.',
                    error
                })    
            } 
        },
        async update(request, response){
            const {id} = request.params;
            const user = request.body
            try {
                await connection(constants.TABLE_USERS).where('id',id).update(user);    
                return response.status(204).send();
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot update user.',
                    error
                })    
            } 
        },
        async list(request, response){
            
            try{
                const users = await connection(constants.TABLE_USERS)
                .leftJoin(constants.TABLE_GROUPS,  constants.TABLE_GROUPS+'.id', constants.TABLE_USERS+'.groupId')
                .leftJoin(constants.TABLE_PERSONS, constants.TABLE_PERSONS+'.id', constants.TABLE_USERS+'.personId')
                .select([
                    constants.TABLE_USERS+'.id',
                    constants.TABLE_USERS+'.login',
                    constants.TABLE_USERS+'.active',
                    constants.TABLE_GROUPS+'.name as groupName',
                    constants.TABLE_PERSONS+'.name as personName',  
                    constants.TABLE_PERSONS+'.mail',  
                ]);
                return response.json({users})
            }catch (error) {
                return response.status(400).json({
                    message: 'Cannot load all users.',
                    error
                })    
            }           

        },
        async paginatedList(request, response){
            const [count] = await connection(constants.TABLE_USERS).count();
            response.header('X-Total-Count', count['count(*)'])

            const {page = 1} = request.query;
            
            try{
                const users = await connection(constants.TABLE_USERS)
                .limit(5)
                .offset((page - 1) * 5)
                .leftJoin(constants.TABLE_GROUPS,  constants.TABLE_GROUPS+'.id', constants.TABLE_USERS+'.groupId')
                .leftJoin(constants.TABLE_PERSONS, constants.TABLE_PERSONS+'.id', constants.TABLE_USERS+'.personId')
                .select([
                    constants.TABLE_USERS+'.id',
                    constants.TABLE_USERS+'.login',
                    constants.TABLE_USERS+'.active',
                    constants.TABLE_GROUPS+'.name as groupName',
                    constants.TABLE_PERSONS+'.name as personName',  
                    constants.TABLE_PERSONS+'.mail',  
                ]);
                return response.json({users})
            }catch (error) {
                return response.status(400).json({
                    message: 'Cannot load all users.',
                    error
                })    
            }           

        },
        async delete(request, response){
            const {id} = request.params;
        
            try {
                await connection(constants.TABLE_USERS).where('id',id).delete();    
                return response.status(204).send();
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot delete user.',
                    error
                })    
            } 
        }

}