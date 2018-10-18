
const SHOW_FUNCT_NAME = true;
var ccc = 1;

function __showFunctName(str) {
    if (SHOW_FUNCT_NAME) {
        console.log("--Calling function : " + ccc);
        console.log("--"+ccc+" - "+str);
        ccc++;
    }
}