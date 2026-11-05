---
title: Chapter 12: exporting your game
description: Chapter 12 of The Creator Starter Kit: Games, with pictures: export your Godot game for Windows, and as a web version, to share with family.
updated: 5 November 2026 (steps tested on Godot 4.7.2, Windows 11)
---

<!--
Chapter 12 export page (Luke, 5 November 2026): the export steps moved
here from /godot, text and screenshots unchanged (tested sources:
DEVICE-TEST-D5 W3–W5, PRE-G3-CHECKS P7; screenshots Luke's, Godot
4.7.2). The once-only export templates section (with the download-
failure help and Install from File) moved here from /godot too,
unchanged, later the same day.
-->

# Chapter 12: exporting your game

These are the export steps from Chapter 12 of the book.

## Once only: the export templates

Do this with a parent, on a good internet connection.

1. In Godot, open the **Editor** menu, then **Manage Export Templates**.
2. If Godot says it's offline, click **Go Online**. Godot starts in offline mode, and the download list stays empty until you do.

![The bottom of Godot's Export Template Manager. It says no templates are installed and "Offline mode, some functionality is not available", with Go Online outlined.](/img/godot/templates-go-online.webp)

3. Under **Available Templates**, tick only the two templates this book uses: **Windows x86_64** and **Web Single-Threaded**, then click **Install Selected Templates**. Together they're about 115 MB. Don't click **Install All Templates**: that downloads all of them, about 1 GB.

![Godot's Available Templates list. Windows x86_64 and Web Single-Threaded are ticked and outlined, and so is the Install Selected Templates button at the top.](/img/godot/templates-install-selected.webp)

**If the download fails,** close the window and try again later, or on a different internet connection. If it still fails, security software or a school or work network may be blocking Godot. A parent can get the templates another way:

1. In a web browser, go to [godotengine.org/download](https://godotengine.org/download/) and download **Export templates**. It's one file ending in `.tpz`, about 1 GB.
2. In Godot's Export Template Manager, click the small file icon beside **Install All Templates**, and pick that file.

## A Windows game for family

1. **Project → Export → Add → Windows Desktop.**
2. In the options, under **Binary Format**, turn on **Embed PCK** (it starts off), so the game is one file.

![Godot's Export window with the Windows Desktop preset. Under Binary Format, Embed PCK is ticked and outlined.](/img/godot/embed-pck.webp)

3. Click **Export Project**. Not **Export PCK/ZIP** next to it: that one makes a different kind of file and gives an error.
4. Godot suggests your project folder, so change it: make a new folder outside your project, such as `C:\GodotExports\BenchCat` (the folder button at the top right of the save window makes one). Untick **Export With Debug** (it starts ticked), then save.
5. Double-click the game in that folder to test it. It should play without Godot open.
6. Right-click the game file and zip it: **Compress to ZIP file** on Windows 11, or **Send to › Compressed (zipped) folder** on Windows 10.
7. With a parent's okay, upload the zip to Google Drive. Click **Share**, change General access from "Restricted" to **"Anyone with the link"**, and copy the link. Send it only to people you know.
8. Tell your players what they'll see. Drive will say it can't scan the file for viruses, so they click **Download anyway**. They right-click the zip, choose **Extract All**, and open the game. Windows will say "Windows protected your PC", so they click **More info** (it shows "Unknown publisher"), then **Run anyway**. They're only doing that because they know the game came from you. With any file from anyone else, the warning wins.

![The blue "Windows protected your PC" box after More info, showing Unknown publisher. Run anyway is outlined.](/img/godot/run-anyway.webp)

## A web version, for Mac friends

1. **Project → Export → Add → Web.** Leave the settings as they are.
2. Click **Export Project**, into a new folder of its own, such as `C:\GodotExports\BenchCatWeb`. Name the file `index.html`, untick **Export With Debug**, and save.

![Godot's Export window with the Web preset added and its settings left as they are. Export Project is outlined.](/img/godot/web-export-project.webp)

![The bottom of Godot's save window. The file is named index.html, and Export With Debug is unticked and outlined.](/img/godot/web-save.webp)

3. To play it yourself, use **Remote Deploy** at the top right of Godot, then **Run in Browser**. Double-clicking `index.html` gives "Failed to fetch". That's normal: a web game has to run from a web address.
4. To put it online, give the folder to a parent. For Parents, at the back of the book, has the steps.

**The Godot logo:** your game shows it for a moment at start-up. It's your choice: switch it off in **Project Settings → Application → Boot Splash → Show Image**. There's no watermark either way.

![Godot's Project Settings at Application, Boot Splash. The Show Image setting is outlined.](/img/godot/boot-splash.webp)

---

**Back to:** [Godot help](/godot/)
