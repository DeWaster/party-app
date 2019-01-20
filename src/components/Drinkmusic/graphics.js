export const arrayToAverages = (freqArray, controlPoints) => {
  let freqs = Array.from(freqArray);
  freqs = freqs.slice(0, 500);
  const averages = [];
  const perAverage = Math.floor(freqs.length / controlPoints);
  while (freqs.length >= perAverage) {
    const a = freqs.splice(0, perAverage);
    const ave =
      a.reduce((ac, cur) => Math.floor(ac) + Math.floor(cur)) / a.length;
    averages.push(ave);
  }

  // Slice last 10 to get more all-around
  return averages;
};

export const createCircleCoordinates = averages => {
  let coords = [];
  const radius = 50;
  const startCoord = [180, 180];
  let key = 0;
  const step = (2 * Math.PI) / this.controlPoints;

  // Loop 2 radians
  for (let i = step; i < 2 * Math.PI + step; i += step) {
    coords.push([
      (radius + averages[key] / 2) * Math.sin(i) + startCoord[0],
      (radius + averages[key] / 2) * Math.cos(i) + startCoord[1],
      (radius + averages[key]) * Math.sin(i) + startCoord[0],
      (radius + averages[key]) * Math.cos(i) + startCoord[1],
    ]);
    key++;
  }
  return coords;
};

export const createBarCoordinates = (averages, controlPoints) => {
  let coords = [];
  const radius = 70;
  const startCoord = [180, 180];
  let key = 0;
  const step = (2 * Math.PI) / controlPoints;

  // Loop 2 radians
  for (let i = step; i <= 2 * Math.PI; i += step) {
    coords.push([
      radius * Math.sin(i) + startCoord[0],
      radius * Math.cos(i) + startCoord[1],
      (radius + averages[key] / 2) * Math.sin(i) + startCoord[0],
      (radius + averages[key] / 2) * Math.cos(i) + startCoord[1],
    ]);
    key++;
  }
  return coords;
};

export const drawCircle = coords => {
  const canvas = this.canvasRef.current;

  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.translate(ctx.width / 2, ctx.height / 2);

    const startCoordinates = [coords[0][0] - 100, coords[0][1]] - 100;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(startCoordinates[0], startCoordinates[1]);
    coords.map(coord => {
      ctx.quadraticCurveTo(coord[2], coord[3], coord[0], coord[1]);
    });
    ctx.quadraticCurveTo(
      coords[0][2],
      coords[0][3],
      coords[0][0],
      coords[0][1]
    );
    ctx.closePath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#000';
    ctx.stroke();
  }
};

export const drawBars = (coords, canvasRef) => {
  const canvas = canvasRef.current;

  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.translate(ctx.width / 2, ctx.height / 2);

    const gradient = ctx.createRadialGradient(300, 300, 0.0, 300, 300, 200.0);
    gradient.addColorStop(0.0, 'rgba(10, 0, 178, 1.000)');
    gradient.addColorStop(0.5, 'rgba(255, 0, 0, 1.000)');
    gradient.addColorStop(1.0, 'rgba(255, 252, 0, 1.000)');

    const startCoordinates = coords[0];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    coords.map(coord => {
      ctx.moveTo(coord[0], coord[1]);
      ctx.lineTo(coord[2], coord[3]);
    });
    ctx.lineWidth = 40;
    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#000';
    ctx.stroke();
  }
};
