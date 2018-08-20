#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const program = require('commander');
const package_json = require('./package.json');
const transform = require('camaro');

// Extensions enabled by default:
// https://github.github.com/gfm/
// https://github.github.com/gfm/#tables-extension
const md = new MarkdownIt();

const WAIT_FOR_STDIN_MS = 5000;

let input_stream = process.stdin;
let output_stream = process.stdout;
let waiting_for_stdin = true;
let output_is_stdout = true;

program
  .version(package_json.version, '-v, --version')
  .description('Defaults:' +
    '\n    input.xml\t- STDIN' +
    '\n    output.html\t- STDOUT')
  .option('-o, --output [result.html]', 'Output HTML result (default: STDOUT)')
  .option('-q, --quote [xpath]', 'XPath for extraction of the markdown quote', '/root/Linkage/Object/Annotation/Quote')
  .arguments('[input.xml]')
  .action(action);

program.parse(process.argv);

/**
 * Check for input and output files
 * if output file is in not existing directory make output to STDOUT
 * @param input
 */
function action (input) {
  //console.log('input', input);
  /** @type {string} */
  const output = program.output;
  //console.log('output', output);
  try {
    if (input
      && typeof input === 'string') {
      input_stream = fs.createReadStream(input);
      waiting_for_stdin = false;
      //console.log('input is string');
    }

    if (output
      && typeof output === 'string'
      && fs.existsSync(
        path.dirname(output)
      )) {
      output_stream = fs.createWriteStream(output);
    } else {
      output_is_stdout = true;
    }
  } catch (e) {
    console.error(e.message);
  }
}

let xml = '';
input_stream
  .on('data', (chunk) => {
    waiting_for_stdin = false;
    xml += chunk;
  })
  .on('end', () => {
    convert(xml);
  });

/**
 * Convert XML's `<Quote>` from Markdown to HTML
 * then write to output (file or STDOUT)
 * @param {string} xml
 */
function convert (xml) {
  //console.log('convert() - xml.length', xml.length);
  //console.log('program.quote', program.quote);
  /** @see https://developer.mozilla.org/en-US/docs/Web/XPath */
  const template = {
    quote: program.quote,
  };
  const data = transform(xml, template);
  //console.log('data', data);
  const html = md.render(data.quote);
  output_stream.write(html, check_and_exit);
}

/**
 * Waiting for STDIN
 */
setTimeout(function () {
  if (waiting_for_stdin) {
    console.log('Waiting for STDIN...' +
      '\nIf you are stuck press Ctrl+C and run program with --help option');
  }
}, WAIT_FOR_STDIN_MS);

/**
 * Check if output is STDOUT and exit
 */
function check_and_exit () {
  // Fix: Cannot close STDOUT
  if (!output_is_stdout) {
    output_stream.end(); // Process exit automatically
  } else {
    process.exit();      // Force exit
  }
}

// Only for text if not writing to STDOUT
output_stream.on('finish', () => {
  //console.log('Finish writing of output_stream');
  process.exit();
});

process.on('exit', () => {
  //console.log('process exit');
});

process.on('uncaughtException', (err) => {
  console.error('uncaught exception', err);
});
