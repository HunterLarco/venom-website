;(function (root, $, undefined) {
	'use strict';

	var joinWaitingListFormView = new App.JoinWaitingListFormView();
	var referralFormView = new App.ReferralFormView();
	var socialSharingView = new App.SocialSharingView();

	joinWaitingListFormView.on('postSuccesful', function (data) {
		App.userId = data.id;
		referralFormView.setReferralId(data.id);
		$('.js-main-view').hide();
		$('.js-completed-view').show();

		window.setTimeout(function () {
			location.reload();
		}, 5000);
	});

	function increasePointsForUser (amount) {
		$.get('/increase-points/' + App.userId + '/' + amount);
	}

	socialSharingView.on('facebookPostShared', function () {
		increasePointsForUser(3);
	});

	socialSharingView.on('twitterPostShared', function () {
		increasePointsForUser(3);
	});

})(this, jQuery);