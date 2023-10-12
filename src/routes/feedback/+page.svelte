<script lang="ts">
	import type { WebApp } from '@twa-dev/types';
	import { onMount, onDestroy } from 'svelte';
	import type { Hex } from '../../models/app.interfaces';
	import { env } from '$env/dynamic/public';

	const minChars = 20;
	const sendMessage = `Send the feedback 📦`;

	let feedback = '';
	let isValid = false;
	let webApp: WebApp;

	$: isValid = feedback.trim().length >= 20;

	const getCharsLeftMessage = () => {
		const charsLeft = minChars - feedback.length;
		const charsWord = charsLeft === 1 ? 'character' : 'characters';

		return `${charsLeft} ${charsWord} more ❗`;
	};
	const onKeyUp = () => {
		if (isValid) {
			webApp.MainButton.enable().setText(sendMessage);
		} else {
			webApp.MainButton.disable().setText(getCharsLeftMessage());
		}
	};

	const sendFeedback = async () => {
		try {
			webApp.MainButton.showProgress().setText('Sending..');
			const responseRaw = await fetch(env.PUBLIC_API, {
				method: 'POST',
				body: JSON.stringify({
					initData: webApp.initData,
					action: 'feedback',
					feedback
				})
			});
			const response = await responseRaw.json();

			if (!response.ok) {
				throw 'Not ok';
			}

			feedback = '';
			webApp.MainButton.setText(getCharsLeftMessage());
			webApp.showPopup({
				message: 'Thank you for the feedback, my dear 🥰',
				buttons: [{ type: 'ok' }]
			});
			webApp.HapticFeedback.notificationOccurred('success');
		} catch (error) {
			webApp.showAlert(`Something went wrong, I'm already working on it..`);
			webApp.MainButton.setText(sendMessage);
			webApp.HapticFeedback.notificationOccurred('error');
		} finally {
			webApp.MainButton.hideProgress().enable();
		}
	};

	onMount(() => {
		const color = getComputedStyle(document.documentElement)
			.getPropertyValue('--color-feedback')
			.trim();

		webApp = window.Telegram.WebApp;

		webApp.setHeaderColor(color as Hex);
		webApp.MainButton.setParams({
			text: getCharsLeftMessage(),
			text_color: `#000000`,
			is_active: false,
			is_visible: true,
			color
		}).onClick(sendFeedback);
	});

	onDestroy(() => {
		if (webApp) {
			webApp.MainButton.offClick(sendFeedback);
		}
	});
</script>

<svelte:head>
	<title>Feedback</title>
	<meta name="description" content="Dad jokes bot feedback" />
</svelte:head>

<textarea
	on:keyup={onKeyUp}
	bind:value={feedback}
	rows="9"
	placeholder="Write your thoughts here, kid.."
/>

<style>
	textarea {
		font-size: 1rem;
		color: var(--color-text);
		background-color: var(--color-primary);
		border-radius: 20px;
		padding: 20px;
		resize: none;
		border: none;
	}
</style>
