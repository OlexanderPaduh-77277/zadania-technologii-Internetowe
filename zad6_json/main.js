const btnchenge = document.querySelector(".mid-red")
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

if (form) {
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
}


   


fetch('data.json')
  .then(response => {
    if (!response.ok) throw new Error('Błąd ładowania danych');
    return response.json();
  })
  .then(data => {
    renderSkills(data.skills);
    renderProjects(data.projects);
  })
  .catch(err => console.error('Błąd fetch():', err));

function renderSkills(skills) {
  const container = document.querySelector('.skills_card');
  if (!container) return;

  container.innerHTML = ''; 

  skills.forEach(skill => {
    const skillEl = document.createElement('div');
    skillEl.classList.add('skill');

    const nameEl = document.createElement('p');
    nameEl.classList.add('skill-name');
    nameEl.textContent = skill.name + ':';

    const dotsEl = document.createElement('div');
    dotsEl.classList.add('dots');

    for (let i = 1; i <= 5; i++) {
      const dot = document.createElement('span');
      dot.classList.add('skills_dot');
      if (i <= skill.level) dot.classList.add('filled');
      dotsEl.appendChild(dot);
    }

    skillEl.appendChild(nameEl);
    skillEl.appendChild(dotsEl);
    container.appendChild(skillEl);
  });
}

function renderProjects(projects) {
  const list = document.querySelector('.projects-list');
  if (!list) return;

  list.innerHTML = ''; 

  projects.forEach(project => {
    const li = document.createElement('li');
    li.classList.add('project-item');

    const title = document.createElement('h3');
    title.classList.add('project-title');
    title.textContent = project.title;

    const desc = document.createElement('p');
    desc.classList.add('description');
    desc.textContent = project.description;

    li.appendChild(title);
    li.appendChild(desc);
    list.appendChild(li);
  });
}
