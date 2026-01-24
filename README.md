# Baby Smash JS

This an a full screen app for entertaining babies.

Inspired by:

- [Baby Smash](https://www.hanselman.com/babysmash/)
- [Alpha Baby](http://www.littlepotatosoftware.com/abiphone.html)

It's using React and Three JS to run a 3D environment.

It’s set up as a PWA (via [Serwist](https://serwist.pages.dev/docs/vite)) with a web app manifest and service worker, so you can use "Add to home screen" and open it offline.

## How to use it?

Install it and run:

```bash
pnpm
pnpm dev
```

## Notes

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.
