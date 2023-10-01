<script>
	let time1 = '';
	let time2 = '';
	let isValid = false;

	const timePattern = /^([01]\d|2[0-3]):?([0-5]\d)$/;

	$: isValid = timePattern.test(time1) && timePattern.test(time2);
</script>

<h1>Settings</h1>

<input
	type="text"
	placeholder="Time 1 (HH:MM)"
	pattern="([01]\d|2[0-3]):?([0-5]\d)"
	bind:value={time1}
/>
<input
	type="text"
	placeholder="Time 2 (HH:MM)"
	pattern="([01]\d|2[0-3]):?([0-5]\d)"
	bind:value={time2}
/>

<button disabled={!isValid}>Submit</button>
