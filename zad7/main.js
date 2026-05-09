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
    console.log(response)
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
document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem('skills')) {
        // Jeśli localStorage jest pusty, spróbuj pobrać dane z JSON (opcjonalnie)
        fetch('data.json')
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('skills', JSON.stringify(data.skills));
                localStorage.setItem('projects', JSON.stringify(data.projects));
                renderAll();
            }).catch(() => {
                // Jeśli pliku nie ma, ustaw puste tablice
                localStorage.setItem('skills', JSON.stringify([]));
                localStorage.setItem('projects', JSON.stringify([]));
            });
    } else {
        renderAll();
    }
});

function renderAll() {
    const skills = JSON.parse(localStorage.getItem('skills')) || [];
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    renderSkills(skills);
    renderProjects(projects);
}

// Funkcja dodawania umiejętności
function addSkill() {
    const name = document.getElementById('skillName').value;
    const level = parseInt(document.getElementById('skillLevel').value);

    if (name) {
        const skills = JSON.parse(localStorage.getItem('skills')) || [];
        skills.push({ name, level });
        localStorage.setItem('skills', JSON.stringify(skills));
        renderAll();
        document.getElementById('skillName').value = ''; // wyczyść pole
    }
}

// Funkcja dodawania projektu
function addProject() {
    const title = document.getElementById('projTitle').value;
    const description = document.getElementById('projDesc').value;

    if (title && description) {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.push({ title, description });
        localStorage.setItem('projects', JSON.stringify(projects));
        renderAll();
        document.getElementById('projTitle').value = '';
        document.getElementById('projDesc').value = '';
    }
}

// Funkcja usuwania (punkt 4 zadania)
function deleteItem(index, type) {
    const data = JSON.parse(localStorage.getItem(type));
    data.splice(index, 1);
    localStorage.setItem(type, JSON.stringify(data));
    renderAll();
}

// Zaktualizowane funkcje renderujące (z przyciskiem "usuń")
function renderSkills(skills) {
    const container = document.querySelector('.skills_card');
    if (!container) return;
    container.innerHTML = '';

    skills.forEach((skill, index) => {
        const skillEl = document.createElement('div');
        skillEl.className = 'skill';
        skillEl.innerHTML = `
            <p class="skill-name">${skill.name}:</p>
            <div class="dots">${"★".repeat(skill.level)}${"☆".repeat(5-skill.level)}</div>
            <button class="btn-delete" onclick="deleteItem(${index}, 'skills')">x</button>
        `;
        container.appendChild(skillEl);
    });
}

function renderProjects(projects) {
    const list = document.querySelector('.projects-list');
    if (!list) return;
    list.innerHTML = '';

    projects.forEach((project, index) => {
        const li = document.createElement('li');
        li.className = 'project-item';
        li.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <button class="btn-delete" onclick="deleteItem(${index}, 'projects')">Usuń projekt</button>
        `;
        list.appendChild(li);
    });
}