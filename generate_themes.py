import os
import json

BASE_FOLDER = "images"

folders = [
    "newborn",
    "baby3to6",
    "toddlerIndoor",
    "toddlerOutdoor"
]

theme_data = {}

for folder in folders:

    path = os.path.join(BASE_FOLDER, folder)

    if os.path.exists(path):

        files = []

        for file in os.listdir(path):

            if file.lower().endswith(
                (".jpeg", ".jpg", ".png")
            ):

                name = os.path.splitext(file)[0]
                files.append(name)

        files.sort()

        theme_data[folder] = files

with open(
    "themeData.js",
    "w",
    encoding="utf-8"
) as f:

    f.write(
        "const themeData = "
    )

    json.dump(
        theme_data,
        f,
        indent=4
    )

    f.write(";")

print("")
print("================================")
print("Theme list generated successfully")
print("================================")
print("")

for folder in theme_data:
    print(
        folder,
        ":",
        len(theme_data[folder]),
        "themes"
    )