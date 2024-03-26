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
    CourseManager.prototype.renderCourses = function () {
        var _this = this;
        var courseList = document.getElementById('course-list');
        courseList.innerHTML = '';
        this.courses.forEach(function (course) {
            var listItem = document.createElement('li');
            listItem.classList.add('course-item');
            listItem.setAttribute('contenteditable', 'true');
            listItem.innerHTML = "<strong>".concat(course.code, "</strong>: ").concat(course.name, " - Progression: ").concat(course.progression, " (<a href=\"").concat(course.syllabus, "\" target=\"_blank\">Syllabus</a>)");
            listItem.addEventListener('input', function () { return _this.updateCourse(course, listItem.textContent); });
            courseList.appendChild(listItem);
        });
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
    // Render filtered courses
    CourseManager.prototype.renderFilteredCourses = function (filteredCourses) {
        var _this = this;
        var courseList = document.getElementById('course-list');
        courseList.innerHTML = '';
        filteredCourses.forEach(function (course) {
            var listItem = document.createElement('li');
            listItem.classList.add('course-item');
            listItem.setAttribute('contenteditable', 'true');
            listItem.innerHTML = "<strong>".concat(course.code, "</strong>: ").concat(course.name, " - Progression: ").concat(course.progression, " (<a href=\"").concat(course.syllabus, "\" target=\"_blank\">Syllabus</a>)");
            listItem.addEventListener('input', function () { return _this.updateCourse(course, listItem.textContent); });
            courseList.appendChild(listItem);
        });
    };
    // Optional functionality: Delete course by code
    CourseManager.prototype.deleteCourseByCode = function (code) {
        var index = this.courses.findIndex(function (course) { return course.code === code; });
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
