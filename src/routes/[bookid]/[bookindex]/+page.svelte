<!-- 解説ページ -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import Training from '$lib/Training.svelte';
	import { onMount } from 'svelte';

	export let data; // パスパラメータ;
	let bookid = data.bookid;
	let bookindex = data.bookindex;

	// data
	let chpterTitle = '';
	let isActor = true;
	let isSubtitle = true;
	let isVoice = true;
	let isAutoPlay = true;
	let isNav = true;
	let scenario = {
		chapter: 'hoge',
		page: [
			{
				title: '初めから',
				message: [
					{
						slide: '01-0.png',
						slide2: '',
						animation: 'fuwa',
						actor: 'ハルミナ',
						actorImg: 'Harumina.png',
						text: 'ここをクリックしてね♪',
						voice: ''
					}
				]
			}
		],
		training: false
	};
	let pageIndex = 0;
	let messageIndex = 0;
	let slideImg = '/images/null.png';
	let actorImg = '/scenario/actor/noimage.png';
	let voiceSrc = '';
	let setVoice: HTMLAudioElement;
	let voiceVolume = 1;
	let voiceSpeed = 1;
	let isHeight100 = true;

	$: message = scenario.page[pageIndex].message[messageIndex].text;
	$: messageLngth = scenario.page[pageIndex].message.length;
	$: actorName = scenario.page[pageIndex].message[messageIndex].actor;

	// 操作制御
	function switchNav() {
		isNav = !isNav;
	}

	// 戻る
	function urlBack() {
		setVoice.pause();
		goto(`/${bookid}`);
	}

	// シナリオ読み込み
	async function readJson() {
		scenario = await fetch(`/scenario/${bookid}/${bookindex}/scenario.json`).then((response) =>
			response.json()
		);
		chpterTitle = await scenario.chapter;
		slideView();
	}

	// スライド更新
	async function slideView() {
		let imgPath = scenario.page[pageIndex].message[messageIndex].slide;
		slideImg = `/scenario/${bookid}/${bookindex}/img/${imgPath}`;
		let actorPath = scenario.page[pageIndex].message[messageIndex].actorImg;
		actorImg = `/scenario/actor//${actorPath}`;
	}

	// 進む
	function next() {
		if (scenario.page.length == pageIndex + 1 && messageIndex + 1 == messageLngth) {
			return;
		} else if (messageIndex + 1 == messageLngth) {
			pageIndex++;
			messageIndex = 0;
		} else {
			messageIndex++;
		}
		slideView();
		if (isVoice) {
			voicePlay();
		}
	}

	// 音声
	function voicePlay() {
		setVoice.pause();
		voiceSrc = scenario.page[pageIndex].message[messageIndex].voice;
		if (voiceSrc) {
			let voicePath = `/scenario/${bookid}/${bookindex}/voice/${voiceSrc}`;
			setVoice = new Audio(voicePath);
			setVoice.playbackRate = Number(voiceSpeed);
			setVoice.volume = Number(voiceVolume);
			setVoice.play();
			setVoice.addEventListener('ended', () => {
				if (isAutoPlay) {
					next();
				}
			});
		}
	}
	function voiceStop() {
		setVoice.pause();
	}

	// もくじジャンプ
	function pageJump(i: number) {
		pageIndex = i;
		messageIndex = 0;
		slideView();
		setVoice.pause();
	}

	// mount
	onMount(async () => {
		setVoice = new Audio(voiceSrc);
		// pageIndex = 0;
		readJson();
	});
</script>

<header id="header">
	<button class="btn" on:click={urlBack}>
		<span class="material-icons"> arrow_back_ios_new </span>
	</button>
	<a href={null} class="title" on:click={urlBack}>{chpterTitle}</a>
	<button class="ms-auto btn" on:click={switchNav}>
		<span class="material-icons"> menu </span>
	</button>
	<button class="btn {isHeight100 ? '' : 'disable'}" on:click={() => (isHeight100 = !isHeight100)}>
		<span class="material-icons"> height </span>
	</button>
</header>

