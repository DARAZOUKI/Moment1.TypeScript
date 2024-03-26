interface CourseInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

class CourseManager {
    private courses: CourseInfo[];

    constructor() {
        this.courses = [];
        this.loadCoursesFromLocalStorage();
        this.renderCourses();

        const form = document.getElementById('course-form') as HTMLFormElement;
        const clearBtn = document.getElementById('clear') as HTMLButtonElement;

        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission behavior
            this.addCourse();
        });

        clearBtn.addEventListener('click', () => {
            this.clearCourses();
        });
    }

    private loadCoursesFromLocalStorage() {
        const storedCourses = localStorage.getItem('courses');
        if (storedCourses) {
            this.courses = JSON.parse(storedCourses);
        }
    }

    private saveCoursesToLocalStorage() {
        localStorage.setItem('courses', JSON.stringify(this.courses));
    }

    private addCourse() {
        const codeInput = document.getElementById('code') as HTMLInputElement;
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const progressionInput = document.getElementById('progression') as HTMLSelectElement;
        const syllabusInput = document.getElementById('syllabus') as HTMLInputElement;

        const newCourse: CourseInfo = {
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

    private renderCourse(course: CourseInfo) {
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

    private renderCourses() {
        this.courses.forEach(course => {
            this.renderCourse(course);
        });
    }

    private clearCourses() {
        this.courses = [];
        localStorage.removeItem('courses');
        const kursInfo = document.getElementById('course-list');
        if (kursInfo) {
            kursInfo.innerHTML = '';
        }
    }
}

new CourseManager();
