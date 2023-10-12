<script>
	import logo from '$lib/images/dad.png';
</script>

<div class="container">
    <div class="overlay"></div>
    <div class="logo">
		<img src={logo} alt="Dad jokes bot logo" />
	</div>
</div>

<style>
    .container {
        position: absolute;
        top: 0;
        left: 0;
        width: 96vw;
        height: 100vh;
        z-index: 10;
        display: flex;
  justify-content: center;
  align-items: center;
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

    .logo {
        width: 50px;
        height: 50px;
        z-index: 12;
        animation: spin 2s linear infinite;
    }

    .logo img {
        width: 100%;
        height: 100%;
    }

    @keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
