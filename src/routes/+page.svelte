<!-- トップ：本棚 -->
<script lang="ts">
	import Card from '$lib/Card.svelte';
	import { onMount } from 'svelte';

	// 本棚
	let bookList = [
		{
			id: 'jh_mathematics',
			img: 'jh_mathematics.png',
			name: 'ザックリ中学数学',
			date: '2022/11/06~',
			tags: ['中学', '数学'],
			open: false
		}
	];
	let search: string = '';

	// function
	$: searchbookList = bookList.filter((e) => {
		return e.name.includes(search) || e.tags.includes(search);
	});

	async function readJson() {
		bookList = await fetch('booklist/book_list.json').then((response) => response.json());
	}

	// mount
	onMount(async () => {
		readJson();
	});
</script>

<div class="layout">
	<!-- ヘッダー -->
	<header>
		<a href="/">
			<h1 class="title">がくなび</h1>
		</a>
		<input type="search" placeholder="検索" class="search" bind:value={search} />
	</header>

	<!-- メイン -->
	<main>
		{#each searchbookList as item (item.id)}
			<Card {...item} />
		{/each}
	</main>

	<!-- フッター -->
	<footer>
		<div class="flex-a">
			<a href="credit">お借りした素材</a>

			<a href="/" class="disable" title="製作中">お問い合わせ</a>
		</div>
		<p><small>&copy; witships</small></p>
	</footer>
</div>

<style lang="scss">
	.layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	header {
		padding: 0.5rem;
		display: flex;
		background-color: var(--dark);
		a {
			color: white;
		}
		.title {
			color: white;
		}
		input {
			margin: 0 auto;
			padding: 0 0.5rem;
			font-size: large;
			border-radius: 0.5rem;
		}
	}

	main {
		padding: 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
	}

	footer {
		margin-top: auto;
		padding: 0.5rem;
		background-color: var(--dark);
		text-align: center;
		color: white;
		a {
			color: white;
		}
	}
</style>
