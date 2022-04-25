const float_btn = document.getElementById("float-btn");
const nav = document.getElementById("nav-contain");

var timer;
float_btn.addEventListener("click",()=>{
    
    
    float_btn.classList.add("float-btn-hide");
    nav.classList.add("nav-appear");
    timer = setTimeout(wanna_show_nav, 4000);
    
  //  document.querySelector(".container").style.filter = "blur(2px)";
});

var wanna_show_nav = () =>{
  nav.classList.remove("nav-appear");
  float_btn.classList.remove("float-btn-hide");
  complete();
}

const complete = () =>{
  clearInterval(timer);
  timer=null;
}

nav.addEventListener("click",()=>{
  complete();
  timer = setTimeout(wanna_show_nav, 4000);
});