import { Telegram, MainButton } from '@twa-dev/types';

declare global {
	interface Window {
		Telegram: Telegram;
	}
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {}
