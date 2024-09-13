// User data for login
const users = {
    admin: { password: 'admin123', role: 'admin' },
    employee: { password: 'employee123', role: 'employee' }
};

// Retrieve stored data from local storage or initialize empty arrays
const employees = JSON.parse(localStorage.getItem('employees')) || [];
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users[username];

    if (user && user.password === password) {
        if (user.role === 'admin') {
            showAdminDashboard();
        } else if (user.role === 'employee') {
            showEmployeeDashboard(username);
        }
    } else {
        alert('Invalid username or password');
    }
}

// Show Admin Dashboard
function showAdminDashboard() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    populateEmployeeList();
    populateTaskList();
}

// Show Employee Dashboard
function showEmployeeDashboard(username) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('employee-dashboard').style.display = 'block';
    populateEmployeeTasks(username);
}

// Logout function
function logout() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('employee-dashboard').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Add Employee function
function addEmployee() {
    const employeeName = document.getElementById('employee-name').value;
    if (employeeName && !employees.includes(employeeName)) {
        employees.push(employeeName);
        localStorage.setItem('employees', JSON.stringify(employees));
        populateEmployeeList();
        document.getElementById('employee-name').value = '';
    } else {
        alert('Employee already exists or name is invalid.');
    }
}

// Populate Employee List
function populateEmployeeList() {
    const employeeList = document.getElementById('employee-list');
    const employeeSelect = document.getElementById('employee-select');
    employeeList.innerHTML = '';
    employeeSelect.innerHTML = '<option value="">Select Employee</option>';

    employees.forEach(employee => {
        const listItem = document.createElement('li');
        listItem.textContent = employee;
        employeeList.appendChild(listItem);

        const option = document.createElement('option');
        option.value = employee;
        option.textContent = employee;
        employeeSelect.appendChild(option);
    });
}

// Add Task function
function addTask() {
    const taskInput = document.getElementById('task-input').value;
    const assignedTo = document.getElementById('employee-select').value;

    if (taskInput && assignedTo) {
        const task = { description: taskInput, assignedTo, completed: false };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        populateTaskList();
        document.getElementById('task-input').value = '';
    } else {
        alert('Please enter a task and select an employee.');
    }
}

// Populate Task List
function populateTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${task.description} - Assigned to: ${task.assignedTo}`;
        taskList.appendChild(listItem);
    });
}

// Populate Employee Tasks
function populateEmployeeTasks(username) {
    const taskList = document.getElementById('employee-task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        if (task.assignedTo === username) {
            const listItem = document.createElement('li');
            listItem.textContent = task.description;
            if (!task.completed) {
                const completeButton = document.createElement('button');
                completeButton.textContent = 'Mark Complete';
                completeButton.className = 'btn';
                completeButton.onclick = () => markTaskComplete(index, username);
                listItem.appendChild(completeButton);
            }
            taskList.appendChild(listItem);
        }
    });
}

// Mark Task as Complete
function markTaskComplete(index, username) {
    tasks[index].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    populateEmployeeTasks(username);
}

// Attach event listeners to buttons
document.getElementById('login-button').addEventListener('click', login);
document.getElementById('logout-button').addEventListener('click', logout);
document.getElementById('employee-logout-button').addEventListener('click', logout);
document.getElementById('add-employee-button').addEventListener('click', addEmployee);
document.getElementById('assign-task-button').addEventListener('click', addTask);
