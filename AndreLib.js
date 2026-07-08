// Data
let students = [];
let books = [
    { code: "BIO-3921", title: "Biology for Advanced Level", available: true },
    { code: "ENG-1104", title: "English Literature Anthology", available: true },
    { code: "MAT-7845", title: "Pure Mathematics", available: true }
];
let borrowings = [];
let currentUser = null;
let currentLevel = 0;

// ... (keep all previous functions: switchLoginTab, handleStudentLogin, registerOrLoginDirector, showMainApp, etc.)

// Render Director Dashboard with Borrowing
function renderDirectorDashboard() {
    document.getElementById("director-dashboard").classList.remove("hidden");
    document.getElementById("student-dashboard").classList.add("hidden");
    
    // Render books with borrow buttons
    let html = `<h2 class="text-2xl font-bold mb-6">Available Books</h2>`;
    html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
    books.forEach(book => {
        html += `
            <div class="bg-slate-800 p-6 rounded-3xl">
                <p class="font-mono text-sky-400">${book.code}</p>
                <p class="text-lg font-medium">${book.title}</p>
                <span class="${book.available ? 'text-emerald-400' : 'text-red-400'}">
                    ${book.available ? 'Available' : 'Borrowed'}
                </span>
            </div>`;
    });
    html += `</div>`;
    document.getElementById("director-content").innerHTML = html;
}

// Student Dashboard with Borrow Option
function renderStudentDashboard() {
    document.getElementById("student-dashboard").classList.remove("hidden");
    document.getElementById("director-dashboard").classList.add("hidden");
    
    let html = `<h3 class="text-xl mb-4">Available Books to Borrow</h3>`;
    books.forEach(book => {
        if (book.available) {
            html += `
                <div class="bg-slate-800 p-5 rounded-2xl mb-4 flex justify-between items-center">
                    <div>
                        <p>${book.title}</p>
                        <p class="text-xs text-slate-400">${book.code}</p>
                    </div>
                    <button onclick="borrowBook('${book.code}')" class="bg-sky-500 px-6 py-2 rounded-xl text-sm">Borrow</button>
                </div>`;
        }
    });
    document.getElementById("student-borrowed-books").innerHTML = html;
}

// Borrow Book Function
function borrowBook(code) {
    const book = books.find(b => b.code === code);
    if (book && book.available) {
        book.available = false;
        borrowings.push({
            studentId: currentUser.id,
            bookCode: code,
            date: new Date().toISOString().split('T')[0]
        });
        currentUser.borrowed = currentUser.borrowed || [];
        currentUser.borrowed.push(code);
        
        alert(`✅ You borrowed "${book.title}"`);
        renderStudentDashboard();
    }
}

// Return Book
function returnBook(code) {
    const book = books.find(b => b.code === code);
    if (book) book.available = true;
    alert("Book returned successfully.");
    renderStudentDashboard();
}

// Initialize
window.onload = () => {
    switchLoginTab(0);
    console.log("%cAdreLib - Borrowing System Active", "color: #0ea5e9");
};