<main class={isHeight100 ? 'h100v' : ''}>
	<!-- レクチャー領域 -->
	<div class="lecture">
		<!-- スライド -->
		<a href={null} class="slide" on:click={next}>
			<img src={slideImg} alt="slide" />
		</a>
		<input type="range" class="progress" min="0" max={messageLngth - 1} bind:value={messageIndex} />
		<!-- メニュー -->
		<div class="menu">
			<div class="flex">
				<button class="btn {isActor ? '' : 'disable'}" on:click={() => (isActor = !isActor)}>
					<span class="material-icons"> support_agent </span>
				</button>
				<div class="actor_name">{actorName}</div>
			</div>

			<div class="flex ms-auto">
				<button
					class="btn {isSubtitle ? '' : 'disable'} "
					on:click={() => (isSubtitle = !isSubtitle)}
				>
					<span class="material-icons"> chat </span>
				</button>
				<button class="btn {isVoice ? '' : 'disable'}" on:click={() => (isVoice = !isVoice)}>
					<span class="material-icons"> volume_down </span>
				</button>
				<button
					class="btn {isAutoPlay ? '' : 'disable'}"
					on:click={() => (isAutoPlay = !isAutoPlay)}
				>
					<span class="material-icons"> loop </span>
				</button>
				<button class="btn" on:click={voicePlay}>
					<span class="material-icons"> play_arrow </span>
				</button>
				<button class="btn" on:click={voiceStop}>
					<span class="material-icons"> stop </span>
				</button>
				<div class="volume">
					<span class="material-icons"> volume_up </span>
					<input type="range" min="0" max="1" step="0.1" bind:value={voiceVolume} />
				</div>
				<div class="speedmeter">
					<span class="material-icons"> speed </span>
					<input type="range" min="0.8" max="1.6" step="0.2" bind:value={voiceSpeed} />
				</div>
			</div>
		</div>
		<!-- 字幕 -->
		{#if isSubtitle}
			<a href={null} class="subtitle" on:click={next}>
				{#if isActor}
					<img src={actorImg} alt="actor" />
				{/if}
				<div>
					{message}
				</div>
			</a>
		{/if}
	</div>

	<!-- もくじ -->
	{#if isNav}
		<nav>
			<ul>
				{#each scenario.page as page, index (index)}
					<li>
						<a
							href={null}
							class={index == pageIndex ? 'active' : ''}
							on:click={() => pageJump(index)}
						>
							<span>{index.toString().padStart(2, '0')}: </span>{page.title}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</main>

{#if scenario.training}
	<div class="bg-dark training">
		<Training {bookid} {bookindex} {voiceVolume} />
		<!-- <div class="ta-right pa-1"> -->
		<a href="#header" class="ta-right pa-1">
			<button class="btn">
				<span class="material-icons"> upload </span>
			</button>
		</a>
		<!-- </div> -->
	</div>
{/if}

<style lang="scss">
	header {
		height: 3rem;
		background-color: var(--dark);
		display: flex;
		align-items: center;
		// padding: 0.5rem;
		.title {
			padding: 0.5rem;
			color: white;
			font-size: larger;
			font-weight: bold;
		}
		button {
			height: fit-content;
		}
	}
	main {
		background-color: var(--dark);
		display: grid;
		grid-template-columns: 1fr auto;
		&.h100v {
			height: calc(100vh - 3rem);
		}
		.lecture {
			width: 100%;
			max-width: 1280px;
			max-height: calc(100vh - 3rem);
			margin: 0 auto;
			display: grid;
			grid-template-rows: 1fr auto auto auto;
			overflow: hidden;
			a.slide {
				// height: 100%;
				overflow: hidden;
				display: flex;
				text-align: center;
				&:active {
					filter: unset;
				}
				img {
					max-width: 100%;
					max-height: 100%;
					margin: auto;
					padding: 0 0.5rem;
				}
			}
			.progress {
				display: block;
				width: auto;
				margin: 0.5rem;
				accent-color: aliceblue;
				transition: 0.5s;
				opacity: 0.4;
				cursor: pointer;
				&:hover {
					opacity: 1;
				}
			}
			.menu {
				height: 2.5rem;
				display: flex;
				margin: auto 0.5rem 0;
				.actor_name {
					padding: 0.5rem;
					background-color: var(--dark);
					color: white;
					font-size: large;
					white-space: nowrap;
				}
				button {
					width: 3rem;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.volume,
				.speedmeter {
					margin: 2px 2px 2px 0;
					padding: 0.2rem;
					display: flex;
					align-items: center;
					border-radius: 0.2rem;
					background-color: var(--color-lightGrey);
					color: var(--color-darkGrey);
				}
				.volume input,
				.speedmeter input {
					width: 3rem;
					accent-color: #4a4a4a;
					cursor: pointer;
				}
			}
			.subtitle {
				margin: 0 0.5rem 0.5rem;
				height: 10rem;
				overflow-y: scroll;
				background-color: var(--dark);
				color: white;
				white-space: break-spaces;
				// padding: 0.5rem;
				font-size: x-large;
				display: flex;
				&::-webkit-scrollbar {
					display: none;
				}
				&:hover {
					text-decoration: none;
				}
				&:active {
					filter: unset;
				}
				img {
					max-height: 100%;
					border-radius: 0.5rem;
				}
				div {
					margin: auto;
					padding: 0.5rem 1rem;
					overflow: auto;
					user-select: none;
					&::after {
						padding-left: 0.5rem;
						content: '▼';
						animation: blink 1s ease-in-out infinite alternate;
					}
					@keyframes blink {
						0% {
							opacity: 0;
						}

						100% {
							opacity: 1;
						}
					}
				}
			}
		}
		nav {
			color: white;
			ul {
				padding: 0.2rem;
				background-color: var(--dark);
				list-style: none;
				a {
					display: block;
					padding: 0 0.2rem;
					margin-bottom: 0.1rem;
					line-height: 1.5rem;
					border-radius: 0.5rem;
					&:hover {
						background-color: #2e7f80;
					}
					&.active {
						background-color: #2e7f80;
					}
				}
			}
		}
	}
	.training {
		padding-top: 2rem;
		a {
			position: sticky;
			bottom: 0;
		}
	}

	.material-icons {
		width: 2rem;
		font-size: 2rem;
	}
	.disable {
		filter: opacity(0.5);
	}

	@media (max-width: 600px) {
		main {
			.lecture {
				.menu {
					flex-direction: column;
					height: unset;
					.flex.ms-auto {
						margin-left: 0;
					}
					button,
					.btn {
						width: 2rem;
					}
					.volume input,
					.speedmeter input {
						width: 2rem;
					}
				}
				.subtitle {
					font-size: medium;
					img {
						display: none;
					}
				}
			}
			.material-icons {
				font-size: 1.5rem;
			}
		}
	}

	@media (max-height: 500px) {
		main {
			.lecture {
				max-width: 800px;
				.menu {
					button,
					.btn {
						width: 2rem;
					}
					.volume input,
					.speedmeter input {
						width: 2rem;
					}
				}
				.subtitle {
					height: 5.5rem;
					font-size: medium;
					img {
						display: none;
					}
				}
			}
			.material-icons {
				font-size: 1.5rem;
			}
		}
	}
</style>
