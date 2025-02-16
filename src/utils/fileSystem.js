const fileSystem = {
  " ~": ["Projekti", "Klienti", "Atsauksmes", "Par", "Vakances", "Kontakti"],
  " ~/Projekti": [
    "izveide.lv",
    "labojam.lv",
    "latvija.ai",
    "lieks.lv",
    "omnis.lv",
  ],
  " ~/Projekti/izveide.lv":
    "Pārdošanas lapa, kas veltīta statisko mājaslapu izveidei.",
  " ~/Projekti/labojam.lv":
    "Pārdošanas lapa, veltīta labojumu veikšanai mājaslapās.",
  " ~/Projekti/latvija.ai": "Latvijas labāko mājaslapu katalogs.",
  " ~/Projekti/lieks.lv": "Rīks, kas ļauj viegli publicēt sludinājumus.",
  " ~/Projekti/omnis.lv": "E-pasta mārketinga serviss.",
  " ~/Klienti": [
    "complete4.eu",
    "debesmanna.com",
    "latgaleskongress.lv",
    "propozycii.lv",
    "riga.events",
    "riga.tips",
    "vividtech.eu",
  ],
  " ~/Klienti/complete4.eu":
    "Complete 4 nodarbojas ar produktu izstrādi, līgumražošanu un montāžu. Mēs viņiem izveidojām ātru statisko lapu.",
  " ~/Klienti/debesmanna.com":
    "Debesmanna ir biedrība, kas aktualizē jautājumus par bērnu garīgo veselību. Mēs viņiem izveidojām bezmaksas Wordpress lapu.",
  " ~/Klienti/latgaleskongress.lv":
    "Latgales kongress ir biedrība, kas veicina latgaliešu kultūras attīstību. Mēs viņiem izveidojām Wordpress lapu.",
  " ~/Klienti/propozycii.lv":
    "Propozycii (piedāvājumi) ir vietne, kas apkopo piedāvājumus bēgļiem no Ukrainas.",
  " ~/Klienti/riga.events":
    "Riga.events ir aplikācija, kas apkopo Rīgas kultūras pasākumus un norises.",
  " ~/Klienti/riga.tips":
    "Riga.tips ir vietne, kas sniedz noderīgu informāciju bēgļiem no Baltkrievijas un Ukrainas.",
  " ~/Klienti/vividtech.eu":
    "Vivid Tech ir uzņēmums, kas ražo un pārdo digitālās etiķetes. Mēs viņiem izveidojām statisku mājaslapu un etiķešu veidošanas aplikāciju.",
  " ~/Atsauksmes": [
    "agnese",
    "alise",
    "edgars",
    "ilva",
    "ivars",
    "iveta",
    "juris",
    "māris",
    "raimonds",
    "raivo",
  ],
  " ~/Atsauksmes/agnese": `Pirms nedēļas biju izveidojusi jauno interneta veikalu Mozello, biju izdarījusi tik daudz, cik mācēju un sapratu. Un kā no zilām debesīm, pamanīju piedāvājumu: Novērtēt mājaslapu bezmaksas. Aizpildīju vienkāršu kontaktu formu un jau pavisam drīz saņēmu plašu un konkrētu skaidrojumu ar manas lapas kļūdām un nepilnībām. Par laimi to nebija ļoti daudz, taču dažas no tām, man šķita pārāk sarežģīti pašai izlabot. Jautāju, vai Armands man var palīdzēt, un mēs vienojāmies par abpusēji izdevīgu darījumu. Visas problēmas tika novērstas, lapa izskatās daudz labāk un esmu ārkārtīgi pateicīga par paveikto! 
— Agnese Dubkova, Dzemdību krekls
`,
  " ~/Atsauksmes/alise": `Radoša pieeja klientu problēmu/vajadzību risināšanā. Armands spēj saskatīt iespējas uzlabojumiem un pasniegt kritiku patīkamā veidā. Sadarbojoties un komunicējot, ir liels prieks redzēt patiesu interesi par klienta izaugsmi un sajust personīgu pieeju. Tiešām iesaku aprunāties ar šo uzņēmumu, ja ienākusi prātā kāda ideja projektam vai vēlme izveidot savu pirmo mājaslapu. 
— Alise Andersone, Pindea
`,
  " ~/Atsauksmes/edgars": `Mūsu dzīve palika tik daudz ērtāka, kad sākām sadarboties ar SIA "Sociālais kods". Mūsu mājas lapas apkalpošana notiek tik organiski un ātri, ka mums mājas lapas uzturēšana vairs nerada galvas sāpes. Iesaku jums sadarboties ar Armandu un viņa komandu, un jums atliek vairāk laika savam darbam.
— Edgars Lielausis, Roberts Books
`,
  " ~/Atsauksmes/ilva": `Kopā ar SIA "Sociālais kods" izveidotā web lietotne "riga.events" ir pirmais šāda veida resurss Latvijā. Tā palīdz ērti orientēties Rīgas kultūras un sabiedriskajā dzīvē, ir noderīga gan vietējiem iedzīvotājiem, gan bēgļiem no citām valstīm, kuriem ir grūtības orientēties soctīklu un biļešu tirdzniecības vietņu jūklī. Lietotne nepieciešamības gadījumā var tikt paplašināta uz citām Latvijas pilsētām. Sākot izmantot lietotni, bēgļiem ir iespēja nebūt atstumtiem no kultūras, sporta un sabiedriskām norisēm galvaspilsētā.
— Ilva Everte, Free Belarus
`,
  " ~/Atsauksmes/ivars": `Sadarbību ar Armandu uzsākām pāris gadus atpakaļ un pa šo laiku ir realizēti vairāki projekti. Armands pieiet katram projektam loģiski un racionāli, izvērtējot plānoto arhitektūru un pielietojamos instrumentus. Tehniskie risinājumi tiek izdarīti precīzi kā runāts, tai pat laikā vienmēr var sagaidīt ieteikumus no pieredzes, kas ļoti noder veiksmīgai projekta attīstībai.
— Ivars Mirošnikovs, Vivid Tech
`,
  " ~/Atsauksmes/iveta": `Man bija tas gods sadarboties ar Armandu un viņa komandu biedrības "Debesmanna" mājaslapas izveidošanā. Es teikšu atklāti, zināju, ka ir nepieciešama jauna mājaslapa, bet nezināju, ko īsti vēlos. Ar Armandu tikāmies regulāri, viņš uzklausīja vēlmes, idejas un dalījās arī savā pieredzē par to, kā būtu labāk, ērtāk un lietotājiem draudzīgāk mājaslapu izmantot. Man ir patiess prieks, ka Armands atsaucās manam lūgumam un zinu, ka nevaru vēlēties labāku komandu. Es tiku saredzēta un sadzirdēta, kas man ir svarīgi. Liels paldies Armandam un viņa komandai par lielisko darbu, un no sirds vēlos ieteikt arī jums, ja ir nepieciešama jauna vai uzlabota mājaslapa.
— Iveta Parravani, Debesmanna
`,
  " ~/Atsauksmes/juris": `Galvenais ir pašam izdomāt, ko tieši tajā mājas lapā grib, tālāk jau ar jums visu var sarunāt un uztaisīt.
— Juris Viļums, politiķis
`,
  " ~/Atsauksmes/māris": `Sadarbība ļoti viegla un punktuāla. Ļoti patīk sarunāto termiņu ievērošana. Arī rezultāts atbilst gaidām.
— Māris Grāvis, Biedrība "Rūpju bērns"
`,
  " ~/Atsauksmes/raimonds": `Armands Leimanis ir superīgs web programmētājs, kas pirms kāda laika ir izveidojis savu web programmāšanas firmiņu. Sadarbojoties ar Armandu, man nav neērti uzdot dīvainus jautājumus saistībā ar weblapu programmēšanu, jo es zinu, ka viņš ar visdziļāko sapratni man visu izskaidros "cilvēku" valodā. Pie Armanda var griezties ne tikai lapu vai aplikāciju programmēšanā no nulles, bet arī gadījumos, kad ir jāsalabo vai jāpapildina esošais risinājums. Droši zvaniet, rakstiet, traucējiet viņu! Silti iesaku un rekomendēju.
— Raimonds Platacis, Nonullēšanās
`,
  " ~/Atsauksmes/raivo": `Ātra un efektīva palīdzība IT jautājumos. Profesionāli un nestandarta risinājumi. Attieksme ir ļoti pretimnākoša.
— Raivo Klotiņš, zvērināts advokāts
`,
  " ~/Par": ["uzņēmums"],
  " ~/Par/uzņēmums": `SIA "Sociālais kods" ir 2021. gadā dibināta digitālā aģentūra, kurā šobrīd strādā viens darbinieks — Armands Leimanis. Uzņēmumam ir piešķirts sociālā uzņēmuma statuss, jo tas nodarbina cilvēkus ar garīga rakstura traucējumiem vai invaliditāti.`,
  " ~/Vakances": ["asistents"],
  " ~/Vakances/asistents": `SIA "Sociālais kods" meklē nepilna laika asistentu, kurš/-a varētu palīdzēt ar satura veidošanu un ievietošanu dažādās mājaslapās. Programmēšanas iemaņas nav nepieciešamas, taču tiks uzskatītas par priekšrocību. Darbs noris pilnībā attālināti un darba laiks ir elastīgs. Darba samaksa ir 10 eiro stundā (bruto) un minimālais stundu skaits mēnesī ir 20. Darbu var apvienot ar citu darbu. Svarīgi: Sociālais kods ir sociālais uzņēmums, kas nodarbina cilvēkus ar invaliditāti vai garīga rakstura traucējumiem. Pieteikšanās, rakstot uz kods@socialais.dev`,
  " ~/Kontakti": ["e-pasts", "telefons", "adrese"],
  " ~/Kontakti/e-pasts": "kods@socialais.dev",
  " ~/Kontakti/telefons": "+371 2522 6526",
  " ~/Kontakti/adrese":
    "Čiekurkalna 4. škērslīnija 22A-1, Rīga, Latvija, LV-1026",
};

export default fileSystem;
