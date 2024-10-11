const { gsap, gsap: { to, timeline, set, delayedCall }, Splitting } = window;
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

const RESET = () => {
  set('.char', {
    '--hue': () => Math.random() * 360,
    '--char-sat': 0,
    '--char-light': 0,
    x: 0,
    y: 0,
    opacity: 1,
  });
  set('body', {
    '--frosting-hue': Math.random() * 360,
    '--glow-saturation': 50,
    '--glow-lightness': 35,
    '--glow-alpha': 0.4,
    '--transparency-alpha': 0,
    '--flame': 0,
  });
  set('.cake__candle', { '--flame': 0 });
};
