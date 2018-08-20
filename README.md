# XML's `<Quote/>` Markdown to HTML


> Convert the Markdown content in the XML's `<Quote>` tag to the HTML

Node.js private module for extracting the Markdown content from XML via XPath and converting it to the HTML in a terminal.

Based on [Camaro](https://github.com/tuananh/camaro) and [Markdown-it](https://github.com/markdown-it/markdown-it) libraries.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

### Prerequisites

You need [Node.js](https://nodejs.org/) version 10+. Then install node module globally:


```bash
npm install --global github.com/citeccyr/xml-quote-md-to-html
```

## Usage

### Convert

#### Write to STDOUT

```bash
xml-quote-md-to-html input.xml
```

#### Write to file

```bash
xml-quote-md-to-html input.xml -o output.html  
```

### Read from STDIN

#### Linux/macOS

```bash
cat input.xml | xml-quote-md-to-html
```

#### Windows

```cmd
type input.xml | xml-quote-md-to-html
```

### Change XPath

```bash
xml-quote-md-to-html input.xml -q "//Quote" 
```

### Show help

```bash
xml-quote-md-to-html --help
```

```

  Usage: xml-quote-md-to-html [options] [input.xml]

  Defaults:
    input.xml   - STDIN
    output.html - STDOUT

  Options:

    -v, --version               output the version number
    -o, --output [output.html]  Output HTML result (default: STDOUT)
    -q, --quote [xpath]         XPath for extraction of the markdown quote (default: /root/Linkage/Object/Annotation/Quote)
    -h, --help                  output usage information

```

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

Apache-2.0

© 2018 Sergey N
