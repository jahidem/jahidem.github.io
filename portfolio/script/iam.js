/// Changing I am's
const chng_txt = document.getElementById("chng-txt");


const i_ams = ["Programmer.","Student.",
                "UI/UX designer."];
var txt_num = 0;
var timer1;
setInterval(()=>{
    var show_txt = i_ams[txt_num];
    chng_txt.textContent ="";
    var char_no = 0;
    setInterval(
    onTick=()=>{
        if(char_no==show_txt.length){
            complete();
            return;}
        chng_txt.textContent+=show_txt[char_no];
        char_no = char_no+1;
    },100);
    var complete=()=>{
        clearInterval(timer1);
    }


    txt_num = (txt_num+1)%i_ams.length;
},2500);


//Blinking cursor

var blink = document.getElementById("blink-cursor");
var boo = 0;
setInterval(()=>{
    blink.style.opacity = boo;
    boo = (boo+1)%2;
},800)