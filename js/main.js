var contactName = document.getElementById("contactName");
var contactAge = document.getElementById("contactAge");
var contactPhone = document.getElementById("contactPhone");
var inputs = document.getElementsByClassName("form-control");
var searchInput = document.getElementById("search");
var submitBtn = document.getElementById("submitBtn");
var nameAlert = document.getElementById("nameAlert");
var ageAlert = document.getElementById("ageAlert");
var phoneAlert = document.getElementById("phoneAlert");
var contacts = [];
var currentIndex = 0;
/********************************************************/
if (JSON.parse(localStorage.getItem("contactsList") != null)) {
  contacts = JSON.parse(localStorage.getItem("contactsList"));
  displayData();
}
/********************************************************/
submitBtn.onclick = function () {
  if (submitBtn.innerHTML == "Add Contact") {
    addContact();
  } else {
    updateContact();
  }
  displayData();
  clearForm();
};
/*************        Adding Data        *****************/
function addContact() {
  if(contactName.onkeyup() == true && contactAge.onkeyup() == true && contactPhone.onkeyup() == true){
    var contact = {
      name: contactName.value,
      age: contactAge.value,
      phone: contactPhone.value,
    };
    contacts.push(contact);
    localStorage.setItem("contactsList", JSON.stringify(contacts));
  } 
}
/***************    Display Data      *****************/
function displayData() {
  var cartona = "";
  for (var i = 0; i < contacts.length; i++) {
    cartona += `<tr>
                    <td>${i + 1}</td>
                    <td>${contacts[i].name}</td>
                    <td>${contacts[i].age}</td>
                    <td>${contacts[i].phone}</td>
                    <td><button onclick="deleteContact(${i})" class="btn btn-warning">Delete</button></td>
                    <td><button onclick="getContactInfo(${i})" class="btn btn-danger">Update</button></td>
                </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
/************      Clear Data       ********************/
function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    inputs[i].classList.remove("is-valid");
  }
}
/*************  Delete Contact    *******************/
function deleteContact(index) {
  contacts.splice(index, 1);
  displayData();
  localStorage.setItem("contactsList", JSON.stringify(contacts));
}
/************    Update Contact    ******************/
function getContactInfo(index) {
  contactName.value = contacts[index].name;
  contactAge.value = contacts[index].age;
  contactPhone.value = contacts[index].phone;
  submitBtn.innerHTML = "Update Contact";
  currentIndex = index;
}
function updateContact() {
  var contact = {
    name: contactName.value,
    age: contactAge.value,
    phone: contactPhone.value,
  };
  contacts[currentIndex] = contact;
  localStorage.setItem("contactsList", JSON.stringify(contacts));
  submitBtn.innerHTML = "Add Contact";
}
/***********      Search Function       *****************/
searchInput.onkeyup = function () {
  var cartona = "";
  var val = searchInput.value;
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].name.toLowerCase().includes(val.toLowerCase())) {
      cartona += `<tr>
                        <td>${i + 1}</td>
                        <td>${contacts[i].name}</td>
                        <td>${contacts[i].age}</td>
                        <td>${contacts[i].phone}</td>
                        <td><button onclick="deleteContact(${i})" class="btn btn-warning">Delete</button></td>
                        <td><button onclick="getContactInfo(${i})" class="btn btn-danger">Update</button></td>
                    </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;
};
/*****************    Validation    *****************/
/*****  Contact Name Validation   *****/
contactName.onkeyup = function () {
  var nameRejex = /^[(A-Z )|(a-z )]{2,15}$/;
  if (!nameRejex.test(contactName.value)) {
    submitBtn.disabled = "true";
    contactName.classList.add("is-invalid");
    contactName.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
    return false;
  } else {
    submitBtn.removeAttribute("disabled");
    contactName.classList.add("is-valid");
    contactName.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    return true;
  }
};
/*****  Contact Age Validation   *****/
contactAge.onkeyup = function () {
  var ageRejex = /^([1-7][0-9]|80)$/;
  if (!ageRejex.test(contactAge.value)) {
    submitBtn.disabled = "true";
    contactAge.classList.add("is-invalid");
    contactAge.classList.remove("is-valid");
    ageAlert.classList.remove("d-none");
    return false;
  } else {
    submitBtn.removeAttribute("disabled");
    contactAge.classList.add("is-valid");
    contactAge.classList.remove("is-invalid");
    ageAlert.classList.add("d-none");
    return true;
  }
};
/*****  Contact Phone Validation   *****/
contactPhone.onkeyup = function () {
  var phoneRejex = /^01[0125][0-9]{8}$/;
  if (!phoneRejex.test(contactPhone.value)) {
    submitBtn.disabled = "true";
    contactPhone.classList.add("is-invalid");
    contactPhone.classList.remove("is-valid");
    phoneAlert.classList.remove("d-none");
    return false;
  } else {
    submitBtn.removeAttribute("disabled");
    contactPhone.classList.add("is-valid");
    contactPhone.classList.remove("is-invalid");
    phoneAlert.classList.add("d-none");
    return true;
  }
};
/*****************************          Best wishes         ****************************/