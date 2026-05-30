const fallbackCache = new Map();

export function getFallbackImage(item) {
  if (fallbackCache.has(item.id)) return fallbackCache.get(item.id);

  const width = 820;
  const height = 600;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);

  drawPoster(ctx, width, height, item);
  const dataUrl = canvas.toDataURL("image/png");
  fallbackCache.set(item.id, dataUrl);
  return dataUrl;
}

function palette(tone) {
  const palettes = {
    wine: { bg: "#6d1d31", bg2: "#42121e", ink: "#fff0c8", accent: "#e0b23b", second: "#1d6382" },
    mustard: { bg: "#d9a735", bg2: "#8a4f1f", ink: "#211714", accent: "#fff0c8", second: "#1d6382" },
    blue: { bg: "#1d6382", bg2: "#102f3d", ink: "#fff0c8", accent: "#e0b23b", second: "#8fc0a7" },
    green: { bg: "#214d40", bg2: "#102820", ink: "#fff0c8", accent: "#e0b23b", second: "#7f2036" },
    mint: { bg: "#8fc0a7", bg2: "#386b5a", ink: "#211714", accent: "#fff0c8", second: "#7f2036" }
  };
  return palettes[tone] || palettes.wine;
}

function drawPoster(ctx, width, height, item) {
  const colors = palette(item.fallback.tone);
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, width, height);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, colors.bg);
  gradient.addColorStop(1, colors.bg2);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  drawTexture(ctx, width, height, hash(item.id), colors);
  drawMotif(ctx, width, height, item.fallback.motif, colors);
  drawPosterText(ctx, width, height, item, colors);
}

function drawTexture(ctx, width, height, seed, colors) {
  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = colors.ink;
  for (let x = -height; x < width; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x + (seed % 17), 0);
    ctx.lineTo(x + height + (seed % 17), height);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.11;
  ctx.fillStyle = colors.accent;
  for (let i = 0; i < 42; i += 1) {
    const x = (seed * (i + 11) * 37) % width;
    const y = (seed * (i + 7) * 29) % height;
    ctx.fillRect(x, y, 2 + (i % 3), 2 + (i % 4));
  }
  ctx.restore();
}

