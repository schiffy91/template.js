# template
template is a templating engine for websites. It can copy-and-paste html from one file into another, and it can evaluate javascript and include the output in a file. html templates prevent copying-and-pasting common elements (like headers and footers), and javascript templates help with dynamic or complicated output generation.

## Usage
You define templates with a filename enclosed in brackets. For example, one can include `[header.html]` or `[header.js]` in a file `index.html`. 
* If you include `[header.html]`, its definition will be inline replaced by the content in `header.html`.
* If you include `[header.js]`, its definition will be replaced by the output of `header.js`.
The following example will generate `index.html`. The content of `index.html` is the content of `template.html`. However, all of the templates in `template.html` are evaluated; those evaluations are copied into `index.html` (instead of the template definitions).

```
./template template.html index.html
```

### template.html
```
[header.html]
<body>
	<h1>Hello, World</h1>
	[images.js]
</body>
```

#### header.html
```
<div class="navbar">...</div>
```

#### images.js
```
exports.main = function() {
	let fs = require('fs');

	var html = [];
	html.push("<div class=\"grid\">");
	fs.readdirSync("img/").forEach(file => {
		let src = `img/${file.toString()}`;
		let img = `\t\t<img src="${src}"/>`;
		html.push(img);
	})
	html.push("\t</div>")
	return html.join('\n');
}
```