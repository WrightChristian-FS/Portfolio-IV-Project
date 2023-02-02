class Controller {
  constructor() {
      // Instantiate the MV
      console.log("Constructor Created");
      this.model = new Model();
      this.view = new View();
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
  
    // Fetch the api data
    fetch("https://randomuser.me/api/?results=10")

        // Capture the response
        .then(response => response.json())

        // Process the response
        .then(responseAsJson => {
            // Create an event to dispatch the event containing the JSON data
            const JSONData = new Event("display_userData");
            JSONData.userData = responseAsJson;
            document.dispatchEvent(JSONData);
        })
        
        // Catch the errors 
        .catch(error => {
            // [4. Capture errors]
            console.log("An Error Occurred:", error);
        });
}
}

class Model {
  constructor() {
      console.log("Model Created");
 
  }
}

class View {
  constructor() {
      console.log("View Created");
      document.addEventListener('display_userData', (e) => this.displayUserData(e));
  }

  displayUserData(e) {
    // This method will take the data passed from the JSON API and display the task items on boards
    console.log(e.userData)
  }

}

(() => {
  const app = Controller.getInstance();
})();