;(function (root, $, undefined) {
	'use strict';

	var NotifyForm = new App.NotifyForm();

	var $popup = $('js-popup');
	var $popupEmail = $popup.find('.js-popup__email');

	NotifyForm.on('postSuccessful', function (response, data) {
		debugger;
		$popupEmail.text(JSON.parse(data).email);
		$popup.removeClass('is-hidden');
	});

})(this, jQuery);
