const uiController = () => {
    const setFocus = (element, bool) => {
        console.log('set focus to element ' + element)
    };
    return { focus };
}

export { uiController };