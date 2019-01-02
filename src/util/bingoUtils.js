export function updateHighlights(statusGrid) {
  const newStatusGrid = statusGrid.map(a =>
    a.map(b => {
      return { ...b, highlight: false };
    })
  );
  // Check rows
  // TODO: PLEASE make this better
  for (let i = 0; i < 5; i++) {
    let pressCount = 0;
    for (let j = 0; j < 5; j++) {
      if (statusGrid[i][j].pressed) {
        pressCount++;
      }
    }

    if (pressCount === 5) {
      newStatusGrid[i] = statusGrid[i].map(a => ({ ...a, highlight: true }));
    }
  }

  // Check cols
  for (let i = 0; i < 5; i++) {
    let pressCount = 0;
    for (let j = 0; j < 5; j++) {
      if (statusGrid[j][i].pressed) {
        pressCount++;
      }
    }

    if (pressCount === 5) {
      for (let j = 0; j < 5; j++) {
        newStatusGrid[j][i] = { ...statusGrid[j][i], highlight: true };
      }
    }
  }

  // Check diagonals
  // Left to Right
  let pressCount = 0;
  for (let i = 0, j = 0; i < 5 && j < 5; i++, j++) {
    if (statusGrid[i][j].pressed) {
      pressCount++;
    }
    if (pressCount === 5) {
      for (let i = 0, j = 0; i < 5 && j < 5; i++, j++) {
        newStatusGrid[i][j] = { ...statusGrid[i][j], highlight: true };
      }
    }
  }
  // Right to left
  pressCount = 0;
  for (let i = 0, j = 4; i < 5 && j >= 0; i++, j--) {
    if (statusGrid[i][j].pressed) {
      pressCount++;
    }
    if (pressCount === 5) {
      for (let i = 0, j = 4; i < 5 && j >= 0; i++, j--) {
        newStatusGrid[i][j] = { ...statusGrid[i][j], highlight: true };
      }
    }
  }
  return newStatusGrid;
}
