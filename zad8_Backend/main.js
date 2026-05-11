import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";





const firebaseConfig = {

  apiKey: "AIzaSyD4eSJTTHVR7OJWIG2u-xLDY8fVjMHht4o",

  authDomain: "zad8-a0c98.firebaseapp.com",

  projectId: "zad8-a0c98",

  storageBucket: "zad8-a0c98.firebasestorage.app",

  messagingSenderId: "583634274133",

  appId: "1:583634274133:web:b51b34a364ec0b632f51dc",

  measurementId: "G-71BJ8EBJV8"

};



const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



const btnchenge = document.querySelector(".mid-red")

const cv = document.querySelector(".cv")

const footer = document.querySelector(".footer")

const rightPart = document.querySelector(".right_part-cv")

const leftPart = document.querySelector(".left_part-cv")

const headerPhoto = document.querySelector(".headerPic")



const accordeons = document.querySelectorAll(".accordion")







const form = document.getElementById("SingUpForm");

const errorms = document.getElementById("error");





accordeons.forEach(function(item){

    item.addEventListener('click', showContent)

})



function showContent(isActive){

        console.log("acc clicked")



        accordeons.forEach(function(other){

            if(other !== this){

                other.nextElementSibling.style.maxHeight = null

                other.classList.remove("active")

            }



        }, this)

        const content = this.nextElementSibling

        this.classList.toggle("active")

       

        if(content.style.maxHeight){

            content.style.maxHeight = null

        }else{

            content.style.maxHeight = content.scrollHeight + "px"

        }

       



    }

form.addEventListener('submit', async function(e) {

    e.preventDefault();



    errorms.innerText = "";



    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const lastName = document.getElementById("LastName").value.trim();

    const message = document.getElementById("message")?.value.trim() || "";



    if (name.length < 3) {

        errorms.innerText = "Name must be at least 3 characters";

        return;

    }



    if (lastName.length === 0) {

        errorms.innerText = "Last name is required";

        return;

    }



    if (!email.includes("@") || !email.includes(".")) {

        errorms.innerText = "Email is not valid";

        return;

    }



    try {

        await addDoc(collection(db, "messages"), {

            firstname: name,

            lastname: lastName,

            email: email,

            message: message,

            date: new Date().toISOString()

        });



        alert("Wiadomość wysłana!");

        form.reset();



    } catch (error) {

        console.error(error);

        alert("Coś poszło nie tak!");

    }

});


form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Debug: check which elements are null
    console.log("name el:", document.getElementById("name"));
    console.log("email el:", document.getElementById("email"));
    console.log("LastName el:", document.getElementById("LastName"));
    console.log("message el:", document.getElementById("message"));})

