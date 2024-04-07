const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function(e) {

    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // cursorOutline.style.left = `${posX}px`;
    // cursorOutline.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, {duration: 500, fill: "forwards"});

})

const left = document.getElementById("left-side");
const container = document.querySelector(".side-container");

const handleMove = e => {
  left.style.width = `${e.clientX / window.innerWidth * 100}%`;
}

const handleMouseLeave = () => {
    document.onmousemove = null;
    // left.style.width = "50%"; // Reset the width to its original value
  };

const handleMouseEnter = () => {
    container.onmousemove = e => handleMove(e);
};

document.onmousemove = e => handleMove(e);
document.ontouchmove = e => handleMove(e.touches[0]);
container.onmouseleave = handleMouseLeave;
container.onmouseenter = handleMouseEnter;