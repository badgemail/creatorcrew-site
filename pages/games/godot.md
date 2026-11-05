---
title: Godot help
description: Step-by-step help with Godot for readers of The Creator Starter Kit: Games — installing, your projects folder, settings, backups, crash fixes, your build chapter by chapter, the code from the book to copy, and exporting your game.
updated: 5 November 2026 (steps tested on Godot 4.7.2, Windows 11; links checked 22 October 2026)
---

<!--
Scope (Luke, 22 October 2026, widened 24 October 2026): Before You
Start (install, projects folder, the three settings, backups, crash fixes
and official Godot links), the Chapter 4 code to copy (indented with
tabs, as Godot expects) and Chapter 12's export steps with pictures.
Widened 29 October 2026 (G6 part 2): the Chapter 6 Dot script and the
Chapter 7 Biscuit script from the new "Build along" sections, also
tab-indented.
Everything else stays in the book.
Hub (Luke, 5 November 2026): "Your build, chapter by chapter" links to
one page per chapter (/godot/chapter-4/ first) and to /bench-cat/. The
Chapter 4 code moved to /godot/chapter-4/; "Code from the book" keeps
a one-line link to it.

Source rule (L5): every step on this page comes from the Before You Start,
Chapter 4 and Chapter 12 drafts (planning/games/drafts/ in the book repo,
CreatorStarterKit; G6 versions of 24 October 2026) and their tested
sources: planning/games/DEVICE-TEST-D5.md (W1–W2; the export steps
W3–W5), PRE-G3-CHECKS.md (P7; the export labels), RESEARCH-CHECKS.md
section J and J6 (the Chapter 4 code, left wall at 64; the Chapter 6
Dot and Chapter 7 Biscuit scripts, as printed in the G6 part 2 drafts of
29 October 2026). The
"Make your projects folder" steps were checked by Luke on 22 October 2026
(Windows 11; no permission prompt; drive labelled "Windows (C:)").

Links checked 22 October 2026: every link loads (HTTP 200) and the docs
are the Godot 4.7 stable documentation; the download pages offer Godot
4.7.2 (18 August 2026). No page had moved. Official Godot pages only.

If the download fails (Luke, 26 October 2026): the book's Chapter 12 box
says only try again later or on another connection, then points here.
The security-software and Install from File (.tpz) help is on this page
only (D5 W3; PRE-G3-CHECKS P6). Screenshots of templates step 3 and the
web save window are Luke's, Godot 4.7.2, 26 October 2026.
-->

# Godot help

This page goes with *The Creator Starter Kit: Games*. It has the steps from the book's Before You Start, with pictures: installing Godot, your projects folder, three settings, backups, and what to do if Godot crashes. It also links to your build, chapter by chapter, has the code from the book to copy, and Chapter 12's export steps with pictures.

> **For parents:** every step here, from Before You Start, Chapter 4 and Chapter 12, was tested on Godot 4.7.2 on an older Windows 11 laptop, and every link goes to Godot's own website.

## Your build, chapter by chapter

- [Chapter 4: your first build](/godot/chapter-4/): every step, with a picture of each one.
- [Bench Cat](/bench-cat/): the whole project from Chapters 4, 6 and 7, ready to download, with every line explained.

## Download and unzip Godot

On a family computer, do this with a parent. On your own laptop, tell a parent what you've installed.

