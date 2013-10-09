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

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

    initialize: function() {
        var self = this;
        // Three storage options (memory, HTML5 Local Storage, or WebSql):
        // this.store = new LocalStorageStore();
        // this.store = new WebSqlStore();
        this.store = new MemoryStore(function(){
          // Testing notification logic when memory store initialized.
          // self.showAlert('Memory Initialized', 'Info')

          // Render HTML for homeview instead of including in index.html
          self.renderHomeView()
        });
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },

    renderHomeView: function() {
        var html =
                "<div class='header'><h1>Home</h1></div>" +
                "<div class='search-view'>" +
                "<input class='search-key'/>" +
                "<ul class='employee-list'></ul>" +
                "</div>"
        $('body').html(html);
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }

};

app.initialize();
