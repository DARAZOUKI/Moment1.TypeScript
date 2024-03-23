

//Skapa TypeScript-interface för kursinformation
interface CourseInfo {
    code: string;
    name: string;
    progression: 'A' | 'B' | 'C';
    syllabus: string;
}

//Hantera localStorage för kursinformation
function saveCourses(courses: CourseInfo[]) {
    localStorage.setItem('courses', JSON.stringify(courses));
}

function loadCourses(): CourseInfo[] {
    const coursesJson = localStorage.getItem('courses');
    return coursesJson ? JSON.parse(coursesJson) : [];
}

// Funktioner för kurs-hantering
function addCourse(course: CourseInfo) {
    const courses = loadCourses();
    courses.push(course);
    saveCourses(courses);
}

function updateCourse(code: string, updatedCourse: CourseInfo) {
    const courses = loadCourses();
    const index = courses.findIndex(course => course.code === code);
    if (index !== -1) {
        courses[index] = updatedCourse;
        saveCourses(courses);
    }
}

function getCourse(code: string): CourseInfo | undefined {
    const courses = loadCourses();
    return courses.find(course => course.code === code);
}


function renderCourses() {
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

renderCourses();
