/**
 * Generate an array of random bytes
 * @param {int} length number of random bytes
 * @returns Uint8Array of random bytes
 */
function getRandomBytes(length) {
    return crypto.getRandomValues(new Uint8Array(length));
}

/**
 * Derive an AES key from a password and a salt using PBKDF2
 * @param {string} password 
 * @param {Uint8Array} salt 
 * @returns AES key
 */
async function deriveKeyFromPassword(password, salt) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password), {
            name: "PBKDF2"
        },
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey({
            name: "PBKDF2",
            salt: salt, // Uint8Array or ArrayBuffer
            iterations: 256000,
            hash: "SHA-384"
        },
        keyMaterial, {
            name: "AES-GCM",
            length: 256
        },
        false,
        ["encrypt", "decrypt"]
    );
}

/**
 * Encrypt a string using AES-GCM
 * @param {string} password 
 * @param {string} plaintext 
 * @returns Uint8Array: [salt(16) | iv(12) | ciphertext...]
 */
async function encrypt(password, plaintext) {
    // generate a random salt (16 bytes) and iv (12 bytes)
    const salt = getRandomBytes(16);
    const iv = getRandomBytes(12);
    const key = await deriveKeyFromPassword(password, salt);

    const encoder = new TextEncoder();
    const encodedText = encoder.encode(plaintext);

    const cipherBuffer = await crypto.subtle.encrypt({
            name: "AES-GCM",
            iv: iv
        },
        key,
        encodedText
    );

    const ciphertext = new Uint8Array(cipherBuffer);

    // combined layout: salt (16) | iv (12) | ciphertext
    const combined = new Uint8Array(salt.length + iv.length + ciphertext.length);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(ciphertext, salt.length + iv.length);

    return combined;
}


/**
 * Decrypt a Uint8Array produced by encrypt()
 * Accepts either Uint8Array or ArrayBuffer
 * @param {*} password 
 * @param {Uint8Array} combined 
 * @returns the plaintext
 */
async function decrypt(password, combined) {
    // normalize to Uint8Array
    const combinedBytes = combined instanceof Uint8Array ? combined : new Uint8Array(combined);

    // extract salt and iv according to layout
    const salt = combinedBytes.slice(0, 16); // first 16 bytes
    const iv = combinedBytes.slice(16, 28); // next 12 bytes
    const encryptedData = combinedBytes.slice(28); // rest is ciphertext

    const key = await deriveKeyFromPassword(password, salt);

    const plainBuffer = await crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: iv
        },
        key,
        encryptedData
    );

    const decoder = new TextDecoder();
    return decoder.decode(plainBuffer);
}

/**
 * Extract components from the combined blob
 * @param {*} combined 
 * @returns { salt: Uint8Array, iv: Uint8Array, ciphertext: Uint8Array }
 */
function ciphertextInfo(combined) {
    const combinedBytes = combined instanceof Uint8Array ? combined : new Uint8Array(combined);
    const salt = combinedBytes.slice(0, 16);
    const iv = combinedBytes.slice(16, 28);
    const ciphertext = combinedBytes.slice(28);
    return {
        salt,
        iv,
        ciphertext
    };
}