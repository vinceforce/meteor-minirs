AutoForm.hooks({
    'insertCategory': {
        onSubmit: function(doc){ // Gestion du formulaire d'inscription
            console.log(doc);
            var error = null;
            var name = doc.name;
            Categories.insert(doc, function(err){
                if(err){
                    error = new Error("Une erreur s'est produite");
                }
            });

            if(error === null){
                this.done(); // Appelle onSuccess
            }
            else{
                this.done(error); // Appelle onError
            }

            return false; // Dans tout les cas, arrete la soumission des donneés.
        },

        onSuccess: function(){
            Router.go(Utils.pathFor('article.list'));
        },

        onError: function(formType, err){
            alert(err.reason);
        }

    },
    'editCategory': {
        onSubmit: function(doc){ // Gestion du formulaire d'inscription
            console.log(doc);
            var error = null;
            var name = doc.name;
            Categories.update({_id: doc._id}, {name: name}, function(err){
                if(err){
                    error = new Error("Une erreur s'est produite");
                }
            });

            if(error === null){
                this.done(); // Appelle onSuccess
            }
            else{
                this.done(error); // Appelle onError
            }

            return false; // Dans tout les cas, arrete la soumission des donneés.
        },

        onSuccess: function(){
            Router.go(Utils.pathFor('article.list'));
        },

        onError: function(formType, err){
            alert(err.reason);
        }

    }
});
