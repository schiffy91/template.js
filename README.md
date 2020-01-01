# template.js
template.js is a compile-time templating framework for websites. It can share HTML (e.g. headers and footers) across files; it can also use generated output from JavaScript.

## Usage
Templates are included using their filename enclosed in brackets (e.g. `[FILENAME.EXTENSION]`).

To compile `index.template.html` into `index.html` simply use node:

`node template.js index.template.html index.html`

## Example

### index.template.html
This file will be compiled into `index.html` and includes two templates: `header.html` and `footer.js`:

```
<body>
	[header.html]
	[body.js]
</body>
```

### header.html
This file is static HTML that can be included in any of your website's pages.
```
<div class="navbar"></div>
```

### body.js
This file is JavaScript that will be evaluated each time it's included. All dynamic templates can consume an optional parameter, `currentPath`. Support for custom parameters is planned.
```
exports.main = function() {
	return "<h1>Hello, World</h1>";
}
```

### index.html
The final result

`index.html`
```
<body>
	<div class="navbar">...</div>
	<h1>Hello, World</h1>
</body>

```
