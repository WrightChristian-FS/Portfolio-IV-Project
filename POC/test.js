class Controller {
    constructor() {
        // Instantiate the MV
        console.log("Constructor Created");
        this.model = new Model();
        this.view = new View();
  
        // Add an event listener to handle the onload function 
        document.onload = this.getList();
    }
  
    static getInstance() {
        if (!Controller._instance) {
            Controller._instance = new Controller();
            return Controller._instance
        } else {
            throw "Sorry can't start a second instance..."
        }
    }
  
    getList() {
  
        // Create the variables required to call the api 
        const api = 'https://flint-agreeable-word.glitch.me/api',
            access = '?accessToken=5b1064585f4ab8706d275f90';
  
        // Fetch the api data
        fetch(api + "/lists" + access)
  
            // Capture the response
            .then(response => response.json())
  
            // Process the response
            .then(responseAsJson => {
                // Create an event to dispatch the event containing the JSON data
                const JSONData = new Event("display_task");
                JSONData.boards = responseAsJson;
                document.dispatchEvent(JSONData);
  
                // Listen for button clicks 
                let newButton = document.querySelectorAll('button');
  
                newButton.forEach(button => {
                    button.addEventListener('click', (e) => {
                        let newTask = new Event("new_TaskPage");
                        newTask.taskID = button.id;
                        document.dispatchEvent(newTask);
                    })
                })
            })
            .catch(error => {
                // [4. Capture errors]
                console.log("An Error Occurred:", error);
            });
    }
  }
  
  class Model {
    constructor() {
        console.log("Model Created");
        document.addEventListener('create_task', (e) => this.newTask(e));
    }
  
  
  
    newTask(e) {
        // THIS METHOD WILL CREATE AND PASS THE TASK DATA TO THE GLITCH SERVER TO PROCESS AND ADD TO THE APPROPRIATE BOARD
  
        // Prepare the data to send to the server 
        let dataToSendToServer = {
            "title": e.taskTitle,
            "listId": Number(e.boardID),
            "description": e.taskDescription,
            "dueDate": e.taskDueDate
        }
  
  
        // console.log(dataToSendToServer);
        const config = {
            method: 'POST',
            body: JSON.stringify(dataToSendToServer),
            headers: {
                'content-type': 'application/json'
            }
        }
  
        // Create the variables required to call the api 
        const api = 'https://flint-agreeable-word.glitch.me/api',
            access = '?accessToken=5b1064585f4ab8706d275f90';
  
  
        // Fetch the api data
        fetch(api + "/items" + access, config)
  
            // Capture the response
            .then(response => response.json())
  
            // Process the response
            .then(responseAsJson => {
  
                // When the response is successful, reload the page to display the new information 
                location.reload();
  
            })
  
            .catch(error => {
                // [4. Capture errors]
                console.log("An Error Occurred:", error);
            });
  
            let taskConfirmation = new Event("request_confirmation"); 
            document.dispatchEvent(taskConfirmation); 
  
  
    }
  
  }
  
  class View {
    constructor() {
        console.log("View Created");
  
        document.addEventListener('display_task', (e) => this.displayTask(e));
        document.addEventListener('new_TaskPage', (e) => this.newTaskPage(e));
        document.addEventListener("request_confirmation", () => this.taskConfirmation());
  
  
    }
  
    displayTask(e) {
        // This method will take the data passed from the JSON API and display the task items on boards
  
        let pageBody = document.querySelector('body');
        let mainSection = document.createElement('main');
  
        // ********** APP HEADER **********
        const appHeader = document.createElement('header');
        appHeader.classList.add('page-header')
  
        let H1 = document.createElement('h1');
        let H1Text = document.createTextNode('Wright Board');
        H1.append(H1Text);
  
  
        // Create the Switch to toggle the light/dark mode 
        let switchDiv = document.createElement('div');
        switchDiv.setAttribute('id', "switch-div");
  
        switchDiv.innerHTML = `
         <label id="theme-switch-label">Theme</label>
         <input type="checkbox" id="theme-switch">
        `;
  
        // <button id="theme-switch-button"></button>
  
  
        appHeader.append(H1);
        pageBody.append(appHeader);
        pageBody.append(switchDiv);
        pageBody.append(mainSection)
  
  
        // ********** APP MAIN **********
  
        // CREATE BOARDS
        e.boards.forEach(element => {
  
            // ******************** SECTION/BOARD ********************
            let sectionContainer = document.createElement('section');
            sectionContainer.classList.add("board");
            mainSection.append(sectionContainer);
  
            // Section Header
            let sectionHeader = document.createElement('header');
            sectionHeader.classList.add('board-header');
            sectionHeader.innerHTML = `
                    <h2>${element.title}</h2>
                    <button id=${element.id} class="addRequest" class="new-task-request">New Task</button>
            `;
  
            // Append the main to add the section headers 
            sectionContainer.append(sectionHeader);
            // mainSection.append(sectionContainer);
  
            element.items.forEach(task => {
  
                // // Article
                let taskArticle = document.createElement('article');
                taskArticle.setAttribute('id', task.id);
  
                taskArticle.innerHTML = `
                     <h3> ${task.title}</h3> 
                     <p> ${task.description}</p>
                     <p>${task.dueDate}</p>
                  `;
  
                sectionContainer.append(taskArticle)
            })
  
            mainSection.append(sectionContainer);
  
  
            // switchDiv.addEventListener("click", () => {
            //     console.log("Theme Switch Requested");
            // })
        });
  
  
        switchDiv.addEventListener("click", () => {
  
            // Set the local storage
  
            let themeContain = document.querySelector("#switch-div");
            let key = "theme";
            let value = document.querySelector("#theme-switch").checked;
  
            localStorage.setItem(key, value);
  
            this.switchTheme();
  
        })
  
        
  
  
    }
  
    newTaskPage(e) {
  
        // Hide the main content 
        let mainBody = document.querySelector('body');
        let mainBoard = document.querySelector('main');
  
        let popUp = document.createElement('section');
        popUp.classList.add('form-section');
        mainBody.append(popUp);
  
        // Section Header
        let formHeader = document.createElement('header');
        formHeader.classList.add('form-header');
        formHeader.setAttribute('id', 'form-header');
        formHeader.innerHTML = `
                 <h2>New Task</h2>
                 <h4> Please enter the details of your new task </h4>
         `;
  
        popUp.append(formHeader);
  
  
        //  Add the main form to the page 
        let taskForm = document.createElement('form');
        taskForm.setAttribute('id', 'task-form-data');
  
        taskForm.innerHTML = `
        
        <fieldset id="new-task-form">
        <legend>New Task</legend>
        <label for="title" id="task-title-label">Task Title</label>
        <input type="text" name="title" id="task-title" placeholder="Walk Dog" required> 
        <label for="description" id="task-description-label">Details</label>
        <textarea id="task-description" name="description"cols="30" rows="10" placeholder="Walk the dog after dinner" required></textarea>
        <label for="date" id="task-due-date-label">Due Date</label>
        <input type="date" id="task-due-date' name="date" placeholder="10/10/2022"  required> 
        </fieldset>
        `;
  
        let buttonSection = document.createElement('section');
        buttonSection.classList.add('button-group')
        buttonSection.innerHTML = `
        <button id="add-task">Add Task</button>
        <button id="cancel-button">Cancel</button>
        `
        popUp.append(taskForm);
        popUp.append(buttonSection);
  
        let addBtn = document.querySelector('#add-task');
        let boardID = e.taskID;
  
        let cancelBtn = document.querySelector("#cancel-button");
  
  
        addBtn.addEventListener('click', (e) => {
            (e).preventDefault;
  
            // Gather the data provided from the user in the form 
            let taskTitle = document.querySelector('#task-title').value;
            let taskDescription = document.querySelector('#task-description').value;
            let taskDueDate = document.querySelector('input[type="date"]').value;
  
            // Dispatch an event with the required information 
            let newTaskData = new Event("create_task");
            newTaskData.boardID = boardID;
            newTaskData.taskTitle = taskTitle;
            newTaskData.taskDescription = taskDescription;
            newTaskData.taskDueDate = taskDueDate;
            // document.dispatchEvent(newTaskData);
  
  
            // Create a variable to hold the bool for valid inputs 
            let validInputs = this.validateInput(newTaskData);
  
            //If statement to process and dispatch the event. 
            if (validInputs === true) {
                document.dispatchEvent(newTaskData);
                console.log("Dispatching events")
                mainBody.removeChild(popUp);
  
                // Display animation to confirm that the tsk was created 
                // this.taskConfirmation(); 
            }
  
  
  
        });
  
  
        cancelBtn.addEventListener('click', (e) => {
            mainBody.removeChild(popUp);
        })
  
  
    }
  
    validateInput(e) {
        // This method validate the input provided with the request for a new 
  
        let passedValidation = true;
  
        // Create variables to hold the required 
        let newTaskForm = document.querySelector("#new-task-form");
  
        let taskTitleLabel = document.querySelector("#task-title-label");
        let taskTitleInput = document.querySelector("#task-title");
  
        let taskDescriptionLabel = document.querySelector("#task-description-label");
        let taskDescriptionInput = document.querySelector("#task-description");
  
        let taskDueDateLabel = document.querySelector("#task-due-date-label");
        let taskDueDateInput = document.querySelector("#task-due-date");
  
        let pageHeader = document.querySelector(".page-header");
        
  
        // Create an array to hold the values of the failed input 
        let missingData = new Array();
  
  
        // Check taskTitle 
        if (e.taskTitle == null || e.taskTitle.trim() == "") {
            passedValidation = false;
            taskTitleLabel.classList.add("label-validation-error");
            taskTitleInput.classList.add("validation-error");
            missingData.push("Task Title");
        }
        else {
            passedValidation = true;
            taskTitleLabel.classList.remove("label-validation-error");
            taskTitleInput.classList.remove("validation-error");
        }
  
  
        // Check Description 
        if (e.taskDescription == null || e.taskDescription.trim() == "") {
            passedValidation = false;
            taskDescriptionLabel.classList.add("label-validation-error");
            taskDescriptionInput.classList.add("validation-error");
            missingData.push("Task Description");
        }
        else {
            passedValidation = true;
            taskDescriptionLabel.classList.remove("label-validation-error");
            taskDescriptionInput.classList.remove("validation-error");
        }
  
        // Check Due Date 
        if (e.taskDueDate == null || e.taskDueDate == "") {
            console.warn("Please Fill All Required Field");
            passedValidation = false;
            missingData.push("Task Due Date")
        }
        else {
            passedValidation = true;
        }
  
        // Add missing data to a list to display to the user 
        let missingDataMessage = document.createElement('h3');
        missingDataMessage.classList.add("warning-message");
        missingDataMessage.textContent = "Please fill in the following required fields"
  
        // Create am unordered list to hold the list items that will be used to display the missing data
        let missingDataList = document.createElement("ul");
        missingDataList.classList.add("missing-data-list");
  
        // Add the missing data from the array to the ul 
        missingData.forEach(option => {
  
            // Create an li element with the value of the item in the array
            let missingTaskItemType = document.createElement("li");
            missingTaskItemType.classList.add("missing-list-item-warning");
  
            // Set the value of the li item to the option from the array
            missingTaskItemType.textContent = option;
  
            // Add the li to the missing data array 
            missingDataList.append(missingTaskItemType);
        })
  
        // Create a variable to hold the form header
        let formHeaderElement = document.querySelector('#form-header');
  
        // Add the message and items to the form 
        formHeaderElement.append(missingDataMessage);
        formHeaderElement.append(missingDataList);
  
    
        return passedValidation;
    }
  
    switchTheme(e) {
  
        // Create a variable to hold the switch is checked or not 
        let themeSelector = document.querySelector("#theme-switch").checked;
  
        // Set variables to hold the different elements of the application 
        let mainBody = document.querySelector("body");
        let pageHeader = document.querySelector(".page-header");
        let themeDiv = document.querySelector("#switch-div");
        let boardHeader = document.querySelectorAll("section header");
        let boardArticles = document.querySelectorAll("article");
  
        // Create an array to hold most of the elements that do not have multiple elements returned 
        // let applicationElements = [mainBody, pageHeader, themeDiv]; 
  
        if (themeSelector) {
            // Add the dark theme
            mainBody.classList.add("body-dark-theme");
  
            boardHeader.forEach(board => {
                board.setAttribute("id", "dark-theme-board-header");
            })
  
            boardArticles.forEach(board => {
                board.setAttribute("id", "dark-theme-articles");
            })
  
        } else {
            // Remove the dark theme
            mainBody.classList.remove("body-dark-theme");
  
  
            boardHeader.forEach(board => {
                board.removeAttribute("id", "dark-theme-board-header");
            })
  
            boardArticles.forEach(board => {
                board.removeAttribute("id", "dark-theme-articles");
            })
  
  
        }
  
    }
  
    taskConfirmation(){ 
        // A method to store and activate an animation when a task is created sucessfully. 
  
        
        let pageBody = document.querySelector(".page-header"); 
  
            let confirmationAnimationContainer = document.createElement('div'); 
            confirmationAnimationContainer.setAttribute('id', "confirmation-div"); 
    
            let confirmMessage = document.createElement("h3"); 
            confirmMessage.textContent = "New Task Created"; 
    
            confirmationAnimationContainer.append(confirmMessage);
    
            pageBody.append(confirmationAnimationContainer); 
        
       
  
    }
  
  
  }
  
  (() => {
    const app = Controller.getInstance();
  })();