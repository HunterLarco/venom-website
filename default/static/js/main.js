;(function (root, $, undefined) {
	'use strict';

	function main() {
		var NotifyForm = new App.NotifyForm();

		var $popup = $('.js-popup');
		var $popupEmail = $popup.find('.js-popup__email');

		NotifyForm.on('postSuccessful', function (response, data) {
			$popupEmail.text(JSON.parse(data).email);
			$popup.removeClass('is-hidden');
			NotifyForm.hideValidation();

			NotifyForm.$element.find('input').val('');

			window.setTimeout(function () {
				$popup.addClass('is-hidden');
			}, 4000);
		});
	}

	$(main);

})(this, jQuery);
