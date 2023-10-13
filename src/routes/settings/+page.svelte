<script lang="ts">
	import type { WebApp } from '@twa-dev/types';
	import { onMount, onDestroy } from 'svelte';
	import type { Hex } from '../../models/app.interfaces';
	import { env } from '$env/dynamic/public';

	const chooseAnotherTime = 'Choose another time 🚫';

	let selectedHour: number;
	let webApp: WebApp;
	let isLoading = false;
	let isError = false;
	let localTime: number;

	const getDiffTimeLocalUtc = () => new Date().getHours() - new Date().getUTCHours();
	const getUTCSelectedHour = () => {
		const diff = selectedHour - getDiffTimeLocalUtc();

		return diff >= 0 ? diff : 24 + diff;
	};
	const handleSubmit = async () => {
		try {
			isLoading = true;
			webApp.HapticFeedback.selectionChanged();
			webApp.MainButton.showProgress().setText('Changing the time..');

			const responseRaw = await fetch(env.PUBLIC_API, {
				method: 'POST',
				body: JSON.stringify({
					initData: webApp.initData,
					action: 'setScheduleHoursUTC',
					scheduleHoursUTC: getUTCSelectedHour()
				})
			});
			const response = await responseRaw.json();

			if (!response.ok) {
				throw 'Not ok';
			}

			webApp.HapticFeedback.notificationOccurred('success');
			webApp.showPopup({
				message: `You changed the time to ${selectedHour}:00 🚀`,
				buttons: [{ type: 'ok' }]
			});
			webApp.MainButton.hideProgress().disable().setText(chooseAnotherTime);
			localTime = selectedHour;
		} catch (error) {
			webApp.HapticFeedback.notificationOccurred('error');
			webApp.showAlert(`Something went wrong, I'm already working on it..`);
			webApp.MainButton.hide();
			isError = true;
		} finally {
			isLoading = false;
		}
	};
	const handleSelectChange = () => {
		if (selectedHour === localTime) {
			webApp.HapticFeedback.notificationOccurred('error');
			webApp.MainButton.disable().setText(chooseAnotherTime);
		} else {
			webApp.HapticFeedback.selectionChanged();
			webApp.MainButton.enable().setText(`Change the time to ${selectedHour}:00 🕒`);
		}
	};

	onMount(async () => {
		isLoading = true;
		webApp = window.Telegram.WebApp;

		const color = getComputedStyle(document.documentElement)
			.getPropertyValue('--color-settings')
			.trim();

		webApp.setHeaderColor(color as Hex);
		webApp.MainButton.setParams({
			text: 'Loading..',
			text_color: `#000000`,
			is_active: false,
			is_visible: true,
			color
		})
			.showProgress()
			.onClick(handleSubmit);

		try {
			const responseRaw = await fetch(env.PUBLIC_API, {
				method: 'POST',
				body: JSON.stringify({
					initData: webApp.initData,
					action: 'scheduleHoursUTC'
				})
			});
			const response = await responseRaw.json();

			if (!response.ok) {
				throw 'Not ok';
			}

			localTime = response.scheduleHoursUTC + getDiffTimeLocalUtc();
			selectedHour = localTime;
			webApp.MainButton.hideProgress().disable().setText(chooseAnotherTime);
		} catch (error) {
			webApp.HapticFeedback.notificationOccurred('error');
			webApp.showAlert(`Something went wrong, I'm already working on it..`);
			webApp.MainButton.hide();
			isError = true;
		} finally {
			isLoading = false;
		}
	});

	onDestroy(() => {
		if (webApp) {
			webApp.MainButton.offClick(handleSubmit);
		}
	});
</script>

<svelte:head>
	<title>Settings</title>
	<meta name="description" content="Dad jokes bot settings" />
</svelte:head>

{#if isLoading}
	<div class="overlay" />
{/if}

{#if !isLoading && !isError}
	<div class="select-wrapper">
		<label for="select">Pick another time</label>

		<select id="select" bind:value={selectedHour} on:change={handleSelectChange}>
			{#each Array.from({ length: 24 }, (_, i) => i) as hour}
				<option value={hour}>{hour}:00</option>
			{/each}
		</select>
	</div>

	<p>
		Currently you receive jokes at

		<span class="time">{localTime}:00</span>

		local time
	</p>
{/if}

<style>
	label {
		display: block;
		margin-bottom: 10px;
		text-align: center;
		text-transform: uppercase;
	}

	p {
		text-align: center;
		font-size: 1.3rem;
	}

	span {
		font-size: 3rem;
	}

	select {
		width: 100%;
		background-color: var(--color-primary);
		color: var(--color-text);
		padding: 10px 20px;
		border-radius: 15px;
		border: none;
		-webkit-appearance: none;
		appearance: none;
		font-size: 1rem;
	}

	.time {
		display: block;
	}

	.select-wrapper {
		position: relative;
		margin-bottom: 100px;
	}

	.select-wrapper::after {
		content: '›';
		position: absolute;
		top: 70%;
		right: 20px;
		transform: translateY(-50%) rotate(90deg);
		pointer-events: none;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		-webkit-backdrop-filter: blur(5px);
		backdrop-filter: blur(5px);
	}
</style>
