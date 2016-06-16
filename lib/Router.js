Router.configure({
    layoutTemplate: "mainLayout"
});

Router.route('/', {
    name: "home",
    template: "home"
});

Router.route('/register', {
    name: "user.register",
    template: "register"
});

Router.route('/login', {
    name: "user.login",
    template: "login"
});

Router.route('/article/list', {
    name: "article.list",
    template: "listArticles",
    data: function(){
		var articles = Articles.find();

		return {
			articles: articles
		};
	},
	waitOn: function(){
		return Meteor.subscribe("allArticles");
	}
});

Router.route('/article/byauthor/:_author', {
    name: "article.byAuthor",
    template: "articleByAuthor",
    data: function(){
      var authorId = this.params._author;
      var author = Meteor.users.findOne({_id: authorId});
      // console.log(author);
      var authorUserName = author.username;
  		var articles = Articles.find({author: authorId});
  		return {
  			authorUserName: authorUserName,
        articles: articles
  		};
	 },
	  waitOn: function(){
  		return [
        Meteor.subscribe("showAuthors"),
        Meteor.subscribe("articleByAuthor", this.params._author)
      ];
  	}
});


Router.route('/article/bycategory/:_category', {
    name: "article.byCategory",
    template: "articleByCategory",
    data: function(){
      var categoryId = this.params._category;
      var category = Categories.findOne({_id: categoryId});
      // console.log(author);
      var categoryName = category.name;
  		var articles = Articles.find({categories: categoryId});
  		return {
  			categoryName: categoryName,
        articles: articles
  		};
	 },
	  waitOn: function(){
  		return [
        Meteor.subscribe("allCategories"),
        Meteor.subscribe("articleByCategory", this.params._category)
      ];
  	}
});


Router.route('/article/create', {
    name: "article.create",
    template: "createArticle",
    waitOn: function(){
      return  Meteor.subscribe("allCategories");
  	}
});

Router.route('/article/show/:_id', {
    name: "article.show",
    template: "showArticle",
    data: function(){
      // console.log('avant '+this.params._id);
  		var article = Articles.findOne({'_id': this.params._id});
      // console.log(article);
      var catArticle = article.categories;
      // console.log(catArticle);
      var category = Categories.findOne({'_id': catArticle});
      var categoryName = category.name;
      articleAuthor = article.author;
      var authorUser = Meteor.users.findOne({'_id': articleAuthor});
      var authorUserName = authorUser.username;
  		return {
  			article: article,
        category: categoryName,
        authorUserName: authorUserName
  		};
	  },
  	waitOn: function(){
  		return [
        Meteor.subscribe("showArticle", this.params._id),
        Meteor.subscribe("allCategories"),
        Meteor.subscribe("showAuthors")
      ];
  	}
});

Router.route('/article/edit/:_id', {
    name: "article.edit",
    template: "editArticle",
    data: function(){
		var article = Articles.findOne({_id: this.params._id});
    var categories = Categories.find();
		return {
			article: article
		};
	},
	waitOn: function(){
    return [
      Meteor.subscribe("editArticle", this.params._id),
      Meteor.subscribe("allCategories")
    ];
	}
});

Router.route('/article/delete/:_id', {
    name: "article.delete",
    action: function(){
		Articles.remove({_id: this.params._id}, function(err){
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

            return true; // Dans tout les cas, arrete la soumission des donneés.);
	},
	waitOn: function(){
		return Meteor.subscribe("editArticle", this.params._id);
	},
    onSuccess: function(){
        Router.go(Utils.pathFor('article.list'));
    },
    onError: function(){
        alert(error.reason)
    }
});


Router.route('/categories/create', {
    name: "categories.create",
    template: "createCategory"
});

Router.route('/categories/edit/:_id', {
    name: "categories.edit",
    template: "editCategory",
    data: function(){
		var category = Categories.findOne({_id: this.params._id});

		return {
			category: category
		};
	},
	waitOn: function(){
		return Meteor.subscribe("editCategory", this.params._id);
	}
});

Router.route('/categories/list', {
    name: "categories.list",
    template: "listCategories",
    data: function(){
		var categories = Categories.find();

		return {
			categories: categories
		};
	},
	waitOn: function(){
		return Meteor.subscribe("allCategories");
	}
});

Router.route('/categories/delete/:_id', {
    name: "categories.delete",
    action: function(){
		Categories.remove({_id: this.params._id}, function(err){
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

            return true; // Dans tout les cas, arrete la soumission des donneés.);
	  },
	  waitOn: function(){
		   return Meteor.subscribe("editCategory", this.params._id);
	  },
    onSuccess: function(){
        Router.go(Utils.pathFor('article.list'));
    },
    onError: function(){
        alert(error.reason)
    }
});
