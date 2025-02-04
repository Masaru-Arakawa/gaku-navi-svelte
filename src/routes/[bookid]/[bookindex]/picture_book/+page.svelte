<!-- 絵本：作成中 -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	export let data;
	const bookid = data.bookid;
	// const pictureindex = data.pictureindex;
	const bookindex = data.bookindex;

	// // data
	let scnario = [
		{
			page: 0,
			texts: [
				{
					slide: '00.png',
					actor: '',
					text: '桃太郎',
					voice: '000_桃太郎.mp3'
				}
			]
		},
		{
			page: 1,
			texts: [
				{
					slide: '01.png',
					actor: '',
					text: '昔々あるところに、お爺さんとお婆さんが住んでいました。',
					voice: '001_むかーしむかしある.mp3'
				},
				{
					slide: '01.png',
					actor: '',
					text: 'ある日、お爺さんは山へ柴刈りに、お婆さんは川へ洗濯に出かけました。',
					voice: '002_ある日.mp3'
				}
			]
		},
		{
			page: 2,
			texts: [
				{
					slide: '02.png',
					actor: '',
					text: 'お婆さんが川で洗濯をしていると、川上から大きな桃が「どんぶらこ、どんぶらこ」と流れてきました。',
					voice: '003_川洗.mp3'
				},
				{
					slide: '02.png',
					actor: 'お婆さん',
					text: '「うわあ！こりゃぁまた、大きな桃だこと！」',
					voice: '004_「うわあ！こりゃあ.mp3'
				},
				{
					slide: '02.png',
					actor: '',
					text: 'お爺さんと二人で一緒に食べようと思い、お婆さんはその大きな桃を家へ持って帰りました。',
					voice: '005_おじいさんと二人で.mp3'
				},
				{
					slide: '02.png',
					actor: 'お爺さん',
					text: '「うわあ！なんじゃこりゃぁ、ずいぶんとおっきな桃じゃなあ！」',
					voice: '006_「うわあ、なんじゃ.mp3'
				},
				{
					slide: '02.png',
					actor: '',
					text: '柴刈りから帰ってきたお爺さんも、その桃を見てびっくりしていました。',
					voice: '007_柴刈りから帰ってき.mp3'
				},
				{
					slide: '02.png',
					actor: '',
					text: '二人は早速食べてみようと、桃を割ってみました。',
					voice: '008_二人は早速食べてみ.mp3'
				}
			]
		},
		{
			page: 3,
			texts: [
				{
					slide: '03.png',
					actor: '',
					text: 'するとさらにびっくり！なんと桃の中から小さな男の子が産まれてきました！',
					voice: '009_するとさらにびっく.mp3'
				},
				{
					slide: '03.png',
					actor: '赤ちゃん',
					text: '「おぎゃあ、おぎゃあ」',
					voice: '010_おぎゃあ、おぎゃあ.mp3'
				},
				{
					slide: '03.png',
					actor: '',
					text: '二人はとても驚きつつも、大変喜びました。桃から生まれたので桃太郎と名付け、この子を育てることにしました。',
					voice: '011_二人はとても驚きつ.mp3'
				}
			]
		},
		{
			page: 4,
			texts: [
				{
					slide: '05.png',
					actor: '',
					text: '桃太郎はすくすくと育ち、村の子供たちと日が暮れるまで遊び回る毎日を送り、やがて逞しい少年に成長しました。',
					voice: '012_桃太郎はすくすくと.mp3'
				},
				{
					slide: '05.png',
					actor: '',
					text: 'そんなある日のこと、風の噂にこんな話を聞きました。',
					voice: '013_そんなある日のこと.mp3'
				}
			]
		},
		{
			page: 5,
			texts: [
				{
					slide: '11.png',
					actor: '噂',
					text: '「遠い海の果てに『鬼ヶ島』という島があり、そこには悪い鬼たちが住んでいる。どうやら人々を襲っては財宝を奪っているようだ」',
					voice: '014_「遠い海の果てに「.mp3'
				},
				{
					slide: '11.png',
					actor: '',
					text: 'そんな話を聞いた桃太郎は、お爺さんとお婆さんに話を切り出しました。',
					voice: '015_そんな話を聞いた桃.mp3'
				}
			]
		},
		{
			page: 6,
			texts: [
				{
					slide: '06.png',
					actor: '桃太郎',
					text: '「私が悪い鬼たちを退治してきます」',
					voice: '016.mp3'
				},
				{
					slide: '06.png',
					actor: '',
					text: 'お爺さんとお婆さんは心配しましたが、その固い決意に負け、旅道具と、きびだんごを持たせて桃太郎を送り出しました。',
					voice: '017_おじいさんとおばあ.mp3'
				}
			]
		},
		{
			page: 7,
			texts: [
				{
					slide: '07.png',
					actor: '',
					text: '桃太郎が鬼ヶ島へ向かっていると、一匹のイヌが声を掛けてきました。',
					voice: '018_桃太郎が鬼ヶ島へ向.mp3'
				},
				{
					slide: '07.png',
					actor: 'イヌ',
					text: '「桃太郎さん、桃太郎さん、お腰につけたきびだんご、一つ私にくださいな!」',
					voice: '024_「桃太郎さん、桃太.mp3'
				},
				{
					slide: '07.png',
					actor: '',
					text: 'それに応えて桃太郎は言いました。',
					voice: '020_それに応えて桃太郎.mp3'
				},
				{
					slide: '07.png',
					actor: '桃太郎',
					text: '「私は今から鬼退治に行くところだ。その旅について来るのなら、このきびだんごをあげよう」',
					voice: '021_「私は今から鬼退治.mp3'
				},
				{
					slide: '07.png',
					actor: '',
					text: 'イヌはきびだんごを貰い、桃太郎の家来になってついて行くことにしました。',
					voice: '022_イヌはきびだんごを.mp3'
				}
			]
		},
		{
			page: 8,
			texts: [
				{
					slide: '08.png',
					actor: '',
					text: '桃太郎が鬼ヶ島へ向かっていると、今度は一匹のサルが声を掛けてきました。',
					voice: '023_桃太郎が鬼ヶ島へ向.mp3'
				},
				{
					slide: '08.png',
					actor: 'サル',
					text: '「桃太郎さん、桃太郎さん、お腰につけたきびだんご一つ私にくださいな!」',
					voice: '024_「桃太郎さん、桃太.mp3'
				},
				{
					slide: '08.png',
					actor: '',
					text: '桃太郎は言いました。',
					voice: '025_桃太郎は言いました.mp3'
				},
				{
					slide: '08.png',
					actor: '桃太郎',
					text: '「私は今から鬼退治に行くところだ。その旅について来るのなら、このきびだんごをあげよう」',
					voice: '021_「私は今から鬼退治.mp3'
				},
				{
					slide: '08.png',
					actor: '',
					text: 'サルはきびだんごを貰い、桃太郎の家来になってついて行くことにしました。',
					voice: '027_サルはきびだんごを.mp3'
				}
			]
		},
		{
			page: 9,
			texts: [
				{
					slide: '09.png',
					actor: '',
					text: '桃太郎が鬼ヶ島へ向かっていると、今度は一羽のキジが桃太郎に声をかけてきました。',
					voice: '028_桃太郎が鬼ヶ島へ向.mp3'
				},
				{
					slide: '09.png',
					actor: 'キジ',
					text: '「桃太郎さん、桃太郎さん、お腰につけたきびだんご一つ私にくださいな!」',
					voice: '024_「桃太郎さん、桃太.mp3'
				},
				{
					slide: '09.png',
					actor: '',
					text: '桃太郎は言いました。',
					voice: '030_桃太郎は言いました.mp3'
				},
				{
					slide: '09.png',
					actor: '桃太郎',
					text: '「私は今から鬼退治に行くところだ。その旅について来るのなら、このきびだんごをあげよう」',
					voice: '021_「私は今から鬼退治.mp3'
				},
				{
					slide: '09.png',
					actor: '',
					text: 'キジはきびだんごを貰い、桃太郎の家来になってついて行くことにしました。',
					voice: '032_キジはきびだんごを.mp3'
				}
			]
		},
		{
			page: 10,
			texts: [
				{
					slide: '10.png',
					actor: '',
					text: 'そうしてイヌ・サル・キジを家来にした桃太郎は、鬼ヶ島を目指して旅を続けました。',
					voice: '033_そうしてイヌ・サル.mp3'
				},
				{
					slide: '10.png',
					actor: '桃太郎',
					text: '「おお、ついに見えたぞ。あれが鬼ヶ島だ！」',
					voice: '034_「おおお、ついに見.mp3'
				}
			]
		},
		{
			page: 11,
			texts: [
				{
					slide: '11.png',
					actor: '',
					text: '鬼ヶ島に着くと、キジは空を飛んで辺りを偵察し、イヌが吠えて鬼を誘導し、その隙にサルが侵入して中から城門をあけました。',
					voice: '035_鬼ヶ島に着くと、キ.mp3'
				},
				{
					slide: '11.png',
					actor: '桃太郎',
					text: '「みんなよくやってくれた。よし、行くぞ。突撃ぃ！」',
					voice: '036_「みんなよくやって.mp3'
				}
			]
		},
		{
			page: 12,
			texts: [
				{
					slide: '12.png',
					actor: '',
					text: 'イヌは、鬼にかみつきます。',
					voice: '037_イヌは、鬼にかみつ.mp3'
				},
				{
					slide: '12.png',
					actor: '鬼',
					text: '「うぎゃあ！イタタタタタタタッ」',
					voice: '038_「うぎゃあイタタタ.mp3'
				},
				{
					slide: '12.png',
					actor: '',
					text: 'サルは、鬼をひっかきます。',
					voice: '039_サルは、鬼をひっか.mp3'
				},
				{
					slide: '12.png',
					actor: '鬼',
					text: '「ぐわぁ！アイタタタタタタタッ」',
					voice: '038_「うぎゃあイタタタ.mp3'
				},
				{
					slide: '12.png',
					actor: '',
					text: 'キジは、鬼をつっつきます。',
					voice: '041_キジは、鬼をつっつ.mp3'
				},
				{
					slide: '12.png',
					actor: '鬼',
					text: '「ヌわぁ！アイタタタタタタタッ」',
					voice: '038_「うぎゃあイタタタ.mp3'
				},
				{
					slide: '12.png',
					actor: '',
					text: 'そして桃太郎は、刀で鬼に斬りかかりました。',
					voice: '043_そして桃太郎は、刀.mp3'
				},
				{
					slide: '12.png',
					actor: '鬼',
					text: '「いたいいたい、まてまて、いたいいたいって。わるかった、わるかったからあ。こうさんするから、やめてえ！」',
					voice: '044_「いたいいたいまて.mp3'
				},
				{
					slide: '12.png',
					actor: '',
					text: '鬼たちは降参し、村人から奪った財宝を桃太郎に返すと、もう二度と悪さはしないと約束しました。',
					voice: '045_鬼たちは降参し、村.mp3'
				}
			]
		},
		{
			page: 13,
			texts: [
				{
					slide: '13.png',
					actor: '',
					text: '返してもらった財宝をを荷車に積んで持ち帰ると、村人たちはとても喜びました。',
					voice: '046_返してもらった財宝.mp3'
				},
				{
					slide: '13.png',
					actor: '',
					text: '桃太郎は、その後も村人たちと仲良く暮らしましたとさ。',
					voice: '047_桃太郎は、その後も.mp3'
				}
			]
		},
		{
			page: 14,
			texts: [
				{
					slide: 'end.png',
					actor: '',
					text: 'おしまい',
					voice: '048_おしいまあい.mp3'
				}
			]
		}
	];
	let pageIndex = 0;
	let textIndex = 0;
	let setVoice: HTMLAudioElement;
	let isVoice = true;
	let isAutoPlay = true;
	let pageLength = scnario.length - 1;
	$: txetLength = scnario[pageIndex].texts.length - 1;

	// function
	function forward() {
		setVoice.pause();
		if (textIndex < txetLength) {
			textIndex = textIndex + 1;
			if (isVoice) {
				play();
			}
		} else if (textIndex == txetLength) {
			nextPage();
		}
	}
	function nextPage() {
		setVoice.pause();
		if (pageIndex != pageLength) {
			textIndex = 0;
			pageIndex = pageIndex + 1;
			if (isVoice && isAutoPlay) {
				play();
			}
		}
	}
	function prePage() {
		setVoice.pause();
		textIndex = 0;
		if (pageIndex != 0) {
			pageIndex = pageIndex - 1;
		}
		if (isVoice && isAutoPlay) {
			play();
		}
	}
	function top() {
		setVoice.pause();
		pageIndex = 0;
		textIndex = 0;
	}
	function end() {
		setVoice.pause();
		textIndex = 0;
		pageIndex = pageLength;
	}
	function jump(index: number) {
		textIndex = index;
		if (isVoice) {
			play();
		}
	}
	function back() {
		setVoice.pause();
		goto(`/${bookid}`);
	}

	// 音声
	onMount(async () => {
		setVoice = new Audio('/sound/none.mp3');
	});

	function play() {
		setVoice.pause();
		let voiceSrc = scnario[pageIndex].texts[textIndex].voice;
		if (voiceSrc) {
			setVoice = new Audio(`/scenario/${bookid}/${bookindex}/voice/${voiceSrc}`);
			setVoice.play();
			setVoice.addEventListener('ended', () => {
				if (isAutoPlay) {
					forward();
				}
			});
		}
	}
	function stop() {
		setVoice.pause();
	}
