import express from 'express';
import expressWs from 'express-ws';
import path from'path';
import flash from 'connect-flash';
import http from'http'
import usersrRoute from'./routes/users.js'
import controlRoute from './routes/control.js'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); 
const port = 3000; 
const server = http.createServer(app).listen(port);
var eWs = expressWs(app,server);


app.set('views', './views'); // Thư mục views nằm cùng cấp với file app.js
app.set('view engine', 'ejs'); // Sử dụng pug làm view engine
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname,'/public')))
console.log(path.join(__dirname,'/public'))
// catch 404 and forward to error handler


/*app.get('/', function(req, res){
    res.send('Hello');
    
})*/
//1 la mo 
//0 la dong
var state ={
    "magnet_switch": 0,
    "unlock" : 0,
}    

app.use('/users',usersrRoute)
//get the /ws websocket route 
app.use('/control',controlRoute)

app.ws('/',async function(ws,req) {
    ws.on('connection',(ws,req)=>{
        ws.id =Ews.getUniqueID();
        ews.client.forEach( (client)=>{
            console.log('client ID: '+client.id)
        })
    })
    ws.on('message',function (msg) {
        var socket = eWs.getWss('/');
       
        
        let msgJson = JSON.parse(msg);
        console.log(msgJson)
        if (msgJson.dv=="S")
        {
            if(msgJson.st=="CUA DANG MO")
            {
                state.magnet_switch = 1;
            }
            if(msgJson.st=="CUA DANG DONG") 
            {    
                state.magnet_switch = 0;
            }
        }
        if (msgJson.dv=="L")
        {
            if(msgJson.st=="open")
            {
                if(state.magnet_switch == 0)
                {
                    state.unlock = 1;
                    console.log("DANGMOCUA")
                    
                }
                if(state.magnet_switch == 1)
                {
                    
                    console.log("CUADANGMOSANROI")
                }
            }

                
            if(msgJson.st=="close")
            {    
                state.unlock = 0;
            }
        }
        socket.clients.forEach((client) => {
            // console.log(client);
            if(msgJson.dv=="S")
            {    
                client.send(msgJson.st);
            }
            if(msgJson.dv=="L")
            {    
                client.send(msgJson.st);
            }
        });
        console.log(state);
        
    });

    // ws.getUniqueID = function () {
    //     function s4() {
    //         return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    //     }
    //     var id = s4() + s4() + '-' + s4();
    //     console.log(id);
        

    //     return id;
    // };
    


});