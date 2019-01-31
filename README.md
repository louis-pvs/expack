# expack

boilerplate for express + webpack stack

---

## Intro

A minimal setup to start a server using [expressjs](https://expressjs.com), locally or server.

> issue, question and pull request are welcome.

### Using the repo

clone the repo and do neccessary change on output directory in [webpack.config.js](https://github.com/louis-pvs/expack/blob/master/webpack.config.js#L8)

### running development mode locally

```
yarn
yarn build:dev
yarn start:dev
```

### run on your server

- git remote add origin `$YOUR_REMOTE_GIT_URL`
- git push origin master
- start your server by running 
```
yarn
yarn build:prod
yarn start:prod
```
- for better continuous integrate, create a `post-receive` [hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) in `${YOUR_REMOTE_GIT}.git/hook/post-receive`
  > extra thanks for this [friendly guide](https://medium.com/@aunnnn/automate-digitalocean-deployment-for-node-js-with-git-and-pm2-67a3cfa7a02b) to walk through how to setup git hook

### Feature

- [x] jest unit test enable
- [x] webpack config for both dev and prod
- [x] eslint enabled
- [x] hot reload enabled
- [x] friendlier webpack logger using [friendly-errors-webpack-plugin](https://github.com/geowarin/friendly-errors-webpack-plugin#readme)

### Optional feature not include

- [x] add react into stack (instead of adding it to stack, added an [example branch for react](https://github.com/louis-pvs/expack/tree/feature/demo-optimize-react))
- [ ] css compilation (during the time when of [cssinjs](https://github.com/cssinjs) getting their popularity, and I decide not include it in the stack)
- [ ] alternate api server, expectation to work with
  - [ ] RESTful api
  - [ ] graphql
  - [ ] and maybe socket

### Todo

- [ ] add more comment with description in each configuration options
- [ ] add a sample git `post-receive` hook
- [ ] sharing `PORT` across webpack config and server config
