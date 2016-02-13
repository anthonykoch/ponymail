'use strict';

import { Router, Route, IndexRoute, Redirect } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import ReactDOM from 'react-dom';
import React from 'react';
import classNames from 'classnames';
import assign from 'object-assign';

import Sidebar from './views/Sidebar';
import Preview from './views/Preview';
import { Details, DetailsHeader, DetailsView } from './views/Details';
import EmailList from './components/EmailList';

import EmailActions from './actions/EmailActions';
import LabelActions from './actions/LabelActions';

import EmailStore from './stores/EmailStore';
import LabelStore from './stores/LabelStore';
import { filters as EmailFilters } from './constants/EmailConstants';
import paths from './constants/paths';
import matches from 'lodash/matches';

const history = createBrowserHistory({ queryKey: false });

var Home = function (props) {
	return {
		...React.Component.prototype,

		props,

		state: {
			emailCounts:  {},
			previewEmail: {},
			labels:       [],
		},

		componentWillMount() {
			var labels        = LabelStore.getAll();
			var emailCounts   = EmailStore.getEmailCounts();
			var previewEmail  = EmailStore.getEmailUserIsPreviewing();
			var onStoreChange = this.onStoreChange.bind(this);

			this.setState({ emailCounts, previewEmail, labels });
			this.onStoreChange = onStoreChange;
			EmailStore.addChangeListener(onStoreChange);
			LabelStore.addChangeListener(onStoreChange);
		},

		componentWillUnmount() {
			EmailStore.removeChangeListener(this.onStoreChange);
			LabelStore.removeChangeListener(this.onStoreChange);
		},

		onStoreChange() {
			var emailCounts  = EmailStore.getEmailCounts();
			var previewEmail = EmailStore.getEmailUserIsPreviewing();
			var labels       = LabelStore.getAll();

			this.setState({ emailCounts, previewEmail, labels });
		},

		// The only way I could figure out how to pass props
		// through the router is to get it by the children
		render() {
			var { emailCounts, labels } = this.state;

			return (
				<div className="home-wrapper">
					<Sidebar
						addLabel={addLabel}
						emailCounts={emailCounts}
						currentPath={this.props.location.pathname.replace(/\/$/, '')}
						labels={labels}
						removeLabel={removeLabel}
						toggleAllUnchecked={toggleAllUnchecked}>
					</Sidebar>

					{this.props.children}

					<Preview email={this.state.previewEmail} />
				</div>
			);
		}
	}
};

/**
 * This is the base mail list functionality
 * @type {Object}
 */
var Mailbox = {
	componentWillMount() {
		var emails = EmailStore
			.getAll()
			.filter(matches(this.emailFilter));

		var checkedEmails = emails
			.filter(({ isChecked }) => isChecked)
			.map(({ id }) => id);

		var isLoadingMoreEmails = EmailStore.isLoadingMoreEmails();

		this.setState({ emails, checkedEmails, isLoadingMoreEmails });
		this.onStoreChange = this.onStoreChange.bind(this);
		EmailStore.addChangeListener(this.onStoreChange);
	},

	componentWillUnmount() {
		EmailStore.removeChangeListener(this.onStoreChange);
	},

	onStoreChange() {
		var emails = EmailStore
			.getAll()
			.filter(matches(this.emailFilter));
		var checkedEmails = emails
			.filter(({ isChecked }) => isChecked)
			.map(({ id }) => id);
		var isLoadingMoreEmails = EmailStore.isLoadingMoreEmails();

		this.setState({ emails, checkedEmails, isLoadingMoreEmails });
	},

	toggleFavorited() {
		EmailActions.toggleFavorited(this.state.checkedEmails);
	},

	sendToTrash() {
		EmailActions.sendToTrash(this.state.checkedEmails);
	},

	showMoreOptions() {
		console.log('More options pls')
	},

	unmarkAsFavorited() {
		EmailActions.unmarkAsFavorited(this.state.checkedEmails);
	},

	deleteEmails() {
		EmailActions.deleteEmails(this.state.checkedEmails);
	},

	/**
	 * Toggles the checkbox of the email that was clicked
	 * @param  {Object} mailbox
	 * @param  {Object} email
	 * @return {void}
	 */
	toggleChecked(email) {
		EmailActions.toggleChecked(email);
	}
};

var Icon = function (props) {
	var iconClassName;

	switch (props.type) {
		case 'heart':
			iconClassName = 'ion ion-heart';
			break;

		case 'trash':
			iconClassName = 'ion ion-trash-b';
			break;

		case 'more':
			iconClassName = 'ion ion-arrow-down-b';
			break;
	}

	if (props.disabled) {
		iconClassName += ' disabled';
	}

	return (
		<li onClick={props.onClick} className={`${props.className} ${iconClassName}`}></li>
	);
};

