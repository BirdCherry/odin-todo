const domController = (() => {
    const createTask = (data) => {
        const empty = {
            title: '',
            text: '',
            project: '',
            timestamp: Date.now(),
        }

        const location = document.querySelector('.tasks-list');
        const newTask = document.createElement('task-box');
        newTask.taskData = data ?? empty;
        location.prepend(newTask);
    };

    const updateProjectList = () => {

    };

    const updateTaskList = () => {
        // remove all tasks and re-add them?
        // arrange tasks by date (newest first)
    };

    return { createTask, updateProjectList, updateTaskList };
})();




export { domController };


