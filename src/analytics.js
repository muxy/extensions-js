import gumshoeFactory from '../libs/gumshoe';

// Send a data pulse every two minutes.
const DATA_PULSE_TIMEOUT = 120 * 1000;

export default class Analytics {
  constructor() {
    this.gumshoe = gumshoeFactory();

    setInterval(() => {
      this.sendEvent('video', 'pulse', 1);
    }, DATA_PULSE_TIMEOUT);
  }

  sendPageView() {
    this.gumshoe.send('page.view', {});
  }

  sendEvent(name, category, value = 0, label = '') {
    const data = {
      category,
      value,
      label
    };

    this.gumshoe.send(name, data, {});
  }
}
