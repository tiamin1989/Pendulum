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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(28, 28);
    ctx.lineTo(0, 0);
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
