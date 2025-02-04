<script>
	export let id = 'jh_mathematics';
	export let img = 'jh_mathematics.png';
	export let name = 'ザックリ中学数学';
	export let tags = ['中学', '数学'];
	export let date = 'yyyy/mm/dd';
	export let open = false;
</script>

<a href={id} class="card {open ? '' : 'gray'}">
	<img src="booklist/thumbnail/{img}" alt="thumbnail" class="thumbnail" />
	<div class="tags">
		{#each tags as tag}
			<span class="tag bg-successl">{tag}</span>
		{/each}
	</div>
	<div class="title">{name}</div>
	<div class="date">{date}</div>
</a>

<style lang="scss">
	.card {
		display: flex;
		flex-direction: column;
		background-color: aliceblue;
		border-radius: 0.5rem;
		cursor: pointer;
		text-decoration: none;
		transition: 0.5s;
		.thumbnail {
			max-width: 100%;
			border-radius: 0.5rem 0.5rem 0 0;
		}
		.tags {
			padding: 0 0.3rem;
			.tag {
				padding: 0 0.3rem;
				margin-right: 0.3rem;
				border-radius: 0.3rem;
			}
		}
		.title {
			padding: 0 0.5rem;
			font-size: larger;
			font-weight: bold;
		}
		.date {
			margin: auto 0.5rem 0.5rem auto;
		}
		&:hover {
			background-color: #fffac2;
			box-shadow: 5px 5px 5px;
		}
		&.gray {
			background: gray;
		}
	}
</style>
