const dataController = (() => {
    // update data
    // provide data
    // save data to local storage
    const taskList = () => {
        if (typeof taskList === 'undefined') {
            return taskList = [];
        } // else if local storage exists, copy from there. else if tasklist exists and has stuff, do nothing
    }
    

    return { taskList };
})();

export { dataController };