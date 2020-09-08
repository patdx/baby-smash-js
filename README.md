# Baby Smash JS

This an a full screen app for entertaining babies.

Inspired by:

- [Baby Smash](https://www.hanselman.com/babysmash/)
- [Alpha Baby](http://www.littlepotatosoftware.com/abiphone.html)

It's using React and Three JS to run a 3D environment.

It's set up as a PWA so you can use the "Add to home screen" on your iOS or Android device, and you should be able to open it offline too.

## How to use it?

Install it and run:

```bash
yarn
yarn dev
```

## Notes

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.
