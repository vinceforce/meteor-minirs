UI.registerHelper('getGlobal', function(varName) {
    return Globals[varName];
});

UI.registerHelper('setTitle', function(title){
    if(!title){
        title = Globals.appName;
    }
    else{
        title += " - " + Globals.appName;
    }

    document.title = title;
});

UI.Template.registerHelper('isEqual', function(val1, val2){
  return (val1 == val2);
});

UI.Template.registerHelper('isAdmin', function(user){
  if (user) {
    var roles = user.roles;
    var bIsAdmin = false, ii=0;
    for (ii=0; ii<roles.length; ii++) {
      if (roles[ii]==='admin') {
        bIsAdmin = true;
      }
    }
    return bIsAdmin;
  }
  else {
    return false;
  }
});
//
// UI.Template.registerHelper('isCurrentUser', function(userID){
//   // Cas administrateur : on peut prendre la main comme si on était l'auteur
//   var cU = Meteor.users.findOne({'_id': Meteor.userId()});
//   var roles = cU.roles;
//   var bIsAdmin = false, ii=0;
//   for (ii=0; ii<roles.length; ii++) {
//     if (roles[ii]==='admin') {
//       bIsAdmin = true;
//     }
//   }
//   return ((userID == Meteor.userId())||bIsAdmin);
// });

UI.Template.registerHelper('isCurrentUser', function(userID){
  return (userID == Meteor.userId());
});

UI.Template.registerHelper('getCurrentUserID', function(){
  return Meteor.userId();
});
