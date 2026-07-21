# Real photo sources (optional upgrade)

The site already ships with its own local images in this folder — it
does not need this file to work. This list is only here in case you
want to replace the illustrations with real photographs.

Each row below is a real, free-to-use photo of that park (Creative
Commons licensed, via Wikimedia Commons). To use one:

1. Click the link and open the photo.
2. Right-click the full-size image → "Save image as..."
3. Save it into this `images/` folder using the exact filename shown
   in the second column (this overwrites the illustration with your
   photo automatically, since `js/data.js` already points to that
   filename).

| Park              | Save as                     | Download page |
|--------------------|------------------------------|----------------|
| Serengeti          | images/serengeti.jpg         | https://commons.wikimedia.org/wiki/File:Wildebeest_Migration_in_Serengeti_National_Park,_Tanzania.jpg |
| Ngorongoro Crater  | images/ngorongoro.jpg        | https://commons.wikimedia.org/wiki/File:Ngorongoro_crater_landscape.jpg |
| Tarangire          | images/tarangire.jpg         | https://commons.wikimedia.org/wiki/Category:Tarangire_National_Park (see "Tarangire scenery with baobabs.jpg") |
| Lake Manyara       | images/manyara.jpg           | https://commons.wikimedia.org/wiki/File:Yellow-billed_stork,_Lake_Manyara_National_Park_(28474005572).jpg |
| Mikumi             | images/mikumi.jpg            | https://commons.wikimedia.org/wiki/File:Giraffes_Mikumi_National_Park.jpg |
| Ruaha              | images/ruaha.jpg             | https://commons.wikimedia.org/wiki/File:Ruaha_National_Park_Panorama.jpg |
| Northern Circuit   | images/northern-circuit.jpg  | (combine any of the above, or use your own cover photo) |

After saving a photo, open `js/data.js` and change that package's
`image` and `thumb` values from the `.svg` filename to your new `.jpg`
filename (e.g. `"images/serengeti.jpg"`), or do the same from the
**Photo** field in `admin.html`.

Your own photography will always look more authentic than either of
these options — use this list only as a placeholder until you have it.
