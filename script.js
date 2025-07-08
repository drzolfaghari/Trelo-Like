// Drag & Drop Functions
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const task = document.getElementById(data);
    ev.target.appendChild(task);
}

// Task Management
document.querySelectorAll('.task-input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            const taskId = 'task-' + Date.now();
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.id = taskId;
            taskElement.draggable = true;
            taskElement.ondragstart = drag;
            
            taskElement.innerHTML = `
                <button class="delete-btn" onclick="deleteTask('${taskId}')">×</button>
                ${this.value}
            `;
            
            this.parentElement.querySelector('.tasks').appendChild(taskElement);
            this.value = '';
        }
    });
});

function deleteTask(taskId) {
    const task = document.getElementById(taskId);
    if (task) {
        task.remove();
    }
}

// Initialize with sample tasks
window.onload = function() {
    const columns = ['todo', 'doing', 'done'];
    columns.forEach(col => {
        const column = document.getElementById(col);
        if (col === 'todo') {
            for (let i = 1; i <= 3; i++) {
                const taskId = 'sample-task-' + i;
                const task = document.createElement('div');
                task.className = 'task';
                task.id = taskId;
                task.draggable = true;
                task.ondragstart = drag;
                task.innerHTML = `
                    <button class="delete-btn" onclick="deleteTask('${taskId}')">×</button>
                    نمونه کار ${i}
                `;
                column.querySelector('.tasks').appendChild(task);
            }
        }
    });
};