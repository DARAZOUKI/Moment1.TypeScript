var CourseManager = /** @class */ (function () {
    function CourseManager() {
        this.courses = [];
        this.loadCourses();
        this.renderCourses();
    }
    CourseManager.prototype.loadCourses = function () {
        // Load courses from localStorage or server here
        // For demonstration, adding dummy data
        this.courses = [
            { code: 'CS101', name: 'Introduction to Computer Science', progression: 'A', syllabus: 'https://example.com/cs101-syllabus' },
            { code: 'ENG202', name: 'English Literature', progression: 'B', syllabus: 'https://example.com/eng202-syllabus' }
        ];
    };
    CourseManager.prototype.addCourse = function (newCourse) {
        // Check if the course code already exists
        var existingCourseIndex = -1;
        for (var i = 0; i < this.courses.length; i++) {
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
        }
        else {
            console.error('Course with code', newCourse.code, 'already exists.');
        }
    };
    CourseManager.prototype.updateCourse = function (course, updatedInfo) {
        // Parse the updated course information
        var _a = updatedInfo.split(':').map(function (part) { return part.trim(); }), code = _a[0], name = _a[1], progression = _a[2], syllabus = _a[3];
        // Find the index of the course with the specified code
        var index = -1;
        for (var i = 0; i < this.courses.length; i++) {
            if (this.courses[i].code === code) {
                index = i;
                break;
            }
        }
        // If the course with the specified code is found, update its properties
        if (index !== -1) {
            this.courses[index].code = code;
            this.courses[index].name = name;
            this.courses[index].progression = progression;
            this.courses[index].syllabus = syllabus;
            // Update localStorage or send update request to server here
            console.log('Course updated:', this.courses[index]);
        }
        else {
            console.error('Course with code', code, 'not found.');
        }
    };
    CourseManager.prototype.renderCourses = function () {
        console.log("Courses:");
        this.courses.forEach(function (course) {
            console.log("Code: ".concat(course.code, ", Name: ").concat(course.name, ", Progression: ").concat(course.progression, ", Syllabus: ").concat(course.syllabus));
        });
    };
    // Optional functionality: Sort courses by code
    CourseManager.prototype.sortCoursesByCode = function () {
        this.courses.sort(function (a, b) { return a.code.localeCompare(b.code); });
        this.renderCourses();
    };
    // Optional functionality: Filter courses by progression
    CourseManager.prototype.filterCoursesByProgression = function (progression) {
        var filteredCourses = this.courses.filter(function (course) { return course.progression === progression; });
        this.renderFilteredCourses(filteredCourses);
    };
    CourseManager.prototype.renderFilteredCourses = function (filteredCourses) {
        console.log("Filtered Courses:");
        filteredCourses.forEach(function (course) {
            console.log("Code: ".concat(course.code, ", Name: ").concat(course.name, ", Progression: ").concat(course.progression, ", Syllabus: ").concat(course.syllabus));
        });
    };
    CourseManager.prototype.deleteCourseByCode = function (code) {
        var index = -1;
        // Find the index of the course with the specified code
        for (var i = 0; i < this.courses.length; i++) {
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
        }
        else {
            console.log('Course not found:', code);
        }
    };
    return CourseManager;
}());
var courseManager = new CourseManager();
// Usage of optional functionalities
courseManager.sortCoursesByCode(); // Sort courses by code
courseManager.filterCoursesByProgression('A'); // Filter courses by progression 'A'
courseManager.deleteCourseByCode('CS101'); // Delete course with code 'CS101'
