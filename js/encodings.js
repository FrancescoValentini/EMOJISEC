/**
 * Convert Uint8Array -> Base64
 * @param {Uint8Array} bytes 
 * @returns Base64 string
 */
function bytesToBase64(bytes) {
    let binary = "";
    const len = bytes.length;
    for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
}

/**
 * Convert Base64 string -> Uint8Array
 * @param {string} base64 
 * @returns Uint8Array
 */
function base64ToBytes(base64) {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}