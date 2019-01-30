"use strict";
const { performance, PerformanceObserver } = require("perf_hooks");
const add = require("./src/adder");

// setup
const obs = new PerformanceObserver((list, observer) => {
  console.log(...list.getEntries());
  performance.clearMarks();
  observer.disconnect();
});

obs.observe({ entryTypes: ["measure"], buffered: true });

// test your code here
function measure() {
  let literation = 1e7;
  const a = 1;
  const b = 2;
  //
  while (literation--) {
    add(a, b);
  }
}

// start measuring
start();

function start() {
  performance.mark("init");
  measure();
  performance.mark("destroy");
  performance.measure("Benchmark measure", "init", "destroy");
}
