"""Build gallery.html: every badge inlined, previewed on GitHub's real grounds."""

import html
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from build_badges import HERE, OUT, SHAPES, THEMES, tk  # noqa: E402

NOTES = {
    "split": "Label / value halves, shields.io lineage",
    "pill-dot": "Status-dot pill",
    "brackets": "Square-bracket frame",
    "ticket": "Perforated stub with notches",
    "arrow": "Tag with a pointed tail",
    "marker": "Skewed highlighter behind the name",
    "terminal": "Shell prompt with a block cursor",
    "stamp": "Double-rule tracked caps",
    "slant": "Diagonal split",
    "monogram": "Round B mark",
    "code": "Code glyph and divider",
    "stacked": "Two-line lockup, outbound arrow",
    "crop": "Crop-mark corners",
    "stripe": "Hatched swatch",
}

CSS = """
:root{
  --ink:%(g950)s; --ink-2:%(g600)s; --ink-3:%(g500)s; --rule:%(g200)s;
  --page:%(g50)s; --panel:%(white)s; --accent:%(v500)s; --accent-ink:%(v600)s;
  --gh:#ffffff; --gh-rule:#d1d9e0;
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --ink:%(g50)s; --ink-2:%(g400)s; --ink-3:%(g500)s; --rule:%(g800)s;
    --page:%(g950)s; --panel:%(g900)s; --accent-ink:%(v400)s;
    --gh:#0d1117; --gh-rule:#3d444d;
  }
}
:root[data-theme="dark"]{
  --ink:%(g50)s; --ink-2:%(g400)s; --ink-3:%(g500)s; --rule:%(g800)s;
  --page:%(g950)s; --panel:%(g900)s; --accent-ink:%(v400)s;
  --gh:#0d1117; --gh-rule:#3d444d;
}
body[data-ground="light"]{--gh:#ffffff; --gh-rule:#d1d9e0;}
body[data-ground="dark"]{--gh:#0d1117; --gh-rule:#3d444d;}
*{box-sizing:border-box}
body{margin:0;background:var(--page);color:var(--ink);
  font:14px/1.5 "Inter",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  padding-inline:clamp(16px,4vw,48px);padding-block:40px 64px}
.wrap{max-width:1180px;margin:0 auto}
header{display:flex;flex-wrap:wrap;gap:20px 40px;align-items:end;justify-content:space-between;
  padding-bottom:24px;border-bottom:1px solid var(--rule)}
h1{margin:0;font-size:28px;line-height:1.15;font-weight:650;letter-spacing:-0.02em;text-wrap:balance}
.lede{margin:8px 0 0;color:var(--ink-2);max-width:62ch}
.spec{display:flex;flex-wrap:wrap;gap:6px 18px;margin:14px 0 0;padding:0;list-style:none;
  color:var(--ink-3);font-size:12px;font-variant-numeric:tabular-nums}
.spec b{color:var(--ink-2);font-weight:550}
.controls{display:flex;flex-direction:column;gap:6px}
.controls span{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-3)}
.seg{display:inline-flex;border:1px solid var(--rule);border-radius:8px;padding:3px;background:var(--panel)}
.seg button{font:inherit;font-size:13px;border:0;background:none;color:var(--ink-2);
  padding:5px 12px;border-radius:5px;cursor:pointer}
.seg button[aria-pressed="true"]{background:var(--ink);color:var(--page)}
.seg button:focus-visible,.cell:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.head,.row{display:grid;grid-template-columns:200px repeat(4,minmax(0,1fr));gap:12px;align-items:center}
.head{padding:20px 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-3)}
.row{padding:10px 0;border-bottom:1px solid var(--rule)}
.name{display:flex;flex-direction:column}
.name code{font:600 13px/1.3 ui-monospace,"SF Mono",Menlo,monospace;color:var(--ink)}
.name small{color:var(--ink-3);font-size:12px}
.cell{all:unset;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:8px;
  padding:16px 8px 10px;border-radius:8px;background:var(--gh);border:1px solid var(--gh-rule);cursor:pointer;min-width:0}
.cell svg{display:block;max-width:100%%;height:42px;width:auto}
.cell .file{font:11px/1 ui-monospace,"SF Mono",Menlo,monospace;color:#8b949e;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%%}
.cell.copied .file{color:var(--accent)}
.use{margin-top:36px;display:grid;gap:8px;max-width:760px}
.use h2{margin:0;font-size:15px;font-weight:600}
.use p{margin:0;color:var(--ink-2)}
pre{margin:0;overflow-x:auto;background:var(--panel);border:1px solid var(--rule);border-radius:8px;
  padding:12px 14px;font:12.5px/1.6 ui-monospace,"SF Mono",Menlo,monospace;color:var(--ink)}
pre .k{color:var(--accent-ink)}
@media (max-width:760px){
  .head{display:none}
  .row{grid-template-columns:repeat(2,minmax(0,1fr))}
  .name{grid-column:1/-1}
}
"""

