Template.mainLayout.events({
    "click .logout": function(event, template) {
        Meteor.logout();
        Router.go('article.list');
    }
});

Template.mainLayout.helpers({
  isAdmin: function (name) {
    return (name === "toto");
  }
});
