class Api {
    constructor(options) {
      // constructor body
    }
  
    getInitialCards() {
      return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
        headers: {
          authorization: "c33e1742-60d8-486c-855a-2b76697489a8"
        }
      })
        .then(res => res.json())
    }
  
    // other methods for working with the API
  }
  