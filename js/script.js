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

  function draw() {
    /* Щетка (абстрактно) */
    function drawBrush({ startPoint, tasselShift, tasselStep, tasselsCount }) {
      let currentPosition = [...startPoint];

      ctx.moveTo(...currentPosition); /* начальная */
      ctx.lineTo(
        currentPosition[0] + tasselShift[0],
        tasselShift[1]
      ); /* кисточка */
      ctx.moveTo(...currentPosition); /* возврат на начальную */

      for (let i = 1; i < tasselsCount; i++) {
        currentPosition[0] = currentPosition[0] + tasselStep[0];
        currentPosition[1] = currentPosition[1] + tasselStep[1];

        ctx.lineTo(...currentPosition); /* шаг вправо, начальная */
        ctx.lineTo(
          currentPosition[0] + tasselShift[0],
          tasselShift[1]
        ); /* кисточка */
        ctx.moveTo(...currentPosition); /* возврат на начальную */
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#4a4242";
    ctx.beginPath();

    drawBrush({
      startPoint: [70, 30],
      tasselShift: [15, 10],
      tasselStep: [15, 0],
      tasselsCount: 11,
    });

    ctx.stroke();
    ctx.closePath();
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
