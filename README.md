# Write

A free, web-based writing app based on [Flowstate](http://flowstate.com). Built using React.

The premise is simple. You set a duration during which you write; within that duration, if you stop typing for more than 5 seconds, all your progress is lost.

The typical use case of Flowstate is to avoid writer's block and get something down in writing. Personally, I've been using it for journalling; it's been a good exercise getting all of my thoughts, latent or prominent, down in writing. The duration has also helped me keep a consistent routine; if I know it's only going to be fifteen minutes every session, it's easier to sit down and get through it.

## Roadmap

- [ ] Refactoring storage from localStorage to a backwards-compatible ORM-esque system.
- [ ] Refactoring timekeeping with system time instead of setTimeout.
- [ ] Setting up benchmarking + optimizing for speed.
- [ ] Packaging as an Electron (Desktop) app.
