<!-- Plum -->

<script setup lang="ts">
const el = ref<HTMLCanvasElement | null>(null)
const size = reactive(useWindowSize())
const starCount = ref<number>(0)
const starDensity = ref<number>(0.216)
const speedCoeff = ref<number>(0.05)
interface Color {
  giantColor: string;
  starColor: string;
  cometColor: string;
}
const first = ref<boolean>(true)
const color = reactive<Color>({
  giantColor: '180,184,240',
  starColor: '226,225,142',
  cometColor: '226,225,224'
});

interface Star {
  giant: boolean;
  comet: boolean;
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  fadingOut: boolean | null;
  fadingIn: boolean;
  opacity: number;
  opacityTresh: number;
  do: number;
  reset(): void;
  fadeIn(): void;
  fadeOut(): void;
  draw(): void;
  move(): void;
}
const grain = ref<Array<Star>>()

function initCanvas(canvas: HTMLCanvasElement, width = 400, height = 400, _dpi?: number) {
  const ctx = canvas.getContext('2d')!

  const dpr = window.devicePixelRatio || 1
  // @ts-expect-error vendor
  const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1

  const dpi = _dpi || dpr / bsr

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = dpi * width
  canvas.height = dpi * height
  ctx.scale(dpi, dpi)

  starCount.value = width * starDensity.value

  return { ctx, dpi }
}

function getProbability(percents: number) {
  return ((Math.floor(Math.random() * 1000) + 1) < percents * 10);
}

function getRandInterval(min: number, max: number) {
  return (Math.random() * (max - min) + min);
}
onMounted(async () => {
  const canvas = el.value!
  const { ctx } = initCanvas(canvas, size.width, size.height)
  const { width, height } = canvas

  function Star(): Star {
    const star = {} as Star;
    star.reset = function () {
      star.giant = getProbability(3);
      star.comet = star.giant || first.value ? false : getProbability(10);
      star.x = getRandInterval(0, width - 10);
      star.y = getRandInterval(0, height);
      star.r = getRandInterval(1.1, 2.6);
      star.dx =
        getRandInterval(speedCoeff.value, 6 * speedCoeff.value) +
        (star.comet as any as number + 1 - 1) * speedCoeff.value * getRandInterval(50, 120) +
        speedCoeff.value * 2;
      star.dy =
        -getRandInterval(speedCoeff.value, 6 * speedCoeff.value) -
        (star.comet as any as number + 1 - 1) * speedCoeff.value * getRandInterval(50, 120);
      star.fadingOut = null;
      star.fadingIn = true;
      star.opacity = 0;
      star.opacityTresh = getRandInterval(0.2, 1 - (star.comet as any as number + 1 - 1) * 0.4);
      star.do = getRandInterval(0.0005, 0.002) + (star.comet as any as number + 1 - 1) * 0.001;
    };

    star.fadeIn = function () {
      if (star.fadingIn) {
        star.fadingIn = !(star.opacity > star.opacityTresh);
        star.opacity += star.do;
      }
    };

    star.fadeOut = function () {
      if (star.fadingOut) {
        star.fadingOut = !(star.opacity < 0);
        star.opacity -= star.do / 2;
        if (star.x > width || star.y < 0) {
          star.fadingOut = false;
          star.reset();
        }
      }
    };

    star.draw = function () {
      ctx.beginPath();
      if (star.giant) {
        ctx.fillStyle = `rgba(${color.giantColor},${star.opacity})`;
        ctx.arc(star.x, star.y, 2, 0, 2 * Math.PI, false);
      } else if (star.comet) {
        ctx.fillStyle = `rgba(${color.cometColor},${star.opacity})`;
        ctx.arc(star.x, star.y, 1.5, 0, 2 * Math.PI, false);
        for (let i = 0; i < 30; i++) {
          ctx.fillStyle = `rgba(${color.cometColor},${star.opacity - (star.opacity / 20) * i})`;
          ctx.rect(
            star.x - (star.dx / 4) * i,
            star.y - (star.dy / 4) * i - 2,
            2,
            2
          );
          ctx.fill();
        }
      } else {
        ctx.fillStyle = 'rgba(' + color.starColor + ',' + this.opacity + ')';
        ctx.rect(star.x, star.y, star.r, star.r);
      }
      ctx.closePath();
      ctx.fill();
    }
    star.move = function () {
      star.x += star.dx;
      star.y += star.dy;
      if (star.fadingOut === false) {
        star.reset();
      }
      if (star.x > width - (width / 4) || star.y < 0) {
        star.fadingOut = true;
      }
    };
    setTimeout(function () {
      first.value = false;
    }, 50);
    return star
  }
  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    grain.value?.forEach(f => {
      f.move();
      f.fadeIn();
      f.fadeOut();
      f.draw();
    })
    window.requestAnimationFrame(draw);
  }
  const createUniverse = () => {
    grain.value = Array.from({ length: starCount.value }, () => {
      const m = Star();
      m.reset();
      return m;
    });
    draw();
  }
  createUniverse()

  useEventListener(window, 'resize', () => initCanvas(canvas, size.width, size.height))
})


</script>
<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 pointer-events-none">
    <canvas id="universe" ref="el"></canvas>
  </div>
</template>

<style ></style>
