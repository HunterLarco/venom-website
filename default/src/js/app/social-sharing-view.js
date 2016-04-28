;(function (root, $, undefined) {
	'use strict';

	function SocialSharingView () {
		Events.call(this);
		this.init();
	}

	SocialSharingView.prototype = {
		init: function () {
			this.$twitter = $('.js-social-sharing-twitter');
			this.$facebook = $('.js-social-sharing-facebook');
			this.bindEvents();
		},

		bindEvents: function () {
			// On ready, register the callback...
			twttr.ready(function (twttr) {
					twttr.events.bind('tweet', function (event) {
							_this.trigger('twitterPostShared')
					});
			});

			this.$facebook.on('click', this.onClickFacebook.bind(this));
		},

		onClickFacebook: function (e) {
			e.preventDefault();

			FB.ui({
				method: 'feed',
				name: 'Fashionboss',
				link: 'http://www.smartboss.com',
				description: 'All-in-one fashion business accelerator and industry resource that streamlines the way you launch and do business.'
			},
			function(response) {
				if (response && response.post_id) {
					this.trigger('facebookPostShared');
				}
			}.bind(this));
		}
	};

	root.App.SocialSharingView = SocialSharingView;

})(this, jQuery);