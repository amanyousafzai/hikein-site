export type DestinationType = "Lake" | "Peak" | "Hike" | "Meadow";
export type DestinationDifficulty = "Easy" | "Moderate" | "Strenuous" | "Technical";

export interface Destination {
  id: string;
  name: string;
  type: DestinationType;
  location: string;
  region: string;
  elevation: string;
  difficulty: DestinationDifficulty;
  bestSeason: string;
  camping: string;
  explorers: number;
  image: string;
  description: string;
}

const photos = [
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=800&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1662097278265-41a0e01c3a38?w=800&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1602920557530-77191ec76efa?w=800&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1632760306935-c3fca6862dbf?w=800&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1753696252683-8e4d81bbc560?w=800&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1633800820084-501185e69fd4?w=800&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1522075646656-6cc7dc117480?w=800&h=600&fit=crop&auto=format",
];

function destination(
  id: string,
  name: string,
  type: DestinationType,
  location: string,
  region: string,
  elevation: string,
  difficulty: DestinationDifficulty,
  bestSeason: string,
  camping: string,
  explorers: number,
  photo: number,
  description: string,
): Destination {
  return {
    id,
    name,
    type,
    location,
    region,
    elevation,
    difficulty,
    bestSeason,
    camping,
    explorers,
    image: photos[photo % photos.length],
    description,
  };
}

