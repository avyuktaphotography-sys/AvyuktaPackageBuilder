from pathlib import Path
import json

PROJECT = Path(__file__).parent

FOLDERS = {
    "newborn": "images/newborn",
    "baby3to6": "images/baby3to6",
    "toddlerIndoor": "images/toddlerIndoor",
    "toddlerOutdoor": "images/toddlerOutdoor"
}

EXTENSIONS = {".jpg",".jpeg",".png",".JPG",".JPEG",".PNG"}

theme_data = {}

for key, rel in FOLDERS.items():
    folder = PROJECT / rel
    names = []
    if folder.exists():
        for f in sorted(folder.iterdir()):
            if f.is_file() and f.suffix in EXTENSIONS:
                names.append(f.stem)
    theme_data[key] = names

with open(PROJECT / "themeData.js","w",encoding="utf-8") as fp:
    fp.write("const themeData = ")
    json.dump(theme_data, fp, indent=4)
    fp.write(";")

print("themeData.js generated successfully.")
