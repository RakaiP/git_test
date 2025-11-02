// Etch-a-Sketch grid
const GRID_SIZE_PX = 960;
const gridEl = document.getElementById('grid');
const resizeBtn = document.getElementById('resizeBtn');

function clearGrid() {
  gridEl.replaceChildren();
}

function shadeCell(e) {
  const el = e.currentTarget;
  let shade = Number(el.dataset.shade || 0);
  shade = Math.min(10, shade + 1); // darken by 10% each pass
  el.dataset.shade = shade;
  el.style.backgroundColor = `rgba(0,0,0,${shade / 10})`;
}

function buildGrid(n = 16) {
  const size = Math.max(1, Math.min(100, Math.floor(n)));
  clearGrid();

  // Use the grid's inner size (excludes borders), so cells fit exactly.
  const innerW = gridEl.clientWidth || GRID_SIZE_PX;
  const innerH = gridEl.clientHeight || GRID_SIZE_PX;
  const cellSize = Math.min(innerW, innerH) / size;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    cell.addEventListener('mouseenter', shadeCell);
    gridEl.appendChild(cell);
    
  }
  console.log(`Grid built: ${size} x ${size}`);
}

resizeBtn.addEventListener('click', () => {
  const input = prompt('Enter grid size per side (1-100):', '16');
  if (input === null) return;
  const n = Number(input);
  if (!Number.isFinite(n) || n < 1 || n > 100) {
    alert('Please enter a number between 1 and 100.');
    return;
  }
  buildGrid(n);
});

// Initial grid
buildGrid(16);
