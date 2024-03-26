import { LocalStorage } from 'node-localstorage';

// Define the storage directory (where data will be stored)
const localStorage = new LocalStorage('./storage');

// Now you can use localStorage methods similarly to the browser
localStorage.setItem('key', 'value');
const item = localStorage.getItem('key');
console.log(item); // Output: value


    interface CourseInfo {
      code: string;
      name: string;
      progression: 'A' | 'B' | 'C';
      syllabus: string;
    }
  
     // Define CourseManager class
class CourseManager {
    private courses: CourseInfo[];

    constructor() {
        this.courses = [];
        this.loadCoursesFromLocalStorage();
        this.renderCourses();
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
   

    private addCourse(course: CourseInfo) {
        this.courses.push(course);
        this.saveCoursesToLocalStorage();
        this.renderCourse(course);
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
    
    
    
    
     // Sort courses by code
     sortCoursesByCode() {
        this.courses.sort((a, b) => a.code.localeCompare(b.code));
        this.renderCourses();
      }
    
      // Filter courses by progression
      filterCoursesByProgression(progression: 'A' | 'B' | 'C') {
        const filteredCourses = this.courses.filter(course => course.progression === progression);
        this.renderFilteredCourses(filteredCourses);
      }
    
      private renderFilteredCourses(filteredCourses: CourseInfo[]) {
        console.log("Filtered Courses:");
        filteredCourses.forEach(course => {
            console.log(`Code: ${course.code}, Name: ${course.name}, Progression: ${course.progression}, Syllabus: ${course.syllabus}`);
        });
    }
    
    
      deleteCourseByCode(code: string) {
        let index = -1;
        // Find the index of the course with the specified code
        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].code === code) {
                index = i;
                break;
            }
        }
      
        // If the course with the specified code is found, delete it
        if (index !== -1) {
            this.courses.splice(index, 1);
            this.renderCourses();
            // Update localStorage or send delete request to server here
            console.log('Course deleted:', code);
        } else {
            console.log('Course not found:', code);
        }
    }

  
/*if (typeof window !== 'undefined') {
    const courseManager = new CourseManager();
*/

// Add event listener to the form submission button
private setupEventListeners() {
    const form = document.getElementById('course-form') as HTMLFormElement;
    const addBtn = document.getElementById('add') as HTMLButtonElement;
    const clearBtn = document.getElementById('clear') as HTMLButtonElement;

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Retrieve form input values
        const codeInput = document.getElementById('code') as HTMLInputElement;
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const progressionInput = document.getElementById('progression') as HTMLSelectElement;
        const syllabusInput = document.getElementById('syllabus') as HTMLInputElement;

        // Create a new course object
        const newCourse: CourseInfo = {
            code: codeInput.value,
            name: nameInput.value,
            progression: progressionInput.value as 'A' | 'B' | 'C',
            syllabus: syllabusInput.value
        };
        clearBtn.addEventListener('click', () => {
            this.clearCourses();
        });

        
    });

}
}
new CourseManager();
