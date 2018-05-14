const express = require('express');
const http = require('http');
const url = require('url');
const fs = require('fs')
const resolve = require('path').resolve

const app = express();
const port = process.env.PORT || 5000;

app.get('/show*',(request,response) => {
    const urlParts = url.parse(request.url, true);
    const path = resolve(urlParts.query.path);

    fs.readFile(path,(err,content)=>{
        if (err){
            response.send({express: "error"})
        }
        else{
            response.send(JSON.stringify({express: content.toString().split('\n')}))
        }
     })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