export const destinations: Destination[] = [
  destination("kundol-lake", "Kundol Lake", "Lake", "Utror, Swat, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,600m", "Moderate", "June – September", "Available", 42, 0, "A celebrated alpine lake above Utror, reached through forest, wildflower meadows, and a rugged mountain basin."),
  destination("mahodand-lake", "Mahodand Lake", "Lake", "Kalam, Swat, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "2,884m", "Easy", "May – October", "Available", 78, 1, "A broad turquoise lake beyond Kalam, framed by conifer forest and snow-covered peaks and accessible by four-wheel drive."),
  destination("jahaz-banda", "Jahaz Banda", "Meadow", "Upper Dir, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,100m", "Moderate", "June – September", "Available", 35, 2, "A vast highland meadow above Kumrat where waterfalls, forests, and ridgelines meet beneath an open alpine sky."),
  destination("katora-lake", "Katora Lake", "Lake", "Upper Dir, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,500m", "Strenuous", "July – September", "Limited", 21, 3, "A bowl-shaped glacial lake reached from Jahaz Banda by a steep trail through boulders and high alpine terrain."),
  destination("falak-sar", "Falak Sar", "Peak", "Ushu Valley, Swat, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "5,918m", "Technical", "July – August", "Required", 14, 4, "Swat's highest summit and a serious mountaineering objective above the Ushu and Kalam valleys."),
  destination("nanga-parbat-base", "Nanga Parbat Fairy Meadows Base Camp", "Hike", "Diamer, Gilgit-Baltistan", "Gilgit-Baltistan", "4,200m", "Strenuous", "June – September", "Available", 56, 5, "Pakistan's iconic trek from Fairy Meadows toward the immense north face of Nanga Parbat."),

  // Gilgit-Baltistan lakes
  destination("attabad-lake", "Attabad Lake", "Lake", "Hunza, Gilgit-Baltistan", "Gilgit-Baltistan", "2,559m", "Easy", "April – October", "Available nearby", 188, 7, "A vivid blue lake in upper Hunza, created by the 2010 Attabad landslide and surrounded by steep Karakoram walls."),
  destination("borith-lake", "Borith Lake", "Lake", "Gojal, Hunza, Gilgit-Baltistan", "Gilgit-Baltistan", "2,600m", "Easy", "April – October", "Available nearby", 64, 8, "A saline high-altitude lake near Gulmit and the Ghulkin Glacier, known for migratory birds and quiet walks."),
  destination("rush-lake", "Rush Lake", "Lake", "Nagar, Gilgit-Baltistan", "Gilgit-Baltistan", "4,694m", "Strenuous", "July – September", "Required", 49, 6, "One of the world's highest alpine lakes, reached by a multi-day trek above Hopper Glacier with sweeping Karakoram views."),
  destination("sheosar-lake", "Sheosar Lake", "Lake", "Deosai, Gilgit-Baltistan", "Gilgit-Baltistan", "4,142m", "Easy", "July – September", "Available", 121, 4, "A serene high-altitude lake on the Deosai Plains with distant views of Nanga Parbat on clear days."),
  destination("satpara-lake", "Satpara Lake", "Lake", "Skardu, Gilgit-Baltistan", "Gilgit-Baltistan", "2,636m", "Easy", "April – October", "Available nearby", 145, 7, "A natural lake just outside Skardu that supplies the valley and reflects the surrounding arid mountains."),
  destination("upper-kachura-lake", "Upper Kachura Lake", "Lake", "Skardu, Gilgit-Baltistan", "Gilgit-Baltistan", "2,500m", "Easy", "April – October", "Available nearby", 176, 10, "A clear mountain lake enclosed by apricot orchards and rugged rock, a short walk from Kachura village."),
  destination("lower-kachura-lake", "Lower Kachura Lake", "Lake", "Skardu, Gilgit-Baltistan", "Gilgit-Baltistan", "2,500m", "Easy", "April – October", "Not required", 203, 10, "Also known as Shangrila Lake, this accessible emerald waterbody sits amid orchards and resort grounds."),
  destination("blind-lake", "Blind Lake", "Lake", "Shigar, Gilgit-Baltistan", "Gilgit-Baltistan", "2,600m", "Easy", "April – October", "Available nearby", 88, 7, "A calm freshwater lake between Skardu and Shigar, bordered by dunes, willow trees, and the Shigar River landscape."),
  destination("rama-lake", "Rama Lake", "Lake", "Astore, Gilgit-Baltistan", "Gilgit-Baltistan", "3,507m", "Moderate", "June – September", "Available", 96, 0, "An alpine lake above Rama Meadows with forested approaches and views toward the eastern face of Nanga Parbat."),
  destination("rainbow-lake-domel", "Rainbow Lake Domel", "Lake", "Minimarg, Astore, Gilgit-Baltistan", "Gilgit-Baltistan", "3,200m", "Easy", "June – September", "Available nearby", 52, 1, "A small, exceptionally clear lake at Domel whose colors shift with light, vegetation, and the surrounding mountains."),
  destination("kutwal-lake", "Kutwal Lake", "Lake", "Haramosh, Gilgit-Baltistan", "Gilgit-Baltistan", "3,260m", "Strenuous", "July – September", "Required", 28, 6, "A remote green lake beneath Haramosh Peak, reached on a demanding multi-day trek through Kutwal village and meadows."),
  destination("naltar-blue-lake", "Naltar Blue Lake", "Lake", "Naltar Valley, Gilgit-Baltistan", "Gilgit-Baltistan", "3,050m", "Easy", "May – October", "Available nearby", 118, 7, "The best known of Naltar's colorful lakes, set among pine forest and reached by the valley's jeep track."),
  destination("naltar-bashkiri-lake", "Bashkiri Lake", "Lake", "Naltar Valley, Gilgit-Baltistan", "Gilgit-Baltistan", "3,100m", "Easy", "May – October", "Available nearby", 67, 0, "A tranquil member of the Naltar lake group, surrounded by conifers and open grazing ground."),
  destination("khalti-lake", "Khalti Lake", "Lake", "Gupis-Yasin, Gilgit-Baltistan", "Gilgit-Baltistan", "2,217m", "Easy", "April – October", "Available nearby", 72, 11, "A broad lake beside the Ghizer road, famous for trout, winter ice, and reflections of the surrounding valley."),
  destination("phandar-lake", "Phandar Lake", "Lake", "Ghizer, Gilgit-Baltistan", "Gilgit-Baltistan", "2,670m", "Easy", "April – October", "Available nearby", 103, 7, "A turquoise lake in the pastoral Phandar Valley where the Ghizer River widens beneath poplar-lined villages."),
  destination("handarap-lake", "Handarap Lake", "Lake", "Shandur Valley, Gilgit-Baltistan", "Gilgit-Baltistan", "3,285m", "Moderate", "June – September", "Available", 41, 11, "A long high-altitude lake near Shandur, valued for trout fishing, camping, and quiet mountain scenery."),
  destination("karambar-lake", "Karambar Lake", "Lake", "Ishkoman, Gilgit-Baltistan", "Gilgit-Baltistan", "4,272m", "Strenuous", "July – September", "Required", 32, 5, "A remote, biologically significant lake near the Broghil and Ishkoman highlands, reached by a committing expedition trek."),
  destination("shandur-lake", "Shandur Lake", "Lake", "Shandur Pass, Gilgit-Baltistan", "Gilgit-Baltistan", "3,700m", "Easy", "June – September", "Available", 76, 1, "A high plateau lake close to Shandur Pass and its famous polo ground, surrounded by broad grasslands."),
  destination("kharfaq-lake", "Kharfaq Lake", "Lake", "Ghanche, Gilgit-Baltistan", "Gilgit-Baltistan", "3,950m", "Strenuous", "July – September", "Required", 18, 6, "A secluded glacial lake above Kharfaq village, reached by a steep and little-traveled mountain trail."),
  destination("jarba-zhousho-lake", "Jarba Zhousho Lake", "Lake", "Shigar, Gilgit-Baltistan", "Gilgit-Baltistan", "3,100m", "Easy", "May – October", "Available nearby", 44, 7, "A reflective lake near Shigar, often called the Blind Lake of Shigar and framed by dry Karakoram terrain."),

  // Gilgit-Baltistan treks and hiking destinations
  destination("k2-base-camp", "K2 Base Camp", "Hike", "Central Karakoram, Gilgit-Baltistan", "Gilgit-Baltistan", "5,150m", "Strenuous", "June – August", "Required", 93, 6, "A world-class expedition trek along the Baltoro Glacier to Concordia and the foot of K2."),
  destination("gondogoro-la", "Gondogoro La", "Hike", "Hushe, Gilgit-Baltistan", "Gilgit-Baltistan", "5,585m", "Technical", "June – August", "Required", 47, 5, "A technical glaciated pass linking Concordia with Hushe and offering one of the finest mountain panoramas on Earth."),
  destination("snow-lake", "Snow Lake & Hispar La", "Hike", "Nagar–Shigar, Gilgit-Baltistan", "Gilgit-Baltistan", "5,128m", "Technical", "July – August", "Required", 24, 6, "A major wilderness traverse across the Biafo and Hispar glaciers to the immense Snow Lake ice basin."),
  destination("rakaposhi-base-camp", "Rakaposhi Base Camp", "Hike", "Minapin, Nagar, Gilgit-Baltistan", "Gilgit-Baltistan", "3,500m", "Moderate", "May – October", "Available", 137, 9, "A rewarding trek from Minapin through forest and Tagaphari meadow to the glacier beneath Rakaposhi."),
  destination("patundas-meadows", "Patundas Meadows", "Meadow", "Gojal, Hunza, Gilgit-Baltistan", "Gilgit-Baltistan", "4,200m", "Strenuous", "June – September", "Required", 39, 8, "A high meadow between the Passu and Batura glaciers with commanding views of Shisper, Passu Cones, and the Karakoram."),
  destination("batura-glacier", "Batura Glacier Trek", "Hike", "Gojal, Hunza, Gilgit-Baltistan", "Gilgit-Baltistan", "4,000m", "Strenuous", "June – September", "Required", 61, 9, "A multi-day journey beside one of the world's longest non-polar glaciers through summer settlements and alpine pastures."),
  destination("passu-glacier", "Passu Glacier Viewpoint", "Hike", "Passu, Hunza, Gilgit-Baltistan", "Gilgit-Baltistan", "2,850m", "Moderate", "April – October", "Not required", 109, 9, "A short but rugged hike from Passu to close views of the glacier and the serrated Passu Cathedral."),
  destination("hopper-glacier", "Hopper Glacier", "Hike", "Nagar, Gilgit-Baltistan", "Gilgit-Baltistan", "2,800m", "Moderate", "April – October", "Available nearby", 95, 6, "An accessible glacier hike from Hopper village across dramatic moraine below the peaks of the Hispar Muztagh."),
  destination("ultar-meadows", "Ultar Meadows", "Meadow", "Karimabad, Hunza, Gilgit-Baltistan", "Gilgit-Baltistan", "3,800m", "Strenuous", "June – September", "Available", 73, 8, "A steep climb behind Baltit Fort to a meadow and summer camp beneath Ultar Sar and Ladyfinger Peak."),
  destination("shimshal-pass", "Shimshal Pass Trek", "Hike", "Shimshal, Hunza, Gilgit-Baltistan", "Gilgit-Baltistan", "4,735m", "Strenuous", "July – September", "Required", 29, 9, "A remote Pamir-style trek from Shimshal village to high grazing grounds, lakes, and broad pass country."),
  destination("masherbrum-base-camp", "Masherbrum Base Camp", "Hike", "Hushe, Gilgit-Baltistan", "Gilgit-Baltistan", "4,280m", "Strenuous", "June – September", "Required", 22, 6, "A secluded trek from Hushe through the Aling Valley to the base of the 7,821-metre Masherbrum."),
  destination("rupal-base-camp", "Nanga Parbat Rupal Base Camp", "Hike", "Tarashing, Astore, Gilgit-Baltistan", "Gilgit-Baltistan", "3,600m", "Strenuous", "June – September", "Required", 46, 5, "A trek beneath Nanga Parbat's enormous Rupal Face through Tarashing, glaciers, and high meadow camps."),
  destination("deosai-plains", "Deosai Plains", "Meadow", "Skardu–Astore, Gilgit-Baltistan", "Gilgit-Baltistan", "4,114m", "Easy", "July – September", "Available", 212, 4, "A vast high-altitude plateau of rolling grassland, wildflowers, wildlife, streams, and open walking routes."),
  destination("burji-la", "Burji La Trek", "Hike", "Skardu, Gilgit-Baltistan", "Gilgit-Baltistan", "4,820m", "Strenuous", "July – September", "Required", 31, 6, "A high pass trek from Skardu with exceptional views across the Indus Valley toward the central Karakoram."),
  destination("fairy-meadows", "Fairy Meadows", "Meadow", "Diamer, Gilgit-Baltistan", "Gilgit-Baltistan", "3,300m", "Moderate", "May – October", "Available", 244, 5, "An iconic forest-fringed meadow facing Nanga Parbat, reached by jeep road and a well-used mountain trail."),

  // Khyber Pakhtunkhwa lakes and hikes
  destination("saifullah-lake", "Saifullah Lake", "Lake", "Mahodand, Swat, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,200m", "Moderate", "June – September", "Available", 45, 1, "A quieter alpine lake beyond Mahodand, reached through the upper Ushu Valley by jeep and foot."),
  destination("saidgai-lake", "Saidgai Lake", "Lake", "Swat–Dir border, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,660m", "Strenuous", "July – September", "Required", 26, 0, "A remote lake on the Swat and Dir watershed, approached by long trails through high pastures."),
  destination("daral-lake", "Daral Lake", "Lake", "Bahrain, Swat, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,505m", "Strenuous", "July – September", "Required", 37, 3, "A deep alpine lake above Bahrain reached on a steep trek via Saidgai Pass or Gabina Jabba."),
  destination("bashigram-lake", "Bashigram Lake", "Lake", "Madyan, Swat, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,412m", "Strenuous", "July – September", "Required", 34, 0, "A glacial lake above Bashigram village with a forested approach and a demanding final climb."),
  destination("spin-khwar-lake", "Spin Khwar Lake", "Lake", "Utror, Swat, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,500m", "Strenuous", "July – September", "Required", 19, 3, "A secluded white-stream lake in the Kundol basin, visited on a longer high-country trek from Utror."),
  destination("paristan-lake", "Paristan Lake", "Lake", "Kalam, Swat, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "4,400m", "Technical", "July – September", "Required", 12, 6, "One of Pakistan's highest small alpine lakes, hidden in rugged terrain above the Kalam region."),
  destination("kumrat-valley", "Kumrat Valley", "Hike", "Upper Dir, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "2,500m", "Easy", "May – October", "Available", 198, 3, "A forested valley of the Panjkora River that serves as the gateway to waterfalls, meadows, and high lakes."),
  destination("dojanga-jahaz-banda-trail", "Dojanga to Jahaz Banda Trail", "Hike", "Upper Dir, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,100m", "Moderate", "June – September", "Available", 82, 2, "The classic ascent from the Kumrat side through forest villages to the open Jahaz Banda plateau."),
  destination("chitral-gol", "Chitral Gol National Park", "Hike", "Chitral, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "2,900m", "Moderate", "April – November", "Limited", 71, 3, "A network of mountain trails above Chitral known for markhor habitat, cedar forest, and valley viewpoints."),
  destination("tirich-mir-base-camp", "Tirich Mir Base Camp", "Hike", "Upper Chitral, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "4,000m", "Strenuous", "June – September", "Required", 27, 6, "A multi-day Hindukush trek through the Tirich Valley toward the base of Pakistan's highest peak outside the Himalaya-Karakoram."),
  destination("broghil-pass", "Broghil Pass", "Hike", "Upper Chitral, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,798m", "Strenuous", "July – September", "Required", 20, 11, "An expedition into broad high pastures, wetlands, and Wakhi settlements along Pakistan's remote Afghan frontier."),
  destination("qaqlasht-meadows", "Qaqlasht Meadows", "Meadow", "Upper Chitral, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "2,500m", "Easy", "April – October", "Available nearby", 59, 8, "A wide grassy plateau above Booni with open walks and panoramic views of the Hindukush."),
  destination("mushkpuri-top", "Mushkpuri Top", "Hike", "Nathia Gali, Abbottabad, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "2,800m", "Moderate", "Year-round", "Not required", 231, 3, "A popular forest hike from Dunga Gali or Nathia Gali to a grassy summit with Himalayan foothill views."),
  destination("miranjani-top", "Miranjani Top", "Hike", "Nathia Gali, Abbottabad, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "2,992m", "Moderate", "Year-round", "Not required", 184, 3, "The highest summit in the Galiyat, reached through dense forest from Nathia Gali."),
  destination("ayubia-pipeline-track", "Ayubia Pipeline Track", "Hike", "Dunga Gali–Ayubia, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "2,400m", "Easy", "Year-round", "Not required", 265, 3, "A gentle historic pipeline walk through Ayubia National Park's temperate forest between Dunga Gali and Ayubia."),
  destination("thandiani-ridge", "Thandiani Ridge", "Hike", "Abbottabad, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "2,750m", "Moderate", "March – November", "Available nearby", 86, 2, "Forested ridge walks around the quiet hill station of Thandiani with views over Abbottabad and the Galiyat."),

  // Azad Jammu and Kashmir
  destination("ratti-gali-lake", "Ratti Gali Lake", "Lake", "Neelum Valley, Azad Kashmir", "Azad Kashmir", "3,683m", "Moderate", "July – September", "Available", 158, 0, "A brilliant glacial lake surrounded by flower-filled slopes, reached by jeep and a short trek from Dowarian."),
  destination("chitta-katha-lake", "Chitta Katha Lake", "Lake", "Shounter Valley, Azad Kashmir", "Azad Kashmir", "4,100m", "Strenuous", "July – September", "Required", 72, 3, "A high glacial lake below Hari Parbat, reached by a steep trek from Kel through Shounter Valley."),
  destination("shounter-lake", "Shounter Lake", "Lake", "Shounter Valley, Azad Kashmir", "Azad Kashmir", "3,100m", "Easy", "June – September", "Available", 66, 1, "A small scenic lake on the route between Kel and Shounter Pass, enclosed by green slopes and waterfalls."),
  destination("saral-lake", "Saral Lake", "Lake", "Neelum–Kaghan border, Azad Kashmir", "Azad Kashmir", "4,100m", "Strenuous", "July – September", "Required", 31, 0, "A remote alpine lake near Saral Pass, approached from Sharda or the upper Kaghan side on a multi-day trek."),
  destination("hansraj-lake", "Hansraj Lake", "Lake", "Ratti Gali, Azad Kashmir", "Azad Kashmir", "3,900m", "Strenuous", "July – September", "Required", 18, 3, "A lesser-visited alpine lake in the high country around the Ratti Gali basin."),
  destination("bajosa-lake", "Banjosa Lake", "Lake", "Rawalakot, Azad Kashmir", "Azad Kashmir", "1,981m", "Easy", "Year-round", "Available nearby", 142, 3, "A forest-ringed artificial lake near Rawalakot with gentle walks, picnic grounds, and cool hill weather."),
  destination("arang-kel", "Arang Kel", "Meadow", "Neelum Valley, Azad Kashmir", "Azad Kashmir", "2,554m", "Moderate", "April – October", "Available nearby", 207, 8, "A green mountaintop village and meadow reached from Kel by chairlift and a forest climb."),
  destination("ganga-choti", "Ganga Choti", "Hike", "Bagh, Azad Kashmir", "Azad Kashmir", "3,045m", "Moderate", "April – November", "Available nearby", 113, 2, "A grassy Pir Panjal summit above Sudhan Gali with a straightforward ridge hike and expansive Kashmir views."),
  destination("toli-pir", "Toli Pir", "Meadow", "Rawalakot, Azad Kashmir", "Azad Kashmir", "2,666m", "Easy", "April – November", "Available nearby", 169, 2, "A broad hilltop meadow and ridge system offering accessible walks above Poonch and the surrounding valleys."),
  destination("pir-chinasi", "Pir Chinasi", "Hike", "Muzaffarabad, Azad Kashmir", "Azad Kashmir", "2,900m", "Easy", "March – November", "Available nearby", 154, 4, "A high ridge above Muzaffarabad with short hikes, a shrine, and wide views into the Jhelum and Neelum valleys."),

  // Kaghan, Mansehra and the Himalayan lakes
  destination("saif-ul-muluk", "Lake Saif ul Muluk", "Lake", "Naran, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,224m", "Easy", "June – October", "Available nearby", 310, 1, "Pakistan's best-known alpine lake, set beneath Malika Parbat and reached by jeep or a hike from Naran."),
  destination("lulusar-lake", "Lulusar Lake", "Lake", "Kaghan Valley, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,410m", "Easy", "June – October", "Not required", 174, 11, "The largest natural lake in Kaghan Valley and a headwater of the Kunhar River beside the Babusar road."),
  destination("dudipatsar-lake", "Dudipatsar Lake", "Lake", "Kaghan Valley, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,800m", "Strenuous", "July – September", "Required", 127, 0, "A milk-white alpine lake reached by a long trek from Besal through meadows in Lulusar-Dudipatsar National Park."),
  destination("ansoo-lake", "Ansoo Lake", "Lake", "Kaghan Valley, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "4,245m", "Strenuous", "July – September", "Required", 105, 5, "A tear-shaped high lake reached by a steep route from Saif ul Muluk or the longer Manoor Valley approach."),
  destination("pyala-lake", "Pyala Lake", "Lake", "Jalkhad, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,414m", "Easy", "June – October", "Not required", 73, 1, "A small bowl-shaped lake beside the Kaghan road near Jalkhad, often visited en route to Lulusar."),
  destination("sambaksar-lake", "Sambaksar Lake", "Lake", "Kaghan Valley, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "4,000m", "Strenuous", "July – September", "Required", 24, 0, "A remote lake in the Dudipatsar highlands reached by extending the main national park trek."),
  destination("dharamsar-lake", "Dharamsar Lake", "Lake", "Babusar, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "4,100m", "Moderate", "July – September", "Available", 39, 11, "A quiet alpine lake off the Babusar route, surrounded by rounded highland ridges and grazing country."),
  destination("satsar-mala-lakes", "Satsar Mala Lakes", "Lake", "Kaghan Valley, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,900m", "Strenuous", "July – September", "Required", 21, 0, "A chain of small alpine lakes explored on a remote multi-day route beyond Dudipatsar."),
  destination("makra-peak", "Makra Peak", "Peak", "Shogran, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,885m", "Strenuous", "May – October", "Available nearby", 91, 4, "A prominent Kaghan summit usually climbed from Paye Meadows, with steep upper slopes and broad Himalayan views."),
  destination("siri-paye", "Siri Paye Meadows", "Meadow", "Shogran, Khyber Pakhtunkhwa", "Khyber Pakhtunkhwa", "3,058m", "Easy", "May – October", "Available nearby", 225, 2, "Rolling alpine meadows above Shogran with short ridge walks, grazing horses, and views toward Makra Peak."),

  // Islamabad and Punjab
  destination("trail-3-margalla", "Margalla Trail 3", "Hike", "Islamabad Capital Territory", "Islamabad", "1,050m", "Moderate", "Year-round", "Not available", 342, 3, "Islamabad's classic steep forest trail from F-6 to the Pir Sohawa ridge and Monal area."),
  destination("trail-5-margalla", "Margalla Trail 5", "Hike", "Islamabad Capital Territory", "Islamabad", "1,150m", "Moderate", "Year-round", "Not available", 319, 3, "A shaded Margalla Hills route following a stream before climbing through forest to the main ridge."),
  destination("trail-1-margalla", "Margalla Trail 1", "Hike", "Islamabad Capital Territory", "Islamabad", "1,100m", "Moderate", "October – April", "Not available", 116, 3, "A longer, quieter climb from E-8 toward the western Margalla ridge with city and valley viewpoints."),
  destination("trail-4-margalla", "Margalla Trail 4", "Hike", "Islamabad Capital Territory", "Islamabad", "950m", "Moderate", "Year-round", "Not available", 94, 3, "A connecting forest trail in the central Margallas, often combined with Trails 3 and 5."),
  destination("trail-6-margalla", "Margalla Trail 6", "Hike", "Islamabad Capital Territory", "Islamabad", "1,050m", "Moderate", "October – April", "Not available", 88, 3, "A less crowded route behind Faisal Mosque climbing through the northern forest of Islamabad."),
  destination("bruti-waterfall-trail", "Bruti Waterfall Trail", "Hike", "Margalla Hills, Islamabad", "Islamabad", "760m", "Easy", "July – April", "Not available", 133, 7, "A short rocky walk from Bari Imam toward seasonal pools and waterfalls at the base of the Margallas."),
  destination("panjpeer-rocks", "Panjpeer Rocks", "Hike", "Kahuta, Punjab", "Punjab", "1,800m", "Moderate", "October – May", "Available nearby", 124, 6, "A high rocky plateau above Narar with forest approaches, unusual formations, and views across the Punjab hills."),
  destination("mukshpuri-punjab-view", "Khanaspur–Mushkpuri Traverse", "Hike", "Murree–Galiyat, Punjab", "Punjab", "2,800m", "Moderate", "Year-round", "Not required", 76, 3, "A cross-ridge variation linking the Murree side with the Mushkpuri trail system through cool forest."),
  destination("uchhali-lake", "Uchhali Lake", "Lake", "Soon Valley, Punjab", "Punjab", "765m", "Easy", "October – March", "Not required", 102, 11, "A large saline lake beneath Sakesar in the Soon Valley and an important wintering area for waterbirds."),
  destination("khabikki-lake", "Khabikki Lake", "Lake", "Soon Valley, Punjab", "Punjab", "740m", "Easy", "October – April", "Available nearby", 84, 7, "A scenic saltwater lake in the Soon Valley with low hill walks and birdwatching opportunities."),
  destination("jahlar-lake", "Jahlar Lake", "Lake", "Soon Valley, Punjab", "Punjab", "950m", "Easy", "October – April", "Not required", 46, 11, "A smaller, peaceful wetland in the Soon Valley surrounded by agricultural and low mountain landscapes."),
  destination("sakesar-peak", "Sakesar Peak", "Hike", "Soon Valley, Punjab", "Punjab", "1,522m", "Moderate", "October – April", "Not required", 58, 4, "The highest point in the Salt Range, overlooking Uchhali Lake and the villages of the Soon Valley."),

  // Balochistan and Sindh
  destination("ziarat-juniper-trails", "Ziarat Juniper Trails", "Hike", "Ziarat, Balochistan", "Balochistan", "2,450m", "Moderate", "March – November", "Available nearby", 97, 3, "Walking routes through one of the world's oldest juniper forest ecosystems around Ziarat."),
  destination("chiltan-peak", "Chiltan Peak", "Peak", "Hazarganji Chiltan, Balochistan", "Balochistan", "3,194m", "Strenuous", "October – April", "Required", 36, 6, "A demanding dry-mountain ascent in Hazarganji Chiltan National Park west of Quetta."),
  destination("murdar-mountain", "Murdar Mountain", "Hike", "Quetta, Balochistan", "Balochistan", "3,184m", "Strenuous", "October – April", "Required", 22, 6, "A rugged high ridge east of Quetta with arid terrain, long approaches, and expansive views."),
  destination("hanna-lake", "Hanna Lake", "Lake", "Quetta, Balochistan", "Balochistan", "1,900m", "Easy", "October – April", "Not required", 128, 7, "A historic reservoir near Quetta surrounded by dry hills and short walking routes."),
  destination("moola-chotok", "Moola Chotok", "Hike", "Khuzdar, Balochistan", "Balochistan", "1,200m", "Moderate", "October – April", "Available", 74, 7, "A remote canyon oasis of spring-fed pools and waterfalls reached by rough tracks and gorge walks."),
  destination("hingol-mud-volcanoes", "Hingol Mud Volcanoes", "Hike", "Hingol National Park, Balochistan", "Balochistan", "300m", "Moderate", "October – March", "Not required", 51, 6, "An unusual hike across arid badlands to active mud-volcano formations in Hingol National Park."),
  destination("gorakh-hill", "Gorakh Hill", "Hike", "Kirthar Range, Sindh", "Sindh", "1,734m", "Easy", "October – March", "Available", 119, 4, "A high plateau in the Kirthar Range with cool-season walks, cliffs, and wide desert sunsets."),
  destination("kirthar-national-park", "Kirthar National Park Trails", "Hike", "Jamshoro, Sindh", "Sindh", "1,200m", "Moderate", "October – March", "Required", 43, 6, "Remote desert mountain routes through Pakistan's second-largest national park and Sindh ibex habitat."),
  destination("ranikot-ridge", "Ranikot Fort Ridge", "Hike", "Jamshoro, Sindh", "Sindh", "500m", "Moderate", "October – March", "Not required", 89, 6, "A long archaeological hike along the walls, gates, and ridges of the immense Ranikot Fort complex."),
];
