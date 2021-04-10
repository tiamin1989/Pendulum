(function () {
  // Обертка canvas
  const canvasWrapper = document.querySelector(".canvas-wrapper");
  // Холст (DOM)
  const canvas = document.querySelector("#visuals");
  const ctx = canvas.getContext("2d");
  // Жесткость пружины
  const k = document.querySelector("#k").value;
  // Масса груза
  const m = document.querySelector("#m").value;
  // Циклическая частота колебаний
  const f = Math.sqrt(k / m);
  // Циклическая частота колебаний (DOM)
  const frequency = document.querySelector("#frequency");
  // Время колебаний (DOM)
  const time = document.querySelector("#time");
  // Количество полных колебаний (DOM)
  const hesitations = document.querySelector("#hesitations");
  // Координата X (DOM)
  const coordinateX = document.querySelector("#coordinateX");

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

    function drawSpring(springStartXPoint) {
      ctx.beginPath();
      ctx.moveTo(springStartXPoint, startPoint[1]); /* начальная */
      /* линия вниз до загибов пружины */
      ctx.lineTo(
        springStartXPoint,
        startPoint[0] + 10
      );

      ctx.stroke();
      ctx.closePath();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = strokeStyle;


    drawBrush(brushConf);
    drawSpring(springStartXPoint);

  }

  function resizeCanvas() {
    ctx.canvas.width = canvasWrapper.offsetWidth;
    draw();
  }

  function init() {
    resizeCanvas();
    frequency.textContent = f;
    draw();
  }

  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("resize", resizeCanvas);
})();
