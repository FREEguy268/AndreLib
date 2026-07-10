let students = [];
let books = [];

function registerStudent() {
    const fullName = document.getElementById('fullName').value;
    const studentId = document.getElementById('studentId').value;
    const studentClass = document.getElementById('classSelection').value;

    if (studentId.length === 12 && studentId.startsWith("11")) {
        students.push({ fullName, studentId, studentClass, borrowedBooks: [] });
        alert("Student Registered Successfully!");
        document.getElementById('output').innerText = JSON.stringify(students, null, 2);
    } else {
        alert("Invalid Student ID. It must be 12 digits and start with '11'.");
    }
}

function addBook() {
    const bookCode = document.getElementById('bookCode').value;
    const bookTitle = document.getElementById('bookTitle').value;

    if (bookCode && bookTitle) {
        books.push({ bookCode, bookTitle, isBorrowed: false });
        alert("Book Added Successfully!");
        document.getElementById('output').innerText = JSON.stringify(books, null, 2);
    } else {
        alert("Please fill out all fields.");
    }
}
