const btnchenge = document.querySelector(".chenge-color-btn")
const cv = document.querySelector(".cv")
const footer = document.querySelector(".footer")
const rightPart = document.querySelector(".right_part-cv")
const leftPart = document.querySelector(".left_part-cv")
const headerPhoto = document.querySelector(".headerPic")

const accordeons = document.querySelectorAll(".accordion")


const form = document.getElementById("SingUpForm");
const errorms = document.getElementById("error");



let isRed = false

btnchenge.addEventListener("click", () => {
    console.log("btn clicked");
    
    // if(!isRed){
    //     cv.classList.add("red-cv")
    //     footer.classList.add("content_red")
    //     rightPart.classList.add("content_red")
    //     leftPart.classList.add("content_red")
    //     btnchenge.classList.add("content_red")
    //     headerPhoto.src = "picture/header_pic-red.png"    // red image
        
    // }else{
    //     cv.classList.remove("red-cv")
    //     footer.classList.remove("content_red")
    //     rightPart.classList.remove("content_red")
    //     leftPart.classList.remove("content_red")
    //     btnchenge.classList.remove("content_red")
    //     headerPhoto.src = "picture/header_pic-grean.png"    // red image

    //     // btnchenge.style.setProperty("--hover-color","red")
    // }
    // isRed = !isRed


    cv.classList.toggle("red-cv")
        footer.classList.toggle("content_red")
        rightPart.classList.toggle("content_red")
        leftPart.classList.toggle("content_red")
        btnchenge.classList.toggle("content_red")
    if(!isRed){
        headerPhoto.src = "picture/header_pic-red.png"    // red image
        
    }else{
        headerPhoto.src = "picture/header_pic-grean.png"    // red image

        // btnchenge.style.setProperty("--hover-color","red")
    }
    isRed = !isRed

  
});

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


    form.addEventListener('submit', function(e) {
    e.preventDefault();

    errorms.innerText = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const lastName = document.getElementById("LastName").value.trim();

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

    alert("Success! Form submitted.");
    form.reset(); 
});
