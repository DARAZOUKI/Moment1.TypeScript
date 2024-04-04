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
        var updateBtn = document.getElementById('update-btn');
        updateBtn.addEventListener('click', function () {
            _this.handleUpdate();
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
        return !this.courses.some(function (course) { return course.code === code; });
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
    CourseManager.prototype.handleUpdate = function () {
        var updateCodeInput = document.getElementById('update-code').value.trim();
        var updatedNameInput = document.getElementById('update-name').value.trim();
        var updatedProgressionInput = document.getElementById('update-progression').value.trim();
        var updatedSyllabusInput = document.getElementById('update-syllabus').value.trim();
        var updated = false;
        for (var i = 0; i < this.courses.length; i++) {
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
            document.getElementById('update-code').value = '';
            document.getElementById('update-name').value = '';
            document.getElementById('update-progression').value = 'A';
            document.getElementById('update-syllabus').value = '';
        }
        else {
            console.log("Course with code ".concat(updateCodeInput, " not found."));
        }
    };
    return CourseManager;
}());
new CourseManager();
