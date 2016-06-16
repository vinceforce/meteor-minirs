Meteor.publish("allArticles", function(){
    return Articles.find({}, {
        fields: {content: 0}, sort: {createdAt: -1}
    });
});

Meteor.publish("showArticle", function(_id){
    return Articles.find({'_id': _id});
});

Meteor.publish("showAuthors", function(){
    return Meteor.users.find({});
});

// Meteor.publish("showAuthor", function(_id){
//     return Meteor.users.findOne({'_id': _id});
// });

Meteor.publish("editArticle", function(_id){
    return Articles.find({'_id': _id});
});

Meteor.publish("articleByAuthor", function(_id){
    return Articles.find({'author': _id}, {
        sort: {createdAt: -1}
    });
});

Meteor.publish("articleByCategory", function(_id){
    return Articles.find({'categories': _id}, {
        sort: {createdAt: -1}
    });
});


Meteor.publish("allCategories", function(){
    return Categories.find({});
});

Meteor.publish("editCategory", function(_id){
    return Categories.find({'_id': _id});
});
