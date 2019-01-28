function component() {
  var element = document.createElement("div");
  var button = document.createElement("button");
  var br = document.createElement("br");

  button.innerHTML = "Click me";
  element.appendChild(button);
  element.appendChild(br);

  button.onclick = e => {
    e.preventDefault();
    import(/* webpackChunkName: 'logger' */ "./logger").then(logger =>
      logger("hello world!")
    );
  };

  return element;
}

document.body.appendChild(component());

if (typeof module.hot !== "undefined") {
  module.hot.accept();
}
