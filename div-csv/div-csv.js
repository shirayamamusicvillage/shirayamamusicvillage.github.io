import { CSV } from "https://js.sabae.cc/CSV.js";

const setTemplate = (comp, data) => {
  //console.log(comp.nodeName);
  const atts = comp.attributes;
  if (!atts) {
    return;
  }
  for (let i = 0; i < atts.length; i++) {
    const att = atts[i];
    const name = att.name;
    const value = data[att.value];
    if (name.startsWith("data-textcontent")) {
      comp.textContent = value;
      if (!value && !comp.bkdisplay) {
        comp.bkdisplay = comp.style.display;
      }
      comp.style.display = value ? comp.bkdisplay : "none";
    } else if (name.startsWith("data-")) {
      const name2 = name.substring(5);
      comp.setAttribute(name2, value);
    }
  }
  for (const c of comp.childNodes) {
    setTemplate(c, data);
  }
};

class DivCSV extends HTMLElement {
  constructor() {
    super();
    this.init();
  }
  async init() {
    this.innerHTML = "";

    const fn = this.getAttribute("src");
    const data = CSV.toJSON(await CSV.fetch(fn));
    const filter = this.getAttribute("filter");
    const cr = (tag) => document.createElement(tag);
    for (const d of data) {
      if (filter) {
        const chk = filter.split("=");
        if (chk.length >= 2) {
          if (d[chk[0]] != chk[1]) {
            continue;
          }
        }
      }

      const div = cr("div");
      const img = new Image();
      img.src = d.image;
      div.appendChild(img);
      const div2 = cr("div");
      div2.textContent = d.name;
      div.appendChild(div2);
      this.appendChild(div);

      div.onclick = () => {
        setTemplate(popup, d);
        popup.style.display = "block";
        container.scrollTop = 0;
        // stop scroll
        const bktop = window.scrollY
        const lockscroll = (e) => {
          window.scrollTo(0, bktop);
          //e.preventDefault();
        };
        window.addEventListener("wheel", lockscroll); // , { passive: false }) // 表も効かなくなる
        window.addEventListener("touchmove", lockscroll); //, { passive: false });
        
        popup.querySelectorAll(".close").forEach((c) => {
          c.onclick = () => {
            popup.style.display = "none";
            // resume scroll
            window.removeEventListener("wheel", lockscroll);
            window.removeEventListener("touchmove", lockscroll);
          };
        });
      };
    }
  }
}

customElements.define("div-csv", DivCSV);

export { DivCSV };
