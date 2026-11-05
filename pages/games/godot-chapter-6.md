---
title: Chapter 6: add the laser dot
description: Chapter 6 of The Creator Starter Kit: Games, step by step with pictures: rename the robot to Biscuit, add a laser dot, and make it follow the mouse pointer.
updated: 5 November 2026 (every step run on Godot 4.7.2, Windows 11)
---

<!--
Chapter 6 walkthrough (Luke, 5 November 2026; PROMISE-REGISTER P13).
Build along steps 1–6, the "If it doesn't work" box and the tab markers
follow the Chapter 6 draft (planning/games/drafts/chapter-06-bugs-are-
normal.md in the book repo, CreatorStarterKit), shortened where needed,
in the book's order. Screenshots: Luke's G7 run-through, 5 November
2026, Godot 4.7.2, Windows 11, project FirstBuild (RESEARCH-CHECKS K2).
Cropped, one Electric Blue outline each, WebP. The code is the book's,
indented with a tab, as Godot expects.
-->

# Chapter 6: add the laser dot

> **For parents:** these are the Build along steps from Chapter 6 of *The Creator Starter Kit: Games*, with pictures, all taken on Godot 4.7.2 on Windows 11. No account and no AI.

From here, the book builds a small Bench Cat, one piece per chapter, and you can build it too. Chapter 4's robot plays Biscuit. You need your project from [Chapter 4](/godot/chapter-4/).

## Build along: add the laser dot

1. **Open your Chapter 4 project.** In Godot's Project Manager, click it, then **Edit**.
2. **Rename the robot.** In the Scene panel, double-click **Sprite2D**, type `Biscuit`, and press Enter. *You'll see:* **Biscuit** under Node2D.
3. **Add the dot.** Click **Node2D** first, so the dot sits beside Biscuit, not inside it. Then click **+**, type `Sprite2D`, and click **Create**. Double-click the new **Sprite2D** and rename it `Dot`.
4. **Give it a picture.** Click **Dot**, then drag `icon.svg` onto the **Texture** box in the Inspector. (A small red dot picture is better, but the robot works for now.)

![The Scene panel: Node2D, with Biscuit and Dot side by side under it, outlined.](/img/godot/ch6-biscuit-and-dot.webp)

5. **Attach a script to Dot.** With **Dot** selected, click the scroll icon at the top of the Scene panel. Its tooltip says "Attach Script".

![The top of the Scene panel with Dot selected. The scroll icon is outlined, with its tooltip: Attach Script, attach a new or existing script to the selected node.](/img/godot/ch6-attach-script-button.webp)

The **Attach Node Script** box opens, with the path `res://dot.gd`. Click **Create**.

![The Attach Node Script box, with the path res://dot.gd. Create is outlined.](/img/godot/ch6-attach-node-script-dot.webp)

Delete everything on the page, then right-click › **Paste** (or type it in). The code is in the box below: click **Copy** on it first.

```gdscript
extends Sprite2D

func _process(delta):
	position = get_global_mouse_position()
```

![The right-click menu on Dot's empty script page. Paste is outlined.](/img/godot/ch6-paste.webp)

![Dot's script page with the four lines of code in, outlined.](/img/godot/ch6-dot-code.webp)

6. **Click play** and move the mouse pointer around the window. *You'll see:* the dot follows the pointer everywhere, and Biscuit still moves with the arrow keys.

![The game window with two robots, outlined: Dot, following the mouse pointer, and Biscuit.](/img/godot/ch6-dot-follows-pointer.webp)

One line does the work: every frame, the dot jumps to wherever the mouse pointer is.

## If it doesn't work

Find what you see:

1. **No dot, or the dot doesn't move.** Click **Dot**: the script must be on Dot, not on Biscuit, and Dot needs a picture on its Texture box.
2. **The dot moves when Biscuit moves.** Dot was added inside Biscuit. In the Scene panel, drag **Dot** onto **Node2D**, so the two sit side by side.
3. **Biscuit stopped moving.** Check you renamed the robot, and didn't replace its script. Biscuit keeps Chapter 4's code.
4. **A red error.** Read the line number, and compare that line with the code above: capital letters, brackets and the spaces at the start.

## Tabs and spaces

**What a tab looks like:** Godot marks every tab at the start of a line with a faint arrow, so you can see exactly where the tabs are. Spaces show nothing. If one line has no arrows and the lines around it do, that line was indented with spaces.

![Biscuit's script in Godot. The faint arrows at the start of the indented lines, one for each tab, are outlined.](/img/godot/ch6-tab-markers.webp)

If Godot says `Used tab character for indentation instead of space`, one line starts with a tab and the others start with spaces. Click at the start of that line, delete the gap, and type it again the same way as the line above. Copying the code from this page avoids it.

---

**Next:** [Chapter 7, the chase and the thump](/godot/#chapter-7-the-chase-and-the-thump)
