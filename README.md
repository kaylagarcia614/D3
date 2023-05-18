DESCRIPTION
All assets utilized in the creation of the game were generated through Pixilart.com. The game mechanics drew inspiration from Gravitar, an arcade game released by Atari. To fulfill the requirement of scene establishment and gameplay separation, a mini level selection feature was implemented within the actual gameplay. This allows players to choose a level and activate one of the mini games comprising the overall gaming experience. Each of the mini games incorporates gravity physics, meaning that players will descend if not in flight. Continuous inputs are supported through the x and y axes, while discrete inputs can be executed using the space bar, left, right, and up arrow keys. The player character will perish following three collisions, and stars will be destroyed upon contact with fireballs.

Process requirements:
Your GitHub repository must show a history of incremental commits with useful commit messages, tracing back to an empty repository at the start.

Your README.md file describes:

Where to play your game (a link to your deployed game)
How your design satisfies the experience requirements below
How all of your data assets (if you have any) were created
SEE ABOVE

Experience requirements
The game uses both continuous and discrete inputs from the player

The player’s goal can only be achieved indirectly (by allowing the physics engine to move key objects into position/contact).

3+ physics-based gameplay scenes (possibly implemented with a single Phaser Scene subclass).

Other scenes are used to separate and contextualize the gameplay scenes