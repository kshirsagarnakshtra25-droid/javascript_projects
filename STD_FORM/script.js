const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTable");
const search = document.getElementById("search");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

// Display students when page loads
displayStudents();

// Submit Form
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const middleName = document.getElementById("middleName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const college = document.getElementById("college").value.trim();
    const course = document.getElementById("course").value;
    const dob = document.getElementById("dob").value;

    const gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    const skills = [];

    document.querySelectorAll(".skills input:checked").forEach((item) => {
        skills.push(item.value);
    });

    const photoInput = document.getElementById("photo");

    // Validation

    // Empty Field Validation

if(firstName==""){
    alert("Please enter First Name.");
    document.getElementById("firstName").focus();
    return;
}

if(lastName==""){
    alert("Please enter Last Name.");
    document.getElementById("lastName").focus();
    return;
}

if(roll==""){
    alert("Please enter Roll Number.");
    document.getElementById("roll").focus();
    return;
}

if(mobile==""){
    alert("Please enter Mobile Number.");
    document.getElementById("mobile").focus();
    return;
}

if(email==""){
    alert("Please enter Email.");
    document.getElementById("email").focus();
    return;
}

if(address==""){
    alert("Please enter Address.");
    document.getElementById("address").focus();
    return;
}

if(pincode==""){
    alert("Please enter Pincode.");
    document.getElementById("pincode").focus();
    return;
}

if(college==""){
    alert("Please enter College Name.");
    document.getElementById("college").focus();
    return;
}

if(course==""){
    alert("Please select a Course.");
    document.getElementById("course").focus();
    return;
}

if(!gender){
    alert("Please select Gender.");
    return;
}
    // Name Validation
if(!/^[A-Za-z ]+$/.test(firstName)){
    alert("First Name should contain only letters.");
    document.getElementById("firstName").focus();
    return;
}

if(!/^[A-Za-z ]+$/.test(lastName)){
    alert("Last Name should contain only letters.");
    document.getElementById("lastName").focus();
    return;
}

// Roll Number Validation
if(!/^[0-9]+$/.test(roll)){
    alert("Roll Number should contain only numbers.");
    document.getElementById("roll").focus();
    return;
}

// Mobile Validation
if(!/^[0-9]{10}$/.test(mobile)){
    alert("Please enter a valid 10-digit Mobile Number.");
    document.getElementById("mobile").focus();
    return;
}

// Pincode Validation
if(!/^[0-9]{6}$/.test(pincode)){
    alert("Please enter a valid 6-digit Pincode.");
    document.getElementById("pincode").focus();
    return;
}

// Email Validation
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email)){
    alert("Please enter a valid Email Address.");
    document.getElementById("email").focus();
    return;
}


    // Read Image

    const reader = new FileReader();

    reader.onload = function () {

        const student = {

            photo: reader.result,

            name:
                firstName +
                " " +
                middleName +
                " " +
                lastName,

            roll,

            mobile,

            email,

            address,

            pincode,

            college,

            course,

            dob,

            gender: gender.value,

            skills: skills.join(", ")

        };

       if (editIndex === -1) {

    // New student
    students.unshift(student);

} else {

    // Remove the old record from its current position
    const updatedStudent = student;

    students.splice(editIndex, 1);

    // Add updated student to the top
    students.unshift(updatedStudent);

    editIndex = -1;
}
        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();

        form.reset();

        alert("Student Registered Successfully!");

    };

    if (photoInput.files.length > 0) {
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        reader.onload();
    }
});

// Display Students

function displayStudents() {

    tableBody.innerHTML = "";

    students.forEach((student, index) => {

        tableBody.innerHTML += `

<tr>

<td>

<img src="${student.photo || "https://via.placeholder.com/60"}"
width="60"
height="60"
style="border-radius:50%;object-fit:cover;">

</td>

<td>${student.name}</td>

<td>${student.roll}</td>

<td>${student.mobile}</td>

<td>${student.email}</td>

<td>${student.course}</td>

<td>${student.gender}</td>

<td>${student.skills}</td>

<td>

<button class="view-btn" onclick="viewStudent(${index})">
<i class="fa-solid fa-eye"></i>
</button>

<button class="edit-btn" onclick="editStudent(${index})">
<i class="fa-solid fa-pen"></i>
</button>

<button class="delete-btn" onclick="deleteStudent(${index})">
<i class="fa-solid fa-trash"></i>
</button>

</td>
</td>

</tr>

`;

    });

}

// Delete Student

function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        students.splice(index, 1);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();

    }

}

// Search

search.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const rows = tableBody.getElementsByTagName("tr");

    Array.from(rows).forEach((row) => {

        row.style.display = row.innerText
            .toLowerCase()
            .includes(value)
            ? ""
            : "none";

    });

});

// Edit Student

function editStudent(index){

    editIndex = index;

    const s = students[index];

    const names = s.name.split(" ");

    document.getElementById("firstName").value = names[0] || "";
    document.getElementById("middleName").value = names[1] || "";
    document.getElementById("lastName").value = names.slice(2).join(" ");

    document.getElementById("roll").value = s.roll;
    document.getElementById("mobile").value = s.mobile;
    document.getElementById("email").value = s.email;
    document.getElementById("address").value = s.address;
    document.getElementById("pincode").value = s.pincode;
    document.getElementById("college").value = s.college;
    document.getElementById("course").value = s.course;
    document.getElementById("dob").value = s.dob;

    document.querySelectorAll('input[name="gender"]').forEach(g=>{
        g.checked = g.value===s.gender;
    });

    document.querySelectorAll(".skills input").forEach(skill=>{
        skill.checked = s.skills.split(", ").includes(skill.value);
    });

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}
function viewStudent(index){

    const s = students[index];

    alert(
`Student Details

Name : ${s.name}

Roll No : ${s.roll}

Mobile : ${s.mobile}

Email : ${s.email}

Address : ${s.address}

Pincode : ${s.pincode}

College : ${s.college}

Course : ${s.course}

Gender : ${s.gender}

Skills : ${s.skills}

Date of Birth : ${s.dob}`
    );

}
function viewStudent(index){

    const s = students[index];

    document.getElementById("viewPhoto").src =
        s.photo || "https://via.placeholder.com/120";

    document.getElementById("viewName").innerText = s.name;
    document.getElementById("viewRoll").innerText = s.roll;
    document.getElementById("viewMobile").innerText = s.mobile;
    document.getElementById("viewEmail").innerText = s.email;
    document.getElementById("viewAddress").innerText = s.address;
    document.getElementById("viewPincode").innerText = s.pincode;
    document.getElementById("viewCollege").innerText = s.college;
    document.getElementById("viewCourse").innerText = s.course;
    document.getElementById("viewGender").innerText = s.gender;
    document.getElementById("viewSkills").innerText = s.skills;
    document.getElementById("viewDob").innerText = s.dob;

    document.getElementById("viewModal").style.display = "block";

}

function closeModal(){

    document.getElementById("viewModal").style.display = "none";

}

window.onclick = function(e){

    if(e.target==document.getElementById("viewModal")){

        closeModal();

    }

}