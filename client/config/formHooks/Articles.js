AutoForm.hooks({
    'insertArticle': {
        onSubmit: function(doc){ // Gestion du formulaire d'inscription
            console.log(doc);
            var error = null;
            var title = doc.title;
            var content = doc.content;
            var categories = doc.categories;
            Articles.insert(doc, function(err){
                if(err){
                    error = new Error("insertArticle - Une erreur s'est produite");
                }
            });

            if(error === null){
                this.done(); // Appelle onSuccess
            }
            else{
                this.done(error); // Appelle onError
            }

            return false; // Dans tous les cas, arrete la soumission des donneés.
        },

        onSuccess: function(){
            Router.go(Utils.pathFor('article.list'));
        },

        onError: function(formType, err){
            alert(err.reason);
        }

    },
    'editArticle': {
        onSubmit: function(doc){ // Gestion du formulaire d'inscription
            console.log(doc);
            var error = null;
            var title = doc.title;
            var content = doc.content;
            var categories = doc.categories;
            Articles.update({_id: doc._id}, {title: title, content: content, categories: categories}, function(err){
                if(err){
                    error = new Error("editArticle - Une erreur s'est produite");
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
            alert('err.reason' + err.reason);
        }

    }
});
