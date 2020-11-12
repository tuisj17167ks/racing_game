var express=require("express"),app=express(),http=require("http"),server=http.createServer(app),

io = require("socket.io").listen(server);

app.use("/",express.static(__dirname + "/public" ));//このディレクトリの奴を使用可的な
server.listen(8081);
//ここまでで鯖にはなってるらしいも

//=========================
var entry_num = 0;//現在エントリー史輝和
var entry_plan = 0;//参加予定人数
var entry = false;//現在部屋が作られているか
var player_list = [];//ユーザ管理用
var player_data = [];
var full = false;//満員の識別

var player = function(id,x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  };

io.sockets.on("connection",function(socket){//繋がったらこの中動くぽい

    socket.on("loginstart",function(){
        io.sockets.emit("loginstart",entry);
        socket.on("set",function(plan){
            entry_plan = plan;
            player_list.push();
            entry = true;
        });
    });

    socket.on("this",function(id){
        player_list[entry_num] = id; 
        entry_num++;
        if(entry_num>=entry_plan){
            full = true;
            socket.emit("full")
        }
    });

    //=====================<以下test2処理>=============================
    socket.on("weitstart",function weitstart(){
        socket.emit("weitstart",entry_plan,entry_num);
        socket.broadcast.emit("joinadd",entry_num);
    });

    //==================================================================

    socket.on("start",function start(){
        socket.emit("confirm",player_list);
        
        for(var i = 0;i<player_list.length;i++){
            player_data[i] = new player(player_list[i],0,0);
        }
        
    })

    socket.on("move",function(x,y,id){
        player_data[player_list.indexOf(String(id))].x = x;
        player_data[player_list.indexOf(String(id))].y = y;
        socket.broadcast.emit("change",player_data);
        socket.emit("change",player_data);
    });
});