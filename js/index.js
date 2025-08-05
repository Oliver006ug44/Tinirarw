// main.js
import ShowImage from './ImagePreview.js';

document.addEventListener('DOMContentLoaded', () => {
  const ImgBtn = document.getElementById('imgBtn1');
  ImgBtn.onclick = (event) => {
    const url = event.target.src; 
    ShowImage(url);
  };

  const ImgBtn2 = document.getElementById('imgBtn2');
  ImgBtn2.onclick = (event) => {
    const url = event.target.src; 
    ShowImage(url);

  };

  const ImgBtn3 = document.getElementById('imgBtn3');
  ImgBtn3.onclick = (event) => {
    const url = event.target.src; 
    ShowImage(url);
  };

  const ImgBtn4 = document.getElementById('imgBtn4');
  ImgBtn4.onclick = (event) => {
    const url = event.target.src; 
    ShowImage(url);
  };
});
