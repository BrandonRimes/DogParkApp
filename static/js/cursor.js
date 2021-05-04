window.addEventListener("mousemove",function(e){
    document.getElementById("cursor").style.left = e.pageX + 'px';
    document.getElementById("cursor").style.top = e.pageY + 'px';
})