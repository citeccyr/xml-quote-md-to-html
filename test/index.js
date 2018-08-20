const assert = require('assert');
const fs = require('fs');
const transform = require('camaro');
const MarkdownIt = require('markdown-it');

// Extensions enabled by default:
// https://github.github.com/gfm/
// https://github.github.com/gfm/#tables-extension
const md = new MarkdownIt();

const xml = fs.readFileSync('test/pannot3.xml', 'utf-8');

/** @see https://developer.mozilla.org/en-US/docs/Web/XPath */
const template = {
  quote: '/root/Linkage/Object/Annotation/Quote'
};

const data = transform(xml, template);
//console.log('data', data);

const html = md.render(data.quote);

const reference_html = `<p>Look at diagrams at <a href="http://tabbles.net/what-is-it/whats-tabbles/">http://tabbles.net/what-is-it/whats-tabbles/</a><br>
<img src="http://tabbles.net/images/stories/web_v2/new_pic_dragndrop.png" alt="like this one"></p>
`;

assert.strictEqual(html, reference_html);