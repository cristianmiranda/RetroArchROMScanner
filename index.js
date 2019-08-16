const fs = require('fs'), path = require('path');

const args = process.argv.slice(2);
const romsDirectory = args[0];
const retroArchDirectory = args[1];

// Usage: node index.js "/Users/cristianmiranda/Desktop/Nintendo Switch/2 Tools/rom_scanner_app/roms" "/retroarch/roms"

const main = (rootDir, callback) => {
	fs.readdirSync(rootDir).forEach( romsDir => {
		let romsDirPath = path.join(rootDir, romsDir);
		let isDirectory = fs.statSync(romsDirPath).isDirectory();
		if (isDirectory) {
			processRomsDir(romsDirPath, romsDir)
		}
	});

	console.log("DONE!");
};

const processRomsDir = (romsDirPath, romsDir) => {
	let items = [];
	fs.readdirSync(romsDirPath).forEach( rom => {
		if (rom !== '.DS_Store') {
			console.log("Processing: " + rom);

			let item = {};
			item.path = retroArchDirectory + "/" + romsDir + "/" + rom;
			item.label = rom.split('.').slice(0, -1).join('.');
			item.core_path = "DETECT";
			item.core_name = "DETECT";
			item.crc32 = "88DAB27F|crc";
			item.db_name = romsDir;

			items.push(item);
		}
	});

	let playlist = {};
	playlist.version = "1.0";
	playlist.items = items;

	console.dir(playlist);
	let data = JSON.stringify(playlist, null, 2);
	fs.writeFileSync(romsDirectory + "/" + romsDir + ".lpl", data);
};

main(romsDirectory);
