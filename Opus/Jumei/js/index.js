window.onload = function(){
    var cancel = document.getElementById('cancel');
    var header = document.getElementsByTagName('header')[0];
    var result = 0;
    result = sessionStorage.getItem('key') === null ? 0:sessionStorage.getItem('key');

    //点击关闭按钮
    if(result == 1){
        header.style.display = 'none';
    }else{
        header.style.display = 'block';
    }

    //点击时增加一条记录
    cancel.onclick = function(){
        sessionStorage.setItem('key', 1);
        header.style.display = 'none';
        result = 1;
    };
};