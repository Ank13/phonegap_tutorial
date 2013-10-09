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
        var self = this;
        this.store.findByName($('.search-key').val(), function(employees) {
            // render result with Handlebar template
            $('.employee-list').html(self.employeeLiTpl(employees));
        });
    },

    initialize: function() {
        var self = this;

        // Compile the two Handlebar templates
        this.homeTpl = Handlebars.compile($("#home-tpl").html());
        this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());

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
        // render the Handlebar template
        $('body').html(this.homeTpl());
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }
};

app.initialize();
