const highschoolBtn = document.getElementById('highschoolBtn');
const collegeBtn = document.getElementById('collegeBtn');
const formArea = document.getElementById('formArea');
const addSubjectBtn = document.getElementById('addSubjectBtn');
const resultLabel = document.getElementById('resultLabel');
const resultValue = document.getElementById('resultValue');
const sectionLabel = document.getElementById('sectionLabel');

let mode = 'highschool';

// Create extra rows
function createHighSchoolRow() {
  const div = document.createElement('div');
  div.className = 'form-group';
  div.innerHTML = `
    <input type="text" placeholder="Subject Name" />
    <input type="number" placeholder="Grade (%)" min="0" max="100" />
    <button class="delete-btn"><i class="fas fa-trash"></i></button>
  `;
  div.querySelector('.delete-btn').onclick = () => { div.remove(); computeGrades(); };
  formArea.appendChild(div);
}

function createCollegeRow() {
  const div = document.createElement('div');
  div.className = 'form-group';
  div.innerHTML = `
    <input type="text" placeholder="Subject Name" />
    <input type="number" placeholder="Units" min="1" />
    <select>
      <option value="1.00">1.00</option>
      <option value="1.25">1.25</option>
      <option value="1.50">1.50</option>
      <option value="1.75">1.75</option>
      <option value="2.00">2.00</option>
      <option value="2.25">2.25</option>
      <option value="2.50">2.50</option>
      <option value="2.75">2.75</option>
      <option value="3.00">3.00</option>
      <option value="5.00">5.00</option>
    </select>
    <button class="delete-btn"><i class="fas fa-trash"></i></button>
  `;
  div.querySelector('.delete-btn').onclick = () => { div.remove(); computeGrades(); };
  formArea.appendChild(div);
}

// Compute grades depending on mode
function computeGrades() {
  const rows = formArea.querySelectorAll('.form-group');
  if (mode === 'highschool') {
    let total = 0, count = 0;
    rows.forEach(row => {
      const gradeInput = row.querySelector('input[type="number"]');
      if (gradeInput) {
        const grade = parseFloat(gradeInput.value);
        if (!isNaN(grade)) { total += grade; count++; }
      }
    });
    const avg = count ? (total / count).toFixed(2) : 0;
    resultLabel.textContent = "Average Grade";
    resultValue.textContent = `${avg}%`;
  } else {
    let totalUnits = 0, totalPoints = 0;
    rows.forEach(row => {
      const units = parseFloat(row.children[1].value);
      const grade = parseFloat(row.children[2].value);
      if (!isNaN(units) && !isNaN(grade)) {
        totalUnits += units;
        totalPoints += units * grade;
      }
    });
    const gpa = totalUnits ? (totalPoints / totalUnits).toFixed(2) : 0;
    resultLabel.textContent = "General Point Average";
    resultValue.textContent = gpa;
  }
}

// Add subject button
addSubjectBtn.addEventListener('click', () => {
  mode === 'highschool' ? createHighSchoolRow() : createCollegeRow();
});

// Recompute when typing
formArea.addEventListener('input', computeGrades);

// Switch to High School mode
highschoolBtn.addEventListener('click', () => {
  mode = 'highschool';
  highschoolBtn.classList.add('active');
  collegeBtn.classList.remove('active');
  document.body.classList.remove('college-mode');
  document.body.classList.add('highschool-mode');
  formArea.innerHTML = `
    <div class="form-group default-row" id="defaultRow">
      <input type="text" placeholder="Subject Name" />
      <input type="number" placeholder="Grade (%)" min="0" max="100" />
    </div>
  `;
  sectionLabel.textContent = "High School Grades";
  resultLabel.textContent = "Average Grade";
  resultValue.textContent = "0%";
});

// Switch to College mode
collegeBtn.addEventListener('click', () => {
  mode = 'college';
  collegeBtn.classList.add('active');
  highschoolBtn.classList.remove('active');
  document.body.classList.remove('highschool-mode');
  document.body.classList.add('college-mode');
  formArea.innerHTML = `
    <div class="form-group default-row" id="defaultRow">
      <input type="text" placeholder="Subject Name" />
      <input type="number" placeholder="Units" min="1" />
      <select>
        <option value="1.00">1.00</option>
        <option value="1.25">1.25</option>
        <option value="1.50">1.50</option>
        <option value="1.75">1.75</option>
        <option value="2.00">2.00</option>
        <option value="2.25">2.25</option>
        <option value="2.50">2.50</option>
        <option value="2.75">2.75</option>
        <option value="3.00">3.00</option>
        <option value="5.00">5.00</option>
      </select>
    </div>
  `;
  sectionLabel.textContent = "College GPA";
  resultLabel.textContent = "General Point Average";
  resultValue.textContent = "0.00";
});
