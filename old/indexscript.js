var elements ={
  name: "Jahhid Hossain",
  batch: "IIT-11",
  phone: "01835388072",
  willAttend: "Yes"
};

var participants = [];

if(localStorage.getItem("participants")!=null)
  participants = JSON.parse(localStorage.getItem("participants"));

const handleClick=()=>{


  elements.willAttend = 
  document.getElementById("present").checked==true? "Yes": "No" ;
  elements.name = document.getElementById("Sname").value;
  elements.phone = document.getElementById("Pnumber").value;
  elements.batch = document.querySelector('input[name="batch"]:checked').value;
  
  var re = false;
  Object.keys(elements).forEach(key => {
    if(elements[key]==""){
      alert(key+" cannot be empty");re= true;
      }
  });
  if(re) return;
  participants.push(elements);
  localStorage.setItem("participants",JSON.stringify(participants));
  window.location.href ="tables.html";

}