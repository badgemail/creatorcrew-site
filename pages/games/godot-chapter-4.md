---
title: Chapter 4: your first build
description: Chapter 4 of The Creator Starter Kit: Games, step by step with pictures: make a Godot project, put a picture on the screen, and make it move with the arrow keys.
updated: 5 November 2026 (every step run on Godot 4.7.2, Windows 11)
---

<!--
Chapter 4 walkthrough (Luke, 5 November 2026; PROMISE-REGISTER P13).
Steps 1–9 and the Try This follow the Chapter 4 draft
(planning/games/drafts/chapter-04-your-first-build.md in the book repo,
CreatorStarterKit), shortened where needed, in the book's order. Two
additions approved by Luke: step 1's 3D-grid note, and step 8's
"Delete everything, then right-click › Paste (or type it in)".
Screenshots: Luke's G7 run-through, 5 November 2026, Godot 4.7.2,
Windows 11, new project FirstBuild (RESEARCH-CHECKS, G7 Build-along
run-through). Cropped, one Electric Blue outline each, WebP.
The code is the book's, indented with tabs, as Godot expects.
-->

# Chapter 4: your first build

> **For parents:** these are the steps from Chapter 4 of *The Creator Starter Kit: Games*, with a picture of each one, all taken on Godot 4.7.2 on Windows 11. No account, no AI and nothing to download except Godot.

Your first build is one picture, controlled by the arrow keys, that stops at a wall. Go one step at a time, and check each step worked before you start the next. If you haven't installed Godot or made your projects folder yet, [Godot help](/godot/) shows how.

## Part 1: a picture on the screen

1. **Make a project.** Open Godot and click **Create New Project**.

![Godot's Project Manager with no projects yet. The Create New Project button in the middle is outlined.](/img/godot/ch4-project-manager.webp)

Type a name, such as `FirstBuild`. For the folder, choose `C:\GodotProjects`. Leave **Create Folder** switched on: Godot makes a folder for this project inside the one you chose. Under **Renderer**, choose **Compatibility**. Leave everything else as it is, and click **Create**.

![The Create New Project box. The name is FirstBuild, the path is in C:/GodotProjects with Create Folder on, and Compatibility is chosen and outlined.](/img/godot/ch4-create-new-project.webp)

*You'll see:* Godot's editor. If the middle shows a 3D grid, that's normal: it changes when you click 2D Scene in step 2.

![Godot's editor the first time it opens, with a 3D grid in the middle, outlined.](/img/godot/ch4-editor-3d.webp)

2. **Start a scene.** In the Scene panel, under **Create Root Node**, click **2D Scene**. *You'll see:* a node called **Node2D** in the Scene panel.

![The Scene panel with one node, Node2D, outlined. The middle now shows the flat 2D view.](/img/godot/ch4-2d-scene.webp)

3. **Add a picture node.** Click the **+** at the top of the Scene panel. In the box that opens, type `Sprite2D`, click exactly that one, then click **Create**. AnimatedSprite2D sits right above it. It's not the one you want. *You'll see:* **Sprite2D** under Node2D.

![The Create New Node box with sprite2d typed in the search. Sprite2D is outlined, just below AnimatedSprite2D.](/img/godot/ch4-create-new-node.webp)

4. **Give it a picture.** Godot comes with its own icon, a blue robot called `icon.svg`, in the FileSystem panel (bottom left). Click **Sprite2D**. Then drag `icon.svg` onto the **Texture** box in the Inspector (right), not onto the main view.

![Godot's editor with Sprite2D selected. icon.svg is in the FileSystem panel at the bottom left, and the empty Texture box in the Inspector on the right is outlined.](/img/godot/ch4-texture-empty.webp)

*You'll see:* the robot, half cut off in the top-left corner of the blue box.

![The main view with the robot, outlined, half cut off at the top-left corner of the game window's blue box.](/img/godot/ch4-robot-top-left.webp)

5. **Move it into view.** Drag the robot into the middle of the blue box.

![The robot, outlined, in the middle of the blue box.](/img/godot/ch4-robot-in-middle.webp)

6. **Press play.** Click the **play button** (top right, a triangle). The first time, Godot asks which scene to start with: click **Select Current**.

![The Please Confirm box: no main scene has been defined. Select Current is outlined.](/img/godot/ch4-select-current.webp)

Then it asks you to save the scene: click **Save**.

![The Save scene before running box, with the file named node_2d.tscn. Save is outlined.](/img/godot/ch4-save-scene.webp)

*You'll see:* a new window with the robot in it, sitting still. That's your game running. Close that window to go back to Godot.

![The game window, FirstBuild (DEBUG), with the robot, outlined, sitting still in the middle.](/img/godot/ch4-game-window.webp)

The robot doesn't move yet, because nothing has told it to. That's the script's job.

## Part 2: make it move

7. **Attach a script.** Click **Sprite2D**, then click the small scroll icon at the top of the Scene panel (a curled sheet of paper with a small plus). A box called **Attach Node Script** opens. Leave it as it is and click **Create**.

![The Attach Node Script box: GDScript, inherits Sprite2D, template Node: Default. Create is outlined.](/img/godot/ch4-attach-node-script.webp)

*You'll see:* a page of code in the middle of the screen.

![Godot's script page with the starter code Godot writes for you, outlined.](/img/godot/ch4-template-script.webp)

8. **Put in the code.** Delete everything, then right-click › **Paste** (or type it in). The code is in the box below: click **Copy** on it first. If you type it, Godot indents the next line for you when you press Enter.

![The script page with everything deleted. The empty first line is outlined.](/img/godot/ch4-empty-script.webp)

```gdscript
extends Sprite2D

func _process(delta):
	var dir = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	position += dir * 200 * delta
	if position.x > 900:
		position.x = 900
```

![The right-click menu on the script page. Paste is outlined.](/img/godot/ch4-paste.webp)

![The script page with the code in, outlined: seven lines, the indented ones lined up.](/img/godot/ch4-code-in.webp)

9. **Press play again.** Click the play button, then press the arrow keys on your keyboard. *You'll see:* the robot moving, and stopping when it reaches a line you can't see, about three-quarters of the way across.

![The game window with the robot, outlined, moved away from the middle.](/img/godot/ch4-robot-moves.webp)

You just made a game respond to a player. Close the window. The book explains what each line is saying.

## If it doesn't work

Find what you see:

1. **Nothing shows.** Check you picked **Sprite2D**, and that the robot is on the Texture box in the Inspector.
2. **The robot shows but won't move.** Click Sprite2D: the script must be on that node. Then check the code matches exactly, including capital letters.
3. **A red error.** Read the line number it gives, and compare that line with the code above. Chapter 6 explains Godot's error messages.

## Try This: a wall on the left

In the line `position += dir * 200 * delta`, change `200` to `400`, then click play. The robot moves twice as fast. That number is its speed.

Now add a wall on the left, so the robot can't escape that way either. Then pick a speed you like. When you're done, your script should look like this:

```gdscript
extends Sprite2D

func _process(delta):
	var dir = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	position += dir * 400 * delta
	if position.x > 900:
		position.x = 900
	if position.x < 64:
		position.x = 64
```

![The script page with the Try This code. The two new lines at the bottom, the left wall, are outlined.](/img/godot/ch4-trythis-code.webp)

The two new lines at the bottom are the left wall. `64` is half the robot's width, so it stops while it's still on screen.

![The game window with the robot, outlined, stopped at the left edge, still fully on screen.](/img/godot/ch4-trythis-left-wall.webp)

That's a build.

---

**Next:** [Chapter 6, add the laser dot](/godot/#chapter-6-the-laser-dot)
