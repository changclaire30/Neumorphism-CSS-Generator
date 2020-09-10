// Color Contrast
// hex to rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    // return result ? {
    //   r: parseInt(result[1], 16),
    //   g: parseInt(result[2], 16),
    //   b: parseInt(result[3], 16)
    // } : null;
}

// rgba to rgb
function rgbaToRgb(rgba, rgb) {
    var R = ((1 - rgba[3]) * rgba[0]) + (rgba[3] * rgba[0]);
    var G = ((1 - rgba[3]) * rgba[1]) + (rgba[3] * rgba[1]);
    var B = ((1 - rgba[3]) * rgba[2]) + (rgba[3] * rgba[2]);
    return [R, G, B];
}

function LightenDarkenColor(colorCode, amount) {
    var usePound = false;
 
    if (colorCode[0] == "#") {
        colorCode = colorCode.slice(1);
        usePound = true;
    }
 
    var num = parseInt(colorCode, 16);
 
    var r = (num >> 16) + amount;
    if (r > 255) {
        r = 255;
    } else if (r < 0) {
        r = 0;
    }
 
    var b = ((num >> 8) & 0x00FF) + amount;
    if (b > 255) {
        b = 255;
    } else if (b < 0) {
        b = 0;
    }
 
    var g = (num & 0x0000FF) + amount;
    if (g > 255) {
        g = 255;
    } else if (g < 0) {
        g = 0;
    }
 
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

// check color contrast
function luminanace(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function contrast(rgb1, rgb2) {
    var lum1 = luminanace(rgb1[0], rgb1[1], rgb1[2]);
    var lum2 = luminanace(rgb2[0], rgb2[1], rgb2[2]);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05)
         / (darkest + 0.05);
}


// Color
var background_color = document.getElementById("background_color");
var background_val = document.getElementById("background_val");
background_color.oninput = function() {
    // background_val.innerHTML = background_color.value;
    // colorDiv.style.color = colorButton.value;
    document.getElementsByClassName("myDIV")[1].style.backgroundColor = this.value;
    document.body.style.backgroundColor = this.value;
    // console.log(hexToRgb(colorButton.value));
    // console.log(contrast([0, 0, 0], hexToRgb(colorButton.value)));
    if (contrast([0, 0, 0], hexToRgb(background_color.value)) < 4.5) {
        document.body.style.color = "#FFFFFF";
    } else {
        document.body.style.color = "#000000";
    }
    updateShape("changeConvex", "changeConcave", background_color, 1);

    if (document.getElementById("changeConvex").classList.contains("shapeClicked") == true) {
        updateCode("codeBackgroundColor", "background-image: " + createGradient("135deg", LightenDarkenColor(background_color.value, 20), background_color.value, LightenDarkenColor(background_color.value, -20)));
    } else if (document.getElementById("changeConcave").classList.contains("shapeClicked") == true) {
        updateCode("codeBackgroundColor", "background-image: " + createGradient("-45deg", LightenDarkenColor(background_color.value, 20), background_color.value, LightenDarkenColor(background_color.value, -20)));
    } else {
        updateCode("codeBackgroundColor", "background-color: " + this.value);
    }
}

function updateShape(checkConvex, checkConcave, buttonColor, number) {
    if (document.getElementById(checkConvex).classList.contains("shapeClicked") == true) {
        var gradient = createGradient("135deg", LightenDarkenColor(buttonColor.value, 20), buttonColor.value, LightenDarkenColor(buttonColor.value, -20));
        document.getElementsByClassName("myDIV")[number].style.backgroundImage = gradient;

        document.getElementsByClassName("myDIV")[number].style.boxShadow = 
                createBoxShadow("", distanceRange.value, blurRange.value);
    }

    if (document.getElementById(checkConcave).classList.contains("shapeClicked") == true) {
        var gradient = createGradient("-45deg", LightenDarkenColor(buttonColor.value, 20), buttonColor.value, LightenDarkenColor(buttonColor.value, -20));
        document.getElementsByClassName("myDIV")[number].style.backgroundImage = gradient;

        document.getElementsByClassName("myDIV")[number].style.boxShadow = 
                createBoxShadow("", distanceRange.value, blurRange.value);
    }
}

// primary color
var primary_color = document.getElementById("primary_color");
var primary_val = document.getElementById("primary_val");
primary_color.oninput = function() {
    // primary_val.innerHTML = primary_color.value;
    document.getElementsByClassName("myDIV")[0].style.backgroundColor = this.value;
    updateShape("changeConvexPrimary", "changeConcavePrimary", primary_color, 0);

    if (document.getElementById("changeConvexPrimary").classList.contains("shapeClicked") == true) {
        updateCode("codeBackgroundColorPrimary", "background-image: " + createGradient("135deg", LightenDarkenColor(primary_color.value, 20), primary_color.value, LightenDarkenColor(primary_color.value, -20)));
    } else if (document.getElementById("changeConcavePrimary").classList.contains("shapeClicked") == true) {
        updateCode("codeBackgroundColorPrimary", "background-image: " + createGradient("-45deg", LightenDarkenColor(primary_color.value, 20), primary_color.value, LightenDarkenColor(primary_color.value, -20)));
    } else {
        updateCode("codeBackgroundColorPrimary", "background-color: " + this.value);
    }
}

// Size
var sizeRange = document.getElementById("sizeRange");
var sizeNumber = document.getElementById("sizeNumber");
sizeNumber.innerHTML = sizeRange.value;

sizeRange.oninput = function() {
    sizeNumber.innerHTML = this.value;
    document.getElementsByClassName("myDIV")[0].style.width = this.value + "px";
    document.getElementsByClassName("myDIV")[0].style.height = this.value + "px";
    document.getElementsByClassName("myDIV")[1].style.width = this.value + "px";
    document.getElementsByClassName("myDIV")[1].style.height = this.value + "px";
    updateCode("codeWidthPrimary", this.value);
    updateCode("codeHeightPrimary", this.value);
    updateCode("codeWidth", this.value);
    updateCode("codeHeight", this.value);
}

// Border Radius
var borderRadiusRange = document.getElementById("borderRadiusRange");
var borderRadiusNumber = document.getElementById("borderRadiusNumber");
borderRadiusNumber.innerHTML = borderRadiusRange.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
borderRadiusRange.oninput = function() {
    borderRadiusNumber.innerHTML = this.value;
    document.getElementsByClassName("myDIV")[0].style.borderRadius = this.value + "%";
    document.getElementsByClassName("myDIV")[1].style.borderRadius = this.value + "%";
    updateCode("codeBorderRadius", this.value);
    updateCode("codeBorderRadiusPrimary", this.value);
}

// drop - inner - convex - concave
var changeDrop = document.getElementById("changeDrop");
var changeInner = document.getElementById("changeInner");
var changeConvex = document.getElementById("changeConvex");
var changeConcave = document.getElementById("changeConcave");

changeDrop.onclick = function () {
    shape.forEach(removeClicked);
    addStyle("changeDrop");

    document.getElementsByClassName("myDIV")[1].style.boxShadow = 
            createBoxShadow("", distanceRange.value, blurRange.value);
    
    document.getElementsByClassName("myDIV")[1].style.backgroundImage = "none";
    
    updateCode("codeBoxShadow", createBoxShadow("", distanceRange.value, blurRange.value));
    updateCode("codeBackgroundColor", "background-color: " + background_color.value);
}
changeInner.onclick = function () {
    shape.forEach(removeClicked);
    addStyle("changeInner");

    document.getElementsByClassName("myDIV")[1].style.boxShadow = 
            createBoxShadow("inset ", distanceRange.value, blurRange.value);
    
    document.getElementsByClassName("myDIV")[1].style.backgroundImage = "none";

    updateCode("codeBoxShadow", createBoxShadow("inset ", distanceRange.value, blurRange.value));
    updateCode("codeBackgroundColor", "background-color: " + background_color.value);
}
changeConvex.onclick = function () {
    shape.forEach(removeClicked);
    addStyle("changeConvex");

    var gradient = createGradient("135deg", LightenDarkenColor(background_color.value, 20), background_color.value, LightenDarkenColor(background_color.value, -20));
    document.getElementsByClassName("myDIV")[1].style.backgroundImage = gradient;

    document.getElementsByClassName("myDIV")[1].style.boxShadow = 
            createBoxShadow("", distanceRange.value, blurRange.value);
    
    updateCode("codeBoxShadow", createBoxShadow("", distanceRange.value, blurRange.value));
    updateCode("codeBackgroundColor", "background-image: " + gradient);
}
changeConcave.onclick = function () {
    shape.forEach(removeClicked);
    addStyle("changeConcave");

    var gradient = createGradient("-45deg", LightenDarkenColor(background_color.value, 20), background_color.value, LightenDarkenColor(background_color.value, -20));
    document.getElementsByClassName("myDIV")[1].style.backgroundImage = gradient;

    document.getElementsByClassName("myDIV")[1].style.boxShadow = 
            createBoxShadow("", distanceRange.value, blurRange.value);

    updateCode("codeBoxShadow", createBoxShadow("", distanceRange.value, blurRange.value));
    updateCode("codeBackgroundColor", "background-image: " + gradient);
}

// add clicked style
function addStyle(element) {
    document.getElementById(element).classList.add("shapeClicked");
}
// remove clicked style
var shape = ["changeDrop", "changeInner", "changeConvex", "changeConcave"];

function removeClicked(item) {
    if (document.getElementById(item).classList.contains("shapeClicked") == true) {
        document.getElementById(item).classList.remove("shapeClicked");
    }
}

// Inner shadow
// var switchInner = document.getElementById("switchInner");
function createBoxShadow(prefix, distanceRange, blurRange) {
    return `${prefix}${distanceRange}px ${distanceRange}px ${blurRange}px rgba(0, 0, 0, 0.3), ${prefix}-${distanceRange}px -${distanceRange}px ${blurRange}px rgba(255, 255, 255, 0.3)`
}
// switchInner.oninput = function () {
//     setShadow();
// }

function setShadow(checkInner, number, distanceType, blurType) {
    // if (switchInner.checked == true) {
    if (document.getElementById(checkInner).classList.contains("shapeClicked") == true) {
        document.getElementsByClassName("myDIV")[number].style.boxShadow = 
                createBoxShadow("inset ", distanceType.value, blurType.value);
    } else {
        document.getElementsByClassName("myDIV")[number].style.boxShadow = 
                createBoxShadow("", distanceType.value, blurType.value);
    }
}

// convex & concave
// var convex = document.getElementById("convex");
// var concave = document.getElementById("concave");
// var background_light = LightenDarkenColor(background_color.value, 20);
// var background_dark = LightenDarkenColor(background_color.value, -20);

function createGradient(deg, first, second, third) {
    return `linear-gradient(${deg}, ${first}, ${second}, ${third})`
}

function setGradient(deg) {
    var gradient = createGradient("135deg", LightenDarkenColor(background_color.value, 20), background_color.value, LightenDarkenColor(background_color.value, -20));
    // console.log(gradient);
    document.getElementsByClassName("myDIV")[1].style.backgroundImage = gradient;
}

// convex.onclick = function() {
//     var gradient = createGradient("135deg", LightenDarkenColor(background_color.value, 20), background_color.value, LightenDarkenColor(background_color.value, -20));
//     document.getElementsByClassName("myDIV")[1].style.backgroundImage = gradient;
    // document.getElementsByClassName("myDIV")[1].style.backgroundImage = `linear-gradient(135deg, ${background_light}, ${background_color.value}, ${background_dark})`;
    // document.getElementsByClassName("myDIV")[0].style.backgroundColor = `45deg, ${convex_light}, ${background_color.value}, ${convex_dark}`;
// }
// concave.onclick = function() {
    // var gradient = createGradient("-45deg", LightenDarkenColor(background_color.value, 20), background_color.value, LightenDarkenColor(background_color.value, -20));
    // document.getElementsByClassName("myDIV")[1].style.backgroundImage = gradient;
    // document.getElementsByClassName("myDIV")[0].style.backgroundColor = `45deg, ${convex_light}, ${background_color.value}, ${convex_dark}`;
// }

// Distance
var distanceRange = document.getElementById("distanceRange");
var distanceNumber = document.getElementById("distanceNumber");
distanceNumber.innerHTML = distanceRange.value;
// Blur
var blurRange = document.getElementById("blurRange");
var blurNumber = document.getElementById("blurNumber");
blurNumber.innerHTML = blurRange.value;

distanceRange.oninput = function() {
    distanceNumber.innerHTML = this.value;
    blurRange.value = this.value * 2;
    blurNumber.innerHTML = this.value * 2;
    setShadow("changeInner", 1, distanceRange, blurRange);
    // document.getElementById("myDIV").style.boxShadow = 
    // this.value + "px " + this.value + "px " + this.value * 2 + "px " + "rgba(0, 0, 0, 0.3), " +
    // "-" + this.value + "px " + "-" + this.value + "px " + this.value * 2 + "px " + "rgba(255, 255, 255, 0.3)" ;

    if (document.getElementById("changeInner").classList.contains("shapeClicked") == true) {
        updateCode("codeBoxShadow", createBoxShadow("inset ", distanceRange.value, blurRange.value));
    } else {
        updateCode("codeBoxShadow", createBoxShadow("", distanceRange.value, blurRange.value));
    }
}

blurRange.oninput = function() {
    blurNumber.innerHTML = this.value;
    setShadow("changeInner", 1, distanceRange, blurRange);
    // document.getElementById("myDIV").style.boxShadow = 
    // distanceRange.value + "px " + distanceRange.value + "px " + this.value + "px " + "rgba(0, 0, 0, 0.3), " +
    // "-" + distanceRange.value + "px " + "-" + distanceRange.value + "px " + this.value + "px " + "rgba(255, 255, 255, 0.3)" ;

    if (document.getElementById("changeInner").classList.contains("shapeClicked") == true) {
        updateCode("codeBoxShadow", createBoxShadow("inset ", distanceRange.value, blurRange.value));
    } else {
        updateCode("codeBoxShadow", createBoxShadow("", distanceRange.value, blurRange.value));
    }
}

// Primary button
// drop - inner - convex - concave
var changeDropPrimary = document.getElementById("changeDropPrimary");
var changeInnerPrimary = document.getElementById("changeInnerPrimary");
var changeConvexPrimary = document.getElementById("changeConvexPrimary");
var changeConcavePrimary = document.getElementById("changeConcavePrimary");
var shapePrimary = ["changeDropPrimary", "changeInnerPrimary", "changeConvexPrimary", "changeConcavePrimary"];

changeDropPrimary.onclick = function () {
    shapePrimary.forEach(removeClicked);
    addStyle("changeDropPrimary");

    document.getElementsByClassName("myDIV")[0].style.boxShadow = 
            createBoxShadow("", distanceRangePrimary.value, blurRangePrimary.value);
    
    document.getElementsByClassName("myDIV")[0].style.backgroundImage = "none";

    updateCode("codeBoxShadowPrimary", createBoxShadow("", distanceRangePrimary.value, blurRangePrimary.value));
    updateCode("codeBackgroundColorPrimary", "background-color: " + primary_color.value);
}
changeInnerPrimary.onclick = function () {
    shapePrimary.forEach(removeClicked);
    addStyle("changeInnerPrimary");

    document.getElementsByClassName("myDIV")[0].style.boxShadow = 
            createBoxShadow("inset ", distanceRangePrimary.value, blurRangePrimary.value);
    
    document.getElementsByClassName("myDIV")[0].style.backgroundImage = "none";

    updateCode("codeBoxShadowPrimary", createBoxShadow("inset ", distanceRangePrimary.value, blurRangePrimary.value));
    updateCode("codeBackgroundColorPrimary", "background-color: " + primary_color.value);
}
changeConvexPrimary.onclick = function () {
    shapePrimary.forEach(removeClicked);
    addStyle("changeConvexPrimary");

    var gradient = createGradient("135deg", LightenDarkenColor(primary_color.value, 20), primary_color.value, LightenDarkenColor(primary_color.value, -20));
    document.getElementsByClassName("myDIV")[0].style.backgroundImage = gradient;

    document.getElementsByClassName("myDIV")[0].style.boxShadow = 
            createBoxShadow("", distanceRangePrimary.value, blurRangePrimary.value);

    updateCode("codeBoxShadowPrimary", createBoxShadow("", distanceRangePrimary.value, blurRangePrimary.value));
    updateCode("codeBackgroundColorPrimary", "background-image: " + gradient);
}
changeConcavePrimary.onclick = function () {
    shapePrimary.forEach(removeClicked);
    addStyle("changeConcavePrimary");

    var gradient = createGradient("-45deg", LightenDarkenColor(primary_color.value, 20), primary_color.value, LightenDarkenColor(primary_color.value, -20));
    document.getElementsByClassName("myDIV")[0].style.backgroundImage = gradient;

    document.getElementsByClassName("myDIV")[0].style.boxShadow = 
            createBoxShadow("", distanceRangePrimary.value, blurRangePrimary.value);

    updateCode("codeBoxShadowPrimary", createBoxShadow("", distanceRangePrimary.value, blurRangePrimary.value));
    updateCode("codeBackgroundColorPrimary", "background-image: " + gradient);
}

// Distance
var distanceRangePrimary = document.getElementById("distanceRangePrimary");
var distanceNumberPrimary = document.getElementById("distanceNumberPrimary");
distanceNumberPrimary.innerHTML = distanceRangePrimary.value;
// Blur
var blurRangePrimary = document.getElementById("blurRangePrimary");
var blurNumberPrimary = document.getElementById("blurNumberPrimary");
blurNumberPrimary.innerHTML = blurRangePrimary.value;

distanceRangePrimary.oninput = function() {
    distanceNumberPrimary.innerHTML = this.value;
    blurRangePrimary.value = this.value * 2;
    blurNumberPrimary.innerHTML = this.value * 2;
    setShadow("changeInnerPrimary", 0, distanceRangePrimary, blurRangePrimary);

    if (document.getElementById("changeInnerPrimary").classList.contains("shapeClicked") == true) {
        updateCode("codeBoxShadowPrimary", createBoxShadow("inset ", distanceRangePrimary.value, blurRangePrimary.value));
    } else {
        updateCode("codeBoxShadowPrimary", createBoxShadow("", distanceRangePrimary.value, blurRangePrimary.value));
    }
}

blurRangePrimary.oninput = function() {
    blurNumberPrimary.innerHTML = this.value;
    setShadow("changeInnerPrimary", 0, distanceRangePrimary, blurRangePrimary);

    if (document.getElementById("changeInnerPrimary").classList.contains("shapeClicked") == true) {
        updateCode("codeBoxShadowPrimary", createBoxShadow("inset ", distanceRangePrimary.value, blurRangePrimary.value));
    } else {
        updateCode("codeBoxShadowPrimary", createBoxShadow("", distanceRangePrimary.value, blurRangePrimary.value));
    }
}

// code
function updateCode(codeStyle, codeValue) {
    document.getElementById(codeStyle).innerHTML = codeValue;
}

// copy
document.getElementById("copy").onclick = function() {
    // var copyText = document.getElementById("copyText");
    var copyText = document.getElementById("copyText").innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = copyText;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    alert("Copied!");
}
