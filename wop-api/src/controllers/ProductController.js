const connection = require('../database/connection')
const constants = require("../utils/Constants")

module.exports ={
    
       async create(request, response){
            const {code,barCode,description,supplier} = request.body;

            try {
                const [id] = await connection(constants.TABLE_PRODUCTS).insert({
                    code,
                    barCode,
                    description,
                    supplier
                });
        
                return response.json({id});
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot insert product.',
                    error
                })    
            } 
        },
        async update(request, response){
            const {id} = request.params;
            const product = request.body
            try {
                await connection(constants.TABLE_PRODUCTS).where('id',id).update(product);    
                return response.status(204).send();
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot update product.',
                    error
                })    
            } 
        },
        async list(request, response){
            
            try{
                const products = await connection(constants.TABLE_PRODUCTS).select("*");
                return response.json({products})
            }catch (error) {
                return response.status(400).json({
                    message: 'Cannot load all products.',
                    error
                })    
            }           

        },
        async paginatedList(request, response){
            const [count] = await connection(constants.TABLE_PRODUCTS).count();
            response.header('X-Total-Count', count['count(*)'])
        
            const {page = 1} = request.query;
        
            try{
                const products = await connection(constants.TABLE_PRODUCTS)
                .limit(5)
                .offset((page - 1) * 5)
                .select("*");
                
                return response.json({products})
            }catch (error) {
                return response.status(400).json({
                    message: 'Cannot load all products.',
                    error
                })    
            }           

        },
        async delete(request, response){
            const {id} = request.params;
        
            try {
                await connection(constants.TABLE_PRODUCTS).where('id',id).delete();    
                return response.status(204).send();
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot delete product.',
                    error
                })    
            } 
        }

}