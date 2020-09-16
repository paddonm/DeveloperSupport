const toastList = document.getElementById('toastList')

const toggleToast = (message) => {
  const toast = document.createElement('DIV');
  toast.className = 'toast active';
  toast.innerHTML = `
    <i class="fad fa-check-circle"></i>
    ${message}
  `;
  toastList.innerHTML = '';
  toastList.appendChild(toast);
  hideToast(toast);
}

const hideToast = toast => {
  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}