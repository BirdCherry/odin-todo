import "./style.css";
import { domController } from "./modules/domController.js";
import { dataController } from "./modules/dataController.js";
// TODO: add trash icon
// TODO: add star icon (pin to top)


// custom DOM element: task-box
customElements.define("task-box", class extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('task-box');
        // attach a shadow root to the element
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // look for click on close button and delete task
        this.shadowRoot.querySelector('.delete').addEventListener('click', _ => this.deleteTask());

        // save data when user edits a task
        // const observer = new MutationObserver(_ => dataController.saveAllTasks());
        // observer.observe(this.shadowRoot, { characterData: true, subtree: true, });

        // save data when user edits a task (version 2)
        this.shadowRoot.addEventListener('input', _ => dataController.saveAllTasks())

        // update project list
        this.shadowRoot.querySelector('.project').addEventListener('focusout', element => domController.createProjectList(this.shadowRoot.querySelector('.project').textContent));
    
    }

    disconnectedCallback() {
        // remove event listeners
        this.shadowRoot.querySelector('.delete').removeEventListener('click', _ => this.deleteTask());
        this.shadowRoot.removeEventListener('input', _ => dataController.saveAllTasks())

        // sync localstorage after deleting a task
        dataController.saveAllTasks();
    }

    deleteTask() {
        if (confirm("Delete this task?")) this.remove();

    }

    get taskData() {
        // read all .task elements, save data to object and return
        let data = {
            title: '',
            text: '',
            project: '',
            timestamp: '',
        };
        this.shadowRoot.querySelectorAll('.task').forEach(element => {
            Object.keys(data).forEach(key => {
                if (element.classList.contains(key)) {
                data[key] = element.textContent;
                }
            })
        })
        return data;
    };

    set taskData(data) {
        // HOWTO: <element>.taskData = data;
        this.shadowRoot.querySelectorAll('.task').forEach(element => {
            Object.entries(data).forEach(([key, value]) => {
                if (element.classList.contains(key)) {
                    element.textContent = value;
                }
            })
        });
    }
});

function renderTasks() {
    let tasks = dataController.getAllTasks()
    tasks.forEach(task => domController.createTaskElement(task))
};

function renderProjects() {
    let tasks = dataController.getAllTasks()
    let projects = []
    tasks.forEach(task => projects.push(task.project))
    domController.createProjectList(projects);
}

const init = (() => {
    // new task button setup
    document.querySelector('.new-task').addEventListener('click', _ => {
        domController.createTaskElement()
        // add the new empty task to localstorage
        dataController.saveAllTasks()
    });
    // load tasks from localstorage
    renderTasks();
    renderProjects();
})();