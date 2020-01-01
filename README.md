# template.js
template.js is a compile-time templating framework for websites. It can share HTML (e.g. headers and footers) across files; it can also use generated output from JavaScript.

## Usage
Templates are included using their filename enclosed in brackets (e.g. `[FILENAME.EXTENSION]`).

To compile `index.template.html` into `index.html` simply use node: `node template.js index.template.html index.html`

## Example

### index.template.html
This file will be compiled into `index.html` and includes two templates: `header.html` and `images.js`:

```
[header.html]
<body>
	[images.js]
</body>
```

### header.html
This file is static HTML that can be included in any of your website's pages. Support for nested templates is planned.
```
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://ogp.me/ns/fb#">
<head>
	<!-- Metadata
	–––––––––––––––––––––––––––––––––––––––––––––––––– -->
	<meta charset="utf-8">
	<title>Alexander Schiffhauer</title>
	<meta name="description" content="art &amp; tech">
	<meta name="author" content="Alexander Schiffhauer">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta property="og:image" content="img/signature/signature-wide.png" />

	<!-- Font
	–––––––––––––––––––––––––––––––––––––––––––––––––– -->
	<link href="https://fonts.googleapis.com/css?family=Libre+Barcode+39+Extended+Text" rel="stylesheet"/>

	<!-- CSS
	–––––––––––––––––––––––––––––––––––––––––––––––––– -->
	<link rel="stylesheet" href="css/style.css">

	<!-- JS
	–––––––––––––––––––––––––––––––––––––––––––––––––– -->
	<script src="js/shuffle.js"></script>
	<script src="js/lazy.js"></script>
	<script src="js/lightbox.js"></script>
	<script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>

	<!-- Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-118264170-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag("js", new Date());
		gtag("config", "UA-118264170-1");
	</script>

	<!-- Favicon
	–––––––––––––––––––––––––––––––––––––––––––––––––– -->
	<link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png">
	<link rel="manifest" href="img/favicon/site.webmanifest">
	<link rel="mask-icon" href="img/favicon/safari-pinned-tab.svg" color="#5bbad5">
	<link rel="shortcut icon" href="img/favicon/favicon.ico">
	<meta name="msapplication-TileColor" content="#da532c">
	<meta name="msapplication-config" content="img/favicon/browserconfig.xml">
	<meta name="theme-color" content="#ffffff">
</head>
```

### images.js
This file is JavaScript that will be evaluated each time it's included. All JavaScript templates can consume an optional parameter, `currentPath`. Support for custom parameters is planned.
```
exports.main = function(currentPath) {
	let fs = require("fs");
	var html = [];
	fs.readdirSync("img/").forEach(file => { html.push(`<img src="img/${file.toString()}/>`) });
	return html.join('\n');
}
```

### index.html
The final result

`index.html`
```
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://ogp.me/ns/fb#">
<head>...</head>
<body>
	<img src="image_01.jpg"/>
	<img src="image_02.jpg"/>
	<img src="image_03.jpg"/>
</body>

```
