const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;
const catContainer = document.querySelector(".home-img")
const catContainerWidth = catContainer.clientWidth;
const catContainerHeight = catContainer.clientHeight;
const cat = document.querySelector("img.cat-bottom");
const catHeight = cat.clientHeight;


catUp = () => {
    var pos = 200;
    var id = setInterval(frame, 3);
    function frame() {
        if (pos == 0) {
            clearInterval(id);
        } else {
            pos--; 
            cat.style.top = pos + 'px'; 
        }
        console.log('oke')
    }
}

catDown = (callback) => {
    var pos = 0;
    var id = setInterval(frame, 1);
    function frame() {
        if (pos == 200) {
            clearInterval(id);
            let newLeft = Math.floor(Math.random() * (pageWidth - catContainerWidth));
            let newTop = Math.floor(Math.random() * (pageHeight - catContainerHeight));
            catContainer.style.left = String(newLeft) + 'px';
            catContainer.style.top = String(newTop) + 'px';
            setTimeout(callback, 3000); 
        } else {
            pos++; 
            cat.style.top = pos + 'px'; 
        }
    }
}


moveContainerCat = (callback) => {
    let newLeft = Math.floor(Math.random() * (pageWidth - catContainerWidth));
    let newTop = Math.floor(Math.random() * (pageHeight - catContainerHeight));
    catContainer.style.left = String(newLeft) + 'px';
    catContainer.style.top = String(newTop) + 'px';
    callback();
}

pounchCat = () => {
    catDown(catUp);
}


document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        // Initialize your application or run some code.
        catUp();
    }
}

cat.addEventListener("click", pounchCat, false)
