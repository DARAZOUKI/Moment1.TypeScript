class CourseManager {
    constructor() {
        this.courses = [];
        this.loadCoursesFromLocalStorage();
        this.renderCourses();

        const form = document.getElementById('course-form');
        const clearBtn = document.getElementById('clear');

        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission behavior
            this.addCourse();
        });

        clearBtn.addEventListener('click', () => {
            this.clearCourses();
        });
    }

    loadCoursesFromLocalStorage() {
        const storedCourses = localStorage.getItem('courses');
        if (storedCourses) {
            this.courses = JSON.parse(storedCourses);
        }
    }

    saveCoursesToLocalStorage() {
        localStorage.setItem('courses', JSON.stringify(this.courses));
    }

    addCourse() {
        const codeInput = document.getElementById('code');
        const nameInput = document.getElementById('name');
        const progressionInput = document.getElementById('progression');
        const syllabusInput = document.getElementById('syllabus');

        const newCourse = {
            code: codeInput.value,
            name: nameInput.value,
            progression: progressionInput.value,
            syllabus: syllabusInput.value
        };

        this.courses.push(newCourse);
        this.saveCoursesToLocalStorage();
        this.renderCourse(newCourse);

        codeInput.value = '';
        nameInput.value = '';
        progressionInput.value = 'A';
        syllabusInput.value = '';
    }

    renderCourse(course) {
        const kursInfo = document.getElementById('course-list');
        if (kursInfo) {
            const courseElement = document.createElement('div');
            courseElement.classList.add('course');
            courseElement.innerHTML = `
                <p><strong>Kurskod:</strong> ${course.code}</p>
                <p><strong>Kursnamn:</strong> ${course.name}</p>
                <p><strong>Progression:</strong> ${course.progression}</p>
                <p><strong>Webbsida:</strong> <a href="${course.syllabus}" target="_blank">${course.syllabus}</a></p>
            `;
            kursInfo.appendChild(courseElement);
        }
    }

    renderCourses() {
        this.courses.forEach(course => {
            this.renderCourse(course);
        });
    }

    clearCourses() {
        this.courses = [];
        localStorage.removeItem('courses');
        const kursInfo = document.getElementById('course-list');
        if (kursInfo) {
            kursInfo.innerHTML = '';
        }
    }
}

new CourseManager();
