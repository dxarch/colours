const cols = document.querySelectorAll('.col');
let clipboard = new ClipboardJS('.col h2');


clipboard.on('success', function(e) {
    alert("Copied!");
});


document.addEventListener('keydown', e => {
    e.preventDefault();
    if (e.code.toLocaleLowerCase() == 'space'){
        setRandomColors();
    }
});

document.addEventListener('click', e => {
    const type = e.target.dataset.type;
    const node = e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0];

    if (type === "lock"){
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } else if (type === 'copy') {
        e.target.dataset.clipboardText = e.target.textContent;
    }
});


function generateRandomColor() {
    const hexCodes = '0123456789ABCDEF';
    let color = '';

    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }

    return '#' + color;
}

function setRandomColors(isInitial){
    const colors = isInitial? getColorsFromHash() : [];

    cols.forEach((col, idx) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');

        if (isLocked){
            colors.push(text.textContent);
            return;
        } 

        const color = isInitial ? colors[idx] ? colors[idx] : generateRandomColor() : generateRandomColor();
        
        if(!isInitial){
            colors.push(color);
        }

        col.style.background = color;
        text.textContent = color;

        setTextColor(text, color);
        setTextColor(button, color);
    });

    updateColorsHash(colors);
}

function setTextColor(text, color){
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []){
    document.location.hash = colors.map((col) => col.toString().toLowerCase().substring(1)).join('-');
}

function getColorsFromHash() {
    if (document.location.hash.length > 1){
        return document.location.hash
            .substring(1)
            .split('-')
            .map(col => '#' + col);
    }
    
    return [];
}

setRandomColors(true);