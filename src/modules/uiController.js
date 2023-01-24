const uiController = (() => {
    const setFocus = (event, element) => {
        // always clear focus from task items
        document.querySelectorAll('.task-box').forEach(item => {
            if (item.classList.contains('focused')) {
                item.classList.remove('focused')
            }
        });
        switch (element) {
            case 'task':
                // add focus to clicked task
                event.target.closest('.task-box').classList.add('focused');
                break;
            case 'project':
                // add focus to clicked project
                document.querySelectorAll('li').forEach(item => {
                    if (!item.classList.contains('selected')) {
                        item.classList.remove('selected')
                    }
                })
                clickedProjectListItem.classList.add('selected')
                break;
            default:
                break;
        }
    };

    const createTask = (task) => {
        const taskLocation = document.querySelector('.tasks-list');
        const template = document.querySelector('#task-template');
        let newTaskItem = template.content.cloneNode(true);

        newTaskItem.querySelector('.task-title').textContent = task.title;
        newTaskItem.querySelector('.task-text').textContent = task.text;
        newTaskItem.querySelector('.task-project').textContent = task.project;
        // newTaskItem.querySelector('.task-date').textContent = new Date(task.date).toLocaleDateString();
        newTaskItem.querySelector('.task-date').textContent = new Intl.DateTimeFormat().format(task.date);
        
        taskLocation.append(newTaskItem);
    };

    const createProject = (task) => {

    };

    const updateTaskList = () => {
        // TODO: remove all tasks and re-add them?
    };

    return { setFocus, createTask, createProject, updateTaskList };
})();




export { uiController };