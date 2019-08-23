# RetroArch ROM Scanner

I found that RetroArch requires you to name your roms as they do on their database in order to scan roms property and generate playlists.
Maybe you want custom names on your roms, or maybe you don't want to worry about matching the database.

![](https://i.ibb.co/LSm4QKF/Screen-Shot-2019-08-23-at-11-55-45.png)

I don't like that. That's why I wrote this simple ROM scanner & RetroArch playlist generator (JSON format).

## Installation

    npm install -g retroarchromscanner

## Usage

    mkdir /drive/playlists
    retroarchromscanner /drive/roms /retroarch/roms
    ls /drive/playlists

 - /drive/playlists - *Required directory at the same level as "roms"*
 - /drive/roms - *Path to roms directory in local computer*
 - /retroarch/roms - *Path to roms directory in RetroArch installation*

Read this to know how to organize your roms in order for RetroArch to detect playlists generated by this tool and display nice icons
[https://docs.libretro.com/guides/roms-playlists-thumbnails](https://docs.libretro.com/guides/roms-playlists-thumbnails)

Here's the link to "RetroArch Database". I strongly recommend to use the same system names they're using.
[https://github.com/libretro/libretro-database/blob/master/README.md](https://github.com/libretro/libretro-database/blob/master/README.md)

## Example

    + playlists
    + roms
	|___ + Nintendo - Nintendo Entertainment System
	|___ + Sega - Mega Drive - Genesis
		 |___ + Mortal Kombat 3 Ultimate.bin

Now we generate the playlist:

    retroarchromscanner roms /retroarch/roms
    cat "playlists/Sega - Mega Drive - Genesis.lpl"

    ...
    
    {
      "path": "/retroarch/roms/Sega - Mega Drive - Genesis/Mortal Kombat 3 Ultimate.bin",
      "label": "Mortal Kombat 3 Ultimate",
      "core_path": "DETECT",
      "core_name": "DETECT",
      "crc32": "88DAB27F|crc",
      "db_name": "Sega - Mega Drive - Genesis"
    }
    
    ...

You can now safely copy the whole /drive/roms & /drive/playlists directory over to your RetroArch installation :smile: