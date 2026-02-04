let questions = [];
let filtered = [];
let index = 0;

fetch("data/questions.json")
  .then(r => r.json())
  .then(data => {
    questions = data;
    loadTopics();
    applyFilter();
    show();
  });

function loadTopics() {
  const select = document.getElementById("topicSelect");
  [...new Set(questions.map(q => q.topic))].forEach(t => {
    const o = document.createElement("option");
    o.value = t;
    o.textContent = t;
    select.appendChild(o);
  });
  select.onchange = () => {
    applyFilter();
    index = 0;
    show();
  };
}

function applyFilter() {
  const t = document.getElementById("topicSelect").value;
  filtered = t === "all" ? questions : questions.filter(q => q.topic === t);
}

function show() {
  document.getElementById("options").innerHTML = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("explanation").textContent = "";
  document.getElementById("nextBtn").disabled = true;

  if (!filtered[index]) return;

  const q = filtered[index];
  document.getElementById("question").textContent = q.question;

  q.options.forEach((o, i) => {
    const b = document.createElement("button");
    b.textContent = o;
    b.onclick = () => check(i, q);
    document.getElementById("options").appendChild(b);
  });
}

function check(i, q) {
  document.getElementById("feedback").textContent =
    i === q.answerIndex ? "Correct!" : "Incorrect!";
  document.getElementById("explanation").textContent = q.explanation;
  document.getElementById("nextBtn").disabled = false;
}

document.getElementById("nextBtn").onclick = () => {
  index++;
  show();
};