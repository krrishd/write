# Write

A web-based writing app based on [Flowstate](http://flowstate.com). Built using React.

The premise is simple. You set a duration during which you write; within that duration, if you stop typing for more than 5 seconds, all your progress is lost.

The typical use case of Flowstate is to avoid writer's block and get something down in writing. Personally, I've been using it for journalling; it's been a good exercise getting all of my thoughts, latent or prominent, down in writing. The duration has also helped me keep a consistent routine; if I know it's only going to be fifteen minutes every session, it's easier to sit down and get through it.

## Setup Instructions

This app was scaffolded using [create-react-app](https://github.com/facebookincubator/create-react-app) and then ejected.

In order to run it locally, clone this repository, run `npm install`, and then either:

- run `node scripts/start.js` to start a local server
- run `node scripts/build.js` to create a production-optimized build

## Roadmap

Have suggestions/ideas for improvement? Feel free to submit them in the form of an issue (pull requests also welcome).

- [ ] Setting up DNS for write.itskrish.co (currently accessible at [write.surge.sh](http://write.surge.sh))
- [x] Refactoring storage from localStorage to a backwards-compatible ORM-esque system.
- [x] Refactoring timekeeping with system time instead of setTimeout.
- [ ] Setting up benchmarking + optimizing for speed.
- [ ] Packaging as an Electron (Desktop) app.
