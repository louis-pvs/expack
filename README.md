# expack

boilerplate for express + webpack stack

---

## Intro

A minial setup to start a server with express, with minimal tweak to match with nginx config.

> issue, question and pull request are welcome.

### Using the repo

clone the repo and do neccessary change on output directory, outputting `dist/server.js` and `dist/index.html` to minimal the unexpected path resolve error.

#### run locally

```
yarn
yarn build-dev
yarn start
```

_Q: why serving your app from `dist` instead of `src`?_

A: structure your code like production ready even when it still in development

#### run on your droplet

- git remote add origin `$YOUR_REMOTE_GIT_URL`
- git push origin master
- start your server by running `yarn start`
- for better continuous integrate, create a `post-receive` [hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) in `${YOUR_REMOTE_GIT}.git/hook/post-receive`
  > extra thanks for this [friendly guide](https://medium.com/@aunnnn/automate-digitalocean-deployment-for-node-js-with-git-and-pm2-67a3cfa7a02b) to walk through how to setup git hook

### Feature

- [x] jest unit test enable
- [x] webpack config for both dev and prod
- [x] eslint enabled
- [x] hot reload enabled
- [x] friendlier webpack logger using [friendly-errors-webpack-plugin](https://github.com/geowarin/friendly-errors-webpack-plugin#readme)

### Optional feature not include

- [ ] add react into stack
- [ ] css compilation (during the time when of [cssinjs](https://github.com/cssinjs) getting their popularity, and I decide not include it in the stack)
- [ ] alternate api server, expectation to work with
  - [ ] RESTful api
  - [ ] graphql
  - [ ] and maybe socket

### Todo

- [ ] add more comment with description in each configuration options
- [ ] add a sample git `post-receive` hook
- [ ] sharing `PORT` across webpack config and server config
