const assert = require('assert');
const fs = require('fs');
const transform = require('camaro');
const marked = require('marked');

const xml = fs.readFileSync('test/pannot3.xml', 'utf-8');

/** @see https://developer.mozilla.org/en-US/docs/Web/XPath */
const template = {
  quote: '/root/Linkage/Object/Annotation/Quote'
};

const data = transform(xml, template);
//console.log('data', data);

/** @type {string} */
const html = marked(data.quote, {
  // https://github.github.com/gfm/
  gfm: true,
  // https://github.github.com/gfm/#tables-extension
  tables: true,
});
//console.log('html', html);

const reference_html = '<p>Look at diagrams at <a href="http://tabbles.net/what-is-it/whats-tabbles/">http://tabbles.net/what-is-it/whats-tabbles/</a><br><img src="http://tabbles.net/images/stories/web_v2/new_pic_dragndrop.png" alt="like this one"></p>\n';

assert.strictEqual(html, reference_html);