<script>
	import Settings from '../pages/Settings.svelte';
	import Feedback from '../pages/Feedback.svelte';
	import Home from '../pages/Home.svelte';
	import { Pages } from '../constants';

	let currentPage = Pages.Home;

	$: isHomeDisabled = currentPage === Pages.Home;
	$: isSettingsDisabled = currentPage === Pages.Settings;
	$: isFeedbackDisabled = currentPage === Pages.Feedback;
</script>

<button on:click={() => (currentPage = Pages.Home)} disabled={isHomeDisabled}> Home </button>

<button on:click={() => (currentPage = Pages.Settings)} disabled={isSettingsDisabled}>
	Settings
</button>

<button on:click={() => (currentPage = Pages.Feedback)} disabled={isFeedbackDisabled}>
	Feedback
</button>

{#if currentPage === Pages.Settings}
	<Settings />
{:else if currentPage === Pages.Feedback}
	<Feedback />
{:else if currentPage === Pages.Home}
	<Home />
{/if}
