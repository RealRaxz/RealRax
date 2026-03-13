function copyScript(){

var copyText = document.getElementById("script");

copyText.select();
copyText.setSelectionRange(0,99999);

navigator.clipboard.writeText(copyText.value);

alert("Script copied!");

}
