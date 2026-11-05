---
title: Chapter 7: the chase and the thump
description: Chapter 7 of The Creator Starter Kit: Games, step by step with pictures: add a sound, and make Biscuit chase the dot and land with a thump.
updated: 5 November 2026 (every step run on Godot 4.7.2, Windows 11)
---

<!--
Chapter 7 walkthrough (Luke, 5 November 2026; PROMISE-REGISTER P13).
Build along steps 1–6 and the "If it doesn't work" box are word for word
from the Chapter 7 draft (planning/games/drafts/chapter-07-game-feel.md
in the book repo, CreatorStarterKit). Screenshots: Luke's G7
run-through, 5 November 2026, Godot 4.7.2, Windows 11, project
FirstBuild (RESEARCH-CHECKS K3). Cropped, one Electric Blue outline
each, WebP. The code is the book's, indented with tabs, as Godot
expects.
-->

# Chapter 7: the chase and the thump

> **For parents:** these are the Build along steps from Chapter 7 of *The Creator Starter Kit: Games*, with pictures, all taken on Godot 4.7.2 on Windows 11. No account and no AI. The sound comes from your own recording or a free sound pack.

Your Bench Cat from Chapter 6 has Biscuit and a dot. Now Biscuit chases the dot and lands with a thump. You need your project from [Chapter 6](/godot/chapter-6/).

## Build along: the chase and the thump

1. **Get a sound.** Godot opens WAV, OGG and MP3 files. **To record one,** use Windows' Sound Recorder, but first choose **MP3** in its settings: it normally saves .m4a, which Godot can't open (most phones do too). **To download one,** go to kenney.nl and pick a sound pack, such as **RPG Audio**. Its sounds are free for anyone to use, with no conditions and no account. It may ask for a donation: that's a parent's call, and you can skip it. The pack lands in your **Downloads** folder as a zip file. Right-click it, choose **Extract All**, then click **Extract**. A folder of sounds opens. Chapter 10 explains what a sound's licence lets you do. **Now put it in Godot.** Make the folder window smaller and sit it beside Godot, so you can see both. Drag one sound file out of the folder and drop it on **res://** in Godot's **FileSystem** panel (bottom left). Godot copies it into your project. *You'll see:* your sound in the FileSystem panel, with a music-note icon.

![Your sound in the FileSystem panel. Its name will be different.](/img/godot/ch7-sound-in-filesystem.webp)

2. **Add a sound node.** Click **Biscuit** in the Scene panel, click **+**, type `AudioStreamPlayer2D`, and click **Create**. Double-click it and rename it `Thump`, with a capital T.

![The Create New Node box with Audio typed in the search. AudioStreamPlayer2D is outlined.](/img/godot/ch7-create-audiostreamplayer2d.webp)

![The Scene panel: the new node, renamed Thump, outlined inside Biscuit. Dot is below.](/img/godot/ch7-rename-thump.webp)

3. **Give it the sound.** Click **Thump** in the Scene panel. Then drag your sound from the FileSystem panel (bottom left) and drop it on the **Stream** box in the Inspector (right), where it says `<empty>`. *You'll see:* your sound's name in the Stream box.

![The Inspector for Thump. The Stream box, outlined, now shows the sound's name.](/img/godot/ch7-sound-on-stream.webp)

4. **Move Biscuit.** Drag Biscuit to the left side of the blue box, so it has somewhere to walk.
5. **Change Biscuit's script.** Click **Biscuit**, then the scroll icon next to its name in the Scene panel. Delete everything on the page and put in this code (type it, or copy it from creatorcrew.com.au/godot):

![Select all the old code and delete it.](/img/godot/ch7-select-old-code.webp)

![Biscuit's script page with everything deleted. The empty first line is outlined.](/img/godot/ch7-empty-script.webp)

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

![Biscuit's script page with the new code in, outlined.](/img/godot/ch7-code-in.webp)

6. **Click play.** Move the mouse pointer to the right side of the window and hold it there. *You'll see:* Biscuit walks after the dot. When Biscuit passes the edge of the bench, you hear the thump and Biscuit flashes. It takes a second, so keep holding.

![The game window as play starts. Biscuit, outlined, is on the left.](/img/godot/ch7-play-starts.webp)

![The game window a moment later. Biscuit has reached the dot on the right, outlined.](/img/godot/ch7-biscuit-reaches-dot.webp)

## If it doesn't work

Find what you see:

1. **"…on a null instance".** A name doesn't match. The sound node must be called `Thump`, with a capital T, and sit inside Biscuit. Dot must be called `Dot`, and sit beside Biscuit under Node2D.
2. **Biscuit doesn't move.** Check the new script is on Biscuit, and that Dot is still there.
3. **No sound.** Click Thump and check its **Stream** box has your sound in it. Then check your speakers or headphones.
4. **The thump only happened once.** That's right: `on_bench` makes it happen once. Click play again to see it again.

---

**Back to:** [Godot help](/godot/)
