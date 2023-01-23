import css from "./style.css";
import { uiController } from "./modules/uiController.js";
import { dataController } from "./modules/dataController.js";



const inputHandler = (() => {
    document.addEventListener('click', event => {
        // Check if click was on a tasks item
        // TODO: move ui stuff to uiController.js
        if (event.target.closest('.task-box')) {
            let clickedTaskItem = event.target.closest('.task-box');
            if (!clickedTaskItem.classList.contains('focused')) {
                clickedTaskItem.classList.add('focused');
            }
        } else {
            // if clicked on something else, remove focus from task items
            // TODO: move ui stuff to uiController.js
            // TODO: save contents from focused task item before removing focus
            document.querySelectorAll('.task-box').forEach(item => {
                if (item.classList.contains('focused')) {
                    item.classList.remove('focused')
                }
            })
        }
        if (event.target.closest('li')) {
            // check if click was on projects list item
            // TODO: move ui stuff to uiController.js
            // TODO: refresh view and filter by selected project (uiController.js)
            let clickedProjectListItem = event.target.closest('li');
            if (!clickedProjectListItem.classList.contains('selected')) {
                document.querySelectorAll('li').forEach(item => {
                    if (!item.classList.contains('selected')) {
                        item.classList.remove('selected')
                    }
                })
                clickedProjectListItem.classList.add('selected')
            }
        }
    });
})();



const taskFactory = ((title, task, project, date) => {
    const taskList = dataController.taskList;


    return { taskList, title, task, project, date }
})();