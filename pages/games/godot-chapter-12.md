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
failure help and Install from File) stays on /godot, at
#once-only-the-export-templates; this page links to it.
-->

# Chapter 12: exporting your game

These are the export steps from Chapter 12 of the book.

**Once only, before your first export:** install the export templates. [Godot help](/godot/#once-only-the-export-templates) has the steps, with pictures.

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
