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

    const updateProjectList = (project) => {
        // TODO: create set from current projects (dom)
        //  create set from passed item(s)
        // compare them and remove duplicates (Set.has())
        // clear projects list (dom) and create a new one
        const location = document.querySelector('.projects-list');
        if (Array.isArray(projects)) projects.sort()
        let projectTitles = new Set(projects)
        console.log(projectTitles)


        for (const title of projectTitles) {
            const newListItem = document.createElement('li');
            newListItem.textContent = title;
            location.append(newListItem);
        }

    };

    return { createTaskElement, createProjectList };
})();




export { domController };


