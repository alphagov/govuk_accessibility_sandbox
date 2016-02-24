(function(Modules) {
  "use strict";

  Modules.ServiceManualDisclosure = function() {

    this.start = function($element) {

      // Get all disclosure sections
      var $disclosure = $element.find('.js-toggle-disclosure');

      // Set all subsections to be closed initially
      var $subsections = $disclosure.parent('.subsection');
      $subsections.addClass('is-closed');

      // Get the disclosure targets
      var $targets = $element.find('.js-toggle-disclosure-target');
      $targets.attr('aria-hidden', 'true');

      // The accordion panel uses the role tabpanel
      $targets.attr('role', 'tabpanel');

      // Add an ID to each one
      $targets.each(function(index) {
        var i = index + 1;
        $(this).attr("id", "subsection-" + i);
        // The accordion panel should have an aria-labelledby relationship, referencing the corresponding header
        $(this).attr("aria-labelledby", "subsection-header" + i);
      });

      // Get all of the headings
      var $headings = $element.find('.js-toggle-disclosure .subsection-title');

      // Set the aria controls attribute for each one
      $headings.each(function(index) {
        var i = index + 1;

        // The accordion panel should have an aria-labelledby relationship, referencing the corresponding header, having a role of tab
        $(this).attr("id", "subsection-header" + i);
        $(this).attr("aria-controls", "subsection-" + i);
        $(this).attr("role", "tab");
        // Ensure it is possible to tab to each heading
        $(this).attr("tabindex", "0");
      });

      // Get the open/close all button
      var $openOrCloseAll = $element.find('.js-open-close');

      // Since all sections are initially closed, set the button text to "Open all"
      var openOrCloseText = $openOrCloseAll.text('Open all');

      // Open all
      function openAll() {
        $headings.each(function() {
          var $heading = $(this);
          var target = $heading.attr('aria-controls');
          var $target = $('#' + target);
          var $subsection = $heading.closest('.subsection');

          $target.removeAttr('class','if-js-hide');
          $target.attr('aria-hidden', 'false');

          $heading.attr('aria-expanded', 'true');

          $subsection.removeClass('is-closed');
          $subsection.addClass('is-open');
        });
      }

      // Close all
      function closeAll() {
        $headings.each(function() {
          var $heading = $(this);
          var target = $heading.attr('aria-controls');
          var $target = $('#' + target);
          var $subsection = $heading.closest('.subsection');

          $target.attr('class','if-js-hide');
          $target.attr('aria-hidden', 'true');

          $heading.attr('aria-expanded', 'false');

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

        // Set focus back to the button
        $openOrCloseAll.focus();

      }

      // For each of the disclosure buttons
      $headings.each(function() {

        // Save the heading
        var $heading = $(this);

        // Save the heading target
        var target = $heading.attr('aria-controls');
        var $target = $('#' + target);

        var $subsection = $heading.closest('.subsection');

        // On enter, click or space - toggle
        $heading.on('keyup click', function(e){
          if (e.which === 13 || e.which === 32 || e.type === 'click') {
            toggle();
          }
        });

        function toggle() {
          var headingState = $heading.attr('aria-expanded');
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
            $heading.attr("aria-expanded", "true");
          }
          else {
            $target.attr("aria-hidden", "true");
            $heading.attr("aria-expanded", "false");
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
