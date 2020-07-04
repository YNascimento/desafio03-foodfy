const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const recipes = require('./data')

//pasta de css e js auxiliares
server.use(express.static('layouts/public'))


// ( "tipo de engine" , "tipo de arquivo lido" )
server.set('view engine', 'njk')

//pasta dos arquivos / configurações aplicaveis
nunjucks.configure("layouts/views", {
    express:server,
    autoescape: false, //permite que cod html dentro de texto seja interpretado
    noCache: true //não guarda versões dos dados então sempre puxa do servidor
})

//********* ROTAS ***********

//index
server.get('/',function(req,res){

    for(recipe in recipes){
        recipes[recipe].id = recipe
        // console.log(recipes[recipe])
    }
    return res.render('index',{recipes})
})

//receitas
server.get('/recipes',function(req,res){

    for(recipe in recipes){
        recipes[recipe].id = recipe
        // console.log(recipes[recipe])
    }
    return res.render('recipes',{recipes})
})

//sobre
server.get('/about',function(req,res){

    return res.render('about')
})

//detalhes receita
server.get('/recipe/:index',function(req,res){
    const recipeIndex = req.params.index;
    const recipe = recipes[recipeIndex]
    return res.render('recipe_details',{recipe})
    // return res.render('recipe_details',{recipes, recipeIndex})
})


server.listen(5000,function(){
    console.log("Server running, LocalHost 5000")
})