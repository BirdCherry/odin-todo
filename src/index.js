import "./style.css";
import { domController } from "./modules/domController.js";
import { dataController } from "./modules/dataController.js";
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
        this.shadowRoot.addEventListener('input', _ => dataController.setTasks())

        // update project list
        this.shadowRoot.querySelector('.project').addEventListener('focusout', _ => domController.refreshProjectList(this.shadowRoot.querySelector('.project').textContent));

        // add user readable date
        const dateElement = this.shadowRoot.querySelector('.date')
        const timestamp = this.shadowRoot.querySelector('.timestamp').textContent
        const dateTimeOptions = {dateStyle: 'medium'}
        dateElement.textContent = new Intl.DateTimeFormat('default', dateTimeOptions).format(timestamp)
    }

    disconnectedCallback() {
        // remove event listeners
        this.shadowRoot.querySelector('.delete').removeEventListener('click', _ => this.deleteTask());
        this.shadowRoot.removeEventListener('input', _ => dataController.setTasks())

        // sync localstorage after deleting a task
        dataController.setTasks();

        // update ui
        renderProjects();
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

// custom DOM element: project-item
customElements.define("project-item", class extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', event => {
            domController.filterTasks(event.target)
        })
    }

    disconnectedCallback() {
        this.removeEventListener('click', event => {
            domController.filterTasks(event.target)
        })
    }
})

function renderTasks() {
    domController.refreshTaskList(dataController.getTasks())
};

function renderProjects() {
    let tasks = dataController.getTasks()
    let projectNames = tasks.map(item => item.project)
    domController.refreshProjectList(projectNames)
}

const init = (() => {
    // load tasks from localstorage, update project list
    renderTasks();
    renderProjects();
    // new task button setup
    document.querySelector('.new-task').addEventListener('click', _ => {
        domController.createEmptyTask()
        domController.filterTasks()
        // update localstorage
        dataController.setTasks()
    });
})();