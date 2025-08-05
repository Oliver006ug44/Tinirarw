export default function ImagePreview(url) {
  // Inject styles once
  if (!document.getElementById('image-preview-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'image-preview-styles';
    styleEl.textContent = `
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: 'Comic Sans MS', cursive, sans-serif;
        background-color: #fff0f6;
      }
      .ImgBorder {
        position: fixed; /* fix it on screen */
        top: 50px;       /* default position */
        left: 50px;      /* default position */
        border: 4px solid #ffb3d9;
        border-radius: 10px;
        padding: 10px;
        background-color: #fff9fb;
        box-shadow: 0 6px 10px rgba(255, 153, 204, 0.4);
        max-width: 60vw;
        max-height: 60vh;
        overflow: hidden;
        z-index: 9999; /* on top */
        cursor: move; /* show draggable cursor */
        user-select: none; /* prevent text selection during drag */
      }
      .ImgBorder img {
        display: block;
        max-width: 100%;
        max-height: 100%;
        height: auto;
        border-radius: 6px;
        pointer-events: none; /* prevent interference while dragging */
      }
      .close-button {
        position: absolute;
        top: 4px;
        right: 4px;
        background-color: #ffb3d9;
        border: 2px solid #ff99cc;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        font-weight: bold;
        color: #5e005e;
        cursor: pointer;
        text-align: center;
        line-height: 18px;
        font-size: 18px;
        transition: background 0.3s ease;
        user-select: none;
      }
      .close-button:hover {
        background-color: #ff99cc;
      }
    `;
    document.head.appendChild(styleEl);
  }

  // Create container
  const ImgDiv = document.createElement('div');
  ImgDiv.className = 'ImgBorder';

  // Close button
  const closeBtn = document.createElement('div');
  closeBtn.className = 'close-button';
  closeBtn.textContent = '×';
  closeBtn.onclick = () => ImgDiv.remove();

  // Image element
  const img = document.createElement('img');
  img.src = url;
  img.alt = 'Example Image';

  // Append close & image
  ImgDiv.appendChild(closeBtn);
  ImgDiv.appendChild(img);

  // Append to body
  document.body.appendChild(ImgDiv);

  // --- Make draggable ---
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  ImgDiv.addEventListener('mousedown', (e) => {
    if (e.target === closeBtn) return; // Ignore dragging on close button
    isDragging = true;
    offsetX = e.clientX - ImgDiv.getBoundingClientRect().left;
    offsetY = e.clientY - ImgDiv.getBoundingClientRect().top;
    ImgDiv.style.transition = 'none'; // Disable transition during drag
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    // Optional: Keep inside viewport boundaries
    const maxX = window.innerWidth - ImgDiv.offsetWidth;
    const maxY = window.innerHeight - ImgDiv.offsetHeight;
    x = Math.min(Math.max(0, x), maxX);
    y = Math.min(Math.max(0, y), maxY);

    ImgDiv.style.left = x + 'px';
    ImgDiv.style.top = y + 'px';
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      ImgDiv.style.transition = ''; // Restore transition
    }
  });
}
