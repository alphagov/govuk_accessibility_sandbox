$(document).ready(function() {

    $('.country-autocomplete').each(function (idx, elm) {
        GOVUK.autocompletes.add($(elm));
    });

    // Custom events

    // Bind all autocomplete events
    $.each(['initialized', 'opened', 'closed', 'movedto', 'updated'], function (idx, evt) {
        $(document).bind('typeahead:' + evt, function () {
            var autocompleteEvent = GOVUK.autocompletes.createEvent(evt);

            autocompleteEvent.trigger.apply(GOVUK.autocompletes, arguments);
        });
    });
});