</script>

<div class="layout">
	<div class="header">
		<button class="btn" on:click={back}>
			<span class="material-icons"> arrow_back_ios_new </span>
		</button>
		<a href={null} on:click={back}>
			<div class="title">桃太郎(オリジナル)</div>
		</a>
	</div>
	<!-- 絵本 -->
	<main>
		<div class="text-area">
			<div class="ma-auto">
				{#each scnario[pageIndex].texts as item, index}
					<div>
						<a
							href={null}
							class="text"
							class:active={index == textIndex}
							on:click={() => jump(index)}
						>
							{item.text}
						</a>
					</div>
				{/each}
			</div>
			<div class="ms-auto">{pageIndex + 1}/{pageLength + 1}</div>
		</div>
		<div class="slide-area">
			<img
				src="/scenario/{bookid}/{bookindex}/img/{scnario[pageIndex].texts[textIndex].slide}"
				alt="slide"
				class="slide"
			/>
		</div>
	</main>

	<!-- メニュー -->
	<div class="footer">
		<button class="btn" on:click={top}>
			<span class="material-icons"> first_page </span>
		</button>
		<button class="btn" on:click={prePage}>
			<span class="material-icons"> arrow_back_ios_new </span>
		</button>
		<button class="btn ms-auto" on:click={() => (isVoice = !isVoice)} class:disable={!isVoice}>
			<span class="material-icons"> support_agent </span>
		</button>
		<button class="btn" on:click={play}>
			<span class="material-icons"> play_arrow </span>
		</button>
		<button class="btn" on:click={() => (isAutoPlay = !isAutoPlay)} class:disable={!isAutoPlay}>
			<span class="material-icons"> loop </span>
		</button>
		<button class="btn" on:click={stop}>
			<span class="material-icons"> stop </span>
		</button>
		<button class="btn ms-auto" on:click={nextPage}>
			<span class="material-icons"> arrow_forward_ios </span>
		</button>
		<button class="btn" on:click={end}>
			<span class="material-icons"> last_page </span>
		</button>
	</div>
</div>

<style lang="scss">
	.layout {
		height: 100vh;
		background-color: #00000090;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
	.header {
		display: flex;
		.title {
			padding: 0.5rem;
			color: white;
			font-size: larger;
			font-weight: bold;
		}
		button {
			display: flex;
			align-items: center;
			font-size: x-large;
			margin-right: 0.2rem;
			padding: 0 0.5rem;
		}
		a {
			color: white;
		}
	}
	main {
		overflow: hidden;
		margin: 0.5rem;
		background-color: #e7e3d3;
		border-radius: 0.5rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		.text-area {
			padding: 1rem;
			display: flex;
			flex-direction: column;
			overflow: auto;
			a {
				cursor: pointer;
				text-decoration: none;

				&.active {
					color: maroon;
					font-weight: bold;
				}
			}
			.text {
				font-size: larger;
				display: block;
				margin-bottom: 0.5rem;
			}
		}
		.slide-area {
			display: flex;
			flex-direction: column;
			overflow: hidden;
			.slide {
				margin: auto;
				max-width: 100%;
				max-height: 100%;
				padding-right: 0.5rem;
				border-radius: 1rem;
			}
		}
	}
	.footer {
		display: flex;
		margin: 0 0.5rem 0.5rem;
		height: 3rem;
		button {
			display: flex;
			align-items: center;
			font-size: x-large;
			margin-right: 0.2rem;
			padding: 0 0.5rem;

			&.disable {
				opacity: 0.5;
			}
		}
	}
	.material-icons {
		width: 2rem;
		font-size: xx-large;
	}

	@media (max-width: 800px) {
		main {
			grid-template-columns: 3fr 2fr;
			.text-area .text {
				font-size: unset;
			}
		}
		.footer {
			button {
				font-size: large;
				margin-right: 0.2rem;
				padding: 0 0.2rem;
				.material-icons {
					width: 1.5rem;
				}
			}
		}
	}
</style>
