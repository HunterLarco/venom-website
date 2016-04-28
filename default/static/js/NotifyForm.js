;(function (root, $, undefined) {
	'use strict';

	function NotifyForm () {
		FormView.call(this);
		this.init();
	}

	NotifyForm.prototype = Object.create(FormView.prototype);

	NotifyForm.prototype.init = function () {
		this.$element = $('.js-notify-form');
		this.$emailInput = this.$element.find('.js-notify-form__email-input');
		this.$message = this.$element.find('.js-notify-form__message');
		this.bindEvents();
	};

	root.App.NotifyForm = NotifyForm;

})(this, jQuery);
