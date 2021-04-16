export function createToast(header, text) {
    let toast = document.createElement('div');
    toast.className = 'toast show';

    const toastHeader = document.createElement('div');
    toastHeader.className = 'toast-header';
    toastHeader.innerText = header;

    const toastBody = document.createElement('div');
    toastBody.className = 'toast-body';
    toastBody.innerText = text;

    toast.appendChild(toastHeader);
    toast.appendChild(toastBody);

    return toast;
}
