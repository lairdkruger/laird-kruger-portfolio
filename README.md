# Laird Kruger Portfolio

My portfolio website for creative development and digital design.

#### Frameworks

[SvelteKit](https://kit.svelte.dev) | 
[Three](https://threejs.org/) | 
[Rapier](https://rapier.rs/)

#### Styling

[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

##### Methodology

The Svelte Javascript framework is useful for creating reusable web components, enabling reactivity and managing application state.

Because Svelte is technically just a compiler, it works at a relatively low-level when compared to other frameworks like React and Vue.
This means that Svelte essentially sits at the same level as the real DOM (no virtual DOM) - which makes it trivial to work with other Javascript libraries (like three.js) and native Web APIs.

Typescript is used to maintain static type checking throughout the application. The only reason typescript is used over javascript (with JSDoc for typings) is that typescript files are generally more readable and concise to write.

The SvelteKit application framework is used to enable SPA behaviour while maintaining server-side rendering and standard routing for SEO.
Modern CSS is powerful enough for all styling requirements.
