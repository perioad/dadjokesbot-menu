<script lang="ts">
	import type { WebApp } from '@twa-dev/types';
	import { onMount, onDestroy } from 'svelte';
	import type { Hex } from '../models/app.interfaces';

	const openPaypal = () => {
		webApp.openLink('https://www.paypal.me/perioa');
	};

	let webApp: WebApp;

	onMount(() => {
		const color = getComputedStyle(document.documentElement)
			.getPropertyValue('--color-home')
			.trim();

		webApp = window.Telegram.WebApp;
		webApp.setHeaderColor(color as Hex);
		webApp.MainButton.hideProgress().onClick(openPaypal);
	});

	onDestroy(() => {
		if (webApp) {
			webApp.MainButton.offClick(openPaypal);
		}
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Dad jokes bot" />
</svelte:head>

<section>
	<p>
		Hey, kid! 😄 Welcome to the central hub of your daily jokes. This is where you get to be the
		boss 👑 and fine-tune your experience.
	</p>
	<p>
		First on the list is "Settings" ⚙️. Here, you can specify the hour you want your daily joke to
		arrive 🕒. Choose the perfect hour to make sure your daily dose of humor fits right into your
		schedule.
	</p>
	<p>
		Next, take a stroll to the "Feedback" section 💬. Whether a joke hit the spot or missed the
		mark, I want to hear from you 🎤. Your insights help me make the bot even better 🛠️.
	</p>
	<p>
		Lastly, if you're enjoying the jokes and having a good time 😂, consider buying me a coffee ☕
		through a PayPal donation 💳. Your support helps keep the laughter rolling in and the dad jokes
		fresh 🌟!
	</p>
	<p>Feel free to explore, adjust, and make the bot your own 🎉. Have a great time! 👋</p>
</section>

<style>
	p {
		text-align: justify;
	}
</style>