var Inbox = function (props) {
	return {
		...React.Component.prototype,
		...Mailbox,

		props,

		emailFilter: EmailFilters.INBOX,

		state: {
			emails: [],
			checkedEmails: [],
			isLoadingMoreEmails: false
		},

		render() {
			var toggleChecked   = this.toggleChecked.bind(this);
			var toggleFavorited = this.toggleFavorited.bind(this);
			var sendToTrash     = this.sendToTrash.bind(this);
			var showMoreOptions = this.showMoreOptions.bind(this);

			console.log(this.state.isLoadingMoreEmails)

			var classes = {
				task: '[ options__list__item options__list__item--task ]',
				sort: classNames({
					'options__list__item  [ options__list__item--sort ]': true,
					'options__list__item--sort--active': false
				})
			};

			return (
				<Details>
					<DetailsHeader title="Inbox">
						<div className="options">
							<ul className="options__list">
								<Icon type="heart" className={classes.task} onClick={toggleFavorited} />
								<Icon type="trash" className={classes.task} onClick={sendToTrash} />
								<Icon type="more"  className={classes.task} onClick={showMoreOptions} />
							</ul>
							<ul className="options__list">
								<li className={classes.sort} >
									A-Z
								</li>
								<li className={classes.sort}>
									Recent
								</li>
							</ul>
						</div>
					</DetailsHeader>
					<DetailsView onViewBottom={onViewBottom}>
						<EmailList
							{...props}
							emails={this.state.emails}
							isLoadingMoreEmails={this.state.isLoadingMoreEmails}
							onViewBottom={onViewBottom}
							setPreview={setPreview}
							toggleChecked={toggleChecked} />
					</DetailsView>
				</Details>
			);
		}
	};
};

var Favorites = function (props) {
	return {
		...React.Component.prototype,
		...Mailbox,

		props,

		emailFilter: EmailFilters.FAVORITES,

		state: {
			emails: [],
			checkedEmails: [],
			isLoadingMoreEmails: false
		},

		render() {
			var toggleChecked     = this.toggleChecked.bind(this);
			var unmarkAsFavorited = this.unmarkAsFavorited.bind(this);
			var sendToTrash       = this.sendToTrash.bind(this);
			var showMoreOptions   = this.showMoreOptions.bind(this);

			var classes = {
				task: '[ options__list__item options__list__item--task ]',
				sort: classNames({
					'options__list__item  [ options__list__item--sort ]': true,
					'options__list__item--sort--active': false
				})
			};

			return (
				<Details>
					<DetailsHeader title="Favorites">
						<div className="options">
							<ul className="options__list">
								<Icon type="heart" className={classes.task} onClick={unmarkAsFavorited} />
								<Icon type="trash" className={classes.task} onClick={sendToTrash} />
								<Icon type="more"  className={classes.task} onClick={showMoreOptions} />
							</ul>
							<ul className="options__list">
								<li className={classes.sort}>
									A-Z
								</li>
								<li className={classes.sort}>
									Recent
								</li>
							</ul>
						</div>
					</DetailsHeader>
					<DetailsView onViewBottom={console.log.bind(console, 'bottom')}>
						<EmailList
							{...props}
							emails={this.state.emails}
							isLoadingMoreEmails={this.state.isLoadingMoreEmails}
							onViewBottom={onViewBottom}
							setPreview={setPreview}
							toggleChecked={toggleChecked} />
					</DetailsView>
				</Details>
			);
		}
	};
};

var Sent = function (props) {
	return {
		...React.Component.prototype,
		...Mailbox,

		props,

		emailFilter: EmailFilters.SENT,

		state: {
			emails: [],
			checkedEmails: [],
			isLoadingMoreEmails: false
		},

		render() {
			var toggleChecked   = this.toggleChecked.bind(this);
			var toggleFavorited = this.toggleFavorited.bind(this);
			var deleteEmails    = this.deleteEmails.bind(this);
			var showMoreOptions = this.showMoreOptions.bind(this);

			var classes = {
				task: '[ options__list__item options__list__item--task ]',
				sort: classNames({
					'options__list__item  [ options__list__item--sort ]': true,
					'options__list__item--sort--active': false
				})
			};

			return (
				<Details>
					<DetailsHeader title="Sent">
						<div className="options">
							<ul className="options__list">
								<Icon type="heart" className={classes.task} onClick={toggleFavorited} />
								<Icon type="trash" className={classes.task} onClick={deleteEmails} />
								<Icon type="more"  className={classes.task} onClick={showMoreOptions} />
							</ul>
							<ul className="options__list">
								<li className={classes.sort} >
									A-Z
								</li>
								<li className={classes.sort}>
									Recent
								</li>
							</ul>
						</div>
					</DetailsHeader>
					<DetailsView onViewBottom={console.log.bind(console, 'bottom')}>
						<EmailList
							{...props}
							emails={this.state.emails}
							isLoadingMoreEmails={this.state.isLoadingMoreEmails}
							onViewBottom={onViewBottom}
							setPreview={setPreview}
							toggleChecked={toggleChecked} />
					</DetailsView>
				</Details>
			);
		}
	};
};

