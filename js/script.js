(function () {
  // Обертка canvas
  const canvasWrapper = document.querySelector(".canvas-wrapper");

  // Холст
  const canvas = document.querySelector("#visuals");
  const ctx = canvas.getContext("2d");

  // Масса груза
  const md = document.querySelector("#m");
  let m = md.value;

  // Жесткость пружины
  const kd = document.querySelector("#k");
  let k = kd.value;

  // Первоначальное отклонение от равновесия
  const x0d = document.querySelector("#x0");
  let x0 = x0d.value;

  // Циклическая частота колебаний
  const w0d = document.querySelector("#w0");
  let w0 = Math.sqrt(k / m);

  // Время колебаний
  const td = document.querySelector("#t");
  let t = 1;

  // Количество полных колебаний (DOM)
  const hd = document.querySelector("#h");
  let h;

  // Координата X
  const xd = document.querySelector("#x");
  let x = x0 * Math.cos(w0 * t);

  /* * 30 временно */
  let d = Math.cbrt(m) * 30;

  const startPoint = [70, 30];
  const brushConf = {
    startPoint: [...startPoint],
    tasselShift: [15, 10],
    tasselStep: [15, 0],
    tasselsCount: 11,
  };
  const strokeStyle = "#4a4242";
  const springStartXPoint =
    startPoint[0] + (brushConf.tasselStep[0] * brushConf.tasselsCount) / 2;

  function draw() {
    /* Щетка (абстрактно) */
    function drawBrush({ startPoint, tasselShift, tasselStep, tasselsCount }) {
      let currentPosition = [...startPoint];
      ctx.beginPath();
      ctx.moveTo(...currentPosition); /* начальная */
      ctx.lineTo(
        currentPosition[0] + tasselShift[0],
        tasselShift[1]
      ); /* кисточка */
      ctx.moveTo(...currentPosition); /* возврат на начальную */

      for (let i = 1; i < tasselsCount; i++) {
        /* шаг вправо */
        currentPosition[0] = currentPosition[0] + tasselStep[0];
        currentPosition[1] = currentPosition[1] + tasselStep[1];

        ctx.lineTo(...currentPosition); /* начальная */
        ctx.lineTo(
          currentPosition[0] + tasselShift[0],
          tasselShift[1]
        ); /* кисточка */
        ctx.moveTo(...currentPosition); /* возврат на начальную */
      }
      ctx.stroke();
      ctx.closePath();
    }

    function drawSpring(startXpoint) {
      ctx.beginPath();
      ctx.moveTo(startXpoint, startPoint[1]); /* начальная */
      /* линия вниз до загибов пружины */
      ctx.lineTo(startXpoint, startPoint[0] + 10);

      ctx.stroke();
      ctx.closePath();
    }

    function drawMass() {
      ctx.beginPath();
      ctx.arc(100, 50, d, 0, Math.PI * 2, false);
      ctx.stroke();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = strokeStyle;

    drawBrush(brushConf);
    drawSpring(springStartXPoint);
    drawMass();
  }

  function resizeCanvas() {
    ctx.canvas.width = canvasWrapper.offsetWidth;
    ctx.canvas.height = canvasWrapper.offsetWidth * 0.7473118279569892;
    draw();
  }

  function init() {
    resizeCanvas();
    w0d.textContent = w0;
    draw();

    td.classList.toggle("character_need-play");
    setInterval(() => {
      td.textContent = t++;
    }, 1000);

    xd.classList.toggle("character_need-play");
    xd.textContent = x;
  }

  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("resize", resizeCanvas);
})();
