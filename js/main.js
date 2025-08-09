
(function checkCryptoSupport() {
  const isSecureContext = window.isSecureContext;
  const hasCrypto = !!window.crypto;
  const hasSubtle = hasCrypto && typeof window.crypto.subtle !== 'undefined';

  if (!isSecureContext) {
    showErrorModal(
      '⚠️ Secure Connection Required',
      'This feature needs a secure environment to work. The Web Crypto API is disabled ' +
      'because this page is loaded over an insecure connection (HTTP).<br><br>' +
      '<strong>How to fix this:</strong><br>' +
      '• Open this page using <strong>https://</strong> instead of http://<br>' +
      '• Or run it from <strong>localhost</strong> on your computer<br>' +
      '• Or download the page as an <strong>.html</strong> file and open it directly in your browser<br><br>' +
      'Most browsers block cryptographic functions on insecure pages to protect your privacy and security.'
    );
    return;
  }

  if (!hasCrypto || !hasSubtle) {
    showErrorModal(
      '⚠️ Web Crypto API Unavailable',
      'Your browser does not support the required Web Crypto API features. ' +
      'Please update to the latest version of Chrome, Firefox, Safari, or Edge.'
    );
    return;
  }
})();

// PWA Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('Registered service worker!'))
    .catch(err => console.error('Service Worker failure:', err));
}



const modeSelect = document.getElementById('modeSelect');
const editorBox = document.getElementById('editorBox');
const passwordInput = document.getElementById('passwordInput');
// Get the password toggle button and its icon
const togglePassword = document.getElementById('togglePassword');
const icon = togglePassword.querySelector('i');

// Add click event listener to toggle password visibility
togglePassword.addEventListener('click', () => {
    // Check if password is currently hidden
    const isPassword = passwordInput.type === 'password';
    // Toggle between text and password type
    passwordInput.type = isPassword ? 'text' : 'password';
    // Toggle eye icon classes to show/hide password state
    icon.classList.toggle('bi-eye-fill', !isPassword);
    icon.classList.toggle('bi-eye-slash-fill', isPassword);
});

/*
 * BUTTON EVENT HANDLERS
 */
// Encrypt button click handler
document.getElementById('encryptBtn').addEventListener('click', async () => {
    const password = passwordInput.value;
    const mode = modeSelect.value;
    const plaintext = editorBox.value;

    if (checkInput()) {
        try {
            const ciphertext = await encrypt(password, plaintext);

            if (mode === "BASE64") {
                editorBox.value = bytesToBase64(ciphertext);
            } else if (mode === "EMOJI") {
                editorBox.value = bytesToEmoji(ciphertext);
            }
        } catch (error) {
            showErrorModal("⚠️ Encryption Error", error.message || String(error));
        }
    }
});

// Decrypt button click handler
document.getElementById('decryptBtn').addEventListener('click', async () => {
    const password = passwordInput.value;
    const mode = modeSelect.value;
    const encodedCiphertext = editorBox.value;
    let ciphertext;

    if (checkInput()) {
        try {
            if (mode === "BASE64") {
                ciphertext = base64ToBytes(encodedCiphertext);
            } else if (mode === "EMOJI") {
                ciphertext = emojiToBytes(encodedCiphertext);
            }

            editorBox.value = await decrypt(password, ciphertext);
        } catch (error) {
            showErrorModal("⚠️ Decryption Error", error.message || String(error));
        }
    }
});


// Copy button click handler
document.getElementById('copyBtn').addEventListener('click', () => {
    editorBox.select();
    editorBox.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(editorBox.value);
});

function checkInput(){
    const password = passwordInput.value;
    const text = editorBox.value;

    if(password == "" || text == ""){
        showErrorModal("⚠️ Fields Error!","The password and text fields must be filled!");
        return false;
    }
    return true;
}

/**
    Shows a Bootstrap error modal with the given title and body content.
    If a modal with the same ID already exists, it will be removed first.

    @param {string} title - The title to display in the modal header
    @param {string} body - The HTML content to display in the modal body
*/
function showErrorModal(title, body) {
    // Remove any existing modal with the same ID
    const existingModal = document.getElementById('dynamicErrorModal');
    if (existingModal) existingModal.remove();

    // Create the modal HTML markup
    const modalHTML = `
    <div class="modal fade" id="dynamicErrorModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-danger">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${body}
          </div>
        </div>
      </div>
    </div>`;

    // Insert the modal HTML in the page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Initialize and show the Bootstrap modal
    const modal = new bootstrap.Modal(document.getElementById('dynamicErrorModal'));
    modal.show();
}
