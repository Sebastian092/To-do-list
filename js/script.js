{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent},
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const bindEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const renderTasks = () => {

        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="task__item">
                <button class="js-done task__button task__button--done">${task.done ? "✔" : ""}</button> 
               <span class="task__content ${task.done ? "task__content--done" : ""}">${task.content}</span>
                <button class="js-remove  task__button task__button--delete">🗑️</button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {};
    const bindButtonsEvents = () => {};

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const inputElement = document.querySelector(".js-newTask");
        const newTaskContent = inputElement.value.trim()

        inputElement.value = "";
        inputElement.focus();

        if (newTaskContent === "") {
            return;
        };


        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form")
        form.addEventListener("submit", onFormSubmit);
    };

    init();
};