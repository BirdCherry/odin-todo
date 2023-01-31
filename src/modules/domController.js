const domController = (() => {
    const createTask = (task) => {
        const location = document.querySelector('.tasks-list');
        const newTask = document.createElement('task-box');
        const taskElements = newTask.shadowRoot.querySelectorAll('.task');

        for (let i = 0; i < taskElements.length; i++) {
            let taskElementClass = taskElements[i].classList
            switch (true) {
                case taskElementClass.contains('title'):
                    taskElements[i].textContent = task?.title; 
                    break;
                case taskElementClass.contains('text'):
                    taskElements[i].textContent = task?.text; 
                    break;
                case taskElementClass.contains('project'):
                    taskElements[i].textContent = task?.project; 
                    break;
                case taskElementClass.contains('date'):
                    // taskElements[i].textContent = new Intl.DateTimeFormat().format(task?.date) ?? new Intl.DateTimeFormat().format(Date.now());
                    taskElements[i].textContent = task?.date ?? Date.now();

                    break;
            }
        }
        location.prepend(newTask);
    };

    const updateProjectList = () => {

    };

    const updateTaskList = () => {
        // remove all tasks and re-add them?
    };

    return { createTask, updateProjectList, updateTaskList };
})();




export { domController };


