<!-- トレーニング：選択問題 -->
<script lang="ts">
	import sound_piron from '$lib/piron.mp3';
	import sound_boo from '$lib/boo.mp3';
	import { onMount } from 'svelte';

	let questions = [
		{
			text: '8+(-5)=?',
			choice: [
				{ text: '13', diabled: false, class: '' },
				{ text: '-13', diabled: false, class: '' },
				{ text: '3', diabled: false, class: '' },
				{ text: '-3', diabled: false, class: '' }
			],
			answer_index: 2,
			comment: '(-5)を(+5)に直すと、足し算が引き算に変わって、「8-5=3」に変わります',
			isShow: false
		},
		{
			text: '6-(-2)=?',
			choice: [
				{ text: '8', diabled: false, class: '' },
				{ text: '-8', diabled: false, class: '' },
				{ text: '4', diabled: false, class: '' },
				{ text: '-4', diabled: false, class: '' }
			],
			answer_index: 0,
			comment: '(-2)を(+2)に直すと、足し算が引き算に変わって、「6+2=8」に変わります',
			isShow: false
		}
	];

	// 全問正解フラグ
	$: isClear = questions.every((item) => item.isShow == true);

	// シナリオ読み込み
	export let bookid = 'jh_mathematics';
	export let bookindex = '01';
	export let voiceVolume = 1;
	async function readJson() {
		questions = await fetch(`/scenario/${bookid}/${bookindex}/training.json`).then((response) =>
			response.json()
		);
	}
	onMount(async () => {
		readJson();
	});

	// 判定
	function answer(q_i: number, a_i: number) {
		if (questions[q_i].answer_index == a_i) {
			questions[q_i].choice[a_i].class = 'good';
			let piron = new Audio(sound_piron);
			piron.volume = Number(voiceVolume);
			piron.play();
			questions[q_i].isShow = true;
			questions[q_i].choice.forEach((item) => {
				item.diabled = true;
			});
		} else {
			let boo = new Audio(sound_boo);
			boo.volume = Number(voiceVolume);
			boo.play();
		}
	}
</script>

<section class="mx-auto">
	<div class="question-area">
		<h2>練習問題</h2>
		<!-- 各問題 -->
		{#each questions as item, q_i (q_i)}
			<hr />
			<div class="question pa-1 {item.isShow ? 'bg-lgrey' : ''}">
				<h3>第{q_i + 1}問</h3>
				<div>
					<span class="label bg-lgrey">問題</span>
					<span class="fs-xl">
						{item.text}
					</span>
				</div>

				<ol class="choice">
					{#each item.choice as answer_item, a_i (a_i)}
						<li>
							<button
								disabled={answer_item.diabled}
								class={answer_item.class}
								on:click={() => answer(q_i, a_i)}
							>
								{#if answer_item.class == 'good'}
									<span class="material-icons fc-success"> check_circle </span>
								{/if}
								{answer_item.text}
							</button>
						</li>
					{/each}
				</ol>

				<!-- 正解時のみ表示 -->
				{#if item.isShow}
					<div class="answer">
						<div>
							<span class="label bg-successl">正解</span>
						</div>
						<ol start={item.answer_index + 1}>
							<li>
								<span>
									{item.choice[item.answer_index].text}
								</span>
							</li>
						</ol>
					</div>

					<div class="comment">
						<div>
							<span class="label bg-grey fc-white hidden">解説</span>
						</div>
						<div>{item.comment}</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<aside>
		<div class="data pa-1">
			<table class="ma-auto">
				{#each questions as item, q_i (q_i)}
					<tr>
						<td class="ta-right pr-1">{q_i + 1}</td>
						<td>
							<span class="material-icons {item.isShow ? 'fc-success' : 'fc-diable'}">
								check_circle
							</span>
						</td>
					</tr>
				{/each}
			</table>
			{#if isClear}
				<div class="material-icons perfect ta-center">thumb_up_alt</div>
			{/if}
		</div>
	</aside>
</section>

<style lang="scss">
	section {
		max-width: 1020px;
		padding: 1rem;
		background-color: white;
		font-size: large;
		display: flex;
		.question-area {
			flex: 1;
			.question {
				ol.choice {
					margin: 1rem 0;
					list-style-type: upper-latin;
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 1rem;
					li {
						margin-left: 2rem;
						button {
							font-size: x-large;
							width: 100%;
							position: relative;
							&.good {
								background-color: #4ad58e42;
								color: black;
							}
							.material-icons {
								position: absolute;
								left: 0;
							}
						}
					}
				}
				.answer {
					display: flex;
					align-items: center;
					margin-bottom: 1rem;
					ol {
						list-style: upper-latin;
						margin-left: 1.5rem;
						li span {
							// font-weight: bold;
							font-size: x-large;
						}
					}
				}
				.comment {
					margin-bottom: 1rem;
					white-space: break-spaces;
					display: flex;
				}
			}
			.label {
				// background-color: var(--color-success);
				// color: white;
				border-radius: 0.5rem;
				padding: 0.2rem 0.5rem;
				margin-right: 0.5rem;
				white-space: nowrap;
			}
		}
		aside {
			.data {
				background-color: var(--color-lightGrey);
				margin-left: 0.5rem;
				border-radius: 1rem;
				position: sticky;
				top: 1rem;
			}
			.perfect {
				font-size: xx-large;
				color: goldenrod;
			}
		}
	}
</style>
