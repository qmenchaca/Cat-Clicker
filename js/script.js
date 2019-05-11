$(function(){

  var model = {
    currentCat: null,
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
    },

    setName: function(cat,str) {
      cat.name = str;
    },

    prettyName: function(cat) {
      return cat.name.replace(/ /g,'_');
    }

  };

  var octopus = {
    init: function() {
      for (var i = 0; i < model.catList.length; i++) {
        var this_name = model.catList[i].name
        var link_id = 'link_' +  model.prettyName(model.catList[i]);
        $cat_button = $('<li ><a href="#" id=' + link_id + '>' + this_name + '</a></li>');
  
  
        $($cat_button).click({cat: model.catList[i]}, function(event) {
          view.display_cat(event.data.cat);
        });
        $(".cat-list").append($cat_button);
      };
      view.init();
      octopus.setCat(model.catList[0]);

      octopus.hideAdmin();
      //octopus.setAdminButton();
      //octopus.updateCatDeets();
    },

    increment_cat: function(cat) {
      model.incrementCount(cat);
      view.display_cat(cat);
    },

    setCat: function(cat) {
      model.currentCat = cat;
    },

    getCat: function() {
      return model.currentCat;
    },

    showAdmin: function() {
      $('.admin-section')[0].style.display = "block"
    },

    hideAdmin: function() {
      $('.admin-section')[0].style.display = "none"
    },

    setAdminButton: function() {
        curr_cat = octopus.getCat();
        $('.admin-button').click({cat: curr_cat}, function(event) {
          var cat_name= $('.name-form');
          cat_name.val(event.data.cat.name);

          var cat_path= $('.url-form');
          cat_path.val(event.data.cat.path);

          var cat_count= $('.count-form');
          cat_count.val(event.data.cat.counter);

          octopus.showAdmin();
        });
    },

    updateCatDeets: function() {
        $('.update-button').click({cat: curr_cat}, function(event) {
          curr_cat = octopus.getCat();

          old_nice_name = model.prettyName(curr_cat);
          var cat_name= $('.name-form');
          model.setName(curr_cat,cat_name.val());

          var cat_path= $('.url-form');
          curr_cat.path = cat_path.val();

          var cat_count= $('.count-form');
          curr_cat.counter = parseInt(cat_count.val());

          octopus.hideAdmin();
          var this_id = 'link_' + old_nice_name;
          $('#' + this_id).text(cat_name.val());
          $('#' + this_id).attr('id','link_' + cat_name.val());

          updated_cat = octopus.getCat();
          view.display_cat(curr_cat);
        });
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

      octopus.setCat(cat);
      octopus.setAdminButton();
      octopus.updateCatDeets();
    
    }
  };


  octopus.init();



  $('#content').on('click', '.pic', function(e) {
  
      $cat_obj = octopus.getCat();
      octopus.increment_cat($cat_obj);
  
  });

});






