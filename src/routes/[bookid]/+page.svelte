<!-- もくじ -->
<script lang="ts">
	import Header from '$lib/Header.svelte';
	import { onMount } from 'svelte';

	export let data; // パスパラメータ;
	let book_index = {
		title: '中学生に学んでほしい経済入門',
		thumbnail: 'jh_economy.avif',
		index: [
			{
				part: 'プロローグ',
				chapter: [
					{ title: 'そもそも「経済」って何？', href: '01' },
					{ title: 'ざっくり国富論', href: '02' },
					{ title: '経済 vs 道徳', href: '03' }
				]
			}
		]
	};
	// function
	async function readJson() {
		book_index = await fetch(`/scenario/${data.bookid}/index.json`).then((response) =>
			response.json()
		);
	}

	// mount
	onMount(async () => {
		readJson();
	});
</script>

<div>
	<Header />
	<div class="layout">
		<!-- サムネイル・概要 -->
		<div class="guid">
			<img src="booklist/thumbnail/{book_index.thumbnail}" alt="thumbnail" class="thumbnail" />
		</div>

		<!-- もくじ -->
		<nav>
			{#each book_index.index as part}
				<ul>
					<li class="part">
						{part.part}
					</li>
					<ul class="chapter">
						{#each part.chapter as chapter, index (index)}
							<li>
								{#if chapter.href == '#'}
									<div class="disable">
										<span>{index + 1}:</span>
										<span>制作中：</span>
										<span>{chapter.title}</span>
									</div>
								{:else}
									<a href="/{data.bookid}/{chapter.href}">
										<span>{index + 1}:</span>
										{chapter.title}
									</a>
								{/if}
							</li>
						{/each}
					</ul>
				</ul>
			{/each}
		</nav>
	</div>
</div>

<style lang="scss">
	.layout {
		padding: 0.5rem;
		display: grid;
		// grid-template-columns: 1fr 1fr;
		grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
		gap: 0.5rem;
		.guid {
			img {
				max-width: 100%;
			}
		}
		nav {
			padding: 0.5rem;
			color: white;
			background-color: var(--dark);
			ul li.part {
				font-size: x-large;
				margin-bottom: 0.5rem;
				padding-left: 0.5rem;
				border-left: solid darkturquoise;
				border-bottom: solid darkturquoise;
				list-style: none;
			}
			ul.chapter {
				font-size: large;
				padding-left: 1rem;
				list-style: none;
				li {
					a {
						display: block;
						cursor: pointer;
						padding: 0.2rem;
						border-radius: 0.5rem;
						transition: 0.3s;
						&:hover {
							background-color: #2e7f80;
						}
					}
					.disable {
						filter: opacity(0.5);
						margin-left: 3px;
					}
				}
			}
		}
	}
</style>
