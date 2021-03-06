const connection = require('../database/connection')
const constants = require("../utils/Constants")

module.exports ={
    
       async create(request, response){
            const {name,document,address,number,district,city,state,country,zipcode,complement,mail,phone,whatsapp} = request.body;

            try {
                const [id] = await connection(constants.TABLE_PERSONS).insert({
                    name,
					document,
                    address,
                    number,
                    district,
                    city,
                    state,
					country,
                    zipcode,
                    complement,
                    mail,
                    phone,
                    whatsapp
                });
        
                return response.json({id});
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot insert person.',
                    error
                })    
            } 
        },
        async update(request, response){
            const {id} = request.params;
            const person = request.body
            try {
                await connection(constants.TABLE_PERSONS).where('id',id).update(person);    
                return response.status(204).send();
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot update person.',
                    error
                })    
            } 
        },
        async list(request, response){
            
            try{
                const persons = await connection(constants.TABLE_PERSONS).select("*");
                return response.json({persons})
            }catch (error) {
                return response.status(400).json({
                    message: 'Cannot load all persons.',
                    error
                })    
            }           

        },
        async paginatedList(request, response){
            const [count] = await connection(constants.TABLE_PERSONS).count();
            response.header('X-Total-Count', count['count(*)'])
        
            const {page = 1} = request.query;
        
            try{
                const persons = await connection(constants.TABLE_PERSONS)
                .limit(5)
                .offset((page - 1) * 5)
                .select("*");
                
                return response.json({persons})
            }catch (error) {
                return response.status(400).json({
                    message: 'Cannot load all persons.',
                    error
                })    
            }           

        },
        async delete(request, response){
            const {id} = request.params;
        
            try {
                await connection(constants.TABLE_PERSONS).where('id',id).delete();    
                return response.status(204).send();
            } catch (error) {
                return response.status(400).json({
                    message: 'Cannot delete person.',
                    error
                })    
            } 
        }

}