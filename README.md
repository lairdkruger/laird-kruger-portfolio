# Laird Kruger Portfolio

My portfolio website showcasing creative development and digital design.

#### Frameworks

[Svelte](https://svelte.dev) |
[SvelteKit](https://kit.svelte.dev)

#### Libraries

[Three](https://threejs.org/) |
[Rapier](https://rapier.rs/)

#### Styling

[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

##### Methodology

The Svelte JavaScript framework is used for creating reusable web components, enabling reactivity and managing application state.

The main reason Svelte is used here as opposed to other popular JavaScript frameworks (React or Vue) is that Svelte works at compile-time rather than run-time.
Operating at this lower level makes working with the DOM, native browser APIs and other JavaScript libraries (like three.js) much more trivial than the other frameworks.

In this project specifically, you'll see that by implementing a basic Svelte context I've been able to use three.js declaratively (what react-three-fiber implements for React).

TypeScript is used to maintain static type checking throughout the application. The only reason TypeScript is used over JavaScript (with JSDoc for typings) is that TypeScript files are generally more readable and concise to write.

The SvelteKit application framework is used to enable SPA behaviour while maintaining server-side rendering and standard routing for SEO benefits.

For a project of this scale, I've done away with CSS preprocessors as Modern CSS is easily powerful enough for all styling requirements, with dynamic variables, container queries etc.
