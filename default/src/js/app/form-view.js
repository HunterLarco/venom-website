;(function (root, $, undefined) {
	'use strict';

	function FormView () {
		Events.call(this);
	}

	FormView.prototype = {
		bindEvents: function () {
			this.$element.on('submit', this.onSubmit.bind(this));
		},

		onSubmit: function (e) {
			e.preventDefault();

			if (this.isValidEmail()) {
				this.hideValidation();
				this.post();
			} else {
				this.showValidation();
			}
		},

		isValidEmail: function () {
			return (this.$emailInput.val().indexOf('@') > 0);
		},

		hideValidation: function () {
			this.$message.hide();
		},

		showValidation: function () {
			this.$message.show();
		},

		post: function () {
			$.ajax({
				type: 'POST',
				url: this.$element.attr('action'),
				data: this.$element.serialize()
			}).done(this.onPostDone.bind(this));
		},

		hide: function () {
			this.$element.hide();
		},

		onPostDone: function (response) {
			if (response.isSuccesful) {
				this.trigger('postSuccesful', response);
			} else {
				// TODO: implement unsuccesful submit
			}
		}
	}

	root.FormView = FormView;

})(this, jQuery);