// Data Storage (empty - you can add your own)
let students = [];
let books = [
    { code: "BIO-3921", title: "Biology for Advanced Level", available: true },
    { code: "ENG-1104", title: "English Literature Anthology", available: true },
];
let borrowings = [];
let directors = []; // For director accounts

let currentUser = null;
let currentLevel = 0; // 0 = O'Level, 1 = A'Level

function switchLoginTab(n) {
    if (n === 0) {
        document.getElementById("student-login-form").classList.remove("hidden");
        document.getElementById("director-login-form").classList.add("hidden");
        document.getElementById("login-tab-0").classList.add("border-b-2", "border-sky-500", "text-sky-400");
        document.getElementById("login-tab-1").classList.remove("border-b-2", "border-sky-500", "text-sky-400");
    } else {
        document.getElementById("student-login-form").classList.add("hidden");
        document.getElementById("director-login-form").classList.remove("hidden");
        document.getElementById("login-tab-1").classList.add("border-b-2", "border-sky-500", "text-sky-400");
        document.getElementById("login-tab-0").classList.remove("border-b-2", "border-sky-500", "text-sky-400");
    }
}

function handleStudentLogin() {
    const id = document.getElementById("login-student-id").value.trim();
    if (id.length !== 12) {
        alert("Student ID must be exactly 12 digits.");
        return;
    }
    const student = students.find(s => s.id === id);
    if (student) {
        currentUser = { role: "student", ...student };
        showMainApp();
        renderStudentDashboard();
    } else {
        alert("Student not found. Please register first.");
    }
}

function registerOrLoginDirector() {
    const name = document.getElementById("director-name").value.trim();
    const email = document.getElementById("director-email").value.trim();
    const phone = document.getElementById("director-phone").value.trim();
    const password = document.getElementById("director-password").value.trim();

    if (!name || !email || !phone || !password) {
        alert("Please fill all fields.");
        return;
    }

    // Simulate phone verification and code
    if (phone.startsWith("+250") && phone.length > 10) {
        alert(`Special verification code sent to ${phone}. Use code: DIR-2026`);
        const code = prompt("Enter the code received on your phone:");
        if (code === "DIR-2026") {
            directors.push({ name, email, phone, password });
            currentUser = { role: "director", name };
            showMainApp();
            renderDirectorDashboard();
        } else {
            alert("Invalid code.");
        }
    } else {
        alert("Phone number must start with +250 and be valid.");
    }
}

function showRegisterModal() {
    document.getElementById("register-modal").classList.remove("hidden");
    selectLevel(0); // Default to O'Level
}

function hideRegisterModal() {
    document.getElementById("register-modal").classList.add("hidden");
}

function selectLevel(level) {
    currentLevel = level;
    document.getElementById("level-o").classList.toggle("border-sky-500", level === 0);
    document.getElementById("level-a").classList.toggle("border-sky-500", level === 1);
    
    document.getElementById("olevel-fields").classList.toggle("hidden", level !== 0);
    document.getElementById("alevel-fields").classList.toggle("hidden", level !== 1);
}

function registerStudent() {
    const name = document.getElementById("reg-name").value.trim();
    const id = document.getElementById("reg-id").value.trim();
    
    if (!name || !id || id.length !== 12) {
        alert("Please provide valid name and 12-digit ID.");
        return;
    }
    
    let studentClass = "";
    let combo = "";
    
    if (currentLevel === 0) { // O'Level
        studentClass = document.getElementById("reg-olevel-class").value.trim();
        combo = "O'Level";
    } else { // A'Level
        studentClass = document.getElementById("reg-alevel-class").value.trim();
        combo = document.getElementById("reg-combination").value.trim();
    }
    
    if (!studentClass) {
        alert("Please fill class information.");
        return;
    }
    
    // Check if ID exists
    if (students.find(s => s.id === id)) {
        alert("Student ID already exists.");
        return;
    }
    
    students.push({
        id: id,
        name: name,
        class: studentClass,
        combo: combo,
        borrowed: []
    });
    
    alert("Account created successfully! You can now login with your Student ID.");
    hideRegisterModal();
}

function showMainApp() {
    document.getElementById("login-page").classList.add("hidden");
    document.getElementById("main-app").classList.remove("hidden");
    
    // Auto render for director
    if (currentUser && currentUser.role === "director") {
        renderDirectorDashboard();
    }
}

function logout() {
    if (confirm("Logout?")) {
        location.reload();
    }
}

function switchDirectorTab(n) {
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        if (i === n) {
            btn.classList.add("border-b-2", "border-sky-500", "text-sky-400");
        } else {
            btn.classList.remove("border-b-2", "border-sky-500", "text-sky-400");
        }
    });
    
    document.getElementById("section-students").classList.add("hidden");
    document.getElementById("section-books").classList.add("hidden");
    document.getElementById("section-borrowing").classList.add("hidden");
    document.getElementById("section-overdue").classList.add("hidden");
    
    if (n === 0) document.getElementById("section-students").classList.remove("hidden");
    if (n === 1) {
        document.getElementById("section-books").classList.remove("hidden");
        renderBooksTable();
    }
    if (n === 2) {
        document.getElementById("section-borrowing").classList.remove("hidden");
        renderBorrowingRecords();
    }
    if (n === 3) {
        document.getElementById("section-overdue").classList.remove("hidden");
        renderOverdue();
    }
}

