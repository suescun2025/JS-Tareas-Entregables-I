document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');

    // Cargar tareas al iniciar
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveAndRender = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                    onclick="toggleTask(${index})">
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            `;
            taskList.appendChild(li);
        });
    };

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveAndRender();
    };

    addTaskBtn.addEventListener('click', () => {
        if (taskInput.value.trim() !== '') {
            tasks.push({ text: taskInput.value, completed: false });
            taskInput.value = '';
            saveAndRender();
        }
    });

    clearCompletedBtn.addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed);
        saveAndRender();
    });

    renderTasks();
});
