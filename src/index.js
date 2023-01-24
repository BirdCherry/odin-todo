import css from "./style.css";
import { uiController } from "./modules/uiController.js";
import { dataController } from "./modules/dataController.js";
// TODO: add trash icon
// TODO: add star icon (pin to top)


const inputHandler = (() => {
    document.addEventListener('click', event => {
        let clickedElement = '';
        if (event.target.closest('.task-box')) {
            clickedElement = 'task'
        } else if (event.target.closest('li')) {
            clickedElement = 'project'
        } else if (event.target.closest('.new-task')) {
            clickedElement = 'newTask'
        }
        uiController.setFocus(event, clickedElement);

        // task item clicked: remove focus from all others, save data, set class .focused, update DOM?

        // project list item clicked: set class .selected, remove class from all others, update DOM with filtered task view?

        // new task button clicked, create new empty task, set it at the top, set it .focused, automatically add to currently selected project?

        if (clickedElement == 'newTask') {
            // TODO: create new empty task, make it focused and set pointer on title
            // TODO: save this to array (dataController.js), refresh task list (uiController.js)
            let newTask = {
                title: '',
                text: '',
                project: '',
                date: Date.now(),
            };
            // TEMPORARY TESTING
            uiController.createTask(newTask);
        }
    });
})();



const taskFactory = ((title, task, project, date) => {
    const taskList = dataController.taskList;


    return { taskList, title, task, project, date }
})();