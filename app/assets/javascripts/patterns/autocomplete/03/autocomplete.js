(function (GOVUK) {
  var Autocomplete,
      autocomplete,
      countries = GOVUK.countries,
      ENTER = 13;

  // Constructor to give a textbox autocomplete functionality
  Autocomplete = function ($input) {
    this.$input = $input;
    this.menuIsShowing = false;
    this.$input.typeahead({
      hint: false,
      name: 'countries',
      local: countries,
      template: this.compiledTemplate,
      engine: Mustache,
      limit: 5
    });
  };
  Autocomplete.prototype.getMenuId = (function () {
    var id = 0;

    return function () {
      id = id + 1;
      return Autocomplete.menuIdPrefix + '-' + id;
    };
  }());
  Autocomplete.menuIdPrefix = 'typeahead-suggestions';
  Autocomplete.prototype.compiledStatusText = Mustache.compile(
    '{{results}} {{#describe}}{{results}}{{/describe}} available, use up and down arrow keys to navigate.'
  );
  Autocomplete.prototype.compiledTemplate = Mustache.compile('<p role="presentation" id="{{name}}">{{value}}</p>');
  Autocomplete.prototype.updateStatus = function (suggestions) {
    var statusText;

    if (suggestions.length > 0) {
      statusText = this.compiledStatusText({ 
        'results' : suggestions.length, 
        'describe' : function () {
          return function (results) {
            if (this.results > 1) {
              return 'results are';
            } else {
              return 'result is';
            }
          }
        }
      });
      this.$status.text(statusText);
    }
  };
  Autocomplete.prototype.events = {
    onInitialized : function (e) {
      var AutocompleteObj = this.getAutocompleteObj($(e.target)),
          menuId = this.getMenuId();

      this.$menu = this.$input.parent().find('.tt-dropdown-menu');
      this.$status = $('<span role="status" aria-live="polite" class="typeahead-status visuallyhidden" />');
      this.$status.insertAfter(this.$input);
      this.$input.attr({
        'aria-Autocomplete' : 'list',
        'aria-haspopup' : menuId
      });
      this.lastInputValue = this.$input.val();
      this.$menu
        .css('width', this.$input.innerWidth() + 'px')
        .attr('id', menuId);
      this.$input.on('keydown', function (e) { 
        var keypressed = e.which,
            currentInputValue = $(this).val();

        if (keypressed === ENTER) {
          return AutocompleteObj.events.onEnter.call(AutocompleteObj, e); 
        }
        return true;
      });
    },
    onMenuOpen : function () {
      this.menuIsShowing = true;
    },
    onMenuClosed : function () {
      this.menuIsShowing = false;
    },
    onMoveTo : function (e, countryObj) {
      var idOfSelected = (countryObj !== null) ? countryObj.value : "";
      this.$input.attr('aria-activedescendant', idOfSelected);
    },
    onEnter : function (e) {
      if (this.menuIsShowing) {
        this.$menu.hide();
        this.menuIsShowing = false;
        return false;
      } 
      return true;
    },
    onUpdate : function (e, suggestions) {
      this.updateStatus(suggestions);
    }
  };
  Autocomplete.prototype.getAutocompleteObj = function ($input) {
    return GOVUK.autocompletes.existingObj($input);
  };

  // Object to control all autocompletes in the page
  autocompletes = {
    $currentInput : null,
    cache : {},
    methods : {
      'initialized' : 'onInitialized',
      'opened' : 'onMenuOpen',
      'closed' : 'onMenuClosed',
      'movedto' : 'onMoveTo',
      'updated' : 'onUpdate'
    },
    existingId : function ($input) {
      var inputId = $input.attr('id');

      if (typeof this.cache[inputId] !== 'undefined') {
        return inputId;
      }
      return false;
    },
    existingObj : function ($input) {
      return this.cache[$input.attr('id')];
    },
    createEvent : function (eventName) {
      var autocompletesObj = this;

      return {
        'trigger' : function (e) {
          var existingObj = autocompletesObj.existingObj($(e.target)),
              method = autocompletesObj.methods[eventName];

          if (existingObj) {
            existingObj.events[method].apply(existingObj, arguments);
          }
        }
      };
    },
    add : function ($input) {
      var existingId = this.existingId($input);

      if (!existingId) {
        this.cache[$input.attr('id')] = new GOVUK.Autocomplete($input);
      }
    },
    remove : function ($input) {
      var existing = this.existingId($input);

      $input.typeahead('destroy');
      if (existing) { delete this.cache[existing]; }
    }
  };

  GOVUK.Autocomplete = Autocomplete;
  GOVUK.autocompletes = autocompletes;
})(window.GOVUK);
