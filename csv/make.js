import { CSV } from "https://js.sabae.cc/CSV.js";

/*
ID	name	kana	description	URL	Facebook	Instagram	Twitter	image	date
*/
const make = async (fn) => {
  const data = await CSV.fetch(fn);
  console.log(data);
  const list = [];
  let l = null;
  let idx = 1;
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    if (d[0]) {
      l = {};
      list.push(l);
      l.ID = d[0];
      l.name = d[1].trim();
      l.kana = d[2].trim();
      l.description = d[5];
    } else {
      const n = d[4];
      if (n.indexOf("オフィシャル") >= 0) {
        l.URL = d[5];
      } else if (n.indexOf("Facebook") >= 0) {
        l.Facebook = d[5];
      } else if (n.indexOf("Instagram") >= 0) {
        l.Instagram = d[5];
      } else if (n.indexOf("Twitter") >= 0) {
        l.Twitter = d[5];
      }
    }
  }
  //console.log(list);
  return list;
};

const list = [];
(await make("28.csv")).forEach(l => {
  l.date = "2021-08-28";
  list.push(l);
});
(await make("29.csv")).forEach(l => {
  l.date = "2021-08-29";
  list.push(l);
});
console.log(list);
await Deno.writeTextFile("artists.csv", CSV.encode(CSV.fromJSON(list)));
