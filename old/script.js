var participants = [];

if(localStorage.getItem("participants")!=null)
  participants = JSON.parse( localStorage.getItem("participants"));



const table = document.getElementById("table");
const addRow = (element) =>{
  var row = table.insertRow();
  var name = row.insertCell();
  var batch = row.insertCell();
  var phone = row.insertCell();
  var willAttend = row.insertCell();

  name.innerHTML = element.name;
  batch.innerHTML = element.batch;
  phone.innerHTML = element.phone;
  willAttend.innerHTML = element.willAttend;
}

participants.forEach(element =>
   addRow(element));



const handleClear=()=>{
  localStorage.removeItem("participants");
  window.location.href ="tables.html";
}