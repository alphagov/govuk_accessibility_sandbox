(function(Modules) {
    "use strict";

    Modules.ServiceManualDisclosure = function() {

        this.start = function($element) {

            // indicate that js has worked
            $('.subsections').addClass('js');

            // insert the markup for the subsection-controls
            $element.find('.subsection-controls')
                .append( '<a href="#" class="js-open-close">Open all</a>' );

            // insert the markup for the subsection-controls
            $element.find('.subsection__title')
                .wrapInner( '<a class="subsection__link" href="#"></a>' );

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
                return false;
            });

            $element.find('.subsection__link').on('click', function(e) {
                toggleSection($(this).parent().parent().next());
                toggleIcon($(this).parent().parent());
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


            // add the toggle functionality all sections
            $element.find('.js-open-close').on('click', function(e) {
                var action = '';
                if ($(this).text() == "Open all") {
                    $(this).text("Close all");
                    action = 'open';
                } else {
                    $(this).text("Open all");
                    action = 'close';
                }

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