function renderDirectorDashboard() {
    document.getElementById("stat-students").textContent = students.length;
    document.getElementById("stat-books").textContent = books.length;
    document.getElementById("stat-borrowed").textContent = borrowings.length;
    document.getElementById("stat-overdue").textContent = "0";
    
    const container = document.getElementById("section-students");
    if (students.length === 0) {
        container.innerHTML = `<p class="col-span-3 text-center text-slate-400 py-12">No students yet. Register some students to get started.</p>`;
        return;
    }
    
    container.innerHTML = students.map(student => `
        <div class="bg-slate-800 rounded-3xl p-6 card-hover border border-slate-700">
            <div class="flex justify-between items-start">
                <div>
                    <p class="font-semibold">${student.name}</p>
                    <p class="text-xs text-slate-400 font-mono">${student.id}</p>
                    <p class="text-sm mt-3">${student.class} • ${student.combo}</p>
                </div>
                <div class="text-right">
                    <span class="inline-block px-3 py-1 text-xs rounded-full ${student.borrowed.length > 0 ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}">
                        ${student.borrowed.length} books
                    </span>
                </div>
            </div>
        </div>
    `).join("");
    
    switchDirectorTab(0);
}

function renderBooksTable() {
    const tbody = document.getElementById("books-table-body");
    tbody.innerHTML = books.map(book => `
        <tr class="hover:bg-slate-700/50">
            <td class="py-5 px-8 font-mono text-sky-300">${book.code}</td>
            <td class="py-5 px-8">${book.title}</td>
            <td class="py-5 px-8">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs ${book.available ? 'bg-emerald-400/10 text-emerald-400' : 'bg-rose-400/10 text-rose-400'}">
                    ${book.available ? 'Available' : 'Borrowed'}
                </span>
            </td>
            <td class="py-5 px-8 text-right">
                <button onclick="toggleBookAvailability('${book.code}')" 
                        class="text-xs px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl">
                    Toggle
                </button>
            </td>
        </tr>
    `).join("");
}

function toggleBookAvailability(code) {
    const book = books.find(b => b.code === code);
    if (book) {
        book.available = !book.available;
        renderBooksTable();
    }
}

function renderBorrowingRecords() {
    const container = document.getElementById("borrowing-list");
    container.innerHTML = borrowings.map(b => {
        const student = students.find(s => s.id === b.studentId);
        const book = books.find(bo => bo.code === b.bookCode);
        return `
            <div class="bg-slate-800 rounded-3xl p-6 flex items-center justify-between">
                <div>
                    <p class="font-medium">${student ? student.name : b.studentId}</p>
                    <p class="text-sm text-slate-400">${book ? book.title : b.bookCode}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs text-slate-400">Borrowed ${b.date}</p>
                    <span class="text-amber-400 text-sm">Not returned</span>
                </div>
            </div>
        `;
    }).join("");
}

function renderOverdue() {
    const container = document.getElementById("overdue-list");
    container.innerHTML = `
        <div class="bg-red-900/20 border border-red-500/30 rounded-3xl p-8">
            <p class="text-red-400">9 books are overdue (demo data). Contact students for returns.</p>
        </div>
    `;
}

function renderStudentDashboard() {
    document.getElementById("director-dashboard").classList.add("hidden");
    document.getElementById("student-dashboard").classList.remove("hidden");
    
    document.getElementById("student-name").textContent = currentUser.name;
    document.getElementById("student-id").textContent = currentUser.id;
    document.getElementById("student-class").textContent = `${currentUser.class} • ${currentUser.combo}`;
    
    const borrowedContainer = document.getElementById("student-borrowed-books");
    
    if (currentUser.borrowed && currentUser.borrowed.length > 0) {
        borrowedContainer.innerHTML = currentUser.borrowed.map(code => {
            const book = books.find(b => b.code === code);
            return `
                <div class="bg-slate-900 rounded-2xl p-5 flex items-center gap-4">
                    <div class="text-3xl">📕</div>
                    <div>
                        <p class="font-medium">${book ? book.title : code}</p>
                        <p class="font-mono text-xs text-slate-400">${code}</p>
                    </div>
                </div>
            `;
        }).join("");
    } else {
        borrowedContainer.innerHTML = `<p class="text-slate-400 italic">You haven't borrowed any books yet.</p>`;
    }
}

function showAddBookModal() {
    document.getElementById("add-book-modal").classList.remove("hidden");
}

function hideAddBookModal() {
    document.getElementById("add-book-modal").classList.add("hidden");
}

function addNewBook() {
    const title = document.getElementById("new-book-title").value;
    const code = document.getElementById("new-book-code").value;
    
    if (title && code) {
        books.push({ code, title, available: true });
        hideAddBookModal();
        renderBooksTable();
        alert("Book added successfully!");
    }
}

function returnBookPrompt() {
    alert("Return request would be sent to Director in a real system.");
}

// Keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        document.querySelectorAll('.fixed').forEach(modal => {
            modal.classList.add('hidden');
        });
    }
});

// Initialize login tab on load
window.onload = function() {
    switchLoginTab(0);
};