JS = """
const body=document.body, buttons=document.querySelectorAll('.seg button');
buttons.forEach(b=>b.addEventListener('click',()=>{
  body.dataset.ground=b.dataset.ground;
  buttons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
}));
document.querySelectorAll('.cell').forEach(c=>c.addEventListener('click',async()=>{
  const snippet='[![Built at BWH](badges/'+c.dataset.file+')](https://buildwithhussain.com)';
  const label=c.querySelector('.file'), original=label.textContent;
  try{await navigator.clipboard.writeText(snippet);label.textContent='Copied markdown';}
  catch{label.textContent=c.dataset.file;}
  c.classList.add('copied');
  setTimeout(()=>{label.textContent=original;c.classList.remove('copied');},1400);
}));
"""


def main():
    colors = {k: tk(v) for k, v in dict(
        g50="gray-50", g200="gray-200", g400="gray-400", g500="gray-500", g600="gray-600",
        g800="gray-800", g900="gray-900", g950="gray-950", white="surface-base",
        v400="green-400", v500="green-500", v600="green-600").items()}
    themes = list(THEMES)
    rows = []
    for shape in SHAPES:
        cells = []
        for theme in themes:
            file = f"{shape}-{theme}.svg"
            markup = (OUT / file).read_text().strip().replace("<title>Built at BWH</title>", "")
            cells.append(f'<button class="cell" data-file="{file}" aria-label="Copy markdown for {file}">'
                         f'{markup}<span class="file">{file}</span></button>')
        rows.append(f'<div class="row"><div class="name"><code>{shape}</code>'
                    f'<small>{html.escape(NOTES[shape])}</small></div>{"".join(cells)}</div>')

    page = f"""<title>BWH Badge Sheet</title>
<style>{CSS % colors}</style>
<div class="wrap">
<header>
  <div>
    <h1>built at BWH — 56 badges</h1>
    <p class="lede">Fourteen shapes in four treatments. Every badge is a standalone SVG with Inter outlined to paths,
    so it renders identically in a GitHub README, where web fonts never load.</p>
    <ul class="spec">
      <li><b>Height</b> 28px</li><li><b>Type</b> Inter 500 / 700, 11.5px, kerned</li>
      <li><b>Accent</b> green-500</li><li><b>Neutrals</b> frappe-ui gray</li>
    </ul>
  </div>
  <div class="controls"><span>Preview on</span>
    <div class="seg" role="group" aria-label="Preview ground">
      <button type="button" id="g-light" data-ground="light" aria-pressed="false">GitHub light</button>
      <button type="button" id="g-dark" data-ground="dark" aria-pressed="false">GitHub dark</button>
    </div>
  </div>
</header>
<div class="head"><span>Shape</span>{"".join(f"<span>{t}</span>" for t in themes)}</div>
{"".join(rows)}
<section class="use">
  <h2>Use in a README</h2>
  <p>Click any badge to copy its markdown. Commit the SVG under <code>badges/</code>, or point at a hosted copy.</p>
  <pre><span class="k">[![Built at BWH]</span>(badges/split-dark.svg)<span class="k">]</span>(https://buildwithhussain.com)</pre>
</section>
</div>
<script>{JS}</script>
"""
    (HERE / "gallery.html").write_text(page)
    print("wrote gallery.html")


if __name__ == "__main__":
    main()
