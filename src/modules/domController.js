const domController = (() => {
    const createTaskElement = (data) => {
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

    const updateProjectList = (projects) => {
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

    const filterTasks = (project) => {
        // set [focused] attribute to selected project
        document.querySelectorAll('project-item').forEach(item => item.removeAttribute('focused'))
        project.setAttribute('focused', '')

        // TODO: set [hidden] attribute to all task-boxes that don't have selected project name
        let tasks = document.querySelectorAll('task-box')
        tasks.forEach(item => {
            item.removeAttribute('hidden')
            if (item.taskData.project != project.textContent && project.textContent != 'All') {
            item.setAttribute('hidden', '')
            }
        })
    }

    return { createTaskElement, updateProjectList, filterTasks };
})();




export { domController };


