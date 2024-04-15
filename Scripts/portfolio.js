


document.getElementById("projects").onmousemove = e => {
    for(const project of document.getElementsByClassName("project")){
        // project.onmousemove = e => handleOnMouseMove(e);
        const rect = project.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
        project.style.setProperty("--mouse-x", `${x}px`);
        project.style.setProperty("--mouse-y", `${y}px`);
   }
}


