<script>
	let feedback = '';
	let isValid = false;

	$: isValid = feedback.trim() !== '';
</script>

<h1>Feedback</h1>

<textarea bind:value={feedback} />

<button disabled={!isValid}>Submit</button>
