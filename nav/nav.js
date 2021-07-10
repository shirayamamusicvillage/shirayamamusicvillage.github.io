const makeNav = () => {
  const secs = document.querySelectorAll("section");
  const c = (tag, parent) => {
    const c = document.createElement(tag)
    parent.appendChild(c);
    return c;
  };
  const nav = c("nav", document.body);
  const ul = c("ul", nav);
  for (const sec of secs) {
    const h2 = sec.querySelector("h2");
    const title = h2 ? h2.textContent : sec.id;
    const li = c("li", ul);
    const a = c("a", li);
    a.href = "#" + sec.id;
    a.textContent = title;
  }
};
window.addEventListener("load", () => {
  makeNav();

  const cr = (tag, parent) => {
    const c = document.createElement(tag);
    parent.appendChild(c);
    return c;
  }
  const div = cr("div", document.body);
  div.id = "menu_close";
  div.className = "menu-close";
  const div2 = cr("div", document.body);
  div2.id = "menu_button";
  div2.className = "menu-button";
  for (let i = 0; i < 3; i++) {
    cr("span", div2);
  }
  /*
  const html = `<div id="menu_close" class="menu-close"></div>
  <div id="menu_button" class="menu-button"><span></span><span></span><span></span></div>`;
  document.body.innerHTML += html;
  */

  menu_button.onclick = () => {
    if (menu_button.classList.contains("menu-button-open")) {
      menu_close.onclick();
      return;
    }
    menu_button.classList.add("menu-button-open");
    menu_close.classList.add("menu-close-active");
    const nav = document.querySelector("nav");
    nav.classList.add("nav-open");

    const as = nav.querySelectorAll("a");
    // nav.addEventListener("click", () => menu_close.onclick());
    as.forEach(a => {
      a.addEventListener("click", () => {
        menu_close.onclick();
      });
    });
  };
  menu_close.onclick = () => {
    if (!menu_button.classList.contains("menu-button-open")) {
      return;
    }
    menu_button.classList.remove("menu-button-open");
    menu_close.classList.remove("menu-close-active");
    document.querySelector("nav").classList.remove("nav-open");
  };

});

addEventListener("scroll", () => {
  const navi = document.querySelector("nav");
  if (!navi) {
    return;
  }
  // console.log(window.scrollY)
  if (window.scrollY > 200) {
    if (!navi.classList.contains("nav-vertical")) {
      navi.classList.add("nav-visible");
    }
    menu_button.classList.add("menu-button-visible");
  } else {
    if (!navi.classList.contains("nav-vertical")) {
      navi.classList.remove("nav-visible");
    }
    menu_button.classList.remove("menu-button-visible");
  }
});
