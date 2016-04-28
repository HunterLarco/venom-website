;(function (root, $, undefined) {
	'use strict';

	function ReferralFormView () {
		FormView.call(this);
		this.init();
	}

	ReferralFormView.prototype = Object.create(FormView.prototype);

	ReferralFormView.prototype.init = function () {
		this.$element = $('.js-referral-form');
		this.$emailInput = this.$element.find('.js-referral-form__email-input');
		this.$message = this.$element.find('.js-referral-form__message');
		this.$referralInput = this.$element.find('.js-referral-form__referral-input');
		this.bindEvents();
	};

	// Simply use a hidden field so we can use the FormView
	ReferralFormView.prototype.setReferralId = function (id) {
		this.$referralInput.val(id);
	};

	root.App.ReferralFormView = ReferralFormView;

})(this, jQuery);