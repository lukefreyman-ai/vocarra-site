# vocarra-site

The one-page site for Vocarra, served by GitHub Pages at https://vocarra.co.

Plain static HTML and CSS. No framework, no build step, no JavaScript.
Edit the files and push; Pages redeploys.

| File | What it is |
|---|---|
| `index.html` | the page |
| `style.css` | the whole stylesheet |
| `404.html` | matching not-found page |
| `assets/mark.svg` | the V mark, vector. Do not regenerate it with AI |
| `assets/og.png` | 1200x630 share card, built from the mark |
| `assets/favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` | icons |
| `CNAME` | custom domain for Pages |

## The mark

`assets/mark.svg` is the traced vector of the final logo: two vocal folds
meeting in a V, bone `#EEE8DB` on black `#000000`. It came out of the
clip-factory `brand/logo/` set, with the c2pa metadata stripped and path
coordinates rounded to whole units (measured max difference of 4/255 per
pixel against the original at 1024px, no pixel differing by more than 8).

Never run the mark through an image model. Past AI passes added texture
and soft edges that are not wanted. The small icons are deliberately a
bolder, simplified silhouette, because the engraved contour lines fill in
below about 64px.

## Palette and type

Black `#000000`, bone `#EEE8DB`, quiet `#96928A` (6.3:1 on black).
Type is the system grotesk stack led by Helvetica Neue, weight 300.
No gradients, blur, grain, glow or soft edges anywhere.
