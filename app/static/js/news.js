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
    element.parentElement.remove();
}