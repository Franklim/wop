const express = require('express');

const routes = express.Router();
routes.get('/', (request, response) => {
    return response.json({
        message:"Base Application configured.",
        database:"Archive with configurations - OK.",
        structure:"Folder structure - OK."      
    });
} );

module.exports = routes;