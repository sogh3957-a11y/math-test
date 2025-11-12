function parseSet(input) {
  // حذف آکولادها و کروشه‌ها
  const cleaned = input.replace(/[{}[\]()]/g, "").trim();

  // جدا کردن اعضا با کاما یا فاصله و حذف مقادیر خالی
  const parts = cleaned.split(/[\s,]+/).filter(x => /^[0-9a-zA-Z]+$/.test(x));

  // اگر ورودی خالی یا نامعتبر بود
  if (parts.length === 0) return null;

  return new Set(parts);
}

function showAlert(message) {
  const alertDiv = document.getElementById("alert");
  alertDiv.textContent = message;
  alertDiv.style.color = "red";
  setTimeout(() => { alertDiv.textContent = ""; }, 3000);
}

function displayResult(setResult) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // پاک کردن خروجی قبلی

  const msg = document.createElement("p");
  msg.textContent = "✅ نتیجه پنهان است. اگر خواستی ببینی روی دکمه زیر کلیک کن.";
  resultDiv.appendChild(msg);

  const showBtn = document.createElement("button");
  showBtn.textContent = "نمایش نتیجه";
  showBtn.onclick = () => {
    resultDiv.innerHTML = `<strong>نتیجه:</strong> { ${Array.from(setResult).join(", ")} }`;
  };

  resultDiv.appendChild(showBtn);
}

function calculateUnion() {
  const setA = parseSet(document.getElementById("setA").value);
  const setB = parseSet(document.getElementById("setB").value);

  if (!setA || !setB) return showAlert("⚠️ فقط اعداد و حروف انگلیسی مجاز هستند.");

  const union = new Set([...setA, ...setB]);
  displayResult(union);
}

function calculateIntersection() {
  const setA = parseSet(document.getElementById("setA").value);
  const setB = parseSet(document.getElementById("setB").value);

  if (!setA || !setB) return showAlert("⚠️ فقط اعداد و حروف انگلیسی مجاز هستند.");

  const intersection = new Set([...setA].filter(x => setB.has(x)));
  displayResult(intersection);
}

function calculateDifference() {
  const setA = parseSet(document.getElementById("setA").value);
  const setB = parseSet(document.getElementById("setB").value);

  if (!setA || !setB) return showAlert("⚠️ فقط اعداد و حروف انگلیسی مجاز هستند.");

  const difference = new Set([...setA].filter(x => !setB.has(x)));
  displayResult(difference);
}
