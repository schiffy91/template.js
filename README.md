# template.js
template.js is a templating engine for websites. It can copy html from one file to another; it can also evaluate javascript and include its output in another file. 

## Usage
Templates are included by a filename enclosed in brackets.

`index.template.html`
```
<body>
	[header.html]
	<h1>Hello, World</h1>
	[images.js]
</body>
```

`header.html`
```
<div class="navbar">...</div>
```

`images.js`
```
exports.main = function(currentPath) {
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

To evaluate the templates and build the output:

```
node template.js index.template.html index.html
```

`index.html`
```
<body>
	<div class="navbar">...</div>
	<h1>Hello, World</h1>
	<div class="grid>
		<img src=.../>
	</div>
</body>

```