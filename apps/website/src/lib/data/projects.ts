export interface Project {
	index: number
	type: 'initial' | 'info' | 'work'
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

export const home: Project = {
	index: 0,
	type: 'initial',
	title: 'Laird Kruger',
	slug: '/',
	url: '/',
	description: 'Independent creative developer and digital designer'
}

export const info: Project[] = [
	{
		index: 1,
		type: 'info',
		title: 'About Me',
		slug: 'about',
		texture: 'lairdkruger.webp',
		description:
			'Raised in Aotearoa and now Noosa based enjoying → Surfing → Diving → Music → Movies → Roadies',
		credits: [
			{
				creditText: 'Some Music →',
				linkText: 'Soundcloud',
				link: 'https://soundcloud.com/lairdkruger'
			},
			{
				creditText: 'Some More Music →',
				linkText: 'Spotify',
				link: 'https://open.spotify.com/artist/2u4WHzgZEy65MlRyZNz4rg?si=P4Gy0o9cSe-3YbwZV32aAw'
			}
		]
	},
	{
		index: 2,
		type: 'info',
		title: 'Experience',
		slug: 'experience',
		texture: 'experience.webp',
		description:
			'2019 → BsC in Computer Science and Philosophy → 2020 → Full-stack at Psychoactive Studios → 2021 → Independent developer and designer'
	},
	{
		index: 3,
		type: 'info',
		title: 'Technologies',
		slug: 'technologies',
		texture: 'technologies.webp',
		description:
			'My go-to tools to create everything from simple portfolio websites to interactive 3D experiences and fully customised ecommerce storefronts:',
		credits: [
			{
				linkText: 'React',
				link: 'https://reactjs.org'
			},
			{
				linkText: 'NextJS',
				link: 'https://nextjs.org'
			},
			{
				linkText: 'Threejs',
				link: 'https://threejs.org'
			},
			{
				linkText: 'Shopify',
				link: 'https://www.shopify.com'
			},
			{
				linkText: 'Sanity CMS',
				link: 'https://www.sanity.io'
			},
			{
				linkText: 'CSS/SASS',
				link: 'https://sass-lang.com'
			},
			{
				linkText: 'React Three Fiber',
				link: 'https://docs.pmnd.rs/react-three-fiber/getting-started/examples'
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

export const projects: Project[] = [
	{
		index: 4,
		type: 'work',
		title: 'WAVEFORMS',
		slug: 'waveforms',
		texture: 'waveforms.webp',
		url: 'https://www.waveforms.app',
		description:
			'Concept + design + development of WAVEFORMS App → a collection of realtime web-based audio reactive visualizers'
	},
	{
		index: 5,
		type: 'work',
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
		index: 6,
		type: 'work',
		title: 'Otherside',
		slug: 'otherside',
		texture: 'Template.webp',
		url: 'https://www.otherside.directory/',
		description:
			'Showcase of the development template used by Otherside Directory → a concept collective'
	},
	{
		index: 7,
		type: 'work',
		title: 'Embryonic',
		slug: 'embryonic',
		texture: 'Embryonic.webp',
		url: 'https://www.embryonic.me/',
		description:
			'Blockchain NFT minting site for ARTHAUS project + Creation of template respository for future blockchain/NFT projects'
	},
	{
		index: 8,
		type: 'work',
		title: 'Studio S II',
		slug: 'studio-s-ii',
		texture: 'StudioSII.webp',

		url: 'https://www.studiosii.com',
		description:
			'Ecommerce site created for sci-fi Studio S II while working as a developer at Psychoactive\xa0Studios',
		credits: [
			{
				creditText: 'Design →',
				linkText: 'Studio S II',
				link: 'https://www.studiosii.com'
			},
			{
				creditText: 'Dev →',
				linkText: 'Psychoactive Studios',
				link: 'https://www.psychoactive.co.nz'
			}
		]
	},
	{
		index: 9,
		type: 'work',
		title: '0xigami',
		slug: 'oxigami',
		texture: '0xigami.webp',
		url: 'https://www.behance.net/gallery/135850473/0xIGAMI-Brand-Guidelines',
		description: 'Brand identity and guidelines for sci-fi blockchain project'
	},
	{
		index: 10,
		type: 'work',
		title: 'Gallery',
		slug: 'gallery',
		texture: 'KieransGallery.webp',
		url: 'https://www.kierankruger.photography',
		description: "Gallery site for Kieran Kruger's photography"
	},
	{
		index: 11,
		type: 'work',
		title: 'Newfoundland',
		slug: 'newfoundland',
		texture: 'Newfoundland_001.webp',
		url: 'https://newfoundland.studio',
		description: 'Experimental case study website created for pseudostudio newfoundland'
	},
	{
		index: 12,
		type: 'work',
		title: 'Lotties Study',
		slug: 'lotties-study',
		texture: 'Lotties.webp',
		url: 'https://lottie-demonstration.webflow.io/',
		description: 'Educational document exploring some advanced uses of the Lottie animation format',
		credits: [
			{
				creditText: 'Referenced By →',
				linkText: 'Create Lottie Layer',
				link: 'https://github.com/samcraigdev/create-lottie-layer'
			}
		]
	}
]
