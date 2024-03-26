"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_localstorage_1 = require("node-localstorage");
// Define the storage directory (where data will be stored)
var localStorage = new node_localstorage_1.LocalStorage('./storage');
// Now you can use localStorage methods similarly to the browser
localStorage.setItem('key', 'value');
var item = localStorage.getItem('key');
console.log(item); // Output: value
// Define CourseManager class
var CourseManager = /** @class */ (function () {
    function CourseManager() {
        this.courses = [];
        this.loadCoursesFromLocalStorage();
        this.renderCourses();
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
    CourseManager.prototype.addCourse = function (course) {
        this.courses.push(course);
        this.saveCoursesToLocalStorage();
        this.renderCourse(course);
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
        this.courses.forEach(function (course) {
            _this.renderCourse(course);
        });
    };
    CourseManager.prototype.clearCourses = function () {
        this.courses = [];
        localStorage.removeItem('courses');
        var kursInfo = document.getElementById('course-list');
        if (kursInfo) {
            kursInfo.innerHTML = '';
        }
    };
    // Sort courses by code
    CourseManager.prototype.sortCoursesByCode = function () {
        this.courses.sort(function (a, b) { return a.code.localeCompare(b.code); });
        this.renderCourses();
    };
    // Filter courses by progression
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
    /*if (typeof window !== 'undefined') {
        const courseManager = new CourseManager();
    */
    // Add event listener to the form submission button
    CourseManager.prototype.setupEventListeners = function () {
        var _this = this;
        var form = document.getElementById('course-form');
        var addBtn = document.getElementById('add');
        var clearBtn = document.getElementById('clear');
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission behavior
            // Retrieve form input values
            var codeInput = document.getElementById('code');
            var nameInput = document.getElementById('name');
            var progressionInput = document.getElementById('progression');
            var syllabusInput = document.getElementById('syllabus');
            // Create a new course object
            var newCourse = {
                code: codeInput.value,
                name: nameInput.value,
                progression: progressionInput.value,
                syllabus: syllabusInput.value
            };
            clearBtn.addEventListener('click', function () {
                _this.clearCourses();
            });
        });
    };
    return CourseManager;
}());
new CourseManager();
