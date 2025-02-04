<script>
	import Header from '$lib/Header.svelte';
	const credit = [
		{
			type: 'キャラボイス',
			sites: [{ name: 'voicevox', href: 'https://voicevox.hiroshiba.jp' }]
		},
		{
			type: '画像',
			sites: [
				{ name: 'Draw Things', href: 'https://drawthings.ai' },
				{ name: 'icon-mono', href: 'https://icooon-mono.com/' },
				{ name: 'icon-rainbow', href: 'https://icon-rainbow.com' },
				{ name: 'icon-box', href: 'https://iconbox.fun' },
				{ name: 'illust8', href: 'https://illust8.com' },
				{ name: 'huggingface', href: 'https://huggingface.co' },
				{ name: 'Loose Drawing', href: 'https://loosedrawing.com' },
				{ name: 'イラストAC', href: 'https://www.ac-illust.com' },
				{ name: 'いらすとや', href: 'https://www.irasutoya.com' },
				{ name: 'ソトスト', href: 'https://soco-st.com' },
				{ name: 'ちょうどいいイラスト', href: 'https://tyoudoii-illust.com' },
				{
					name: 'ヒューマンピクトグラム2.0',
					href: 'https://pictogram2.com'
				},
				{
					name: 'フリーアイコンズ',
					href: 'https://free-icons.net'
				}
			]
		}
	];
</script>

<div class="layout">
	<Header />

	<div class="sites">
		{#each credit as item}
			<h3 class="title">{item.type}</h3>
			<ul>
				{#each item.sites as site}
					<li><a href={site.href} target="_blank">{site.name}</a></li>
				{/each}
			</ul>
		{/each}
	</div>
</div>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		.sites {
			max-width: 1200px;
			min-width: 600px;
			margin: 1rem auto;
			padding: 1rem;
			background-color: #00000090;
			color: white;
			.title {
				padding-left: 0.5rem;
				border-left: solid darkturquoise;
				border-bottom: solid darkturquoise;
			}
			ul {
				list-style: none;
				// margin-left: 1rem;
				margin-bottom: 1rem;
				font-size: large;
				a {
					padding: 0.1rem 1rem;
					display: block;
					border-radius: 0.5rem;
					line-height: 1.3;
					transition: 0.5s;
				}
				a:hover {
					background-color: #32767a;
					// background-color: whitesmoke;
					// color: black;
				}
			}
		}
	}
</style>
