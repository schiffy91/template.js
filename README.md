# template.js
template.js is a templating engine for websites. It can copy html from one file to another; it can also evaluate javascript and include its output in another file. 

## Usage
Templates are included by a filename enclosed in brackets. In the example below, `[header.html]` includes an html template.

#### index.template.html
```
<body>
	[header.html]
	<h1>Hello, World</h1>
</body>
```

#### header.html
```
<div class="navbar">...</div>
```

To build the template:

```
./template index.template.html index.html
```

#### index.html
```
<body>
	<div class="navbar">...</div>
	<h1>Hello, World</h1>
</body>
```

Similarly, in the example below, `[images.html]` evaluates a javascript template.

### index.template.html
```
<body>
	[images.js]
</body>
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

To build the template:

```
./template index.template.html index.html
```

#### index.html
```
<body>
	<h1>Hello, World</h1>
	<div class="grid>
		<img src=.../>
		...
	</div>
</body>
```

## Dependenceis
node.js