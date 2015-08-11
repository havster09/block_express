var express = require('express');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended:false});

var logger = require('./logger');
var app = express();

app.use(logger);

app.use(express.static('public'));

app.get('/',function(req,res){
    //res.sendFile(__dirname+'/public/index.html');
});

var blocks = {
    'Fixed':"A sdffsdf",
    'Movable':"B sdfdsfsdhgjhkjkljkl",
    'Rotating':"C fgy76ighjfhst"
}

app.get('/blocks',function(req,res){
    if(req.query.limit >= 0){
        blocksLimit = blocks.slice(0,req.query.limit);
        res.json(Object.keys(blocksLimit));
    }
    else{
        res.json(Object.keys(blocks));
    }
});

app.get('/blocks/:name',function(req,res){
    var name = req.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    var description = blocks[block];
    if(!description){
        res.status(404).json('No description found for '+req.params.name);
    }
    else{
        res.json(description);
    }
});

app.post('/blocks',parseUrlencoded,function(req,res){
    var newBlock = req.body;
    blocks[newBlock.name] = newBlock.description;
    res.status(201).json(newBlock.name);
});

app.delete('/blocks/:name',function(req,res){
    delete blocks[req.blockName];
    res.sendStatus(200);
});

app.listen(3000, function(){
    console.log("listening 3000");
});