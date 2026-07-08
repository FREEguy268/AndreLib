// Data Storage
let students = [];
let books = [
    { code: "BIO-3921", title: "Biology for Advanced Level", available: true },
    { code: "ENG-1104", title: "English Literature Anthology", available: true }
];
let borrowings = [];
let currentUser = null;
let currentLevel = 0;

// Login Tab Switch
function switchLoginTab(n) {
    if (n === 0) {
        document.getElementById("student-login-form").classList.remove("hidden");
        document.getElementById("director-login-form").classList.add("hidden");
    } else {
        document.getElementById("student-login-form").classList.add("hidden");
        document.getElementById("director-login-form").classList.remove("hidden");
    }
}

// Student Login
function handleStudentLogin() {
    const id = document.getElementById("login-student-id").value.trim();
    if (id.length !== 12) {
        alert("Student ID must be 12 digits.");
        return;
    }
    const student = students.find(s => s.id === id);
    if (student) {
        currentUser = { role: "student", ...student };
        showMainApp();
    } else {
        alert("Student not found. Register first.");
    }
}

// Director Login
function registerOrLoginDirector() {
    const name = document.getElementById("director-name").value.trim();
    const phone = document.getElementById("director-phone").value.trim();
    if (!name || !phone) {
        alert("Name and phone are required.");
        return;
    }
    if (confirm("Use code DIR-2026")) {
        currentUser = { role: "director", name: name };
        showMainApp();
    }
}

// Show Main App
function showMainApp() {
    document.getElementById("login-page").classList.add("hidden");
    document.getElementById("main-app").classList.remove("hidden");
    
    if (currentUser.role === "director") {
        renderDirectorDashboard();
    } else {
        renderStudentDashboard();
    }
}

function renderDirectorDashboard() {
    document.getElementById("director-dashboard").classList.remove("hidden");
    // Add your full dashboard rendering code here
    console.log("Director dashboard loaded");
}

function renderStudentDashboard() {
    document.getElementById("student-dashboard").classList.remove("hidden");
    console.log("Student dashboard loaded");
}

// Other functions (registerStudent, etc.)...
function showRegisterModal() {
    alert("Registration modal would open here - implement as needed.");
}

function logout() {
    location.reload();
}

// Initialize
window.onload = function() {
    switchLoginTab(0);
    console.log("%cAdreLib loaded successfully", "color: #0ea5e9");
};