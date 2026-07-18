const app = document.getElementById("app");

app.innerHTML = `
    <h1>Notion Widgets</h1>

    <div id="grid"></div>
`;

const grid = document.getElementById("grid");

widgets.forEach(widget => {

    grid.innerHTML += `
        <a href="./${widget.folder}/">
            <div style="font-size:32px">${widget.icon}</div>

            <h2>${widget.name}</h2>

            <p>${widget.description}</p>
        </a>
    `;

});
