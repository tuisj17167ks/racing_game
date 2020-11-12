var socket =io.connect();

var canvas=document.getElementById('view');//canvasAPI使うためのやつ。絵が使えるも
var ctx=canvas.getContext('2d');

var list = [];//idのみをまとめたリスト
var player_list = [];//ユーザの座標などが格納されている
var counter = 0;
var fastcount = 3;
var my_num = 0;
var interBotton = null;

var side = 700;
var hight = 500;
//setIntervalを格納しておく変数
/*=============================================
操作キャラインスタンス
x座標、y座標、x座標の移動量、y座標の移動量が生成

var hoge = new player(0,0,0);
===============================================*/
var player = function(id,x, y) {
  this.id = id;
  this.x = x;
  this.y = y;
};

/*==============================================
initial(初期)関数：
サーバからid情報と現在の座標を受け取り初期状態にする
===============================================*/
function initial(){
  socket.emit("start");
  socket.on("confirm",function confirm(player_list){
    list = player_list;
  });
  player_list = new Array(list.length);
}

/*===============================================
loft関数：
listからもとにユーザの人数分コンストラクタを生成
===============================================*/
function loft(){
  if(counter<1){
    for(var i = 0;i<list.length;i++){
      player_list[i] = new player(list[i],0,0);
    }
  counter++;
  Set_up();
  }
}
/*===============================================
Set_up関数：
GET値から自身のidを取得する。
my_numをその情報から入力
===============================================*/
function Set_up(){
  var params = (new URL(document.location)).searchParams;
  for(var prm of params){
    my_num = list.indexOf(String(prm[1]));
  }
}

/*===============================================
art関数：
描写用関数：
===============================================*/
function art(x,y,id){
  ctx.clearRect(0, 0, side, hight);
  for(var i = 0;i<player_list.length;i++){
    ctx.strokeStyle="#0000FF";//線の色を青に指定
    ctx.beginPath();
    ctx.arc( player_list[i].x,player_list[i].y,40, 0, Math.PI*2, false);
    ctx.stroke();
    
    //文字
    ctx.font = "12px serif";
    ctx.fillStyle="black";
    ctx.fillText(player_list[i].id,player_list[i].x,player_list[i].y);

  }
}

/*===============================================
click_button関数：
移動用関数
===============================================*/
function click_button_up(){
  interBotton = setInterval(function(){
    if(player_list[my_num].y>0){
      player_list[my_num].y-=1;
      art();
      riport();
    }
  });
}

function click_button_down(){
  interBotton = setInterval(function(){
    if(player_list[my_num].y<hight){
      player_list[my_num].y+=1;
      art();
      riport();
      }
  });
}
function click_button_left(){
  interBotton = setInterval(function(){
    if(player_list[my_num].x>0){
      player_list[my_num].x-=1;
      art();
      riport();
      }
  });
}
function click_button_right(){
  interBotton = setInterval(function(){
    if(player_list[my_num].x<side){
      player_list[my_num].x+=1;
      art();
      riport();
      }
  });
}


/*===============================================
setIntervalを格納しておく変数を空にする関数
===============================================*/
function unlook(){
  clearInterval(interBotton);
}

/*===============================================
riport関数：
サーバに自身の現在地を報告する関数
===============================================*/
function riport(){
  socket.emit("move",player_list[my_num].x,player_list[my_num].y,player_list[my_num].id)
}

/*===============================================
socket.on("change"：
他人の座標が更新され次第受信する関数
===============================================*/
socket.on("change",function(data){
  player_list=data;
  art();
});

/**
 * 初期のカウントダウンを簡易的に定義したもの
 * サーバ再度からの同期派内ので性格に周囲と時間があっている
 * わけではない
 */

function title(){
  var fast_time = 3;
  var count = setInterval(function(){
      if(fast_time>=0){
      document.getElementById("up").style.visibility = "hidden";
      document.getElementById("down").style.visibility = "hidden";
      document.getElementById("left").style.visibility = "hidden";
      document.getElementById("right").style.visibility = "hidden";
      ctx.clearRect(0, 0, side, hight);
      ctx.font = "48px serif";
      ctx.fillText(fast_time,side/3,hight/3);
      fast_time--;
      }
      else{
          document.getElementById("up").style.visibility = "visible";
          document.getElementById("down").style.visibility = "visible";
          document.getElementById("left").style.visibility = "visible";
          document.getElementById("right").style.visibility = "visible";
          clearInterval(count);
      }
  },1000);

  /**txt型ファイルに保存する方法
   * ver textの内容が保存される
   */
  function record(){
    var text = "'" ;
    var blob = new Blob([text], { "type": "text/plain" });

    //IEの場合
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, "outFileFromWindows.txt");
      //IE以外の場合
    } else {
      document.getElementById("createFile").href = window.URL.createObjectURL(blob);
    }

  }
}