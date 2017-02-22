module.exports = {
  updatePaperRipple: function() {
    var buttons = document.querySelectorAll('.paperRipple');

    // Traversing the buttons
    [].forEach.call(buttons, function(button) {
      // New PaperRipple for the button
      var ripple = new PaperRipple();

      // Adding ripple container to the button
      button.appendChild(ripple.$);

      // Subscribing to 'mousedown' and 'mouseup' button events to activate ripple effect
      // when a user clicks on the button.
      button.addEventListener('mousedown', function(ev) {
        ripple.downAction(ev);
      });
      button.addEventListener('mouseup', function() {
        ripple.upAction();
      });
    });
  }
};
