function initCharacteristics() {
  // Жесткость пружины
  const k = document.querySelector("#k").value;

  // Масса груза
  const m = document.querySelector("#m").value;

  // Циклическая частота колебаний
  const f = Math.sqrt(k / m);

  // Циклическая частота колебаний (DOM)
  const frequency = document.querySelector("#frequency");

  frequency.textContent = f;
}

document.addEventListener("DOMContentLoaded", initCharacteristics);
