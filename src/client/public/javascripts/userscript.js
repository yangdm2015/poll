function h5init(){
  var t = this.innerHTML;
  if(t.length>22){
    t=t.slice(0,21)
    t=t+'...'
  }
  this.innerHTML=t;
}
/*window.onload=function(){
var imgtitles = document.getElementsByClassName('imgtitle');
for(let i=0,len=imgtitles.length;i<len;i++){
  var t = imgtitle.childNodes[0].innerHTML;
  if(t.length>22){
    t=t.slice(0,21)
    t=t+'...'
  }
}
}*/
/*var header_search = document.getElementsByClassName('header_search')[0]
  var i = document.getElementsByClassName('header_search')[0].childNodes[0]*/
  /*var menuwrap = document.getElementsByClassName('menuwrap')[0]
  var wid12rem = document.getElementsByClassName('wid12rem')[0]
  var h = document.getElementsByTagName("header")[0]
  wid12rem.innerHTML = getComputedStyle(h).width*/
  /*console.log("getComputedStyle(i).width")
  console.log(getComputedStyle(i).width);*/
