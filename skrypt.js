function dopasujCzcionke(el)
{
	if (el instanceof Event)
		el = this;

	if (!el.offsetHeight)
		return;
	
	while(el.scrollHeight == el.offsetHeight)
	{
		el.style.fontSize = parseInt(window.getComputedStyle(el).fontSize) + 1 + "px";
	}

	while(el.scrollHeight > el.offsetHeight)
	{
		el.style.fontSize = parseInt(window.getComputedStyle(el).fontSize) - 1 + "px";
	}

	let p = 0;
	let tekst = el.querySelector(".tekst");

	while(el.scrollHeight == el.offsetHeight)
	{
		p++;
		tekst.style.paddingTop = `calc(${p}px)`;
	}

	tekst.style.paddingTop = `calc(${Math.floor(p / 2)}px)`;
}

let css = document.createElement("style");
document.head.append(css);

//let punkty = [];
let pole1 = "";
let pole2 = "";

for (let i = -90; i <= 90; i++)
{
	let x = Math.cos(i / 180 * Math.PI),
		y = (Math.sin(i / 180 * Math.PI) + 1) / 2;

		pole1 += `${Math.round((1 - x) * 100000) / 1000}% ${Math.round(y * 100000) / 1000}%,`;
		pole2 += `${Math.round(x       * 100000) / 1000}% ${Math.round(y * 100000) / 1000}%,`;
}
pole1 = pole1.slice(0, -1);
pole2 = pole2.slice(0, -1);

css.innerHTML = `
:root
{
	--pole1: polygon(  0% 0%, ${pole1},   0% 100%);
	--pole2: polygon(100% 0%, ${pole2}, 100% 100%);
}
`;

dopasujCzcionke(document.querySelector(".kontener"));

new ResizeObserver((e) =>
{
	dopasujCzcionke(e[0].target);
}).observe(document.querySelector(".kontener"));

document.querySelector("textarea").oninput = function()
{
	let tekst = this.value;
	tekst = tekst.replace(/&/gm, "&amp;")
					.replace(/</gm, "&lt;")
					.replace(/>/gm, "&gt;")

					.replace(/\n/gm, "<br>")

					.replace(/\[b\]/gm, "<b>")
					.replace(/\[\/b\]/gm, "</b>")

					.replace(/\[i\]/gm, "<i>")
					.replace(/\[\/i\]/gm, "</i>")

					.replace(/\[u\]/gm, "<span style='text-decoration: underline;'>")
					.replace(/\[\/u\]/gm, "</span>")

					.replace(/\[c=(.*?)\]/gm, "<span style='color: $1'>")
					.replace(/\[\/c\]/gm, "</span>");

	document.querySelector(".kontener .tekst").innerHTML = tekst;
	
	if (tekst)
		dopasujCzcionke(document.querySelector(".kontener"));
}