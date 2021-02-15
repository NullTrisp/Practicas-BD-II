/**
 * Function to
 */
function clearForm() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

/**
 * Creates a Hash for strings
 * @param {String} string
 * @returns Hash for the string
 */
function stringToHash(string) {
  let hash = 0;

  if (string.length == 0) return hash;

  for (i = 0; i < string.length; i++) {
    char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash;
}

function crypt(string) {
  let cipher = CryptoJS.AES.encrypt(string, "CIPHERKEY");
  cipher = cipher.toString();
  console.log(cipher);

  return cipher;
}

function decrypt(string) {
  return CryptoJS.AES.decrypt(string || "", "CIPHERKEY").toString(CryptoJS.enc.Utf8);
}