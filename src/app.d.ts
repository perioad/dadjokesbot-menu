// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Telegram } from '@twa-dev/types';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Window {
		Telegram: Telegram;
	}
}

export {};
