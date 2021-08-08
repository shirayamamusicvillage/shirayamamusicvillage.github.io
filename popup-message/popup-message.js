const delayms = 150;

class PopupMessage extends HTMLElement {
  constructor() {
    super();
    this.hidden = true;
    const txt = this.innerHTML;
    this.textContent = "";
    //console.log(txt);
    
    const mode = "open"; // "closed"
    const root = this.attachShadow({ mode });
    const bg = document.createElement("div");
    root.appendChild(bg);
    const div = document.createElement("div");
    bg.appendChild(div);
    div.innerHTML = txt;
    const closebtn = document.createElement("div");
    div.appendChild(closebtn);
    closebtn.textContent = "×";
    
    const style = document.createElement("style");
    style.textContent = `
      a {
        color: #333 !important;
      }
    `;
    root.appendChild(style);

    Object.assign(bg.style, {
      "position": "fixed",
      "background-color": "rgba(0, 0, 0, .88)",
      "top": "0px",
      "width": "100vw",
      "overflow": "hidden",
      "height": "100vh",
      "opacity": 0,
      "transition": "all " + (delayms / 1000) + "s",
      //"min-height": "100vh",
      "z-index": 1000,
    });

    Object.assign(div.style, {
      "display": "inline-block",
      "overflow-y": "scroll",
      "box-sizing": "border-box",
      "margin": "5vh 5vw",
      "height": "90vh",
      "padding": "5vh 5vw",
      "background-color": "rgba(255, 255, 255, .88)",
      "color": "#333",
      "text-align": "left",
      "font-weight": "700",
      "font-size": "88%",
      "line-height": "1.6",
      "white-space": "pre-wrap",
    });

    Object.assign(closebtn.style, {
      "position": "absolute",
      "display": "inline-block",
      "box-sizing": "border-box",
      "right": "5vw",
      "top": "5vh",
      "padding": ".2em .8em",
      //"backgroundColor": "red",
      "color": "#222",
      "fontSize": "2em",
      "cursor": "pointer",
      //"z-index": 1001,
    });

    // stop scroll
    const bktop = window.scrollY;
    const lockscroll = (e) => {
      window.scrollTo(0, bktop);
    };
    const unlockScroll = () => {
      window.removeEventListener("wheel", lockscroll);
      window.removeEventListener("touchmove", lockscroll);
    };
    window.addEventListener("wheel", lockscroll);
    window.addEventListener("touchmove", lockscroll);
    
    // close
    const close = () => {
      unlockScroll();
      bg.style.opacity = 0;
      setTimeout(() => { this.hidden = true }, delayms);
    };
    bg.onclick = (e) => {
      if (e.target == bg) {
        close();
      }
    };
    closebtn.onclick = () => close();

    this.hidden = false;
    setTimeout(() => { bg.style.opacity = 1 });
  }
}

customElements.define("popup-message", PopupMessage);
