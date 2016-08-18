$(document).ready(function() {

  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
  new GOVUK.SelectionButtons($blockLabels);

  // Use GOV.UK show-hide-content.js
  // Where .block-label uses the data-target attribute
  // to toggle the visibility of related content
  var showHideContent = new GOVUK.ShowHideContent();
  showHideContent.init();

});
