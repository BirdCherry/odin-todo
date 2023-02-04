const domController = (() => {
    const createEmptyTask = () => {
        const empty = {
            title: '',
            text: '',
            project: '',
            timestamp: Date.now(),
        }

        const location = document.querySelector('.tasks-list');
        const newTask = document.createElement('task-box');
        newTask.taskData = empty;
        location.prepend(newTask);
    };

    const refreshTaskList = (tasks) => {
        const location = document.querySelector('.tasks-list')
        let newTasks = Array.isArray(tasks) ? tasks : [tasks]
        let currentTaskElements = location.querySelectorAll('task-box')

        // remove all task-boxes from DOM
        for (const element of currentTaskElements) element.remove()

        // create new task-boxes and prepend to DOM
        for (const task of newTasks) {
            const newTaskElement = document.createElement('task-box')
            newTaskElement.taskData = task
            location.prepend(newTaskElement)
        }

    }

    const refreshProjectList = (projects) => {
        const location = document.querySelector('.projects-list');
        let newProjects = Array.isArray(projects) ? projects : [projects]
        let currentProjects = Array
            .from(document.querySelectorAll('task-box'))
            .map((i) => i.taskData.project)

        // ok... so we are combining new and current projects arrays,
        // then converting them into a set to remove duplicates,
        // then converting it back to an array,
        // then removing empty/falsy values,
        // and then sorting
        let updatedProjectList = Array
            .from(new Set(currentProjects.concat(newProjects)))
            .filter(Boolean)
            .sort()

        // remove old project list from DOM
        let currentProjectElements = document.querySelectorAll('.project')
        for (const element of currentProjectElements) element.remove()

        // create new project list and append to DOM
        for (const projectName of updatedProjectList) {
            const newListItem = document.createElement('project-item');
            newListItem.classList.add('project')
            newListItem.textContent = projectName;
            location.append(newListItem);
        }

    };

    const filterTasks = (projectElement) => {
        // set [focused] attribute to selected project
        const projectElements = document.querySelectorAll('project-item')
        const taskElements = document.querySelectorAll('task-box')
        const allProjectsElement = document.querySelector('#all-projects')

        // set [focused] attribute to project-item elements
        for (const element of projectElements) {
            element.removeAttribute('focused')
        }
        if (projectElement) {
            projectElement.setAttribute('focused', '')
        } else {
            allProjectsElement.setAttribute('focused', '')
        }

        // set [hidden] attribute to task-box elements
        for (const element of taskElements) {
            element.removeAttribute('hidden')
            if (projectElement
                && element.taskData.project != projectElement.textContent
                && projectElement.textContent != 'All') {
                element.setAttribute('hidden', '')
            }
        }
    }

    return { createEmptyTask, refreshProjectList, refreshTaskList, filterTasks };
})();

export { domController };


