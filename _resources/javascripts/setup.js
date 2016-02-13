'use strict';

import moment from 'moment';
import assign from 'object-assign';
import EmailActions from './actions/EmailActions';
import { createUID } from './utils';

/**
 * These are variables created from {{ site.data.<item> | jsonify }}
 * This is setup to simulate items that already exist in a person's inbox
 */

__initialLabels = __initialLabels.map(label => assign({}, label, { id: createUID() }));

window.__oldEmails = [];

for (let i = 0; i < 2000; i++) {

	let email = {
		sender: 'John Smith',
		title: `${i + 1} email`,
		labels: [],
		// subtract two years so they are added later
		date: moment().subtract(i, 'days').subtract(2, 'year'),
		body: '',
		id: createUID(),
		isRead: true,
		isChecked: false,
		isDraft: false,
		isSoftDeleted: false,
		isHardDeleted: false,
	};

	__oldEmails.push(email)
}

__initialEmails = __initialEmails.map(function (email) {
	var now = moment();
	// subtract 1 year so that the emails added in later go up to the top
	var date = moment(email.date, 'YYYY-MM-DD HH-mm').subtract(1, 'year');
	var id = createUID();

	return assign(email, { id, date });
});

__initialDrafts = __initialDrafts.map(function (draft) {
	var now = moment();
	var id = createUID();
	var date = now.subtract(1, 'year');

	return assign(draft, { id, date });
});




/**
 * Simulate incoming emails
 */
function loadEmail(email, time) {
	return setTimeout(function () {
		var now = moment();
		var date = moment(email.date, 'YYYY-MM-DD HH-mm')
			.add(1, 'year'); // makes sure these emails come up first

		var newEmail = assign(email, {
			id: createUID(),
			isRead: false,
			isChecked: false,
			isHardDeleted: false,
			isSoftDeleted: false,
			isDraft: false,
			date,
		});

		EmailActions.add(newEmail);
	}, time);
}

loadEmail({
	sender: 'Anthony Koch',
	title: 'A coding exercise',
	labels: ['Code'],
	date: '2014-11-17 10:23',
	body: `
	<div class="montserrat">

		<p>
			Hello world,
		</p>
		<p>
			This page was a coding exercise.
			The
			<a href="https://dribbble.com/shots/1283529-The-Pony-Express-Mail/attachments/177620">
				design
			</a> was made by Victor Erixon, but I thought it would be a fun exercise to turn his design into HTML and CSS.

		</p>
		<p>
			The point of this of this exercise was to create a HTML and CSS version of the image, but I ended up adding bits of JavaScript here and there. Initially, it was custom JavaScript, but I decided to take this as an opportunity to learn React, Flux, and React Router. This project ended up taking a lot longer than I expected because of all the React stuff, so, as a result, I haven't gotten parts of the page finished, such as the reply to, draft creation, and labels.
		</p>
		<p>
			The functionality I did make was:
		</p>
		<ul class="list list--bullet">
			<li class="list__item">The email preview, which is this pane</li>
			<li class="list__item">Mark email as favorites</li>
			<li class="list__item">Send emails to trash</li>
			<li class="list__item">Delete labels</li>
		</ul>

		<br />
		<p><b>Sincerely,</b></p>
		<p><b>Anthony Koch</b></p>
	</div>`,
}, 2000);

loadEmail({
	sender: 'Travis Neilson',
	title: 'DevTips',
	date: '2014-11-17 10:25',
	labels: [],
	id: createUID(),
	body: '<div class="montserrat"><p>Keep on hacking!</p></div>'
}, 10000);

loadEmail({
	sender: 'Alex Garret',
	title: 'Codecourse',
	date: '2014-11-17 10:34',
	labels: [],
	id: createUID(),
	body: '<div class="montserrat"><p>Free web development video tutorials!</p></div>'
}, 40000);

loadEmail({
	sender: 'Will Stern',
	title: 'LearnCode.academy',
	date: '2014-11-17 10:48',
	labels: [],
	id: createUID(),
	body: '<div class="montserrat"><p>Web tutorials made from 100% organic awesome!</p></div>'
}, 60000);

loadEmail({
	title: 'Laracasts',
	sender: 'Jeffrey Way',
	labels: [],
	date: '2014-11-17 11:03',
	body: '<div class="montserrat"><p>If I were to explain it, well, it\'s like Netflix for developers</p></div>'
}, 80000);