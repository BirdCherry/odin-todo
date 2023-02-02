const dataController = (() => {
    // handle local storage

    const DEFAULT_TASKS = [
        { title: 'How to edit a task', text: 'Just click on the task to edit the title, body and the project (which is set on this task as Tips).', project: 'Tips', timestamp: Date.now(), },
        { title: 'How to delete a task', text: 'Click on the button on the bottom right of the task.', project: 'Tips', timestamp: Date.now(), },
        { title: 'How to create a new task', text: 'Click on the yellow button on the top right of the page.', project: 'Tips', timestamp: Date.now(), },
    ];

    const saveAllTasks = () => {
        let taskArray = [];
        document.querySelectorAll('task-box').forEach(task => {
            taskArray.push(task.taskData)
        })
        // arrange by timestamp value
        taskArray.sort((a, b) => a.timestamp - b.timestamp);
        localStorage.setItem('tasks', JSON.stringify(taskArray));
    }

    const getAllTasks = () => {
        let taskArray = localStorage.getItem('tasks')
        // if localstorage is undefined, create introductory tasks by using default data
        taskArray = taskArray ? JSON.parse(taskArray) : DEFAULT_TASKS;
        return taskArray;
    }

    return { saveAllTasks, getAllTasks };
})();

export { dataController };