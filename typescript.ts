
    interface CourseInfo {
      code: string;
      name: string;
      progression: 'A' | 'B' | 'C';
      syllabus: string;
    }
  
     class CourseManager {
    private courses: CourseInfo[] = [];
  
    constructor() {
      this.loadCourses();
      this.renderCourses();
    }
  
    private loadCourses() {
      // Load courses from localStorage or server here
      // For demonstration, adding dummy data
      this.courses = [
        { code: 'CS101', name: 'Introduction to Computer Science', progression: 'A', syllabus: 'https://example.com/cs101-syllabus' },
        { code: 'ENG202', name: 'English Literature', progression: 'B', syllabus: 'https://example.com/eng202-syllabus' }
      ];
    }
    addCourse(newCourse: CourseInfo) {
        // Check if the course code already exists
        let existingCourseIndex = -1;
        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].code === newCourse.code) {
                existingCourseIndex = i;
                break;
            }
        }

        if (existingCourseIndex === -1) {
            // Course code doesn't exist, add the new course
            this.courses.push(newCourse);
            // Render the updated courses
            this.renderCourses();
            // Optionally, update localStorage here
            console.log('Course added:', newCourse);
        } else {
            console.error('Course with code', newCourse.code, 'already exists.');
        }
    }

    private updateCourse(course: CourseInfo, updatedInfo: string) {
        // Parse the updated course information
        const [code, name, progression, syllabus] = updatedInfo.split(':').map(part => part.trim());
      
        // Find the index of the course with the specified code
        let index = -1;
        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].code === code) {
                index = i;
                break;
            }
        }
      
        // If the course with the specified code is found, update its properties
        if (index !== -1) {
            this.courses[index].code = code;
            this.courses[index].name = name;
            this.courses[index].progression = progression as 'A' | 'B' | 'C';
            this.courses[index].syllabus = syllabus;
      
            // Update localStorage or send update request to server here
            console.log('Course updated:', this.courses[index]);
        } else {
            console.error('Course with code', code, 'not found.');
        }
    }
    private renderCourses() {
        console.log("Courses:");
        this.courses.forEach(course => {
            console.log(`Code: ${course.code}, Name: ${course.name}, Progression: ${course.progression}, Syllabus: ${course.syllabus}`);
        });
    }
    
    
    
    
     // Optional functionality: Sort courses by code
     sortCoursesByCode() {
        this.courses.sort((a, b) => a.code.localeCompare(b.code));
        this.renderCourses();
      }
    
      // Optional functionality: Filter courses by progression
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
}
  
  const courseManager = new CourseManager();
  // Usage of optional functionalities
  courseManager.sortCoursesByCode(); // Sort courses by code
  courseManager.filterCoursesByProgression('A'); // Filter courses by progression 'A'
  courseManager.deleteCourseByCode('CS101'); // Delete course with code 'CS101'