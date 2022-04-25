const float_btn = document.getElementById("float-btn");
const nav = document.getElementById("nav-contain");

float_btn.addEventListener("click",()=>{
    
    nav.style.opacity =1;
    float_btn.style.opacity = 0;
    
    
  //  document.querySelector(".container").style.filter = "blur(2px)";
});

nav.addEventListener("click",()=>{
    var box = document.querySelector('body');
    var width = box.offsetWidth;

    if(width<901){
    nav.style.opacity = 0;
    float_btn.style.opacity = 1;}
});