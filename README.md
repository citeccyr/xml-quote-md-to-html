# XML's `<Quote/>` Markdown to HTML


> Convert the Markdown content in the XML's `<Quote>` tag to the HTML

Use it with [Node.js](https://nodejs.org/) version 10+.


## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

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

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

Apache-2.0

© 2018 Sergey N
