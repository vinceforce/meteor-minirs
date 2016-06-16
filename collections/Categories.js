Categories = new Mongo.Collection('categories');

Categories.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Nom"
    }
}));

Categories.allow({
    insert: function(){return true;},
    update: function(){return true;},
    remove: function(){return true;}
});
