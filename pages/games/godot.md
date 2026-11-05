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
a one-line link to it. Chapter 6 (5 November 2026): Dot's script moved
to /godot/chapter-6/, the same way. Chapter 7 (5 November 2026):
Biscuit's script moved to /godot/chapter-7/, the same way. Chapter 12
(5 November 2026): the Windows and web export steps moved to
/godot/chapter-12/, unchanged; the export templates section (with the
download-failure help and Install from File) followed it there later the
same day. The old #exporting-your-game-with-pictures anchor stays here as a
short pointer.

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
- [Chapter 6: add the laser dot](/godot/chapter-6/): the Build along steps, with pictures.
- [Chapter 7: the chase and the thump](/godot/chapter-7/): the Build along steps, with pictures.
- [Chapter 12: exporting your game](/godot/chapter-12/): a Windows game for family, and a web version, with pictures.
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

Each chapter's code is on its own page, with a picture of every step.

The whole Bench Cat project, with every line explained, is on the [Bench Cat page](/bench-cat/), ready to download.

### Chapter 4

The first script and the Try This version are on the [Chapter 4 page](/godot/chapter-4/#part-2-make-it-move), with a picture of each step.

### Chapter 6: the laser dot

Dot's script is on the [Chapter 6 page](/godot/chapter-6/#build-along-add-the-laser-dot), with a picture of each step.

### Chapter 7: the chase and the thump

Biscuit's new script is on the [Chapter 7 page](/godot/chapter-7/#build-along-the-chase-and-the-thump), with a picture of each step.

## Exporting your game, with pictures

The export steps from Chapter 12 are on their own page now: [Chapter 12: exporting your game](/godot/chapter-12/). It starts with the export templates, which you install once.

## More help

**Press F1 in Godot** to search its built-in help. It explains Godot's nodes and code words.

Godot's own guides are written for adults, but they're the most up to date. Start here:

- [Download Godot](https://godotengine.org/download/)
- [Godot's documentation](https://docs.godotengine.org/en/stable/)
- [Introduction](https://docs.godotengine.org/en/stable/getting_started/introduction/index.html)
- [First look at the editor](https://docs.godotengine.org/en/stable/getting_started/introduction/first_look_at_the_editor.html)
- [Step by step](https://docs.godotengine.org/en/stable/getting_started/step_by_step/index.html)
- [Your first 2D game](https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html)
