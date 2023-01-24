import css from "./style.css";
import { uiController } from "./modules/uiController.js";
import { dataController } from "./modules/dataController.js";
// TODO: add trash icon
// TODO: add star icon (pin to top)


const inputHandler = (() => {
    document.addEventListener('click', event => {
        let element = '';
        if (event.target.closest('.task-box')) {
            element = 'task'
        } else if (event.target.closest('li')) {
            element = 'project'
        } else if (event.target.closest('.new-task')) {
            element = 'newTask'
        }
        uiController.setFocus(event, element);

        // task item clicked: remove focus from all others, save data, set class .focused, update DOM?

        // project list item clicked: set class .selected, remove class from all others, update DOM with filtered task view?

        // new task button clicked, create new empty task, set it at the top, set it .focused, automatically add to currently selected project?



        // if clicked on something else, remove focus from task items
        // TODO: move ui stuff to uiController.js
        // TODO: save contents from focused task item before removing focus
        // TODO: if task is empty, discard it

        // Check if click was on a tasks item
        // TODO: move ui stuff to uiController.js

        if (element == 'newTask') {
            // TODO: create new empty task, make it focused and set pointer on title
            // TODO: if empty task already exists, disregard clicks
            uiController.createTask(['title test', 'text test', 'project test', 'date test']);
        }
    });
})();



const taskFactory = ((title, task, project, date) => {
    const taskList = dataController.taskList;


    return { taskList, title, task, project, date }
})();