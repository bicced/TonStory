import { updatePoints } from "../api/index.ts";
import { ATTACK_INTERVAL, Keys, MOVE_SPEED } from "../utils/gameConfig.tsx";
import { setupGameEnvironment } from "../utils/gameController.tsx";
import { KaboomCtx} from "kaboom";

export default function loadGameScene(k: KaboomCtx, dispatch: any) {
  const {player, enemies} = setupGameEnvironment(k);
  enemies.map(enemy => enemy.play("idle"));

  k.on("death", "enemy", (e) => {
		k.destroy(e)
		k.shake(50)
	})

  k.on("hurt", "enemy", (e) => {
		k.shake(1);
	})

  k.on("death", "player", (e) => {
		k.destroy(e)
		k.shake(50)
	})
  k.onCollide(player.id + "attackHitbox", "enemy", async (b, e) => {
    b.destroy()
		e.hurt(1);
    dispatch({
      type: 'UPDATE_POINTS'
    });
    await updatePoints();
	});

  player.onCollide("ground", () => {
    k.play("step")
  })

  player.onGround(handleAnimation);

  player.onUpdate(() => {
    k.camPos(player.pos); 
  });

  k.onKeyPress(Keys.LEFT, run);
  k.onKeyPress(Keys.RIGHT, run);
  k.onKeyPress(Keys.CONTROL, attack);
  k.onKeyPress(Keys.SPACE, jump);

  k.onKeyDown(Keys.LEFT, move);
  k.onKeyDown(Keys.RIGHT, move);

  k.onKeyRelease(Keys.LEFT, postRun);
  k.onKeyRelease(Keys.RIGHT, postRun);

  function jump() {
    if (player.isGrounded()) {
      player.play("jump");
      k.play("jump");
      player.jump(800);
    }
  }

  function move() {
    if (k.isKeyDown(Keys.LEFT)) {
      player.flipX = true;
      player.move(-MOVE_SPEED, 0);
    } else if (k.isKeyDown(Keys.RIGHT)) {
      player.flipX = false;
      player.move(MOVE_SPEED, 0);
    }
  }

  function handleAnimation() {
    if (k.isKeyDown(Keys.LEFT) || k.isKeyDown(Keys.RIGHT)) {
      return run();
    }
    player.play("idle");
  }

  function run() {
    player.play("run");
  }

  function postRun() {
    if (player.isGrounded() && player.curAnim() !== "attack1") {
      player.play("idle");
    }
  }

  let lastAttackTime = 0;
  let attackSequence = 0;

  function attack(){
    const currentTime = k.time() * 1000; 
    const timeSinceLastAttack = currentTime - lastAttackTime;

    const slashX = player.pos.x + (player.flipX ? -40 : 40);

    k.add([
      k.rect(40,40), 
      k.area(), 
      k.pos(slashX, player.pos.y + 30),
      k.opacity(0),
      k.anchor("center"),
      player.id + "attackHitbox",
    ]);

    const options = {
      onEnd: () => {
        k.destroyAll(player.id + "attackHitbox");
        handleAnimation;
      }
    };
    
    if (attackSequence === 0 || timeSinceLastAttack > ATTACK_INTERVAL) {
      player.play("attack1", options);
      attackSequence = 1; 
    } else if (attackSequence === 1 && timeSinceLastAttack <= ATTACK_INTERVAL) {
      player.play("attack2", options);
      attackSequence = 2; 
    } else if (attackSequence === 2 && timeSinceLastAttack <= ATTACK_INTERVAL) {
      player.play("attack3", options);
      attackSequence = 0; 
    }

    k.play("attack");
    lastAttackTime = currentTime; 
  }
}