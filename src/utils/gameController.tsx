import { KaboomCtx } from "kaboom";
import { PLAYER_HEALTH, GRAVITY, BACKGROUND_COLOR } from "./gameConfig";

export function setupGameEnvironment(k: KaboomCtx) {
  k.setGravity(GRAVITY);
  k.setBackground(BACKGROUND_COLOR.r, BACKGROUND_COLOR.g, BACKGROUND_COLOR.b);

  const level = k.addLevel([
    "========",
    "]   @   [",
    "        ",
    "]       [",
    " g     g",
    "] <==>  [",
    "==l__r==",
    "________",
  ], {
    tileWidth: 128,
    tileHeight: 128,
    pos: k.vec2(0, 0),
    tiles: setupTiles(k)
  });
  return {player: level.get("player")[0], enemies: level.get("enemy")};
}

function setupTiles(k: KaboomCtx) {
  return {
    "@": () => [
      k.sprite("swordsman", {animSpeed: 1, frame: 98}),
      k.body(),
      k.health(PLAYER_HEALTH),
      k.area({shape: new k.Polygon([k.vec2(0, 0), k.vec2(-15, 50), k.vec2(-5, 60), k.vec2(0, 60), k.vec2(5, 60), k.vec2(15, 50)])}),
      k.anchor("center"),
      k.z(1),
      "player"
    ],
    "g": () => [
      k.sprite("greenslime"),
      k.body(),
      k.area({shape: new k.Polygon([k.vec2(0, 0), k.vec2(30, 0), k.vec2(20, -40), k.vec2(-20, -40), k.vec2(-20, 0)])}),
      k.health(100),
      k.anchor("bot"),
      k.z(1),
      "enemy"
    ],
    "=": () => [
      k.sprite("ground"),
      k.body({ isStatic: true }),
      k.area(),
      k.anchor("botleft"),
      k.z(0),
    ],
    "_": () => [
      k.sprite("groundBottom"),
      k.body({ isStatic: true }),
      k.area(),
      k.anchor("botleft"),
      k.z(0),
    ],
    "l": () => [
      k.sprite("groundBottomLeft"),
      k.area(),
      k.body({ isStatic: true }),
      k.anchor("botleft"),
      k.z(0),
    ],
    "r": () => [
      k.sprite("groundBottomRight"),
      k.area(),
      k.body({ isStatic: true }),
      k.anchor("botleft"),
      k.z(0),
    ],
    "<": () => [
      k.sprite("groundLeft"),
      k.area({shape: new k.Polygon([k.vec2(0, 0), k.vec2(130, 0), k.vec2(130, -130)])}),
      k.body({ isStatic: true }),
      k.anchor("botleft"),
      k.z(0),
      "ground"
    ],
    ">": () => [
      k.sprite("groundRight"),
      k.area({shape: new k.Polygon([k.vec2(0, 0), k.vec2(130, 0), k.vec2(0, -130)])}),
      k.body({ isStatic: true }),
      k.anchor("botleft"),
      k.z(0),
      "ground"
    ],
    "(": () => [
      k.sprite("groundFloatLeft"),
      k.area({shape: new k.Polygon([k.vec2(0, 0), k.vec2(130, 0), k.vec2(130, -130), k.vec2(0, -130)])}),
      k.body({ isStatic: true }),
      k.anchor("botleft"),
      k.z(0),
      "ground"
    ],
    ")": () => [
      k.sprite("groundFloatRight"),
      k.area({shape: new k.Polygon([k.vec2(0, 0), k.vec2(130, 0), k.vec2(130, -130), k.vec2(0, -130)])}),
      k.body({ isStatic: true }),
      k.anchor("botleft"),
      k.z(0),
      "ground"
    ],
    "[": () => [
      k.sprite("wallRight"),
      k.area({shape: new k.Rect(k.vec2(0, 0), 60, 300)}),
      k.body({ isStatic: true }),
      k.anchor("botright"),
    ],
    "]": () => [
      k.sprite("wallLeft"),
      k.area({shape: new k.Rect(k.vec2(0, 0), 60, 300)}),
      k.body({ isStatic: true }),
      k.anchor("botleft"),
    ]
  };
}
