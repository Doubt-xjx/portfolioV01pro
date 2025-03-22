const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
const showLoading = () => {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(overlay);
};

const hideLoading = () => {
  const overlay = document.querySelector('.loading-overlay');
  if (overlay) overlay.remove();
};

const showError = (message) => {
  const errorEl = document.createElement('div');
  errorEl.className = 'error-message';
  errorEl.textContent = message;
  document.body.appendChild(errorEl);
  setTimeout(() => errorEl.remove(), 5000);
};
showLoading();
const loadTimeout = setTimeout(() => {
  showError('场景加载超时，请检查网络连接');
  hideLoading();
}, 15000);

// 移除Spline相关初始化代码
  .then(() => {
    clearTimeout(loadTimeout);
    hideLoading();
  })
  .catch((error) => {
    clearTimeout(loadTimeout);
    hideLoading();
    showError(`加载失败: ${error.message}`);
  });