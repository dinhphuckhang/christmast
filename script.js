const {
  gsap: { timeline, set, to, delayedCall },
  Splitting,
} = window;

Splitting();

const BTN = document.querySelector('.birthday-button__button');
const SOUNDS = {
  CHEER: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/cheer.mp3'),
  MATCH: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/match-strike-trimmed.mp3'),
  TUNE: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/happy-birthday-trimmed.mp3'),
  ON: new Audio('https://assets.codepen.io/605876/switch-on.mp3'),
  BLOW: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/blow-out.mp3'),
  POP: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/pop-trimmed.mp3'),
  HORN: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/horn.mp3'),
};

const EYES = document.querySelector('.cake__eyes');
const BLINK = (eyes) => {
  gsap.set(eyes, { scaleY: 1 });
  if (eyes.BLINK_TL) eyes.BLINK_TL.kill();
  eyes.BLINK_TL = new gsap.timeline({
    delay: Math.floor(Math.random() * 4) + 1,
    onComplete: () => BLINK(eyes),
  });
  eyes.BLINK_TL.to(eyes, {
    duration: 0.05,
    transformOrigin: '50% 50%',
    scaleY: 0,
    yoyo: true,
    repeat: 1,
  });
};
BLINK(EYES);

const FROSTING_TL = () =>
  timeline()
    .to('#frosting', { scaleX: 1.015, duration: 0.25 }, 0)
    .to('#frosting', { scaleY: 1, duration: 1 }, 0)
    .to('#frosting', { duration: 1, morphSVG: '.cake__frosting--end' }, 0);

const SPRINKLES_TL = () =>
  timeline().to('.cake__sprinkle', { scale: 1, duration: 0.06, stagger: 0.02 });

const SPIN_TL = () =>
  timeline()
    .set('.cake__frosting-patch', { display: 'block' })
    .to(['.cake__frosting--duplicate', '.cake__sprinkles--duplicate'], { x: 0, duration: 1 }, 0)
    .to(['.cake__frosting--start', '.cake__sprinkles--initial'], { x: 65, duration: 1 }, 0)
    .to('.cake__face', { duration: 1, x: -48.82 }, 0);

const FLICKER_TL = timeline()
  .to('.candle__flame-outer', { duration: 0.1, repeat: -1, yoyo: true, morphSVG: '#flame-outer' })
  .to('.candle__flame-inner', { duration: 0.1, repeat: -1, yoyo: true, morphSVG: '#flame-inner' }, 0);

const RESET = () => {
  set('.char', { '--hue': () => Math.random() * 360, '--char-sat': 0, '--char-light': 0, x: 0, y: 0, opacity: 1 });
  set('body', { '--frosting-hue': Math.random() * 360 });
  set('.cake__candle', { '--flame': 0 });
  set('.birthday-button__cake', { display: 'none' });
};
RESET();

const MASTER_TL = timeline({
  onStart: () => SOUNDS.ON.play(),
  onComplete: () => {
    delayedCall(2, RESET);
    BTN.removeAttribute('disabled');
  },
  paused: true,
})
  .set('.birthday-button__cake', { display: 'block' })
  .to('.birthday-button', { scale: 1, duration: 0.2 })
  .add(FROSTING_TL())
  .add(SPRINKLES_TL())
  .add(SPIN_TL());

BTN.addEventListener('click', () => {
  BTN.setAttribute('disabled', true);
  MASTER_TL.restart();
});

SOUNDS.TUNE.onended = SOUNDS.MATCH.onended = () => MASTER_TL.play();
document.querySelector('#volume').addEventListener('input', () => {
  SOUNDS.TUNE.muted = !SOUNDS.TUNE.muted;
});

