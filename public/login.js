var entry_plan = 0;//参加人数管理
var id = null;//IDとなる証明書

/*=====================================================
ログイン関数：
参加宣言をサーバに送り、部屋が作成されていた場合は
参加人数を確認する。
=========================================================*/
function legin(){
    socket.emit("loginstart");
    socket.on("loginstart",function(entry){
        if (!entry){
            entry_plan = window.prompt("参加人数を入力");
            if(entry_plan > 0){
            //サーバに待機命令と参加人数を送信
            socket.emit("set",parseInt(entry_plan));
            }
        }
    });
}

/*=====================================================
ネーミング関数：
idに英数字ランダムで(7桁)名づけを行う。
ユーザに名前を入力してもらいたければここで変更。
ただし同名が発生した際はどのみちid参照の方が有利なので
新規で関数を作るとよい。
=========================================================*/
function naming(){
    if(id==null){
        id = Math.random().toString(32).substring(2);
        socket.emit("this",id);
    }
}