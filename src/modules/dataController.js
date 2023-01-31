const dataController = (() => {
    // handle local storage

    const DEFAULT_DATA = [
    { title: 'Title 1', text: 'Text 1', project: 'Project 1', date: 'Date 1', },
    { title: 'Title 2', text: 'Text 2', project: 'Project 2', date: 'Date 2', },
    { title: 'Title 3', text: 'Text 3', project: 'Project 3', date: 'Date 3', },
    ];

    const saveData = () => {
        //set?
    }
    
    const loadData = () => {
        //get?
        //load from local storage
        //if not available, load default data?
    }

    return { DEFAULT_DATA };
})();

export { dataController };