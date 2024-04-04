interface Storage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
    readonly length: number;
    key(index: number): string | null;
}

declare var localStorage: Storage;

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
            this.handleFormSubmit();
        });

        clearBtn.addEventListener('click', () => {
            this.clearCourses();
        });

        const updateBtn = document.getElementById('update-btn') as HTMLButtonElement;
        updateBtn.addEventListener('click', () => {
            this.handleUpdate();
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

    private handleFormSubmit() {
        const codeInput = (document.getElementById('code') as HTMLInputElement).value.trim();
        const nameInput = (document.getElementById('name') as HTMLInputElement).value.trim();
        const progressionInput = (document.getElementById('progression') as HTMLSelectElement).value.trim();
        const syllabusInput = (document.getElementById('syllabus') as HTMLInputElement).value.trim();

        if (this.isCourseCodeUnique(codeInput)) {
            const newCourse: CourseInfo = {
                code: codeInput,
                name: nameInput,
                progression: progressionInput,
                syllabus: syllabusInput
            };
            this.courses.push(newCourse);
            this.saveCoursesToLocalStorage();
            this.renderCourses();

            // Clear form inputs
            (document.getElementById('code') as HTMLInputElement).value = '';
            (document.getElementById('name') as HTMLInputElement).value = '';
            (document.getElementById('progression') as HTMLSelectElement).value = 'A';
            (document.getElementById('syllabus') as HTMLInputElement).value = '';
        } else {
            alert('A course with the same code already exists. Please enter a unique code.');
        }
    }

    private isCourseCodeUnique(code: string): boolean {
        return !this.courses.some(course => course.code === code);
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
        const kursInfo = document.getElementById('course-list');
        if (kursInfo) {
            kursInfo.innerHTML = ''; // Clear existing courses
            this.courses.forEach(course => {
                this.renderCourse(course);
            });
        }
    }

    private clearCourses() {
        this.courses = [];
        localStorage.removeItem('courses');
        const kursInfo = document.getElementById('course-list');
        if (kursInfo) {
            kursInfo.innerHTML = ''; // Clear displayed courses
        }
    }

    private handleUpdate() {
        const updateCodeInput = (document.getElementById('update-code') as HTMLInputElement).value.trim();
        const updatedNameInput = (document.getElementById('update-name') as HTMLInputElement).value.trim();
        const updatedProgressionInput = (document.getElementById('update-progression') as HTMLSelectElement).value.trim();
        const updatedSyllabusInput = (document.getElementById('update-syllabus') as HTMLInputElement).value.trim();

        let updated = false;

        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].code === updateCodeInput) {
                this.courses[i].name = updatedNameInput;
                this.courses[i].progression = updatedProgressionInput;
                this.courses[i].syllabus = updatedSyllabusInput;
                updated = true;
                break;
            }
        }

        if (updated) {
            this.saveCoursesToLocalStorage();
            this.renderCourses();
            // Clear update form inputs
            (document.getElementById('update-code') as HTMLInputElement).value = '';
            (document.getElementById('update-name') as HTMLInputElement).value = '';
            (document.getElementById('update-progression') as HTMLSelectElement).value = 'A';
            (document.getElementById('update-syllabus') as HTMLInputElement).value = '';
        } else {
            console.log(`Course with code ${updateCodeInput} not found.`);
        }
    }
}

new CourseManager();
