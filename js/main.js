
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
document.getElementById('encryptBtn').addEventListener('click', async() => {
    const password = passwordInput.value;
    const mode = modeSelect.value;
    const plaintext = editorBox.value;

    const ciphertext = await encrypt(password, plaintext);

    if(mode == "BASE64"){
        editorBox.value = bytesToBase64(ciphertext);
    }
    //TODO: implement EMOJI encoding
});

// Decrypt button click handler
document.getElementById('decryptBtn').addEventListener('click', async() => {
    const password = passwordInput.value;
    const mode = modeSelect.value;
    const encodedCiphertext = editorBox.value;
    var ciphertext;

    if(mode == "BASE64"){
        ciphertext = base64ToBytes(encodedCiphertext);
    }
    //TODO: implement EMOJI encoding

    editorBox.value = await decrypt(password,ciphertext);
});

// Copy button click handler
document.getElementById('copyBtn').addEventListener('click', () => {
    alert('Copy clicked');
});