1. Go to [godotengine.org/download](https://godotengine.org/download/). It suggests the right version for your computer. Choose **Godot Engine**, not the one marked .NET.

![Godot's download page for Windows, with the Godot Engine 4.7.2 button outlined in blue, above the .NET button.](/img/godot/download.webp)

2. There's no account, email or sign-up. A box asking for a donation may appear after the download starts. That's a parent's call, and you can close it.
3. The download is a zip. Right-click it, choose **Extract All**, and put the folder somewhere plain, such as `C:\Godot`. Or open the zip and click **Extract all** at the top of the window.

![A zip file open in File Explorer, with the Extract all button at the top outlined.](/img/godot/extract-all.webp)

4. Inside are two programs. Double-click the one without *console* in its name.

![The unzipped Godot folder with two programs. The one without console in its name is outlined.](/img/godot/godot-programs.webp)

5. Godot's icon appears in the taskbar at the bottom of the screen. Right-click it and choose **Pin to taskbar**, so you can find it next time.

![The menu that opens when you right-click Godot's icon in the taskbar. Pin to taskbar is outlined.](/img/godot/pin-taskbar.webp)

6. Godot opens to its **Project Manager**. The first time, the bottom of the window says "Offline mode, update checks disabled". That's fine. You'll make your first project in Chapter 4.

**On a Mac:** follow the steps on [Godot's macOS download page](https://godotengine.org/download/macos/): unzip the download, drag Godot into Applications, and open it from there.

## Make your projects folder

Before your first project, make one plain folder to keep every project in:

1. Open File Explorer.
2. Click the C: drive under **This PC**. It may be called **Windows (C:)** or **Local Disk (C:)**.
3. Click **New** at the top left of File Explorer, then **Folder**.
4. Type `GodotProjects` and press Enter.

![File Explorer showing the C: drive. The New button at the top left is outlined, and so is the new GodotProjects folder at the bottom of the list.](/img/godot/projects-folder.webp)

Or right-click an empty space in the C: drive, choose **New › Folder**, and name it `GodotProjects`.

Why not Documents? Godot suggests a Documents folder. On many computers, that folder syncs to the cloud (OneDrive, for example), and syncing can tangle your files. On the laptop this page was tested on, Godot suggested exactly that.

![Godot's Create New Project box. The suggested project path, in a OneDrive Documents folder, is outlined.](/img/godot/default-folder.webp)

When you make a project, click **Browse** and pick `C:\GodotProjects` instead, before you click **Create**.

## Three settings for every project

These come from testing on an older laptop. The defaults crashed it. These didn't.

- **Choose the Compatibility renderer** when you make a new project. It works on more computers, and it's the one you need for a web version later.
- **Keep projects in a plain folder,** such as `C:\GodotProjects`.
- **Leave everything else as it is.** If a box asks about something the book doesn't mention, the default is fine.

![The Create New Project box with Compatibility chosen under Renderer, outlined.](/img/godot/new-project.webp)

## Backups

Save often. Every so often, copy your **whole project folder** somewhere else, such as a USB stick. A crash can damage the file you were working on: on the laptop this page was tested on, a crash broke a saved scene. A backup turns that into a shrug.

## If Godot crashes or won't open

If Godot crashes or won't open a window, check these, in order:

1. **Is the project using Compatibility?** If not, make a new project with Compatibility and copy your files across.
2. **Ask a parent to run Windows Update.** It also updates the graphics drivers.
3. **Does the laptop have two graphics chips?** Some do. A parent can open **Settings › System › Display › Graphics**, click **Add desktop app**, pick the Godot program, then change **GPU preference** to the other chip. On Windows 10, it's **Graphics settings**, then **Browse**.

![Windows 11's Graphics settings with Godot Engine added. The GPU preference choices are outlined: Let Windows decide, Power Saving and High Performance, each naming a graphics chip.](/img/godot/gpu-preference.webp)

## Code from the book

Paste it over everything on the script page, then click play.

The whole Bench Cat project, with every line explained, is on the [Bench Cat page](/bench-cat/), ready to download.

### Chapter 4

The first script and the Try This version are on the [Chapter 4 page](/godot/chapter-4/#part-2-make-it-move), with a picture of each step.

### Chapter 6: the laser dot

Dot's script (Build along, step 5):

```gdscript
extends Sprite2D

func _process(delta):
	position = get_global_mouse_position()
```

### Chapter 7: the chase and the thump

Biscuit's new script (Build along, step 5). It needs the sound node named `Thump`, with a capital T:

```gdscript
extends Sprite2D

var on_bench = true

func _process(delta):
	var dot = get_node("../Dot")
	position = position.move_toward(dot.position, 300 * delta)
	if on_bench and position.x > 900:
		on_bench = false
		land()

func land():
	$Thump.play()
	modulate = Color(2, 2, 2)
	create_tween().tween_property(self, "modulate", Color.WHITE, 0.15)
```

## Exporting your game, with pictures

These are the export steps from Chapter 12 of the book.

### Once only: the export templates

Do this with a parent, on a good internet connection.

1. In Godot, open the **Editor** menu, then **Manage Export Templates**.
2. If Godot says it's offline, click **Go Online**. Godot starts in offline mode, and the download list stays empty until you do.

![The bottom of Godot's Export Template Manager. It says no templates are installed and "Offline mode, some functionality is not available", with Go Online outlined.](/img/godot/templates-go-online.webp)

3. Under **Available Templates**, tick only the two templates this book uses: **Windows x86_64** and **Web Single-Threaded**, then click **Install Selected Templates**. Together they're about 115 MB. Don't click **Install All Templates**: that downloads all of them, about 1 GB.

![Godot's Available Templates list. Windows x86_64 and Web Single-Threaded are ticked and outlined, and so is the Install Selected Templates button at the top.](/img/godot/templates-install-selected.webp)

**If the download fails,** close the window and try again later, or on a different internet connection. If it still fails, security software or a school or work network may be blocking Godot. A parent can get the templates another way:

1. In a web browser, go to [godotengine.org/download](https://godotengine.org/download/) and download **Export templates**. It's one file ending in `.tpz`, about 1 GB.
2. In Godot's Export Template Manager, click the small file icon beside **Install All Templates**, and pick that file.

### A Windows game for family

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

### A web version, for Mac friends

1. **Project → Export → Add → Web.** Leave the settings as they are.
2. Click **Export Project**, into a new folder of its own, such as `C:\GodotExports\BenchCatWeb`. Name the file `index.html`, untick **Export With Debug**, and save.

![Godot's Export window with the Web preset added and its settings left as they are. Export Project is outlined.](/img/godot/web-export-project.webp)

![The bottom of Godot's save window. The file is named index.html, and Export With Debug is unticked and outlined.](/img/godot/web-save.webp)

3. To play it yourself, use **Remote Deploy** at the top right of Godot, then **Run in Browser**. Double-clicking `index.html` gives "Failed to fetch". That's normal: a web game has to run from a web address.
4. To put it online, give the folder to a parent. For Parents, at the back of the book, has the steps.

**The Godot logo:** your game shows it for a moment at start-up. It's your choice: switch it off in **Project Settings → Application → Boot Splash → Show Image**. There's no watermark either way.

![Godot's Project Settings at Application, Boot Splash. The Show Image setting is outlined.](/img/godot/boot-splash.webp)

## More help

**Press F1 in Godot** to search its built-in help. It explains Godot's nodes and code words.

Godot's own guides are written for adults, but they're the most up to date. Start here:

- [Download Godot](https://godotengine.org/download/)
- [Godot's documentation](https://docs.godotengine.org/en/stable/)
- [Introduction](https://docs.godotengine.org/en/stable/getting_started/introduction/index.html)
- [First look at the editor](https://docs.godotengine.org/en/stable/getting_started/introduction/first_look_at_the_editor.html)
- [Step by step](https://docs.godotengine.org/en/stable/getting_started/step_by_step/index.html)
- [Your first 2D game](https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html)
