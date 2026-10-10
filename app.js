const results = [
  { model: "Claude Fable 5.1", reference: 59.67, valid: 72.67, invalid: 79.33, joint: 28.00 },
  { model: "Kimi K3", reference: 56.67, valid: 63.67, invalid: 83.00, joint: 24.67 },
  { model: "Qwen3.8 Max", reference: 54.67, valid: 77.00, invalid: 66.00, joint: 23.67 },
  { model: "GPT 5.6 sol -max", reference: 54.00, valid: 61.33, invalid: 86.00, joint: 23.33 },
  { model: "DeepSeek V4 Pro", reference: 41.00, valid: 57.67, invalid: 70.33, joint: 13.33 },
  { model: "GLM 5.3", reference: 43.00, valid: 50.33, invalid: 86.33, joint: 11.33 },
];

let sortKey = "joint";
let descending = true;

function render() {
  const query = document.querySelector("#model-search").value.trim().toLowerCase();
  const rows = results
    .filter((item) => item.model.toLowerCase().includes(query))
    .sort((a, b) => (descending ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]));

  document.querySelector("#results-body").innerHTML = rows.map((item, index) => `
    <tr>
      <td><span class="rank">${index + 1}</span></td>
      <td>${item.model}</td>
      <td>${item.reference.toFixed(2)}%</td>
      <td>${item.valid.toFixed(2)}%</td>
      <td>${item.invalid.toFixed(2)}%</td>
      <td>${item.joint.toFixed(2)}%</td>
    </tr>`).join("");
}

document.querySelectorAll("[data-sort]").forEach((button) => {
  button.addEventListener("click", () => {
    const nextKey = button.dataset.sort;
    descending = nextKey === sortKey ? !descending : true;
    sortKey = nextKey;
    document.querySelectorAll("[data-sort]").forEach((item) => {
      item.textContent = item.textContent.replace(/ [↑↓]$/, "");
    });
    button.textContent += descending ? " ↓" : " ↑";
    render();
  });
});

document.querySelector("#model-search").addEventListener("input", render);
render();
