const fs = require('fs');

const converter = require('widdershins');
const shins = require('shins');
const yaml = require('js-yaml');

const apiOptions = {
  codeSamples: false,
  httpsnippet: false,
  language_tabs: [],
  theme: 'darkula',
  search: true,
  tocSummary: true,
  heading: 2
};

const doc = yaml.safeLoad(fs.readFileSync('./docs/api.yml', 'utf-8'));

converter.convert(doc, apiOptions, async (err, str) => {
  if (err) {
    console.error(err);
    return;
  }

  const shinsOptions = {
    cli: false,
    minify: false,
    customCss: false,
    inline: true,
    unsafe: false,
    logo: './assets/images/logo.png',
    'logo-url': 'https://muxy.io'
  };

  shins.render(str, shinsOptions, (err, html) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.mkdir('./dist/docs', { recursive: true }, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      fs.writeFileSync('./dist/docs/api.html', html, 'utf8');
    })
  });
});
