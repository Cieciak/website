var hlevel = 3;

function addParagraf(){
    let article = document.getElementById("article");

    let paragraf = document.createElement("div");

    let title = document.createElement("p");
    title.innerText = "Akapit";

    let p = document.createElement("p");
    p.setAttribute("contenteditable", true);


    let b = document.createElement("button");
    b.setAttribute("onclick", "deleteSelf(this);");
    b.innerText = "Delete";

    paragraf.appendChild(title);
    paragraf.appendChild(p);
    paragraf.appendChild(b);

    article.appendChild(paragraf);
}

function addHeading(direction){
    if (direction ==   'up') {hlevel -= 1;}
    if (direction == 'down') {hlevel += 1;}

    let article = document.getElementById("article");

    let paragraf = document.createElement("div");

    let title = document.createElement("p");
    title.innerText = 'Nagłówek ' + hlevel;

    let p = document.createElement("h" + hlevel);
    p.setAttribute("contenteditable", true);

    let b = document.createElement("button");
    b.setAttribute("onclick", "deleteSelf(this);");
    b.innerText = "Delete";

    paragraf.appendChild(title);
    paragraf.appendChild(p);
    paragraf.appendChild(b);

    article.appendChild(paragraf);
}

function deleteSelf(element){
    console.log(element);
    element.parentElement.remove();
}

function deleteParent(element, level){
    while (level > 0){
        element = element.parentElement;
        level -= 1;
    }

    element.remove();
}

function eventDragover(event){
    event.stopPropagation();
    event.preventDefault();

    event.dataTransfer.dropEffect = 'copy';
}

async function appendGallery(event){
    event.stopPropagation();
    event.preventDefault();

    let gallery = document.getElementById("img-list");

    for (const file of event.dataTransfer.files){
        let element = document.createElement("div");
        element.classList.add('gallery-img-container');

        let name    = document.createElement("p");
        name.innerText = file.name;
        element.appendChild(name);

        let image   = document.createElement("img");
        image.src = "data:image/png;base64," + await getBase64(file);
        element.appendChild(image);

        let container = document.createElement("div");

        let button  = document.createElement("button");
        button.innerText = "Delete";
        button.setAttribute("onclick", "deleteParent(this, 2)");
        container.appendChild(button);

        element.appendChild(container);

        gallery.appendChild(element);
    }
}

async function eventDrop(event){
    event.stopPropagation();
    event.preventDefault();

    let files = event.dataTransfer.files;
    console.log(files);
    let file  = files[0];

    let data = await getBase64(file);

    let image = document.getElementById("img-title");
    image.src = 'data:image/png;base64,' + data;

    var image_title = document.getElementById("p-img-title");
    image_title.innerText = file.name;
}

async function getBase64(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);
        };
        reader.onerror = error => reject(error);
    });
}
