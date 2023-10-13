<script>
	import Header from '../components/Header.svelte';
	import logo from '$lib/images/dad.png';
	import './styles.css';
	import { onMount } from 'svelte';

	let isTelegram = false; // change to false in prod

	onMount(() => {
		window.Telegram.WebApp.ready();
		window.Telegram.WebApp.expand();
		window.Telegram.WebApp.MainButton.show();

		if (window.Telegram.WebApp.initData) {
			isTelegram = true;
		}
	});
</script>

{#if isTelegram}
	<div class="app">
		<Header />

		<main>
			<slot />
		</main>

		<div class="logo">
			<img src={logo} alt="Dad jokes bot logo" />
		</div>
	</div>
{:else}
	<p class="no-access">
		<a href="https://web.telegram.org/k/#@jokes_by_dad_bot" target="_blank">
			Sorry, but this app only works in the context of the Dad Jokes telegram bot. Click this
			message to join and have a laugh together ;)
		</a>
	</p>
{/if}

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.logo {
		position: fixed;
		bottom: -30px;
		left: 0;
		width: 96vw;
		opacity: 0.05;
		pointer-events: none;
		z-index: -1;
	}

	.logo img {
		width: 100%;
	}

	.no-access {
		margin-top: 30vh;
		font-size: 1.4rem;
		text-align: justify;
	}
</style>
