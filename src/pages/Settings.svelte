<script>
  let selectedHour = ""; // Initialize to an empty string to signify 'nothing selected'

  function handleSubmit() {
    window.Telegram.WebApp.sendData(selectedHour);
  }

  $: diff = Number(selectedHour) - (new Date().getHours() - new Date().getUTCHours());
  $: utcTime = diff >= 0 ? diff : 24 + diff;
</script>

<h1>Settings</h1>

<p>{ utcTime }</p>

<select bind:value={selectedHour}>
	<option value="" disabled selected>Select the time</option>
	{#each Array.from({ length: 24 }, (_, i) => i) as hour}
	  <option value={hour}>{hour}:00</option>
	{/each}
  </select>

<button on:click={handleSubmit} disabled={!selectedHour}>
  Submit
</button>