<script>
	import { page } from '$app/stores';

	const doHapticFeedback = () => {
		window.Telegram.WebApp.HapticFeedback.selectionChanged();
	}
</script>

<header>
	<nav>
		<ul>
			<li on:click={doHapticFeedback} aria-current={$page.url.pathname === '/' ? 'home' : undefined}>
				<a href="/">Home</a>
			</li>
			<li on:click={doHapticFeedback} aria-current={$page.url.pathname === '/settings' ? 'settings' : undefined}>
				<a href="/settings">Settings</a>
			</li>
			<li on:click={doHapticFeedback} aria-current={$page.url.pathname.startsWith('/feedback') ? 'feedback' : undefined}>
				<a href="/feedback">Feedback</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		background-color: var(--color-primary);
		border-radius: 50px;
		margin-bottom: 30px;
		margin-top: 20px;
	}

	ul {
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
	}

	li[aria-current='home'] {
		color: var(--color-home);
	}

	li[aria-current='settings'] {
		color: var(--color-settings);
	}

	li[aria-current='feedback'] {
		color: var(--color-feedback);
	}

	nav a {
		display: block;
		padding: 15px;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: all 0.2s linear;
	}

	a:hover {
		transform: scale(1.1);
	}
</style>
