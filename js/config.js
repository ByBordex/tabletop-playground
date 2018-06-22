class Configuration {
  constructor() {
    this.settings = new Map();
    this.observers = []
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  setValue(name, value) {
    this.settings.set(name, value);
    this.notify();
  }

  getValue(setting) {
    return this.settings.get(setting);
  }

  notify() {
    this.observers.forEach(function(obs) {
      obs.update();
    });
  }
}

configuration = new Configuration();
configuration.setValue("tabletop_w_squares", 5);
configuration.setValue("tabletop_h_squares", 10);
configuration.setValue("gridStroke", "black");
configuration.setValue("squareStroke", "Tomato");
configuration.setValue("tabletop_width", 1500);
configuration.setValue("tabletop_sw", 50);
