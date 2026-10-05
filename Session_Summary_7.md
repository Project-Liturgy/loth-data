# Session Summary 7 — Project Liturgy (Oct 3–4, 2026)

A long session covering: the last Breviary English gaps, the full Latin check against the 1942 books, text-plan items 1–6, a calendar-engine prototype, the calendar card on the live site, the dev blog on GitHub, the Martyrology, and the redesign of the site's "bookshelf" into HTML books.

---

## 1. Breviary English fills (`english_fill.json`, now 45 fills)

Order of preference for English: **Bute (1879) → DO's Bute-style English → 1916 Baltimore (Martyrology only) → new translation in Bute's style, marked "adapted".**

### Commons (Bute vol. 1, word for word)
- C5 "in 2 loco" L4–6 (Gregory, Moralia); C6 "in 2 loco" L4–6 (Cyprian); C4a L5–6 (the Hyades)
- C2 "in 2 loco" L4–6 (Ambrose on Ps. 118); C3 "in 2 loco" L4–6 (Chrysostom)
- C4 "in 2 loco" L4–6 (Maximus of Turin) and L9 (Hilary): Bute **does** have these (Summary 6 was wrong)

### Versicles and collects
- C1 versicle (Bute's Ps. 60), C8 versicle (Bute's Ps. 25)
- C2/C6 "Versum 0": **"Blessed N., pray for us. / That we may be made worthy of the promises of Christ."** (Bute's exact form, found at St. Elizabeth/Isabel, July 8)
- Adapted collects: C2a "Oratio altera", C3 "Oratio 3" (modelled on Bute's St. Agnes collect), C5c (plural of the C5 collect)
- Proper saints' versicles: May 8, June 29, Sept 14, Sept 15 (Bute exact); July 22, Aug 6, Oct 2, Nov 1, Nov 30 (adapted); Mar 25 (Bute's Advent "Send forth the Lamb"); July 16 Ant 1 (C11 antiphon, "Feast-day" → "solemn Commemoration")
- Movable feasts: Holy Name (Bute's Ps. 112), Holy Family, Christ the King versicle and First Vespers responsory (adapted, AV wording)
- Our Lady on Saturday: C10 Responsory 2 (English split around the Gloria, as the Latin is)
- Office of the Dead: **"Fidelium, Deus" replaced with Bute's version** (DO's was modern-style "Your servants")
- Little Office, Advent (C12A): the commemoration of the saints (collect adapted: "with all His Saints" added per the Latin) and the antiphon "The angel of the Lord announced unto Mary"
- Epiphany octave Sunday: "Worship God. / All ye His Angels." (Bute)

### Corrections to Summary 6
- The "dropped words" to be bracketed (C5, C6) were **not** missing from Bute. They were letters lost in the old column split.
- **False gaps:** C3a-1 L7–9, C2a L7–9, C4-1 L9, C5 "in 3 loco" (English exists via references).

### Supporting files
- `versum0_names.json`: English names (Bute spellings: Lawrence, Cecily, Theresa, Katharine, Nicolas…) for the 22 saints using "Blessed N., pray for us". **DO error:** Oct 8 (St. Bridget) gives "Vincénti"; the Latin should be "Birgítta".
- `commons.html` re-patched: **136 of 184** notes filled (130 from fills, 6 from DO saint files). The 48 left are the C7/C8 alternate lessons (skipped on purpose).
- `do_tempora_added.zip`: DO Tempora files fetched from GitHub (Epi1-0, Pasc2-3, Adv4-5/6, Pent15-0…6, Nat2-0). Later also fetched Adv1-0, Adv1-1, Epi1-0a (not zipped; re-fetch if needed).

---

## 2. Saints data fixes (`saints_texts.json`)

- **St. Angela Merici (May 31):** had been matched to Petronilla's file; re-pulled from DO 06-01 (her post-1955 date).
- **St. Canute (Jan 19)** and **St. Petronilla (May 31):** in 1942/1954 only commemorations (no lessons). Lessons removed.
  → **Action for John: in `saints_1954.csv` change both ranks to `com.`**
- **Octave days Jan 2–4:** replaced DO's old 9-lesson form with the Divino Afflatu form (lessons i–ii from Romans; lesson iii = sermon extract, DO "Lectio93").
- **St. Denis (Oct 9):** commemorated in St. John Leonardi; single 9th lesson; English cut from Bute's three lessons.
- **St. George (Apr 23):** DO "Lectio94" (English in the Latin field) removed; 1942: "Pro hoc Festo simplificato, non dicitur ix Lectio".
- **Vigil of Sts. Peter & Paul (June 28):** lessons 2–3 kept (for years when the Vigil is the office); note added.
- **Assumption (Aug 15):** DO 08-15 is the correct **1950 office** for 1954.

---

## 3. Latin check against the four 1942 volumes

- All four volumes are single files: `BrevRom1942Hiem…part_1`, `Verna…part_2`, `Aest…part_3`, `Autu…part_4`.
- Method: each PDF page is a two-page spread with an imperfect OCR layer → re-extracted column by column (gutter detection), OCR digits normalised (6→o, f→í…), collect conclusions and Gloria Patri ignored, antiphon lists scored one by one, wider window for interleaved columns.
- **Result: 3,095 saint sections.** Everything under 80% is explained in `Latin_Check_Saints_1942.xlsx` (short texts and OCR, DO Cistercian/1960 variants, All Souls, the 1950 Assumption). Checked by eye and identical: Gorgonius collect, Transfiguration hymn, Vincent de Paul collect.
- Paschaltide Commons: 36 of 38 sections ≥80% (the rest OCR).
- Verna part 2 also settled Petronilla; Hiemalis part 1 settled Canute.

---

## 4. Text Completion Plan, items done

| Item | Result |
|---|---|
| 2. Movable feasts | Holy Name, Holy Family, St. Joseph's Solemnity, Christ the King complete (4 fills) |
| 3. Missing weekdays | No missing text. Advent W4 Fri/Sat complete; Week 15 after Pentecost = Sunday collect + monthly Scripture (an engine matter) |
| 4. Our Lady on Saturday | Complete; Latin 88–100% vs 1942; 1 fill |
| 5. Office of the Dead + All Souls | Complete; Fidelium collect → Bute |
| 6. Little Office | Complete; 2 Advent fills from Bute |
| 1. Octave days | Complete for 1954 (Epiphany, John Baptist, Peter & Paul, Assumption, All Saints, Immaculate Conception). Lawrence and Nativity BVM have simple octaves (no days within). |

**Open question:** Aug 18 (day within the Assumption octave). DO's lessons match 1942, but the 1950 reform may have changed them. Needs a breviary printed 1950–54.

**Remaining text items:** Martyrology (in progress), Appendix, local feasts (optional), **compile** (turns the "Common of Saints and Feast Days" chip green).
**Loose ends:** C4c plural Maximus lessons; apply the 22 English names at compile; the two CSV ranks.

---

## 5. Calendar engine prototype (`engine.py`)

- Python, stages 1–2: temporal cycle (computus), saints with 1954 ranks (from `Saints_Text_Report.xlsx`), occurrence, transfers of I/II class feasts, octaves (simplified), commemorations, Our Lady on Saturday, leap-year shift (Matthias Feb 25), All Souls on Sunday → Nov 3.
- Outputs `engine_YYYY.csv`; path-independent (reads the xlsx from its own folder).
- **Correction:** under 1954 rules the Immaculate Conception on Advent Sunday II is **kept on Sunday** (the Monday transfer is a 1960 rule).
- **Not built:** Vespers concurrence, 9th lessons, Greater Litany, full vigils/Ember days.
- **Important:** this is for the **Breviary reader**. John's **calendar API** is a separate project that he writes himself in **Node.js** from his own sources; the Python engine can serve only as an answer key.
- Next real test: compare day by day with the **Gniezno Ordo 1954**.

---

## 6. Calendar card + big calendars (LIVE)

- Big calendar pages, each patched to open at a date:
  - `calendar_combo_1954_modern_v4.html` (Sept 23–Dec 31, 2026; the finished version, replacing the old `…_readings.html`)
  - `calendar_combo_1954_modern_jan-apr_2027.html`
  - `calendar_combo_1954_modern_may-aug_2027.html`
- Link formats: `#2027-06-29` = 1954 details · `#2027-06-29/modern` = modern details · `#2027-06-29/day` = just the day.
- `calendar_mini.js`: 343 days (Sept 23, 2026–Aug 31, 2027), with `CAL_PAGES` mapping each day to its page. **Data ends Aug 31, 2027**: the Sept–Dec 2027 page (which needs the missal scans) is due before then.
- "Today on the Calendar" card in `breviary_lookup.html`: styled like the readings card; separate 1954 and Modern links; modern readings in the readings-card style (bold-italic labels). **The USCCB "Today's Mass Readings" box was removed.**
- Live folder: `C:\LOTH Live Website Current Build`. API working folder: `C:\API That I Make\1954 Calendar API`.
- **Incident:** the Project's copy of `breviary_lookup.html` was stale; using it removed the Ordo Missae, St. Carlo and dev blog links from the live page. Fixed by merging the card into John's real live file.
  **Rule going forward: always work from the live file, and keep the Project copy updated.**
- Notes: the missal scans give **modern Sunday page numbers** and the 1954 readings for the calendar pages; the modern reading text is from the **CPDV**. The big calendar is maxed out on mobile, so **no extra text on it** (explain it via a dev blog post or an invisible page description).

---

## 7. Dev blog (LIVE once deployed)

- Posts live on GitHub: **`Project-Liturgy/loth-dev-blog`**, file `dev-blog-posts.json` (public repo; only John can edit; turn on 2FA).
- `dev-blog.html` (live) is read-only and fetches the posts from GitHub; the "Draft a new update" panel was removed; date-display bug fixed (no more showing the day before).
- `dev-blog-editor.html`: **PC only**. Write a post → Copy whole file → Open on GitHub → Ctrl+A, Ctrl+V → Commit. Live within ~5 minutes, **no Netlify deploy needed**.
- The lookup page "New dev update" banner and the **homepage chip** ("Dev Blog — Latest: [title] (date)") read the same file.
- RSS: skipped (nobody uses it).

---

## 8. Homepage (`index.html`)

- Dev Blog chip is live (green), links to the blog, shows the latest post.
- **"True HTML Embedded Text in True Parallel" marked Complete** (green); Breviary card text updated.

---

## 9. Martyrology (in progress)

- Latin: DO `Latin/Martyrologium` (**pre-1955 edition**: keeps octaves, Sts. Philip & James on May 1). The `1955R` edition (St. Joseph the Worker, octaves removed) is **not** used.
- English sources: **Bute** (DO English) and the **1916 Baltimore *Roman Martyrology*** (John Murphy Co., from the 1914 Roman edition; public domain), `romanmartyrology00cathuoft.pdf`.
- Pairing: name-matching with spelling normalisation, ±days for moved entries, continuation lines joined; the 1916 book's day-sections aligned by content; matches only within the same day, with the saint's name required near the start; OCR cleaned; no English used twice.
- **Result (3,232 Latin entries):** Bute 2,724 (84%) · 1916 confident 178 · 1916 to check 37 · **needs English 293** (mostly saints added after 1914: Maria Goretti, Pius X, More, Fisher, Thérèse, Don Bosco…).
- Movable entries: all have English (St. Joseph's Solemnity octave translated).
- Files: `martyrology_1954.json`, `Martyrology_Pairing.xlsx` (sheets: Needs English, 1916 to check, All entries), `martyrology_mobile_la.txt` / `_en.txt`.
- Not checkable against the 1942 Breviary (separate book).

---

## 10. Site redesign decisions

- **The bookshelf goes.** The spine shelf prototype was "too much"; the eight volume PDFs come off the site.
- **The ONLY public download is the Ordo Missae.** Everything else is either an HTML book (readable, no download) or off the site.
- **Move out of the live folder** (truly private; also ~80 MB lighter): the 8 volume PDFs, `Ordo_2027.pdf`, and the 5 devotion PDFs. John shares files personally.
- **Ordo as an HTML book:** prototype `ordo_shelf_prototype.html`. John loved the book: cover, title page, Ante/Post Divinum Officium prayers, month index, red illuminated initials, Ordo-style ranks and colours, running heads, page numbers, two-page spreads (one on mobile), Today, search, links to reader and calendar. With the PDFs gone, the "Pars X, p. N" lines should be dropped. Ideally generated from the calendar data.
- **Devotions as HTML books** (shared engine; wording kept exactly as John wrote it; each verified word by word against its PDF):

| Book | File | Status |
|---|---|---|
| Chaplet of St. Gorgonius | `chaplet-of-st-gorgonius.html` | ✅ Done (bead markers, 3+9+1 bead map) |
| Holy Rosary | `holy-rosary.html` | ✅ Done ("Today: the … Mysteries", decades drawn) |
| Divine Mercy Chaplet | `divine-mercy-chaplet.html` | 🟡 Preview: steps, diagram (tap to enlarge), all prayers. **Novena (9 days) still to add**, plus the "Day N of the Novena" button and verification |
| Common Prayers | — | Not started (14 pp.) |
| Altar Server Guide | — | Not started (5 pp.) |

- Engine fixes made: running head now names what the page starts with; bead map on one line.

---

## 11. Next session

**Upload:** `divine-mercy-chaplet.html` and `holy-rosary.html` (the book engine is inside them). The devotion PDFs are already in the project folder.

**Order of work:**
1. Finish Divine Mercy: the novena **three days at a time**, the novena "today" button, the word check.
2. Common Prayers, then the Altar Server Guide.
3. Ordo HTML book: drop volume/page lines; finalise.
4. Simplify `breviary_lookup.html` (remove the shelf and PDF links, link the HTML books); move the PDFs out of the live folder.
5. Martyrology: check the 37, translate the 293 a few months at a time (upload `martyrology_1954.json` + the 1916 PDF).
6. Later: compile the Commons/saints into the reader; Appendix; Sept–Dec 2027 calendar page (missal scans).

**Working rules confirmed this session:**
- The Ordo/primary source wins; never invent liturgical text.
- Keep John's own wording exactly in his compositions.
- Always edit from the **live** file, not the Project copy.
- Send work in small pieces (long single payloads have been arriving empty).
