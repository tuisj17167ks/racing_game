//以下の変数をlogin.jsで使う変数名にするとことごとく不動作
var entry = 0;//entry_numの役割
var entry_list = 1;//entry_planの役割

/*==============================================
initial(初期)関数：
サーバと"weitstart"を確認しあうと現人数と予定人数
を確認。予定人数に現人数が届くとsend関数を行う。
setinterbalで呼びまくっている。
===============================================*/
function initial(){
    if(entry <= entry_list-1){
        socket.emit("weitstart");
        socket.on("weitstart",function (entry_plan,entry_num){
            entry = entry_num;
            entry_list = entry_plan;
            document.getElementById("entry_plan").innerHTML = entry_num+"/"+entry_plan;
        });
    }
    else{
        onLoad=setTimeout("send()",0);
    }
}

/*==============================================
send(送信)関数：
get送信するformに登録されているURL先にid値渡す処理
===============================================*/
function send(){
    // 値を設定
    document.send.name.value = id;
    document.send.submit();
}



/*===================<超えられない理想>===============================
ほんとはこのように変数を無駄に作らず、ユーザがログインするたびに
サーバから現在人数を一斉に送信し、条件以上になったらsendで遷移にしたかった。
socket.ioの準備をこっちに入れる手順が必要なうえ、処理速度的にぐちゃぐちゃ
になるため結局やらなかったものの、アイデア的にはこっちのほうがいい。

function initial(){
    socket.emit("weitstart");
    socket.on("weitstart",function (plan,join){
        entry_plan = plan;
        join_num = join;
    });
}

socket.on("joinadd",function (join){
    document.getElementById("entry_plan").innerHTML = join+"/"+entry_plan;
    if(join>=entry_plan){
        onLoad=setTimeout("send()",0);
    }
});


function send(){
    // 値を設定
    document.send.name.value = id;
    document.send.submit();
}
======================================================================*/