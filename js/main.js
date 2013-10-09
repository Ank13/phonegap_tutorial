var app = {

    // A function named showAlert(). If navigator.notification is available,
    // use its alert() function. Otherwise, use the default browser alert() function
    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    registerEvents: function() {
        $(window).on('hashchange', $.proxy(this.route, this));
        var self = this;
        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchstart', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        }
    },

    initialize: function() {
        var self = this;
        this.detailsURL = /^#employees\/(\d{1,})/;
        this.registerEvents()

        // Compile the two Handlebar templates...no longer needed because done in views.
        // this.homeTpl = Handlebars.compile($("#home-tpl").html());
        // this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());

        // Three storage options (memory, HTML5 Local Storage, or WebSql):
        // this.store = new LocalStorageStore();
        // this.store = new WebSqlStore();
        this.store = new MemoryStore(function(){
          // Testing notification logic when memory store initialized.
          // self.showAlert('Memory Initialized', 'Info')

          // Display the Home View using the HomeView class
          // $('body').html(new HomeView(self.store).render().el);
          self.route();
        });

    },


    initialize: function() {
        var self = this;
        this.detailsURL = /^#employees\/(\d{1,})/;
        this.registerEvents();
        this.store = new MemoryStore(function() {
            self.route();
        });
    },

    // route() function to route requests to the appropriate view
    route: function() {
        var hash = window.location.hash;
        if (!hash) {
            $('body').html(new HomeView(this.store).render().el);
            return;
        }
        var match = hash.match(app.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                $('body').html(new EmployeeView(employee).render().el);
            });
        }
    }

};

app.initialize();
