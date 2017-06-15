// Send a data pulse every two minutes.
const DATA_PULSE_TIMEOUT = 120 * 1000;

export default class Analytics {
  constructor() {
    setInterval(() => {
      this.sendEvent('video', 'pulse', 1);
    }, DATA_PULSE_TIMEOUT);
  }

  sendPageView() {
    console.log("Analytics: Sent page view");
  }

  sendEvent(name, category, value = 0, label = '') {
    const data = {
      category,
      value,
      label
    };
    console.log("Analytics: Sent event");
  }
}
