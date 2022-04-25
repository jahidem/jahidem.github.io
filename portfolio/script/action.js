const float_btn = document.getElementById("float-btn");
const nav = document.getElementById("nav-contain");

float_btn.addEventListener("click",()=>{
    
    nav.classList.add("nav-appear");
    float_btn.classList.add("float-btn-hide");
    
    
  //  document.querySelector(".container").style.filter = "blur(2px)";
});

nav.addEventListener("click",()=>{
    var box = document.querySelector('body');
    var width = box.offsetWidth;

    if(width<901){
      nav.classList.remove("nav-appear");
      float_btn.classList.remove("float-btn-hide");}
});