$(function(){

  var model = {
    catList: [
              {name:"Dave", counter:0, path:"Dave.jpg"},
              {name:"Rocky", counter:0, path:"Rocky.jpg"},
              {name:"Craig", counter:0, path:"Craig.jpg"},
              {name:"Jeremiah Tumbleweed", counter:0, path:"Jeremiah Tumbleweed.jpg"},
              {name:"Wolf and Sahvan", counter:0, path:"Wolf and Sahvan.jpg"},
              {name:"Honus", counter:0, path:"Honus.jpg"}
              ],

    incrementCount: function(cat) {
      cat.counter += 1;
    }
  };

  var octopus = {
    init: function() {
      for (var i = 0; i < model.catList.length; i++) {
        var this_id = 'button_' + i;
        $cat_button = $('<li id=${this_id}><a href="#">' + model.catList[i].name + '</a></li>');
  
  
        $($cat_button).click({cat: model.catList[i]}, function(event) {
          view.display_cat(event.data.cat);
        });
        $(".cat-list").append($cat_button);
      };
      view.init();
    },

    increment_cat: function(cat) {
      model.incrementCount(cat);
      view.updateCat(cat);
    }


  };

  var view = {
    init: function() {
      view.display_cat(model.catList[0]);
    },

    display_cat: function(cat) {
      var body = document.getElementById("content");

      body.getElementsByClassName("name")[0].textContent = cat.name;
      body.getElementsByClassName("pic")[0].src= 'pictures/' + cat.path;
      body.getElementsByClassName("cl-text")[0].textContent = "You have clicked on " + cat.name + " " + cat.counter + " times.";

      $("#content").data("cat_obj", cat);
    
    },

    updateCat: function(cat) {
      var body = document.getElementById("content");
      body.getElementsByClassName("cl-text")[0].textContent = "You have clicked on " + cat.name + " " + cat.counter + " times.";
    }
  };

  octopus.init();


  $('#content').on('click', '.pic', function(e) {
  
      var $cat_obj = $(this).parent().data("cat_obj");
  
      octopus.increment_cat($cat_obj);
  
  });

});






