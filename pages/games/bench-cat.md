---
title: Bench Cat
description: The free Bench Cat project from The Creator Starter Kit: Games. A small Godot 4.7 game, built exactly as the book builds it, with every line of code explained.
updated: 4 November 2026 (tested on Godot 4.7.2, Windows 11)
---

<!--
Bench Cat v1 (Luke, 2 November 2026): exactly the Bench Cat the book
builds in Chapters 4, 6 and 7, nothing beyond the printed code. Source:
projects/bench-cat/ in the book repo (CreatorStarterKit). The scripts
below are copied from there, tabs included; their code lines match the
book character for character, and the comments are added. The tables
use the book's own "What the code is saying" wording.
Validated 2 November 2026: headless import and run on Godot 4.7.2, no
errors or warnings. The zip is static/downloads/bench-cat-godot-4.7.zip.
Updated 4 November 2026 after Luke's test on Godot 4.7.2: Biscuit starts
with its feet on the benchtop (y = 244), and the open steps use Godot
4.7.2's labels. Scripts unchanged.
CC0 1.0: art, sound and code by Luke Badger.
-->

# Bench Cat

> **For parents:** this is the free Bench Cat game from *The Creator Starter Kit: Games*, with every line of code explained. It needs Godot (free, no account), and it collects nothing.

Biscuit the cat chases a red dot (your mouse pointer) along the kitchen bench. When Biscuit passes the edge of the bench, there's a thump and a flash. It's the game the book builds in Chapters 4, 6 and 7, with nothing added: the same code, plus a plain-English note above every line.

[Download Bench Cat (zip, 32 KB)](/downloads/bench-cat-godot-4.7.zip)

## How to open it

You need Godot 4.7. If you haven't installed it yet, [Godot help](/godot/) shows how.

1. Right-click the zip, choose **Extract All**, and extract it to `C:\GodotProjects`. You get a **bench-cat** folder.
2. In Godot's **Project Manager**, click **Import** (top left).
3. Click **Browse**, open `C:\GodotProjects\bench-cat`, and click **Select This Folder**. Godot says "Valid project found at path".
4. Leave **Edit Now** ticked and click **Import**.
5. If you see a 3D grid, click **2D** at the top of the screen.
6. Click **play** (top right), then move the mouse pointer around, and hold it to the right of the bench.

### What you'll see

Biscuit chases the dot anywhere, even through the air: this is Chapter 7's code, which moves straight towards the dot. The thump and flash happen once, the first time Biscuit passes the bench edge. Click play again to see it again. A version where Biscuit jumps and falls is coming to Creator Crew.

Godot shows one yellow warning, for `dot.gd`: the parameter "delta" is never used. That's fine. The book's code doesn't need it there.

## What's inside

- `bench_cat.tscn`: the main scene. Node2D, with Background, Biscuit (and its Thump sound) and Dot, named as in the book.
- `scripts/biscuit.gd`: Biscuit's script, from Chapter 7.
- `scripts/dot.gd`: Dot's script, from Chapter 6.
- `scripts/chapter-04-robot.gd`: Chapter 4's script, with the left wall from its Try This. It isn't attached to anything: Biscuit's script replaced it in Chapter 7.
- `art/`: Biscuit, the red dot and the kitchen. The bench ends 900 pixels from the left, the same 900 as in Biscuit's script.
- `sounds/thump.wav`: the thump, and `tools/make_thump.py`, the small Python script that made it.
- `README.txt`, `LICENSE.txt` and `CREDITS.txt`: how to open it, the licence, and who made what, with Godot's licence notice (Chapter 10).

## The code, line by line

Each script is the one in the zip. Paste it over everything on the script page, then click play.

### Biscuit's script (Chapter 7)

