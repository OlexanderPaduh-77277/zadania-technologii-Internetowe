const form = document.getElementById("SingUpForm");
const errorms = document.getElementById("error");

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