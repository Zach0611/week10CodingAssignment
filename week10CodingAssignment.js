class Course {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
}

class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.courses = [];
    }

    addCourse(course) {
        this.courses.push(course);
    }

    deleteCourse(course) {
        let index = this.courses.indexOf(course);
        this.courses.splice(index, 1);
    } 
}

let students = [];
let studentId = 0;

onClick('new-student', () => {
    students.push(new Student(studentId++, getValue('new-student-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action)
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let studentDiv = document.getElementById('students');
    clearElement(studentDiv);
    for (student of students) {
        let table = createStudentTable(student);
        let title = document.createElement('h2');
        title.innerHTML = student.name;
        title.appendChild(createDeleteStudentButton(student));
        studentDiv.appendChild(title);
        studentDiv.appendChild(table);
        for (course of student.courses) {
            createCourseRow(student, table, course);
        }
    }
}

function createCourseRow(student, table, course) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = course.name;
    row.insertCell(1).innerHTML = course.grade;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(student, course));
}

function createDeleteRowButton(student, course) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = student.courses.indexOf(course);
        student.courses.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteStudentButton(student) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete Student';
    btn.onclick = () => {
        let index = students.indexOf(student);
        students.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewCourseButton(student) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        student.courses. push(new Course(getValue(`name-input-${student.id}`), getValue(`grade-input-${student.id}`)));
        drawDOM();
    };
    return btn;
}

function createStudentTable(student) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-light table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let gradeColumn = document.createElement('th');
    nameColumn.innerHTML = 'Course';
    gradeColumn.innerHTML = 'Grade';
    row.appendChild(nameColumn);
    row.appendChild(gradeColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let gradeTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${student.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let gradeInput = document.createElement('input')
    gradeInput.setAttribute('id', `grade-input-${student.id}`);
    gradeInput.setAttribute('type', 'text');
    gradeInput.setAttribute('class', 'form-control');
    let newCourseButton = createNewCourseButton(student);
    nameTh.appendChild(nameInput);
    gradeTh.appendChild(gradeInput);
    createTh.appendChild(newCourseButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(gradeTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}