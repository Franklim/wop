const connection = require('../database/connection')
const constants = require("../utils/Constants")

module.exports ={
    
       async create(request, response){
            const {name, permissions} = request.body;

            try {
                const [id] = await connection(constants.TABLE_GROUPS).insert({
                    name,
                    permissions
                });
        
                return response.json({id});
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot insert group.',
                    error
                })    
            } 
        },
        async update(request, response){
            const {id} = request.params;
            const group = request.body
            try {
                await connection(constants.TABLE_GROUPS).where('id',id).update(group);    
                return response.status(204).send();
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot update group.',
                    error
                })    
            } 
        },
        async list(request, response){
            
            try{
                const groups = await connection(constants.TABLE_GROUPS).select("*");
                return response.json({groups})
            }catch (error) {
                return response.status(400).json({
                    message: 'Cannot load all groups.',
                    error
                })    
            }           

        },
        async delete(request, response){
            const {id} = request.params;
        
            try {
                await connection(constants.TABLE_GROUPS).where('id',id).delete();    
                return response.status(204).send();
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot delete group.',
                    error
                })    
            } 
        }

}