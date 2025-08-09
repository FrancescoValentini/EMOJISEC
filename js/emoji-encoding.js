// =============================
// Emoji lookup table (256 emoji)
// =============================
// All from "Emoticons" or "Miscellaneous Symbols" block, Unicode <= 9.0
// Ensures wide compatibility in editors and browsers
const EMOJI_TABLE = [
    "😀", "😁", "😂", "😃", "😄", "😅", "😆", "😉", "😊", "😋",
    "😎", "😍", "😘", "😗", "😙", "😚", "🙂", "🤗", "🤔", "😐",
    "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪",
    "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓", "😔",
    "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟", "😤",
    "😢", "😭", "😦", "😧", "😨", "😩", "😬", "😰", "😱", "😳",
    "😵", "😠", "😡", "🤬", "😷", "🤒", "🤕", "🤢", "🤧", "😇",
    "🥳", "🥺", "🤠", "🤡", "🤥", "🤫", "🤭", "🧐", "🤓", "😈",
    "👿", "👹", "👺", "💀", "☠️", "👻", "👽", "👾", "🤖", "💩",
    "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙈",
    "🙉", "🙊", "🐵", "🐒", "🐶", "🐕", "🐩", "🐺", "🦊", "🐱",
    "🐈", "🦁", "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🐮", "🐂",
    "🐃", "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪",
    "🐫", "🐘", "🦏", "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿️",
    "🦔", "🦇", "🐻", "🐨", "🐼", "🐔", "🐓", "🐣", "🐤", "🐥",
    "🐦", "🐧", "🕊️", "🦅", "🦆", "🦉", "🐸", "🐊", "🐢", "🦎",
    "🐍", "🐲", "🐉", "🐳", "🐋", "🐬", "🐟", "🐠", "🐡", "🐙",
    "🐚", "🐌", "🦋", "🐛", "🐜", "🐝", "🐞", "💐", "🌸", "🌹",
    "🌺", "🌻", "🌼", "🌷", "🌱", "🌲", "🌳", "🌴", "🌵", "🌾",
    "🌿", "☘️", "🍀", "🍁", "🍂", "🍃", "🍄", "🌰", "🍇", "🍈",
    "🍉", "🍊", "🍋", "🍌", "🍍", "🍎", "🍏", "🍐", "🍑", "🍒",
    "🍓", "🥝", "🍅", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶️",
    "🥒", "🥬", "🥦", "🥜", "🍞", "🥐", "🥖", "🥨", "🥯", "🥞",
    "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭",
    "🥪", "🌮", "🌯", "🥙", "🧆", "🥚", "🍳", "🥘", "🍲", "🥣",
    "🥗", "🍿", "🧈", "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛",
    "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮"
];


// Create an inverse map for decoding
const EMOJI_TO_BYTE = Object.fromEntries(
    EMOJI_TABLE.map(
        (emoji, idx) => [emoji, idx]
    )
);

/**
 * Converts a Uint8Array into an emoji string.
 * @param {Uint8Array} bytes - Byte array to encode.
 * @returns {string} String composed of emojis representing the bytes.
 */
function bytesToEmoji(bytes) {
    let result = "";
    for (let i = 0; i < bytes.length; i++) {
        result += EMOJI_TABLE[bytes[i]];
    }
    return result;
}

/**
 * Converts an emoji string back into a Uint8Array.
 * @param {string} emojiStr - Emoji string to decode.
 * @returns {Uint8Array} Decoded byte array.
 */
function emojiToBytes(emojiStr) {
  const emojis = splitEmojis(emojiStr);
  const bytes = new Uint8Array(emojis.length);
  for (let i = 0; i < emojis.length; i++) {
    const val = EMOJI_TO_BYTE[emojis[i]];
    if (val === undefined) {
      throw new Error(`Unrecognized emoji: ${emojis[i]}`);
    }
    bytes[i] = val;
  }
  return bytes;
}


function splitEmojis(str) {
  const emojiRegex = /(\p{Extended_Pictographic}(?:\uFE0F)?)/gu;
  return str.match(emojiRegex) || [];
}
