import style from "./style.css";
import { domController } from "./modules/domController.js";
import { dataController } from "./modules/dataController.js";
// TODO: add trash icon
// TODO: add star icon (pin to top)


// custom DOM element: task-box
class taskboxElement extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('task-box');
        // attach a shadow root to the element
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // use this to add content to element?
        console.log('connectedCallback')
        // TODO: look for input and save it
        this.shadowRoot.addEventListener('input', input => {
            console.log(input.target)
        });

        // TODO: look for click on close button and delete task
        this.shadowRoot.querySelector('.delete').addEventListener('click',
            click => this.deleteTask());


        // TODO: mutationObserver? or is it really needed here?
        // const observer = new MutationObserver(callback)
    }

    disconnectedCallback() {
        // use this to do stuff when the element gets removed?
        // remove event listeners? Or do they get purged automatically? I think so
        console.log('disconnectedCallback')

        this.shadowRoot.removeEventListener('input', input => {
            console.log(input.target)
        });
    }

    deleteTask() {
        console.log('delete task')
        // TODO: delete data from array as well (do this in disconnectedCallback?)
        if (confirm("Delete this task?")) {
            this.remove();
        }

    }

    get taskData() {
        // TODO: read task data and return it as an object?
        let data = {
            title: '',
            text: '',
            project: '',
            date: '',
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
        // TODO: insert data to correct spots
        let {title, text, project, date} = data; // is destructuring needed?

    }

}

customElements.define("task-box", taskboxElement);

const init = (() => {
    // new task button setup
    document.querySelector('.new-task').addEventListener('click', click => domController.createTask())
})();