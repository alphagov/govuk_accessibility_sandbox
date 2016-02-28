(function(Modules) {
  "use strict";

  Modules.AccordionWithDescriptions = function() {

    this.start = function($element) {

      // Get all disclosure sections
      var $disclosure = $element.find('.js-toggle-disclosure');

      // Set all subsections to be closed initially
      var $subsections = $disclosure.parent('.subsection');
      $subsections.addClass('is-closed');

      // Get the disclosure targets
      var $targets = $element.find('.js-toggle-disclosure-target');
      $targets.attr('aria-hidden', 'true');

      // Add an ID to each one
      $targets.each(function(index) {
        var i = index + 1;
        $(this).attr("id", "subsection-" + i);
      });

      // Wrap each disclosure section in a button
      $disclosure.wrapInner("<button class='subsection__button'>");

      // Get all of the disclosure buttons
      var $buttons = $element.find('.js-toggle-disclosure button');

      // Set the aria controls atribute for each one
      $buttons.each(function(index) {
        var i = index + 1;
        $(this).attr("aria-controls", "subsection-" + i);
      });

      // Get the open/close all button
      var $openOrCloseAll = $element.find('.js-open-close');

      // Since all sections are initially closed, set the button text to "Open all"
      var openOrCloseText = $openOrCloseAll.text('Open all');

      // Open all
      function openAll() {
        $buttons.each(function() {
          var $button = $(this);
          var target = $button.attr('aria-controls');
          var $target = $('#' + target);
          var $subsection = $button.closest('.subsection');

          $target.removeAttr('class','if-js-hide');

          $target.attr('aria-hidden', 'false');
          $button.attr('aria-expanded', 'true');

          $subsection.removeClass('is-closed');
          $subsection.addClass('is-open');
        });
      }

      // Close all
      function closeAll() {
        $buttons.each(function() {
          var $button = $(this);
          var target = $button.attr('aria-controls');
          var $target = $('#' + target);
          var $subsection = $button.closest('.subsection');

          $target.attr('class','if-js-hide');
          $target.attr('aria-hidden', 'true');

          $button.attr('aria-expanded', 'false');

          $subsection.removeClass('is-open');
          $subsection.addClass('is-closed');
        });
      }

      // Find out the state of open or closed
      $openOrCloseAll.on('click', openOrCloseAll);

      function openOrCloseAll() {

        var openOrCloseText = $openOrCloseAll.text();

        if (openOrCloseText == "Open all") {
          openAll();
          openOrCloseText = "Close all";
          $openOrCloseAll.text(openOrCloseText);
        }
        else {
          closeAll();
          openOrCloseText = "Open all";
          $openOrCloseAll.text(openOrCloseText);
        }

        // Set focus back to the button?
        $openOrCloseAll.focus();

      }

      // For each of the disclosure buttons
      $buttons.each(function() {

        // Save the button
        var $button = $(this);

        // Save the button target
        var target = $button.attr('aria-controls');
        var $target = $('#' + target);

        var $subsection = $button.closest('.subsection');

        // On click, toggle
        $button.on('click', toggle);

        function toggle() {
          var buttonState = $button.attr('aria-expanded');
          var targetState = $target.attr('aria-hidden');
          // console.log("Initial state: button aria-expanded="+buttonState+" target aria-hidden="+targetState);
          $target.toggleClass('if-js-hide');
          setAriaAttr();
          setSubsectionState();
          setOpenOrCloseAll();
        }

        function setAriaAttr() {
          if ($target.attr("aria-hidden") == "true") {
            $target.attr("aria-hidden", "false");
            $button.attr("aria-expanded", "true");
          }
          else {
            $target.attr("aria-hidden", "true");
            $button.attr("aria-expanded", "false");
          }
        }

        // Set the open or closed state
        function setSubsectionState() {
          if ($target.attr("aria-hidden") == "true") {
            $subsection.removeClass('is-open');
            $subsection.addClass('is-closed');
          }
          else {
            $subsection.removeClass('is-closed');
            $subsection.addClass('is-open');
          }
        }

        // Change the open or close all text
        function setOpenOrCloseAll() {
          if ($target.attr("aria-hidden") == "true") {
            var openOrCloseText = $openOrCloseAll.text("Open all");
          }
          else {
            var openOrCloseText = $openOrCloseAll.text("Close all");
          }
        }

      });

    }

  };
})(window.GOVUK.Modules);
