var express=require("express"),app=express(),http=require("http"),server=http.createServer(app),

io = require("socket.io").listen(server);

app.use("/",express.static(__dirname + "/public" ));//このディレクトリの奴を使用可的な
server.listen(process.env.PORT || 3000, () => {
 console.log(`Server running.`);
});
//ここまでで鯖にはなってるらしいも



var playernum=0;

//こっちで使う変数
var pone=false;
var ptwo=false;
var pthree=false;
var pfour=false;

var onex=0;
var oney=200;
var onehandle=1.5;
var twox=15;
var twoy=215;
var twohandle=1.5;


var threex=30;
var threey=230;
var threehandle=1.5;
var fourx=450;
var foury=245;
var fourhandle=1.5;


var member=0;
var goalnum=0;
var pnumber=0;
var g1=false;
var g2=false;
var g3=false;
var g4=false;

io.sockets.on("connection",function(socket){//繋がったらこの中動くぽい


socket.on("loginstart",function(){
//console.log("loginstart&mem="+member);
io.sockets.emit("loginstart",pone,ptwo,pthree,pfour,member);
}
);



//ここで言うindex.htmlからemitを受けてonが動くも
socket.on("login",function(pnum,membernum){//ログイン時処理
if(pnum==1){
pone=true;
member=membernum;
//console.log("login&mem="+member);
}else if(pnum==2){
ptwo=true;

} else if(pnum==3){
pthree=true;

}else{
pfour=true;

} 

//console.log("login"+pnum);
pnumber=pnum;
if(pnum==1){
//console.log("emitfinal");
io.sockets.emit("loginfinal",pone,ptwo,pthree,pfour,member);
}

}
);

socket.on("memb",function(){

io.sockets.emit("memb",member);
}
);


socket.on("loginfinal",function(){
//console.log("final");
io.sockets.emit("loginfinal",pone,ptwo,pthree,pfour);
}
);

socket.on("loginfinalfinal",function(){
//console.log("emitfinalfinal");
io.sockets.emit("loginfinalfinal");
}
);


socket.on("escreset",function(){
onex=0;
oney=200;
 twox=15;
 twoy=215;
threex=30;
 threey=230;
 fourx=45;
 foury=245;
 onehandle=1.5;
 twohandle=1.5;
threehandle=1.5;
fourhandle=1.5;
g1=false;
g2=false;
g3=false;
g4=false;
goalnum=0;

io.sockets.emit("reset");
}
);

socket.on("reset",function(){

io.sockets.emit("reset",g1,g2);
}
);


socket.on("souone",function(pnum,newx,newy,ohandle){//1pが送信するときの処理
onex=newx;//ここで1pから見た1pの座標をemitで送ってもらうだけ
oney=newy;
onehandle=ohandle;
}
);

socket.on("soutwo",function(pnum,newx,newy,thandle){//2pが送信するときの処理

twox=newx;
twoy=newy;
twohandle=thandle;
}
);

socket.on("southree",function(pnum,newx,newy,thandle){

threex=newx;
threey=newy;
threehandle=thandle;
}
);

socket.on("soufour",function(pnum,newx,newy,thandle){

fourx=newx;
foury=newy;
fourhandle=thandle;
}
);


socket.on("jyuone",function(pnum){//1pが受信するときの処理

io.sockets.emit("jyuone",twox,twoy,twohandle,threex,threey,threehandle,fourx,foury,fourhandle);//1pが,2pの座標欲しがってemitしてくるから送ったげるだけ
}
);

socket.on("jyutwo",function(pnum){//2pが受信するときの処理

io.sockets.emit("jyutwo",onex,oney,onehandle,threex,threey,threehandle,fourx,foury,fourhandle);
}
);

socket.on("jyuthree",function(pnum){

io.sockets.emit("jyuthree",onex,oney,onehandle,twox,twoy,twohandle,fourx,foury,fourhandle);
}
);

socket.on("jyufour",function(pnum){

io.sockets.emit("jyufour",onex,oney,onehandle,twox,twoy,twohandle,threex,threey,threehandle);
}
);







socket.on("goalone",function(){
if(goalnum==0){
io.sockets.emit("goalone",1);
}else if(goalnum==1){
io.sockets.emit("goalone",2);
}else if(goalnum==2){
io.sockets.emit("goalone",3);
}else{
io.sockets.emit("goalone",4);
}
goalnum++;
g1=true;
}
);



socket.on("goaltwo",function(){
if(goalnum==0){
io.sockets.emit("goaltwo",1);
}else if(goalnum==1){
io.sockets.emit("goaltwo",2);
}else if(goalnum==2){
io.sockets.emit("goaltwo",3);
}else{
io.sockets.emit("goaltwo",4);
}
goalnum++;
g2=true;
}
);

socket.on("goalthree",function(){
if(goalnum==0){
io.sockets.emit("goalthree",1);
}else if(goalnum==1){
io.sockets.emit("goalthree",2);
}else if(goalnum==2){
io.sockets.emit("goalthree",3);
}else{
io.sockets.emit("goalthree",4);
}
goalnum++;
g3=true;
}
);

socket.on("goalfour",function(){
if(goalnum==0){
io.sockets.emit("goalfour",1);
}else if(goalnum==1){
io.sockets.emit("goalfour",2);
}else if(goalnum==2){
io.sockets.emit("goalfour",3);
}else{
io.sockets.emit("goalfour",4);
}
goalnum++;
g4=true;
}
);





socket.on("fdashflag",function(pn){
if(pn==1){
io.sockets.emit("fdashflag",2);
}else{
io.sockets.emit("fdashflag",1);
}

}
);

socket.on("tdashflag",function(){

io.sockets.emit("tdashflag");

}
);

}
);























