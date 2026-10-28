"""Inline frappe-ui tokens + ERPNext logo into <name>.src.html -> <name>.html (default: storyboard)."""
import sys
from pathlib import Path
name = sys.argv[1] if len(sys.argv) > 1 else "storyboard"
here = Path(__file__).parent
g = here.parent.parent / "graphics"
src = (here / f"{name}.src.html").read_text()
tok = (g / "theme/tokens.css").read_text().replace('[data-theme="light"]', ":root[data-sb-light], [data-sb-light]").replace('[data-theme="dark"]', "[data-sb-dark]")
logo = (g / "assets/img/erpnext-logo.svg").read_text().replace('width="101" height="100"', 'width="100%" height="100%"')
(here / f"{name}.html").write_text(src.replace("/*TOKENS*/", tok).replace("/*ERPLOGO*/", logo))
