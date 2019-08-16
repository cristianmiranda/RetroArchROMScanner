const fs = require('fs'), path = require('path');

const args = process.argv.slice(2);
const romsDirectory = args[0];
const retroArchDirectory = args[1];
const dbName = args[2];

// Usage: node index.js "/Users/cristianmiranda/Desktop/Nintendo Switch/rom_scanner_app/roms/Gameboy Advance" "/retroarch/roms/Gameboy Advance" "Nintendo - Game Boy Advance.lpl"

function walkDir(dir, callback) {
	fs.readdirSync(dir).forEach( f => {
		let dirPath = path.join(dir, f);
		let isDirectory = fs.statSync(dirPath).isDirectory();
		isDirectory ?
			walkDir(dirPath, callback) : callback(path.join(dir, f), f);
	});
}

let items = [];
walkDir(romsDirectory, function(filePath, fileName) {
	console.log("Processing: " + fileName);

	let item = {};
	item.path = retroArchDirectory + "/" + fileName;
	item.label = fileName.split('.').slice(0, -1).join('.');
	item.core_path = "DETECT";
	item.core_name = "DETECT";
	item.crc32 = "88DAB27F|crc";
	item.db_name = dbName;

	items.push(item);
});

let playlist = {};
playlist.version = "1.0";
playlist.items = items;

console.dir(playlist);
let data = JSON.stringify(playlist, null, 2);
fs.writeFileSync(romsDirectory + "/" + dbName, data);

console.log("DONE!");
