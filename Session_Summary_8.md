# Session Summary 8 — Project Liturgy (Oct 4, 2026)

A session on the HTML books, the new hub shelf, and plans for a novena and chaplet book.

---

## 1. The shared book engine (in every HTML book)

- **Opens on the cover alone,** like a closed book. Tapping the cover or › opens it; ‹ from the first spread closes it. The counter reads "Cover".
- **One shared cover design.** It is the red Ordo cover: double gold border, ✠ ornaments, gold lettering, a page edge on the right and hinge shading on the left. Each book sets `--board` (leather), `--foil` (lettering) and `--rule` (border). The Ordo keeps these in a `COVER` settings block.
- **Pagination fixes.**
  - A prayer too long for one page continues onto the next page, and headings stay with the text that follows.
  - Lists split item by item and keep their numbering.
  - Parallel rows (`.row`) never split across a page turn.
  - Fixed a bug where text could be duplicated or lost on some screen sizes.
- **Contents-page bug fixed.** My first pagination fix had made the Contents page blank in every book; it is fixed in all of them.
- **Checks run on every book:** desktop, laptop, phone and small phone. Nothing is cut off, and all text appears exactly once.

### Leather colours

| Book | File | Colour |
|---|---|---|
| Ordo | `ordo-2027.html` | `#4a1414` red |
| Common Catholic Prayers | `common-catholic-prayers.html` | `#4c4a2a` olive |
| Holy Rosary | `holy-rosary.html` | `#21324a` navy |
| Divine Mercy Chaplet | `divine-mercy-chaplet.html` | `#6b1d24` crimson |
| Chaplet of St. Gorgonius | `chaplet-of-st-gorgonius.html` | `#3b2a1a` brown |
| Little Office of St. Joseph | `little-office-of-st-joseph.html` | `#1f4a4a` teal |
| Feast of St. Francis 2026 | `feast-of-st-francis-2026.html` | `#5c4a33` habit brown |
| Ordo Missae (hub button only) | `ordo-missae.html` | plum `#6B3B4B` |

---

## 2. The books

**Ordo (`ordo-2027.html`)**
- The prototype shelf is removed and only the book remains.
- The "Pars X, p. N" lines are dropped; the Latin day heading stays.
- The title-page line now reads "Latin & English, with the Office, rank and colour of each day" (my wording).
- A "← Back to the Breviary" link has been added.
- **Open:** Sept–Dec 2027 have no office yet (122 days), because the calendar data ends Aug 31, 2027.

