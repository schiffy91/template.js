let fs = require("fs");
let path = require("path");

// Parse arguments
let args = process.argv.slice(2);
if (!Array.isArray(args) || args.length != 2) { 
    throw "usage: template [input] [output]"; 
}
let inputPath = args[0], outputPath = args[1];
let output = compile(inputPath);
try { fs.writeFileSync(outputPath, output); } 
catch (error) { throw "unable to write to file " + outputPath; }

function compile(inputPath) {
    // Read input
    let input = "";
    try { input = fs.readFileSync(inputPath).toString(); } 
    catch (error) { throw "unable to read from file " + inputPath; }

    // Find templates
    let start = -1, end = -1;
    while ((start = input.indexOf("[", end)) != -1 && (end = input.indexOf("]", start)) != -1) {
        // Check for escapes
        if (start > 0 && input[start - 1] == '\\') {
            input = input.slice(0, start - 1) + input.slice(start)
            continue;
        }
        // Check if a file path
        let template = path.join(path.dirname(path.resolve(inputPath)), input.substring(start + 1, end));
        if (!fs.existsSync(template)) {
            continue;
        }
        // Recursively compile template
        try {
            let extension = template.split(".");
            extension = extension[extension.length - 1];
            if (extension == "js") {
                let js = require(template);
                input = input.substring(0, start) + js.main(path.dirname(template) + "/") + input.substring(end + 1);
            } else if (extension == "html") {
                input = input.substring(0, start) + compile(template) + input.substring(end + 1);
            }
        }
        catch (error) {
            console.warn("unable to load or evaluate " + template + ':\n' + error);
        }
    }
    return input;
}