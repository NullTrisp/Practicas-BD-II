function clearForm() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
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