(()=>{"use strict";console.log(localStorage);class e{constructor(e,t){this.name=e,this.items=[],this.items.push(t)}addItem(e){this.items.push(e)}getItems(){return this.items}}class t{constructor(e,t){this.name=e,this.note=t}}class o{constructor(e,t){this.name=e,this.wardrobe=t}}localStorage.clear();const a=new class{save(e){localStorage.setItem(e.name,JSON.stringify(e))}load(){const e=document.getElementById("1");for(let t=0;t<localStorage.length;t++){const o=document.createElement("div"),a=Object.assign(JSON.parse(localStorage.getItem(localStorage.key(t))));o.textContent=` Hiker: ${a.name} clothing: ${a.wardrobe.name}`;for(let e=0;e<a.wardrobe.items.length;e++)o.textContent+=`details: ${a.wardrobe.items[e].name}: ${a.wardrobe.items[e].note} `;e.appendChild(o)}}},s=new o("Santi",new e("TOP",new t("Decathlon cazzo","convertible to mazzo")));console.log(s),s.wardrobe.addItem(new t("Decathlon Shirt","4 pairs")),a.save(s);const n=new o("Ennio",new e("BOTTOM",new t("Decathlon Trousers","convertible to short")));n.wardrobe.addItem(new t("belt","adjustable")),n.wardrobe.addItem(new t("underwear","3 pairs")),a.save(n),a.load()})();