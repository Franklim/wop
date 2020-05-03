const connection = require('../database/connection')
const constants = require("../utils/Constants")

module.exports ={
    
       async create(request, response){
            const {code,description,days} = request.body;

            try {
                const [id] = await connection(constants.TABLE_PAYMENT_CONDITIONS).insert({
                    code,                    
                    description,
                    days
                });
        
                return response.json({id});
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot insert condition.',
                    error
                })    
            } 
        },
        async update(request, response){
            const {id} = request.params;
            const condition = request.body
            try {
                await connection(constants.TABLE_PAYMENT_CONDITIONS).where('id',id).update(condition);    
                return response.status(204).send();
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot update condition.',
                    error
                })    
            } 
        },
        async list(request, response){
            
            try{
                const conditions = await connection(constants.TABLE_PAYMENT_CONDITIONS).select("*");
                return response.json({conditions})
            }catch (error) {
                return response.status(400).json({
                    message: 'Cannot load all conditions.',
                    error
                })    
            }           

        },
        async paginatedList(request, response){
            const [count] = await connection(constants.TABLE_PAYMENT_CONDITIONS).count();
            response.header('X-Total-Count', count['count(*)'])
        
            const {page = 1} = request.query;
        
            try{
                const conditions = await connection(constants.TABLE_PAYMENT_CONDITIONS)
                .limit(5)
                .offset((page - 1) * 5)
                .select("*");
                
                return response.json({conditions})
            }catch (error) {
                return response.status(400).json({
                    message: 'Cannot load all conditions.',
                    error
                })    
            }           

        },
        async delete(request, response){
            const {id} = request.params;
        
            try {
                await connection(constants.TABLE_PAYMENT_CONDITIONS).where('id',id).delete();    
                return response.status(204).send();
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot delete condition.',
                    error
                })    
            } 
        }

}