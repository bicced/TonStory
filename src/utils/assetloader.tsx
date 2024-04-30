import { KaboomCtx } from 'kaboom';
import {
  SwordsmanSprite, GreenSlimeSprite, Ground, GroundLeft, GroundRight,
  GroundBottom, GroundBottomLeft, GroundBottomRight, GroundFloatLeft,
  GroundFloatRight, Wall_C_01, Wall_C_02, Wall_C_03, jumpAudio, steprockAudio,
  attackAudio
} from '../assets'; 


export function loadPlayerSprites(k: KaboomCtx) {
  k.loadSprite('greenslime', GreenSlimeSprite, {
    sliceX: 13,
    sliceY: 10,
    anims: {
      idle: {
        from: 1,
        to: 6,
        loop: true,
      },
    },
  });

  k.loadSprite('swordsman', SwordsmanSprite, {
    sliceX: 14,
    sliceY: 10,
    anims: {
      idle: {
        from: 98,
        to: 100,
      },
      run: {
        from: 28,
        to: 35,
        loop: true,
      },
      jump: {
        from: 42,
        to: 49,
      },
      attack1: {
        from: 56,
        to: 61,
        speed: 50,
      },
      attack2: {
        from: 70,
        to: 72,
        speed: 50,
      },
      attack3: {
        from: 84,
        to: 87,
        speed: 50,
      },
    },
  });
}

export function loadEnvironmentAssets(k: KaboomCtx) {
  k.loadSprite('ground', Ground);
  k.loadSprite('groundLeft', GroundLeft);
  k.loadSprite('groundRight', GroundRight);
  k.loadSprite('groundBottom', GroundBottom);
  k.loadSprite('groundBottomLeft', GroundBottomLeft);
  k.loadSprite('groundBottomRight', GroundBottomRight);
  k.loadSprite('groundFloatLeft', GroundFloatLeft);
  k.loadSprite('groundFloatRight', GroundFloatRight);
  k.loadSprite('wallRight', Wall_C_01);
  k.loadSprite('wallLeft', Wall_C_03);
}

export function loadGameSounds(k: KaboomCtx) {
  k.loadSound("jump", jumpAudio);
  k.loadSound("step", steprockAudio);
  k.loadSound("attack", attackAudio);
}
