//@ts-nocheck
var _a;
var taskslist = [];
var c = 0;
function AddTasks() {
    var taskNameInput = document.getElementById("taskname");
    var taskName = taskNameInput.value;
    if (taskName.trim() === "") {
        window.alert("Please enter task name!");
        return;
    }
    var ta = document.getElementById("ta");
    var existingTaskIndex = taskslist.findIndex(function (task) { return task.name === taskName; });
    // checking the duplicate tasks
    if (existingTaskIndex !== -1) {
        var existingTask = taskslist[existingTaskIndex];
        if (existingTask.status === "Completed") {
            taskslist.splice(existingTaskIndex, 1);
        }
        else {
            window.alert("Task already exists!");
            return;
        }
    }
    taskslist.push({ name: taskName, status: "To do" });
    taskNameInput.value = "";
    var newRow = ta.insertRow(c++);
    newRow.setAttribute("data-index", (c - 1).toString());
    var checkboxCell = newRow.insertCell(0);
    var taskNameCell = newRow.insertCell(1);
    var progressCell = newRow.insertCell(2);
    var deleteCell = newRow.insertCell(3);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkboxCell.appendChild(checkbox);
    var taskNameText = document.createTextNode(taskName);
    taskNameCell.appendChild(taskNameText);
    var progressSelect = document.createElement("select");
    ["To do", "In Progress", "Completed"].forEach(function (optionText) {
        var option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        progressSelect.appendChild(option);
    });
    progressCell.appendChild(progressSelect);
    var deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function () {
        ta.deleteRow(newRow.rowIndex);
        c--;
        taskslist.splice(taskslist.findIndex(function (task) { return task.name === taskName; }), 1);
    });
    deleteCell.appendChild(deleteButton);
    if (checkbox.checked) {
        progressSelect.value = "Completed";
    }
    progressSelect.addEventListener("change", function () {
        if (progressSelect.value === "Completed") {
            var index = taskslist.findIndex(function (task) { return task.name === taskNameCell.textContent; });
            taskslist[index].status = "Completed";
            checkbox.checked = true;
            checkbox.disabled = true;
            progressSelect.disabled = true;
            taskNameCell.style.textDecoration = "line-through";
            newRow.classList.add("completed-row");
        }
        else if (progressSelect.value === "In Progress") {
            newRow.classList.add("inprogress-row");
            if (progressSelect.value === "Completed") {
                newRow.classList.add("completed-row");
            }
        }
        else {
            var index = taskslist.findIndex(function (task) { return task.name === taskNameCell.textContent; });
            taskslist[index].status = progressSelect.value;
            checkbox.checked = false;
            checkbox.disabled = false;
            taskNameCell.style.textDecoration = "none";
            newRow.classList.remove("completed-row"); // Remove class
        }
    });
    console.log(taskslist);
}
(_a = document.getElementById("searchInput")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", function () {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var rows = document.querySelectorAll("#ta tr");
    rows.forEach(function (row) {
        var _a;
        var tableRow = row; // Cast 'row' to HTMLTableRowElement
        var taskNameCell = tableRow.cells[1];
        if (taskNameCell) {
            var taskName = (_a = taskNameCell.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            if (taskName && taskName.includes(searchInput)) {
                tableRow.style.display = "";
            }
            else {
                tableRow.style.display = "none";
            }
        }
    });
    var matchingRows = Array.from(rows).filter(function (row) { return row.style.display !== "none"; });
    if (matchingRows.length === 0) {
        rows.forEach(function (row) {
            row.style.display = "";
        });
    }
});
