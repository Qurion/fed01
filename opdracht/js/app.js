(function() {

// Model van beer, met default waarde die empty zijn
  let BeersModel = Backbone.Model.extend({
    defaults: () => {
      return {
        beer: "",
        brewery: "",
        country: "",
        rating: "",
        img: ""
      }
    }
  });


//  Collection met sort waarbij ook de JSON met vershillende bieren wordt aangeroepen
  let BeersCollection = Backbone.Collection.extend({
    model: BeersModel,
    comparator: "brewery",
    url: "https://api.myjson.com/bins/rg0sf"
  });

// Selecteert element waar de view naar toe moet
  let BeersView = Backbone.View.extend({
    el: ".beer_body",

    collection: new BeersCollection(),
    // Init
    initialize: function() {
      let scope = this;
      //Fetched collection
      this.collection.fetch({
        success: () => {
          scope.render();
        }
      });
    },

    render: function() {
      let scope = this;
      this.collection.forEach((model) => {
        scope.output(model);
      });
      return this;
    },
// Elementen worden gecreërt met data uit json file
    output: function(model) {
      let beerContainer = document.createElement("div");
      beerContainer.className = "beerItem";
      beerContainer.innerHTML = "<h2>" + model.get("beer") + "</h2>\
                       <h3>" + model.get("brewery") + "</h3>\
                       <p>" + model.get("country") + "</p>\
                       <p>" + model.get("rating") + " / 5" +"</p>\
                       <img src=" + model.get("img") + " />";
      this.el.appendChild(beerContainer);
    }

  });

// Render van nieuwe view
  let app = new BeersView();

})();
