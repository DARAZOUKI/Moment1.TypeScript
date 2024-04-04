var CourseManager = /** @class */ (function () {
    function CourseManager() {
        var _this = this;
        this.courses = [];
        this.loadCoursesFromLocalStorage();
        this.renderCourses();
        var form = document.getElementById('course-form');
        var clearBtn = document.getElementById('clear');
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission behavior
            _this.handleFormSubmit();
        });
        clearBtn.addEventListener('click', function () {
            _this.clearCourses();
        });
    }
    CourseManager.prototype.loadCoursesFromLocalStorage = function () {
        var storedCourses = localStorage.getItem('courses');
        if (storedCourses) {
            this.courses = JSON.parse(storedCourses);
        }
    };
    CourseManager.prototype.saveCoursesToLocalStorage = function () {
        localStorage.setItem('courses', JSON.stringify(this.courses));
    };
    CourseManager.prototype.handleFormSubmit = function () {
        var codeInput = document.getElementById('code').value.trim();
        var nameInput = document.getElementById('name').value.trim();
        var progressionInput = document.getElementById('progression').value.trim();
        var syllabusInput = document.getElementById('syllabus').value.trim();
        if (this.isCourseCodeUnique(codeInput)) {
            var newCourse = {
                code: codeInput,
                name: nameInput,
                progression: progressionInput,
                syllabus: syllabusInput
            };
            this.courses.push(newCourse);
            this.saveCoursesToLocalStorage();
            this.renderCourses();
            // Clear form inputs
            document.getElementById('code').value = '';
            document.getElementById('name').value = '';
            document.getElementById('progression').value = 'A';
            document.getElementById('syllabus').value = '';
        }
        else {
            alert('A course with the same code already exists. Please enter a unique code.');
        }
    };
    CourseManager.prototype.isCourseCodeUnique = function (code) {
        for (var _i = 0, _a = this.courses; _i < _a.length; _i++) {
            var course = _a[_i];
            if (course.code === code) {
                return false; // Code already exists
            }
        }
        return true; // Code is unique
    };
    CourseManager.prototype.renderCourse = function (course) {
        var kursInfo = document.getElementById('course-list');
        if (kursInfo) {
            var courseElement = document.createElement('div');
            courseElement.classList.add('course');
            courseElement.innerHTML = "\n                <p><strong>Kurskod:</strong> ".concat(course.code, "</p>\n                <p><strong>Kursnamn:</strong> ").concat(course.name, "</p>\n                <p><strong>Progression:</strong> ").concat(course.progression, "</p>\n                <p><strong>Webbsida:</strong> <a href=\"").concat(course.syllabus, "\" target=\"_blank\">").concat(course.syllabus, "</a></p>\n            ");
            kursInfo.appendChild(courseElement);
        }
    };
    CourseManager.prototype.renderCourses = function () {
        var _this = this;
        var kursInfo = document.getElementById('course-list');
        if (kursInfo) {
            kursInfo.innerHTML = ''; // Clear existing courses
            this.courses.forEach(function (course) {
                _this.renderCourse(course);
            });
        }
    };
    CourseManager.prototype.clearCourses = function () {
        this.courses = [];
        localStorage.removeItem('courses');
        var kursInfo = document.getElementById('course-list');
        if (kursInfo) {
            kursInfo.innerHTML = ''; // Clear displayed courses
        }
    };
    return CourseManager;
}());
new CourseManager();
