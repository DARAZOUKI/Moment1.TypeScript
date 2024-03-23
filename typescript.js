//Hantera localStorage för kursinformation
function saveCourses(courses) {
    localStorage.setItem('courses', JSON.stringify(courses));
}
function loadCourses() {
    var coursesJson = localStorage.getItem('courses');
    return coursesJson ? JSON.parse(coursesJson) : [];
}
// Funktioner för kurs-hantering
function addCourse(course) {
    var courses = loadCourses();
    courses.push(course);
    saveCourses(courses);
}
function updateCourse(code, updatedCourse) {
    var courses = loadCourses();
    var found = false;
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].code === code) {
            courses[i] = updatedCourse;
            found = true;
            break;
        }
    }
    if (found) {
        saveCourses(courses);
    }
}
function getCourse(code) {
    var courses = loadCourses();
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].code === code) {
            return courses[i];
        }
    }
    return undefined; // Course not found
}
/*function renderCourses() {
    const coursesList = document.getElementById('courses-list');
    const courses = loadCourses();
    coursesList.innerHTML = '';
    courses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.innerHTML = `
            <h2>${course.name}</h2>
            <p>Code: ${course.code}</p>
            <p>Progression: ${course.progression}</p>
            <p><a href="${course.syllabus}" target="_blank">Syllabus</a></p>
        `;
        coursesList.appendChild(courseElement);
    });
}

renderCourses();*/
