;(function (root, $, undefined) {
	'use strict';

	function FormView () {
		Events.call(this);
	}

	function parseForm($form){
			var serialized = $form.serializeArray();
			var s = '';
			var data = {};
			for(s in serialized){
					data[serialized[s]['name']] = serialized[s]['value']
			}
			return JSON.stringify(data);
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
			this.$message.slideUp(120);
		},

		showValidation: function () {
			this.$message.slideDown(120);
		},

		post: function () {
			var data = parseForm(this.$element);
			var _this = this;

			$.ajax({
				type: 'POST',
				url: this.$element.attr('action'),
				data: data
			}).done(function (response) {
				_this.onPostDone(response, data);
			});
		},

		hide: function () {
			this.$element.hide();
		},

		onPostDone: function (response, data) {
			if (response.success) {
				this.trigger('postSuccessful', response, data);
			} else {
				// TODO: implement unsuccesful submit
			}
		}
	}

	root.FormView = FormView;

})(this, jQuery);