var Drafts = function (props) {
	return {
		...React.Component.prototype,
		...Mailbox,

		props,

		emailFilter: EmailFilters.DRAFTS,

		state: {
			emails: [],
			checkedEmails: [],
			isLoadingMoreEmails: false
		},

		render() {
			var toggleChecked   = this.toggleChecked.bind(this);
			var toggleFavorited = this.toggleFavorited.bind(this);
			var deleteEmails    = this.deleteEmails.bind(this);
			var showMoreOptions = this.showMoreOptions.bind(this);

			var classes = {
				task: '[ options__list__item options__list__item--task ]',
				sort: classNames({
					'options__list__item  [ options__list__item--sort ]': true,
					'options__list__item--sort--active': false
				})
			};

			return (
				<Details>
					<DetailsHeader title="Drafts">
						<div className="options">
							<ul className="options__list">
								<Icon type="heart" className={classes.task} onClick={toggleFavorited} />
								<Icon type="trash" className={classes.task} onClick={deleteEmails}     />
								<Icon type="more"  className={classes.task} onClick={showMoreOptions} />
							</ul>
							<ul className="options__list">
								<li className={classes.sort} >
									A-Z
								</li>
								<li className={classes.sort}>
									Recent
								</li>
							</ul>
						</div>
					</DetailsHeader>
					<DetailsView onViewBottom={console.log.bind(console, 'bottom')}>
						<EmailList
							{...props}
							emails={this.state.emails}
							isLoadingMoreEmails={this.state.isLoadingMoreEmails}
							onViewBottom={onViewBottom}
							setPreview={setPreview}
							toggleChecked={toggleChecked} />
					</DetailsView>
				</Details>
			);
		}
	};
};

var Trash = function (props) {
	return {
		...React.Component.prototype,
		...Mailbox,

		props,

		emailFilter: EmailFilters.TRASH,

		state: {
			emails: [],
			checkedEmails: [],
			isLoadingMoreEmails: false
		},

		render() {
			var toggleChecked   = this.toggleChecked.bind(this);
			var toggleFavorited = this.toggleFavorited.bind(this);
			var deleteEmails    = this.deleteEmails.bind(this);
			var showMoreOptions = this.showMoreOptions.bind(this);

			var classes = {
				task: '[ options__list__item options__list__item--task ]',
				sort: classNames({
					'options__list__item  [ options__list__item--sort ]': true,
					'options__list__item--sort--active': false
				})
			};

			return (
				<Details>
					<DetailsHeader title="Trash">
						<div className="options">
							<ul className="options__list">
								<Icon type="heart" className={classes.task} onClick={toggleFavorited} />
								<Icon type="trash" className={classes.task} onClick={deleteEmails} />
								<Icon type="more"  className={classes.task} onClick={showMoreOptions} />
							</ul>
							<ul className="options__list">
								<li className={classes.sort} >
									A-Z
								</li>
								<li className={classes.sort}>
									Recent
								</li>
							</ul>
						</div>
					</DetailsHeader>
					<DetailsView onViewBottom={console.log.bind(console, 'bottom')}>
						<EmailList
							{...props}
							emails={this.state.emails}
							isLoadingMoreEmails={this.state.isLoadingMoreEmails}
							onViewBottom={onViewBottom}
							setPreview={setPreview}
							toggleChecked={toggleChecked} />
					</DetailsView>
				</Details>
			);
		}
	};
};

function setPreview(email) {
	EmailActions.setPreview(email);
}

/**
 * Toggles all emails in the current displaying list
 * to be unchecked.
 * @param  {object} mailbox
 * @return {void}
 */
function toggleAllUnchecked() {
	EmailActions.toggleAllUnchecked();
}

/**
 * Not yet implemented
 * @param {String} title
 */
function addLabel(title) {}

/**
 * Removes a label from the sidebar
 * @param {String} id
 */
function removeLabel(id) {
	LabelActions.remove(id);
}

/**
 * Load the next set of old emails into view when the
 * user scrolls to the bottom of the email list
 */
function onViewBottom() {
	EmailActions.loadNextEmails()
}

ReactDOM.render(
	<Router history={history}>

		<Route component={Home}>
			<IndexRoute name="index" component={Inbox} />
			<Route name="inbox"     path={paths.inbox}     component={Inbox}     />
			<Route name="favorites" path={paths.favorites} component={Favorites} />
			<Route name="sent"      path={paths.sent}      component={Sent}      />
			<Route name="drafts"    path={paths.drafts}    component={Drafts}    />
			<Route name="trash"     path={paths.trash}     component={Trash}     />
			<Redirect from="/ponymail" to={paths.inbox} />
		</Route>

	</Router>,
	document.getElementById('app'));