function drawMotif(ctx, width, height, motif, colors) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const cx = width / 2;
  const cy = height / 2;

  if (motif === "umbrella") {
    ctx.strokeStyle = colors.ink;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 10);
    ctx.lineTo(cx, cy + 165);
    ctx.quadraticCurveTo(cx, cy + 210, cx + 46, cy + 185);
    ctx.stroke();
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.arc(cx, cy - 20, 155, Math.PI, 0);
    ctx.lineTo(cx + 155, cy - 20);
    ctx.quadraticCurveTo(cx + 75, cy + 34, cx, cy - 20);
    ctx.quadraticCurveTo(cx - 75, cy + 34, cx - 155, cy - 20);
    ctx.closePath();
    ctx.fill();
  } else if (motif === "horn") {
    ctx.strokeStyle = colors.second;
    ctx.lineWidth = 30;
    ctx.beginPath();
    ctx.arc(cx - 20, cy + 25, 92, 0.2, Math.PI * 1.72);
    ctx.stroke();
    ctx.fillStyle = colors.second;
    ctx.beginPath();
    ctx.moveTo(cx + 76, cy - 55);
    ctx.lineTo(cx + 210, cy - 118);
    ctx.lineTo(cx + 200, cy + 15);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(cx - 110, cy + 88);
    ctx.lineTo(cx - 170, cy + 128);
    ctx.stroke();
  } else if (motif === "booth") {
    ctx.fillStyle = colors.second;
    roundRect(ctx, cx - 260, cy - 85, 520, 210, 18);
    ctx.fill();
    ctx.fillStyle = colors.bg2;
    roundRect(ctx, cx - 220, cy - 55, 440, 150, 12);
    ctx.fill();
    ctx.fillStyle = colors.accent;
    roundRect(ctx, cx - 115, cy + 90, 230, 38, 8);
    ctx.fill();
    drawGlasses(ctx, cx, cy + 22, colors);
  } else if (motif === "pineapple") {
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 35, 105, 145, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = colors.bg2;
    ctx.lineWidth = 5;
    for (let i = -120; i < 130; i += 28) {
      ctx.beginPath();
      ctx.moveTo(cx - 92, cy + i);
      ctx.lineTo(cx + 92, cy + i + 92);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + 92, cy + i);
      ctx.lineTo(cx - 92, cy + i + 92);
      ctx.stroke();
    }
    ctx.fillStyle = colors.second;
    for (let i = -3; i <= 3; i += 1) {
      ctx.beginPath();
      ctx.moveTo(cx, cy - 115);
      ctx.lineTo(cx + i * 36, cy - 245);
      ctx.lineTo(cx + i * 18 + 24, cy - 112);
      ctx.closePath();
      ctx.fill();
    }
  } else if (motif === "playbook") {
    ctx.fillStyle = colors.accent;
    roundRect(ctx, cx - 190, cy - 150, 380, 260, 12);
    ctx.fill();
    ctx.fillStyle = colors.bg2;
    roundRect(ctx, cx - 164, cy - 122, 328, 204, 8);
    ctx.fill();
    ctx.strokeStyle = colors.ink;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 120);
    ctx.lineTo(cx, cy + 84);
    ctx.stroke();
    ctx.fillStyle = colors.ink;
    ctx.font = "900 48px serif";
    ctx.textAlign = "center";
    ctx.fillText("PLAY", cx - 82, cy - 12);
    ctx.fillText("BOOK", cx + 84, cy + 44);
  } else if (motif === "suit") {
    ctx.fillStyle = "#171717";
    ctx.beginPath();
    ctx.moveTo(cx - 160, cy + 170);
    ctx.lineTo(cx - 100, cy - 120);
    ctx.lineTo(cx, cy - 20);
    ctx.lineTo(cx + 100, cy - 120);
    ctx.lineTo(cx + 160, cy + 170);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = colors.ink;
    ctx.beginPath();
    ctx.moveTo(cx - 54, cy - 120);
    ctx.lineTo(cx, cy - 24);
    ctx.lineTo(cx + 54, cy - 120);
    ctx.lineTo(cx + 22, cy + 170);
    ctx.lineTo(cx - 22, cy + 170);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 16);
    ctx.lineTo(cx + 32, cy + 56);
    ctx.lineTo(cx, cy + 160);
    ctx.lineTo(cx - 32, cy + 56);
    ctx.closePath();
    ctx.fill();
  } else if (motif === "skyline" || motif === "train") {
    ctx.fillStyle = colors.bg2;
    ctx.fillRect(0, cy + 120, width, 90);
    for (let i = 0; i < 11; i += 1) {
      const x = 52 + i * 72;
      const h = 90 + (i % 4) * 42;
      ctx.fillStyle = i % 2 ? colors.second : colors.bg2;
      ctx.fillRect(x, cy + 120 - h, 48, h);
      ctx.fillStyle = colors.accent;
      for (let w = 0; w < 3; w += 1) {
        ctx.fillRect(x + 9 + w * 12, cy + 145 - h, 5, 14);
      }
    }
    if (motif === "train") {
      ctx.fillStyle = colors.ink;
      roundRect(ctx, cx - 230, cy + 66, 460, 90, 16);
      ctx.fill();
      ctx.fillStyle = colors.second;
      for (let i = 0; i < 5; i += 1) {
        roundRect(ctx, cx - 198 + i * 82, cy + 84, 54, 28, 5);
        ctx.fill();
      }
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(cx - 250, cy + 172);
      ctx.lineTo(cx + 250, cy + 172);
      ctx.stroke();
    }
  } else if (motif === "architecture") {
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 3;
    for (let x = 120; x < width - 120; x += 38) {
      ctx.beginPath();
      ctx.moveTo(x, 120);
      ctx.lineTo(x, height - 120);
      ctx.stroke();
    }
    for (let y = 115; y < height - 100; y += 38) {
      ctx.beginPath();
      ctx.moveTo(100, y);
      ctx.lineTo(width - 100, y);
      ctx.stroke();
    }
    ctx.strokeStyle = colors.ink;
    ctx.lineWidth = 9;
    ctx.strokeRect(cx - 130, cy - 120, 260, 240);
    ctx.beginPath();
    ctx.moveTo(cx - 145, cy - 120);
    ctx.lineTo(cx, cy - 220);
    ctx.lineTo(cx + 145, cy - 120);
    ctx.stroke();
  } else if (motif === "news") {
    ctx.fillStyle = colors.accent;
    roundRect(ctx, cx - 210, cy + 50, 420, 85, 10);
    ctx.fill();
    ctx.fillStyle = colors.second;
    roundRect(ctx, cx - 130, cy - 130, 260, 150, 12);
    ctx.fill();
    ctx.fillStyle = colors.ink;
    ctx.beginPath();
    ctx.arc(cx - 40, cy + 15, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(cx - 47, cy + 35, 14, 70);
    ctx.fillRect(cx - 78, cy + 102, 76, 11);
  } else if (motif === "law") {
    ctx.strokeStyle = colors.ink;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 140);
    ctx.lineTo(cx, cy + 90);
    ctx.moveTo(cx - 115, cy - 60);
    ctx.lineTo(cx + 115, cy - 60);
    ctx.stroke();
    drawScale(ctx, cx - 100, cy - 38, colors);
    drawScale(ctx, cx + 100, cy - 38, colors);
    ctx.fillStyle = colors.accent;
    roundRect(ctx, cx - 150, cy + 122, 300, 34, 6);
    ctx.fill();
  } else if (motif === "art") {
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 175, 122, -0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colors.bg;
    ctx.beginPath();
    ctx.arc(cx + 64, cy - 10, 34, 0, Math.PI * 2);
    ctx.fill();
    ["#7f2036", "#1d6382", "#214d40", "#fff0c8"].forEach((paint, i) => {
      ctx.fillStyle = paint;
      ctx.beginPath();
      ctx.arc(cx - 72 + i * 44, cy - 32 + (i % 2) * 60, 18, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (motif === "music") {
    ctx.strokeStyle = colors.ink;
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(cx + 88, cy - 178);
    ctx.lineTo(cx - 60, cy + 78);
    ctx.stroke();
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.ellipse(cx - 78, cy + 90, 85, 112, -0.42, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colors.second;
    ctx.beginPath();
    ctx.arc(cx - 52, cy + 70, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colors.accent;
    ctx.fillRect(cx + 72, cy - 198, 94, 32);
  } else if (motif === "wedding") {
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(cx - 42, cy, 80, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 58, cy, 80, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = colors.ink;
    roundRect(ctx, cx - 160, cy + 118, 320, 55, 8);
    ctx.fill();
  } else if (motif === "tattoo") {
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.ellipse(cx - 70, cy, 95, 62, -0.5, 0, Math.PI * 2);
    ctx.ellipse(cx + 70, cy, 95, 62, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colors.second;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 28, 86, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (motif === "doppelganger") {
    for (let i = -2; i <= 2; i += 1) {
      drawPerson(ctx, cx + i * 78, cy + 32, colors, i);
    }
  } else if (motif === "oldphoto" || motif === "quote") {
    ctx.fillStyle = colors.ink;
    roundRect(ctx, cx - 190, cy - 120, 380, 250, 8);
    ctx.fill();
    ctx.fillStyle = colors.accent;
    roundRect(ctx, cx - 154, cy - 78, 308, 150, 6);
    ctx.fill();
    if (motif === "quote") {
      ctx.fillStyle = colors.bg2;
      ctx.font = "900 128px serif";
      ctx.textAlign = "center";
      ctx.fillText("“”", cx, cy + 38);
    }
  } else if (motif === "ducky") {
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.moveTo(cx - 58, cy - 150);
    ctx.lineTo(cx + 58, cy - 150);
    ctx.lineTo(cx + 34, cy + 170);
    ctx.lineTo(cx - 34, cy + 170);
    ctx.closePath();
    ctx.fill();
    for (let i = 0; i < 5; i += 1) {
      drawDuck(ctx, cx - 26 + (i % 2) * 52, cy - 92 + i * 58, colors);
    }
  } else if (motif === "coaster") {
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.arc(cx, cy, 145, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = colors.ink;
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.fillStyle = colors.bg2;
    ctx.font = "900 96px serif";
    ctx.textAlign = "center";
    ctx.fillText("2 AM", cx, cy + 32);
  } else if (motif === "boots") {
    ctx.fillStyle = colors.second;
    roundRect(ctx, cx - 120, cy - 20, 82, 205, 12);
    ctx.fill();
    roundRect(ctx, cx + 20, cy - 20, 82, 205, 12);
    ctx.fill();
    roundRect(ctx, cx - 135, cy + 142, 145, 46, 10);
    ctx.fill();
    roundRect(ctx, cx + 5, cy + 142, 145, 46, 10);
    ctx.fill();
  } else if (motif === "relationship" || motif === "group") {
    if (motif === "group") {
      for (let i = -2; i <= 2; i += 1) drawPerson(ctx, cx + i * 82, cy + 30, colors, i);
      drawGlasses(ctx, cx, cy + 155, colors);
    } else {
      drawPerson(ctx, cx - 80, cy + 22, colors, -1);
      drawPerson(ctx, cx + 80, cy + 22, colors, 1);
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy - 95);
      ctx.lineTo(cx + 20, cy - 95);
      ctx.stroke();
    }
  } else if (motif === "window") {
    ctx.fillStyle = colors.ink;
    roundRect(ctx, cx - 175, cy - 150, 350, 270, 10);
    ctx.fill();
    ctx.fillStyle = colors.bg2;
    ctx.fillRect(cx - 144, cy - 120, 122, 102);
    ctx.fillRect(cx + 22, cy - 120, 122, 102);
    ctx.fillRect(cx - 144, cy + 20, 122, 72);
    ctx.fillRect(cx + 22, cy + 20, 122, 72);
    ctx.strokeStyle = colors.second;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(cx, cy + 140, 64, 0.1, Math.PI * 1.75);
    ctx.stroke();
  }

  ctx.restore();
}

function drawPosterText(ctx, width, height, item, colors) {
  ctx.save();
  ctx.fillStyle = colors.ink;
  ctx.textAlign = "left";
  ctx.font = "900 48px 'Noto Serif SC', serif";
  wrapText(ctx, item.fallback.title, 54, 78, width - 108, 54);
  ctx.font = "900 26px 'Noto Sans SC', sans-serif";
  ctx.fillStyle = colors.accent;
  wrapText(ctx, item.fallback.tag, 56, height - 66, width - 112, 32);
  ctx.restore();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = Array.from(text);
  let line = "";
  for (const char of chars) {
    const testLine = line + char;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = char;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function drawGlasses(ctx, cx, cy, colors) {
  ctx.fillStyle = colors.ink;
  for (let i = -1; i <= 1; i += 1) {
    ctx.beginPath();
    ctx.moveTo(cx + i * 70 - 18, cy - 54);
    ctx.lineTo(cx + i * 70 + 18, cy - 54);
    ctx.lineTo(cx + i * 70 + 10, cy + 18);
    ctx.lineTo(cx + i * 70 - 10, cy + 18);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(cx + i * 70 - 16, cy + 24, 32, 8);
  }
}

function drawPerson(ctx, x, y, colors, offset) {
  ctx.fillStyle = offset % 2 === 0 ? colors.ink : colors.accent;
  ctx.beginPath();
  ctx.arc(x, y - 92, 34, 0, Math.PI * 2);
  ctx.fill();
  roundRect(ctx, x - 36, y - 44, 72, 132, 20);
  ctx.fill();
}

function drawDuck(ctx, x, y, colors) {
  ctx.fillStyle = colors.bg2;
  ctx.beginPath();
  ctx.ellipse(x, y, 22, 14, 0, 0, Math.PI * 2);
  ctx.arc(x + 16, y - 10, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = colors.second;
  ctx.beginPath();
  ctx.moveTo(x + 28, y - 11);
  ctx.lineTo(x + 43, y - 7);
  ctx.lineTo(x + 28, y - 2);
  ctx.closePath();
  ctx.fill();
}

function drawScale(ctx, x, y, colors) {
  ctx.fillStyle = colors.accent;
  ctx.beginPath();
  ctx.moveTo(x - 34, y);
  ctx.lineTo(x + 34, y);
  ctx.lineTo(x + 20, y + 36);
  ctx.lineTo(x - 20, y + 36);
  ctx.closePath();
  ctx.fill();
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function hash(text) {
  let value = 0;
  for (let i = 0; i < text.length; i += 1) {
    value = (value << 5) - value + text.charCodeAt(i);
    value |= 0;
  }
  return Math.abs(value || 1);
}
