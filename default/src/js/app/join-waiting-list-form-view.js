;(function (root, $, undefined) {
	'use strict';

	function JoinWaitingListFormView () {
		FormView.call(this);
		this.init();
	}

	JoinWaitingListFormView.prototype = Object.create(FormView.prototype);

	JoinWaitingListFormView.prototype.init = function () {
		this.$element = $('.js-join-waiting-list-form');
		this.$emailInput = this.$element.find('.js-join-waiting-list-form__email-input');
		this.$message = this.$element.find('.js-join-waiting-list-form__message');
		this.bindEvents();
	};

	root.App.JoinWaitingListFormView = JoinWaitingListFormView;

})(this, jQuery);