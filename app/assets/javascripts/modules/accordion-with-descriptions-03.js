(function(Modules) {
    "use strict";

    Modules.AccordionWithDescriptions = function() {

        this.start = function($element) {

            // indicate that js has worked
            $('.subsections').addClass('js');

            // insert the markup for the subsection-controls
            $element.find('.subsection-controls')
                .append( '<a href="#" class="js-open-close" aria-expanded="false" aria-controls="subsection_content_0 subsection_content_1 subsection_content_2">Open all</a>' );

            // insert the markup for the subsection-controls
            $element.find('.subsection__title').each(function(index) {
                $( this ).wrapInner( '<a class="subsection__link" aria-expanded="false" aria-controls="subsection_content_' + index +'" href="#"></a>' );
            });

            // hide the content
            $element.find('.subsection__content')
                .addClass( 'js-hide' );

            // insert the subsection icon
            $element.find('.subsection__header')
                .append( '<span class="subsection__icon"></span>' );

            // add the toggle functionality individual sections
            $element.find('.subsection__header').on('click', function(e) {
                toggleSection($(this).next());
                toggleIcon($(this));
                toggleState($(this).find('.subsection__link'));
                return false;
            });

            $element.find('.subsection__link').on('click', function(e) {
                toggleSection($(this).parent().parent().next());
                toggleIcon($(this).parent().parent());
                toggleState($(this));
                return false;
            });

            function toggleSection($node) {
                if ($($node).hasClass('js-hide')) {
                    openSection($node);
                } else {
                    closeSection($node);
                }
            }

            function toggleIcon($node) {
                if ($($node).hasClass('is-open')) {
                    $node.removeClass('is-open');
                } else {
                    $node.addClass('is-open');
                }
            }

            function toggleState($node) {
                if ($($node).attr('aria-expanded') == "true") {
                    $node.attr("aria-expanded", "false");
                } else {
                    $node.attr("aria-expanded", "true");
                }
            }

            function openSection($node) {
                $node.removeClass('js-hide');
            }

            function closeSection($node) {
                $node.addClass('js-hide');
            }

            function showOpenIcon($node) {
                $node.addClass('is-open');
            }

            function showCloseIcon($node) {
                $node.removeClass('is-open');
            }

            function setExpandedState($node, state) {
                $node.attr("aria-expanded", state);
            }

            // add the toggle functionality all sections
            $element.find('.js-open-close').on('click', function(e) {
                var action = '';

                // update button
                if ($(this).text() == "Open all") {
                    $(this).text("Close all");
                    $(this).attr("aria-expanded", "true");
                    action = 'open';
                } else {
                    $(this).text("Open all");
                    $(this).attr("aria-expanded", "false");
                    action = 'close';
                }

                // set aria-expanded on links
                $('.subsection__link').each(function( index ) {
                    if (action == 'open') {
                        setExpandedState($(this), "true");
                    } else {
                        setExpandedState($(this), "false");
                    }
                });

                // show/hide content
                $('.subsection__header').each(function( index ) {
                    if (action == 'open') {
                        openSection($(this).next());
                        showOpenIcon($(this));
                    } else {
                        closeSection($(this).next());
                        showCloseIcon($(this));
                    }
                });

                return false;
            });
        }
    };
})(window.GOVUK.Modules);
