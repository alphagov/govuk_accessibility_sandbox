$('.typeahead').each(function applyTypeahead() {
  var $el = $(this);
  var $parent = $el.parent();
  $parent.addClass('hidden-hint');
  var attributes = $el.prop('attributes');
  var $input = $('<input/>');
  var selectedValue = $el.val();
  var typeaheadList = $el.find('option').map(function mapOptions() {
    if (this.value === '') {
      // remove any empty values from typeahead
      /*eslint consistent-return: 0*/
      return;
      /*eslint consistent-return: 1*/
    }
    return this.value;
  }).get();

  // remove the selectbox
  $el.remove();

  $.each(attributes, function applyAttributes() {
    $input.attr(this.name, this.value);
  });

  $input.removeClass('js-hidden');
  $input.addClass('form-control');
  $input.val(selectedValue);

  $parent.append($input);

  $input.typeahead({
    hint: false
  }, {
    source: new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: typeaheadList,
      sorter: function sorter(a, b) {
        var input = $input.val();
        var startsWithInput = function startsWithInput(x) {
          return (x.toLowerCase().substr(0, input.length) === input.toLowerCase()) ? -1 : 1;
        };

        var compareAlpha = function compareAlpha(x, y) {
          var less = (x < y) ? -1 : 1;
          return (x === y) ? 0 : less;
        };

        var compareStartsWithInput = function compareStartsWithInput(x, y) {
          var startsWithFirst = startsWithInput(x);
          var startsWithSecond = startsWithInput(y);

          return (startsWithFirst === startsWithSecond) ? 0 : startsWithFirst;
        };

        var first = compareStartsWithInput(a, b);

        return (first === 0) ? compareAlpha(a, b) : first;
      }
    }),
    limit: 100
  });
});
