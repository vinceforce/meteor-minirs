SimpleSchema.debug = true;
Articles = new Mongo.Collection("articles");

// Création du schéma des articles
Articles.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Titre",
        max: 200
    },
    categories: {
        type: String,
        label: "Catégories",
        optional:true,
        autoform: {
            type: "select2",
            options: function() {
                var cats = Categories.find().fetch(); // Tableau de catégories
                var optTab = [];

                for (var i in cats) {
                    optTab[i] = {};
                    optTab[i].label = cats[i].name;
                    optTab[i].value = cats[i]._id;
                }

                return optTab;
            }
        }
    },
    content: {
        type: String,
        label: "Contenu",
        autoform: {
            afFieldInput: {
                type: "textarea",
                class: "ckeditor",
                rows: 15
            }
        }
    },
    published: {
        type: Boolean,
        label: "Publication",
        optional: true
    },
    createdAt: {
        type: Date,
        autoform: {
            omit: true
        },
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            }
            else {
                this.unset();
            }
        }
    },
    lastUpdate: {
        type: Date,
        optional: true,
        autoform: {
            omit: true
        },
        autoValue: function() {
            if (this.isUpdate) {
                return new Date;
            } else {
                this.unset();
            }
        }
    },
    author: {
        type: String,
        autoform: {
            omit: true
        },
        autoValue: function() {
            if (this.isInsert) {
                return Meteor.userId();
            } else {
                this.unset();
            }
        }
    },
    noModif: { // Permet de savoir si un article a déjà été publié une fois ou non (Permet de définir s'il faut envoyer ou non des notifications)
        type: Boolean,
        autoform: {
            omit: true
        },
        autoValue: function() {

            if(this.isInsert){
                if(this.field('published').value){
                    return false;
                }
                return true;
            }
            else{
                var noModif = Articles.findOne(this.docId, {fields: {noModif: 1}}).noModif;
                if(noModif === undefined){
                    noModif = true;
                }

                if(this.field('published').isSet && this.field('published').value === true){

                    return false;
                }
                else{
                    return noModif;
                }
            }

        }
    }

}));

Articles.allow({
    insert: function(){return true;},
    update: function(){return true;},
    remove: function(){return true;}
});