**Holy Rosary**
- Page 6 (the Apostles' Creed) was cut off; fixed by the pagination change.

**Chaplet of St. Gorgonius**
- A stray `__EXTRA__` line was removed from the script.
- **Fr. Szabo has reviewed and approved the chaplet.**

**Divine Mercy Chaplet**
- **Open:** the novena page still says "(Being added next.)". It needs John's Divine Mercy PDF, which is not in the project folder.
- Before it goes in, check where the novena wording comes from. If it is from St. Faustina's *Diary*, that English translation is © the Marian Fathers.

**Common Catholic Prayers (new)**
- Built from `Common_Catholic_Prayers_Latin_English1.pdf`: 10 sections and 35 prayers. Checked word for word; the only words not carried over are the "Latin" and "English" column labels.
- Presentation choices:
  - Latin in plain type and English in italics (the reverse of the PDF).
  - ℣ and ℟ in red.
  - Greek prayers labelled as in the PDF.
  - The Prayer Before a Crucifix and the Te Deum, which broke across pages in the PDF, are joined again.
  - Litany responses in red italics.
  - Running heads shortened to "Common Prayers".
- **Flag:** the source Te Deum jumps from "Pleni sunt caeli…" straight to "In te, Domine, speravi", so most of the hymn is missing. It is kept as printed; John to confirm.

**Little Office of St. Joseph (new)**
- From the *Big Book of Little Offices*, pp. 438–441. Page 441's running head wrongly says "Michael".
- **Sources:** the Latin is from the *Coeleste Palmetum* (1741), transcribed by Michael Martin (Preces Latinae). The English was used in Lasance's *Prayer-Book for Religious* (1904). Both are public domain.
  - I earlier called the English "19th-century" without checking; that was corrected.
  - Preces Latinae claims copyright on its site and allows personal and non-profit use.
- **Corrections, verified before they were made:**
  - *doudennem* → **duodennem**. Another edition prints "Duodennem", and medieval Latin attests *duodennis* ("twelve years old").
  - The Alleluia rubric's English was changed to "**From Septuagesima** until Easter…", with a grey note: *[Corrected to match the Latin; the source has "During Lent until Easter."]*
  - Not changed: *auxit illi* (another edition reads *ille*). Only the 1741 printing can settle it.
- **Structure:**
  - Every Hour is complete on its own pages: opening, hymn, antiphon, Conclusion.
  - Matins adds *Domine, labia*; Compline adds *Converte nos* and ends with the Commendation.
  - **True parallel:** Latin left and English right, row by row.
  - Each Hour starts on a fresh spread and has previous/next Hour links.
  - Labels added: *Hymnus / Hymn* and *Conclusio Horae / Conclusion*.
- Letter-by-letter check against the PDF: exact.

**Feast of St. Francis 2026 (new)**
- Built from the parish program scans of Oct 4, 2026.
- Copyrighted material cannot be reproduced: the USCCB Lectionary, *Make Me a Channel* (© 1967 OCP), the modern altered hymn texts, and Pope Leo XIV's prayer.
- What the book contains:
  - **Readings in the CPDV** under the program's citations.
  - Psalm response taken from CPDV Ps 15(16):5a, and the Acclamation from CPDV Mt 11:25. Both are adaptations.
  - Hymns by title and credit line only.
  - *Now Thank We All Our God* in full, in Winkworth's 1858 original. Verse 2 ends differently from the program.
  - Pope Leo's prayer by title only.
  - The timeline, indulgence steps and thanks rewritten in my own words.
- CPDV source: `scrollmapper/bible_databases` (`formats/json/CPDV.json`) on GitHub.

---

## 3. Hub page (`breviary_lookup.html`): built and ready to post

**Shelf**
- Same look, with each book's button in its cover's leather colour:
  - **On the Shelf:** Ordo
  - **My Prayers:** Common Catholic Prayers, Holy Rosary, Divine Mercy Chaplet, Chaplet of St. Gorgonius, Little Office of St. Joseph
  - **Mass:** Ordo Missae (with Download), Feast of St. Francis 2026
  - **Links:** unchanged (6)
- Removed: the 4 Pars groups (8 volume buttons) and the Altar Server Guide. John's Ordo Missae book already has everything the guide had.

**PDF viewer removed completely**
- The overlay, the split view, the PDF.js module and its CSS.
- The "Or view the PDF" line and the "Pars X · Latin p.N · English p.N" line.
- "This day is found at" relabelled "The Office for this day".

**Current Season fix**
- It no longer names the volume; it now shows the season and the day.

**Tested:** every control works with no errors on desktop and phone, and Read This Hour and Pray Now still open the reader.

**To deploy**
1. Back up the old `breviary_lookup.html`.
2. Copy the 8 files into `C:\LOTH Live Website Current Build`: the hub plus the 7 books.
3. Move these out of the live folder:
   - the 8 volume PDFs
   - `Ordo_2027.pdf`
   - the devotion PDFs
   - `TLM_Altar_Server_Responses_Guide.pdf`
   - `pdfjs/`
   - `pdf_viewer_popup.html`
4. **Check `reader.html` once before deleting `pdfjs/`** (not seen here). The calendar pages do not use it.

---

## 4. Ideas and decisions

- **St. Gorgonius novena (idea).**
  - Timing: Aug 31–Sept 8, so Day 9 falls on the eve of the Sept 9 feast.
  - Sources: the 1942 collect (Bute), the Martyrology for Sept 9, and Eusebius, *Church History* VIII.6.
  - Themes can follow the chaplet: the companions, the martyrdom, forgotten saints.
  - It would go into the Gorgonius book with a "Day N" button.
- **Canon 826 §3:** prayer books for public use need the local bishop's permission. Fr. Szabo can advise whether the site's devotions need more than his approval.
- **Novena and chaplet book: John will compile his own** from the Raccolta and his other books when he has more usage. No existing open book fit what he wants.
  - Public-domain sources:
    - **1910 Raccolta** (Ambrose St John; Latin with facing English): archive.org/details/theraccoltaorcol00unknuoft
    - ***The Path to Heaven*** (1865): archive.org/details/ThePathToHeaven
    - Single pre-1929 novenas on the Internet Archive.
  - **Avoid:** the 1943, 1944 and 1957 Raccolta (© Benziger) and TAN's *30 Favorite Novenas* (1990).
  - The Raccolta's indulgence notes predate 1968 and are no longer current.

---

## 5. Next session

1. Post the hub and books live, if not done yet.
2. **Divine Mercy novena:** upload John's Divine Mercy PDF. Check the source of its wording, then add it three days at a time, with the "Day N" button and a word check.
3. **Novena and chaplet book:** upload the Raccolta and other PDFs, with the devotions and page numbers wanted. Choose a cover colour and title, and a licence for John's own additions (CC0 or CC BY-SA).
4. Optional: the St. Gorgonius novena.
5. Carried over from Summary 7:
   - Martyrology: check the 37 entries and translate the 293.
   - Compile the Commons and saints into the reader.
   - Appendix.
   - Sept–Dec 2027 calendar page (missal scans; due before Aug 31, 2027).
   - Change the `saints_1954.csv` ranks for Canute and Petronilla to `com.`
   - Aug 18 Assumption-octave question.

---

## Working rules (confirmed and added)

- The primary source wins; never invent liturgical text. **Verify before making any correction.**
- Keep John's wording and source wording exactly. Any correction gets a visible note.
- Always edit from the **live** file.
- Copyrighted texts are not reproduced. This includes the Lectionary, modern hymn texts, recent papal prayers, and modern translations of uncertain date. Use public-domain substitutes (CPDV, Douay-Rheims, pre-1929 texts) and say what was substituted.
- Send work in small pieces.
