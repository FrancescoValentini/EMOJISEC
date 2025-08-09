
const modeSelect = document.getElementById('modeSelect');
const editorBox = document.getElementById('editorBox');
const passwordInput = document.getElementById('passwordInput');
showErrorModal("Test Error","This is a test error for the new error modal");
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
document.getElementById('encryptBtn').addEventListener('click', async() => {
    const password = passwordInput.value;
    const mode = modeSelect.value;
    const plaintext = editorBox.value;
    const ciphertext = await encrypt(password, plaintext);

    if(mode == "BASE64"){
        editorBox.value = bytesToBase64(ciphertext);
    }else if(mode == "EMOJI"){
        editorBox.value = bytesToEmoji(ciphertext);
    }
});

// Decrypt button click handler
document.getElementById('decryptBtn').addEventListener('click', async() => {
    const password = passwordInput.value;
    const mode = modeSelect.value;
    const encodedCiphertext = editorBox.value;
    var ciphertext;

    if(mode == "BASE64"){
        ciphertext = base64ToBytes(encodedCiphertext);
    }else if(mode == "EMOJI"){
        ciphertext = emojiToBytes(encodedCiphertext);
    }
    
    editorBox.value = await decrypt(password,ciphertext);
});

// Copy button click handler
document.getElementById('copyBtn').addEventListener('click', () => {
    editorBox.select();
    editorBox.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(editorBox.value);
});

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
