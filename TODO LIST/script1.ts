//@ts-nocheck

interface Task {
    name: string;
    status: string;
}

var taskslist: Task[] = [];
var c = 0;

// Adds a new task
function AddTasks() {
    const taskNameInput = document.getElementById("taskname") as HTMLInputElement;
    const taskName = taskNameInput.value;

    if (taskName.trim() === "") {
        window.alert("Please enter task name!");
        return;
    }

    const ta = document.getElementById("ta") as HTMLTableElement;
    const existingTaskIndex = taskslist.findIndex(task => task.name === taskName);

    // checking the duplicate tasks
    if (existingTaskIndex !== -1) {
        const existingTask = taskslist[existingTaskIndex];
        if (existingTask.status === "Completed") {
            taskslist.splice(existingTaskIndex, 1);
        } else {
            window.alert("Task already exists!");
            return;
        }
    }

    taskslist.push({ name: taskName, status: "To do" });
    taskNameInput.value = "";

    const newRow = ta.insertRow(c++);
    newRow.setAttribute("data-index", (c - 1).toString());

    const checkboxCell = newRow.insertCell(0);
    const taskNameCell = newRow.insertCell(1);
    const progressCell = newRow.insertCell(2);
    const deleteCell = newRow.insertCell(3);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkboxCell.appendChild(checkbox);

    const taskNameText = document.createTextNode(taskName);
    taskNameCell.appendChild(taskNameText);

    const progressSelect = document.createElement("select");
    ["To do", "In Progress", "Completed"].forEach(function (optionText) {
        const option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        progressSelect.appendChild(option);
    });
    progressCell.appendChild(progressSelect);

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function () {
        ta.deleteRow(newRow.rowIndex);
        c--;
        taskslist.splice(taskslist.findIndex(task => task.name === taskName), 1);
    });
    deleteCell.appendChild(deleteButton);

    if (checkbox.checked) {
        progressSelect.value = "Completed";
    }

    progressSelect.addEventListener("change", function () {
        if (progressSelect.value === "Completed") {
            const index = taskslist.findIndex(task => task.name === taskNameCell.textContent);
            taskslist[index].status = "Completed";
            checkbox.checked = true;
            checkbox.disabled = true;
            progressSelect.disabled = true;
            taskNameCell.style.textDecoration = "line-through";
            newRow.classList.add("completed-row");
        } else if (progressSelect.value === "In Progress") {
            newRow.classList.add("inprogress-row");
            if (progressSelect.value === "Completed" as string){
                newRow.classList.add("completed-row");
            }
        } else {
            const index = taskslist.findIndex(task => task.name === taskNameCell.textContent);
            taskslist[index].status = progressSelect.value;
            checkbox.checked = false;
            checkbox.disabled = false;
            taskNameCell.style.textDecoration = "none";
            newRow.classList.remove("completed-row"); // Remove class
        }
    });
    console.log(taskslist);
}

document.getElementById("searchInput")?.addEventListener("input", function () {
    const searchInput = (document.getElementById("searchInput") as HTMLInputElement).value.toLowerCase();
    const rows = document.querySelectorAll("#ta tr");

    rows.forEach(function (row) {
        const tableRow = row as HTMLTableRowElement; // Cast 'row' to HTMLTableRowElement
        const taskNameCell = tableRow.cells[1];
        if (taskNameCell) {
            const taskName = taskNameCell.textContent?.toLowerCase();
            if (taskName && taskName.includes(searchInput)) {
                tableRow.style.display = "";
            } else {
                tableRow.style.display = "none";
            }
        }
    });

    const matchingRows = Array.from(rows).filter(row => (row as HTMLTableRowElement).style.display !== "none");
    if (matchingRows.length === 0) {
        rows.forEach(row => {
            (row as HTMLTableRowElement).style.display = "";
        });
    }
});



