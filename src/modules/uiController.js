const uiController = (() => {
    // always clear focus from task items
    const setFocus = (event, element) => {
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

    const createTask = (data) => {
        let [title, taskText, project, date] = data;
        const taskLocation = document.querySelector('.tasks-list');
        const template = document.querySelector('#task-template');
        let newTaskItem = template.content.cloneNode(true);

        newTaskItem.querySelector('.task-title').textContent = title;
        newTaskItem.querySelector('.task-text').textContent = taskText;
        newTaskItem.querySelector('.task-project').textContent = project;
        // TODO: date will probably be in unix format, convert to DD.MM.
        newTaskItem.querySelector('.task-date').textContent = date;

        taskLocation.append(newTaskItem);
    };

    const createProject = (data) => {
        
    }

    const updateTaskList = () => {
        // TODO: remove all tasks and re-add them?
    };

    return { setFocus, createTask, createProject, updateTaskList };
})();




export { uiController };