```gdscript
# This script is for a picture: Biscuit. (Chapter 7)
extends Sprite2D

# Biscuit starts on the bench.
var on_bench = true

# Do the lines below over and over, about sixty times a second.
func _process(delta):
	# Find the Dot node.
	var dot = get_node("../Dot")
	# Walk a little closer to the dot, 300 pixels a second.
	position = position.move_toward(dot.position, 300 * delta)
	# If Biscuit is still on the bench and has passed the edge...
	if on_bench and position.x > 900:
		# ...Biscuit isn't on the bench any more, so this only happens once...
		on_bench = false
		# ...and do the landing.
		land()

# Here's what landing means:
func land():
	# Play the Thump sound. The name must match the node's exactly.
	$Thump.play()
	# Make Biscuit twice as bright.
	modulate = Color(2, 2, 2)
	# Fade back to normal over 0.15 seconds.
	create_tween().tween_property(self, "modulate", Color.WHITE, 0.15)
```

What the code is saying:

| The code | What it's saying |
|---|---|
| `var on_bench = true` | "Biscuit starts on the bench." |
| `func _process(delta):` | "Do the indented lines below over and over, about sixty times a second." |
| `var dot = get_node("../Dot")` | "Find the Dot node." |
| `position = position.move_toward(…)` | "Walk a little closer to the dot, 300 pixels a second." |
| `if on_bench and position.x > 900:` | "If Biscuit is still on the bench and has passed the edge…" |
| `on_bench = false` | "…Biscuit isn't on the bench any more, so this only happens once…" |
| `land()` | "…and do the landing." |
| `func land():` | "Here's what landing means:" |
| `$Thump.play()` | "Play the Thump sound." The name must match the node's exactly, capital T included. |
| `modulate = Color(2, 2, 2)` | "Make Biscuit twice as bright." (Code uses the American spelling, `Color`.) |
| `create_tween()…` | "Fade back to normal over 0.15 seconds." |

### Dot's script (Chapter 6)

```gdscript
# This script is for a picture: the red dot. (Chapter 6)
extends Sprite2D

# Do the line below over and over, about sixty times a second.
func _process(delta):
	# Jump to wherever the mouse pointer is.
	position = get_global_mouse_position()
```

What the code is saying:

| The code | What it's saying |
|---|---|
| `func _process(delta):` | "Do the line below over and over, about sixty times a second." |
| `position = get_global_mouse_position()` | "Jump to wherever the mouse pointer is." |

### Chapter 4's script, with the left wall

```gdscript
# This is the Chapter 4 version. Biscuit's script replaced it in Chapter 7.
# It's here to read and compare. It isn't attached to anything.

# This script is for a picture.
extends Sprite2D

# Do the lines below over and over, about sixty times a second.
func _process(delta):
	# Check which arrow keys are being held down.
	var dir = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	# Move the picture that way, 400 pixels a second.
	position += dir * 400 * delta
	# If the picture is more than 900 pixels from the left...
	if position.x > 900:
		# ...put it back at 900. That's the right wall.
		position.x = 900
	# If the picture is less than 64 pixels from the left...
	if position.x < 64:
		# ...put it back at 64. That's the left wall: half the robot's width.
		position.x = 64
```

What the code is saying:

| The code | What it's saying |
|---|---|
| `extends Sprite2D` | "This script is for a picture." |
| `func _process(delta):` | "Do the indented lines below over and over, about sixty times a second." |
| `var dir = Input.get_vector(…)` | "Check which arrow keys are being held down." |
| `position += dir * 400 * delta` | "Move the picture that way, 400 pixels a second." `delta` keeps that speed the same on a slow laptop or a fast one. |
| `if position.x > 900:` | "If the picture is more than 900 pixels from the left…" |
| `position.x = 900` | "…put it back at 900." That's the right wall. |
| `if position.x < 64:` | "If the picture is less than 64 pixels from the left…" |
| `position.x = 64` | "…put it back at 64." That's the left wall: half the robot's width. |

## Use any of it in your own games

Everything in Bench Cat (the code, the art and the sound) is CC0: use any of it in your own games, no conditions. You don't have to credit anyone. Godot has its own licence, and its notice is in `CREDITS.txt`.

## More help

[Godot help](/godot/): installing Godot, your projects folder, the three settings, crash fixes, the code from the book, and exporting your game.
