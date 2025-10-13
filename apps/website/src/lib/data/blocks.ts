export type ProjectType = 'information' | 'project' | 'textOnly'

export interface ContentBlock {
	type: ProjectType
	title: string
	slug: string
	url?: string
	description: string
	texture?: string
	credits?: {
		creditText?: string
		linkText?: string
		link?: string
	}[]
}

export const home: ContentBlock = {
	type: 'textOnly',
	title: 'Laird Kruger',
	slug: '/',
	url: '/',
	description: 'Creative developer and digital designer'
}

export const information: ContentBlock[] = [
	{
		type: 'information',
		title: 'About',
		slug: 'about',
		texture: 'about.webp',
		description:
			'Raised in Aotearoa, now Sunshine Coast based enjoying surfing, diving, music, movies and roadies',
		credits: [
			{
				creditText: 'Some of my music →',
				linkText: 'Soundcloud',
				link: 'https://soundcloud.com/lairdkruger'
			},
			{
				creditText: 'More Music →',
				linkText: 'Spotify',
				link: 'https://open.spotify.com/artist/2u4WHzgZEy65MlRyZNz4rg?si=P4Gy0o9cSe-3YbwZV32aAw'
			}
		]
	},
	{
		type: 'information',
		title: 'Experience',
		slug: 'experience',
		texture: 'experience.webp',
		description:
			'2019 → BsC in Computer Science and Philosophy → 2020 → Developer/Designer at Psychoactive Studios → 2021 → Independent developer and designer → 2023 → Developer at 1/1 Studio → 2024 → Developer at Studio Untitled'
	},
	{
		type: 'information',
		title: 'Technologies',
		slug: 'technologies',
		texture: 'technologies.webp',
		description:
			'Tools I use to create everything from simple portfolio websites to interactive 3D experiences and ecommerce storefronts:',
		credits: [
			{
				linkText: 'JS Frameworks (Astro, SvelteKit, NextJS)',
				link: 'https://astro.build/'
			},
			{
				linkText: 'Rust',
				link: 'https://www.rust-lang.org/'
			},
			{
				linkText: 'CSS',
				link: 'https://www.w3schools.com/css/css_intro.asp'
			},
			{
				linkText: 'Sanity',
				link: 'https://www.sanity.io'
			},
			{
				linkText: 'Shopify',
				link: 'https://www.shopify.com'
			},
			{
				linkText: 'ThreeJS',
				link: 'https://threejs.org'
			},
			{
				linkText: 'Web Audio API',
				link: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API'
			},
			{
				creditText: 'And many more'
			}
		]
	}
]

export const projects: ContentBlock[] = [
	{
		type: 'project',
		title: 'WAVEFORMS',
		slug: 'waveforms',
		texture: 'waveforms.webp',
		url: 'https://www.waveforms.app',
		description:
			'Concept + design + development of WAVEFORMS App → a collection of customisable realtime audio visualizers'
	},
	{
		type: 'project',
		title: 'Zendetta',
		slug: 'zendetta',
		texture: 'Zendetta.webp',
		url: 'https://www.zendetta.com',
		description:
			'Interactive story and website development for Syrian Activist: Zendetta → coded for Psychoactive\xa0Studios',
		credits: [
			{
				creditText: 'Credit →',
				linkText: 'Psychoactive Studios',
				link: 'https://www.psychoactive.co.nz'
			},
			{
				creditText: 'Site of the Day →',
				linkText: 'Awwwards',
				link: 'https://www.awwwards.com/sites/zendetta-a-story-from-syria'
			},
			{
				creditText: 'Developer Award →',
				linkText: 'Awwwards',
				link: 'https://www.awwwards.com/sites/zendetta-a-story-from-syria'
			},
			{
				creditText: 'Site of the Month →',
				linkText: 'CSSDesignAwards',
				link: 'https://www.cssdesignawards.com/wotm/zendetta-a-story-from-syria/41069/'
			},
			{
				creditText: 'FWA of the Day →',
				linkText: 'FWA',
				link: 'https://thefwa.com/cases/zendetta-a-story-from-syria'
			}
		]
	},
	{
		type: 'project',
		title: '1/1 Portfolio',
		slug: '1of1-portfolio',
		texture: '1of1portfolio.webp',
		url: 'https://1of1studio.com',
		description: 'Portfolio website for 1/1 studio → coded while working at 1/1\xa0Studio',
		credits: [
			{
				creditText: 'Credit →',
				linkText: '1/1 Studio',
				link: 'https://1of1studio.com/'
			}
		]
	},
	{
		type: 'project',
		title: 'Hyeja',
		slug: 'hyeja',
		texture: 'hyeja.webp',
		url: 'https://www.hyejaskincare.com',
		description: 'Custom Shopify storefront development for Hyeja Skincare → coded at 1/1\xa0Studio',
		credits: [
			{
				creditText: 'Credit →',
				linkText: '1/1 Studio',
				link: 'https://1of1studio.com/'
			}
		]
	},
	{
		type: 'project',
		title: 'TBC',
		slug: 'tbc',
		texture: '0xigami.webp',
		url: '#',
		description:
			'Currently working on a racing game written in Rust using a minimal-dependency custom 3D engine'
	}
]
