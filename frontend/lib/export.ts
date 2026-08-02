export function exportCanvasAsPNG(canvas: HTMLCanvasElement, filename = "airwrite-canvas.png") {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = filename;
  link.click();
}

export function exportTextAsTXT(text: string, filename = "airwrite-ocr.txt") {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}