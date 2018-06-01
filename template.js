let fs = require("fs");
let path = require("path");

// Parse arguments
let args = process.argv.slice(2);
if (!Array.isArray(args) || args.length != 2) {
    throw "usage: template [input] [output]";
}

// Read input
let blueprint = "";
try {
    blueprint = fs.readFileSync(args[0]).toString();
} catch (error) {
    throw "unable to read from file " + args[0];
}

// Find templates
let start = -1, end = -1;
while ((start = blueprint.indexOf("[", end)) != -1 && (end = blueprint.indexOf("]", start)) != -1) {
    // Check for escapes
    if (start > 0 && blueprint[start - 1] == '\\') {
        blueprint = blueprint.slice(0, start - 1) + blueprint.slice(start)
        continue;
    }
    // Check if a file path
    let template = path.join(process.cwd(), blueprint.substring(start + 1, end));
    if (!fs.existsSync(template)) {
        continue;
    }
    // Replace template
    try {
        let extension = template.split(".");
        extension = extension[extension.length - 1];
        if (extension == "js") {
            let js = require(template);
            blueprint = blueprint.substring(0, start) + js.main() + blueprint.substring(end + 1);
        } else if (extension == "html") {
            blueprint = blueprint.substring(0, start) + fs.readFileSync(template) + blueprint.substring(end + 1);
        }
    }
    catch (error) {
        console.warn("unable to load or evaluate " + template + ':\n' + error);
    }
}

// Write outut
try {
    fs.writeFileSync(args[1], blueprint);
} catch (error) {
    throw "unable to write to file " + args[1];
}
