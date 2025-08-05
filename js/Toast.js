export default function ShowToast(message, duration = 3000) {
  // Inject styles only once
  if (!document.getElementById('toast-style')) {
    const style = document.createElement('style');
    style.id = 'toast-style';
    style.textContent = `
      .toast-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-end;
      }

      .toast {
        background-color: #ffe0f0;
        color: #5e005e;
        padding: 12px 20px;
        border-radius: 12px;
        border: 2px solid #ffb3d9;
        font-family: 'Comic Sans MS', cursive, sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 8px rgba(255, 153, 204, 0.3);
        max-width: 260px;
        word-wrap: break-word;
        opacity: 0;
        transform: translateY(20px);
        animation: toast-in 0.4s ease-out forwards;
      }

      @keyframes toast-in {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes toast-out {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(20px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Create or find toast container
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  // Start fade-out after delay
  setTimeout(() => {
    toast.style.animation = 'toast-out 0.4s ease-in forwards';
    toast.addEventListener('animationend', () => toast.remove());
  }, duration);
}
