(() => {
  const monthSelect = document.createElement("select");
  const yearSelect = document.createElement("select");

  // Default options
  monthSelect.innerHTML = `<option value="">Select Month</option>`;
  yearSelect.innerHTML = `<option value="">Select Year</option>`;

  // Add months
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].forEach(m => {
    monthSelect.innerHTML += `<option value="${m}">${m}</option>`;
  });

  // Add years
  ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"].forEach(y => {
    yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
  });

  // Apply button
  const applyBtn = document.createElement("button");
  applyBtn.textContent = "Apply";
  applyBtn.style.marginLeft = "8px";

  // Reset button
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  resetBtn.style.marginLeft = "5px";

  // Filter logic
  const filterRows = () => {
    const selectedMonth = monthSelect.value;
    const selectedYear = yearSelect.value;
    const rows = document.querySelectorAll("table tbody tr");

    rows.forEach(row => {
      const cell = row.cells[2];
      if (!cell) return;

      const text = cell.innerText.trim(); // Example: "01 Apr 2018"
      const parts = text.split(" ");
      if (parts.length !== 3) return (row.style.display = "none");

      const [_, month, year] = parts;

      const matchMonth = !selectedMonth || month === selectedMonth;
      const matchYear = !selectedYear || year === selectedYear;

      row.style.display = matchMonth && matchYear ? "" : "none";
    });
  };

  // Reset logic
  resetBtn.onclick = () => {
    monthSelect.value = "";
    yearSelect.value = "";
    filterRows();
  };

  applyBtn.onclick = filterRows;

  // Attach beside "Contents"
  const heading = Array.from(document.querySelectorAll("*")).find(
    el => el.textContent.trim().toLowerCase() === "contents"
  );

  if (heading) {
    const wrapper = document.createElement("span");
    wrapper.style.marginLeft = "10px";
    wrapper.appendChild(monthSelect);
    wrapper.appendChild(yearSelect);
    wrapper.appendChild(applyBtn);
    wrapper.appendChild(resetBtn);
    heading.appendChild(wrapper);
  }
})();
