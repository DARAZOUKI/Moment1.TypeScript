var CourseManagement;
(function(CourseManagement) {
    var CourseManager = /** @class */ function() {
        function CourseManager() {
            this.courses = [];
            this.loadCourses();
            this.renderCourses();
        }
        CourseManager.prototype.loadCourses = function() {
            // Load courses from localStorage or server here
            // For demonstration, adding dummy data
            this.courses = [
                {
                    code: "CS101",
                    name: "Introduction to Computer Science",
                    progression: "A",
                    syllabus: "https://example.com/cs101-syllabus"
                },
                {
                    code: "ENG202",
                    name: "English Literature",
                    progression: "B",
                    syllabus: "https://example.com/eng202-syllabus"
                }
            ];
        };
        CourseManager.prototype.renderCourses = function() {
            var _this = this;
            var courseList = document.getElementById("course-list");
            courseList.innerHTML = "";
            this.courses.forEach(function(course) {
                var listItem = document.createElement("li");
                listItem.classList.add("course-item");
                listItem.setAttribute("contenteditable", "true");
                listItem.innerHTML = "<strong>".concat(course.code, "</strong>: ").concat(course.name, " - Progression: ").concat(course.progression, ' (<a href="').concat(course.syllabus, '" target="_blank">Syllabus</a>)');
                listItem.addEventListener("input", function() {
                    return _this.updateCourse(course, listItem.textContent);
                });
                courseList.appendChild(listItem);
            });
        };
        CourseManager.prototype.updateCourse = function(course, updatedInfo) {
            // Parse the updated course information
            var _a = updatedInfo.split(":").map(function(part) {
                return part.trim();
            }), code = _a[0], name = _a[1], progression = _a[2], syllabus = _a[3];
            // Update the course object
            course.code = code;
            course.name = name;
            course.progression = progression;
            course.syllabus = syllabus;
            // Update localStorage or send update request to server here
            console.log("Course updated:", course);
        };
        return CourseManager;
    }();
    CourseManagement.CourseManager = CourseManager;
    var courseManager = new CourseManager();
})(CourseManagement || (CourseManagement = {}));

