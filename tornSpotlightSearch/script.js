// ==UserScript==
// @name         Torn Spotlight Search
// @namespace    http://tampermonkey.net/
// @version      beta-2.5.1
// @description  Navigate Torn Faster
// @author       Jayam Patel
// @match        https://www.torn.com/*
// @match        https://yata.yt/*
// @icon         https://raw.githubusercontent.com/jayam04/torn-scripts/master/tornSpotlightSearch/icon.png
// @license      Apache License 2.0
// @grant        none
// @require      https://raw.githubusercontent.com/jayam04/torn-scripts/master/tornUIElements/script.js
// ==/UserScript==

// Default Settings
const DEFAULT_MAIN_SPOTLIGHT_KEY_COMBINATION = "Ctrl+Shift+K";
const DEFAULT_MARKET_KEY_COMBINATION = "Ctrl+M";
const SETTINGS_PAGE = "/spotlight-settings.php";

// Key Combinations
const storedSpotlightTrigger = loadSetting(
  "spotlightTrigger",
  DEFAULT_MAIN_SPOTLIGHT_KEY_COMBINATION,
);
const [mainKey, ...modifiers] = storedSpotlightTrigger.split("+").reverse();
const pressControlKey = modifiers.includes("Ctrl");
const pressAltKey = modifiers.includes("Alt");
const pressShiftKey = modifiers.includes("Shift");

// Define your dictionary of keys and URLs
let urlDictionary = {
  Home: "https://www.torn.com",
  Wiki: "https://www.torn.com/wiki",
  Rules: "https://www.torn.com/rules.php",
  Forums: "https://www.torn.com/forums.php",
  Discord: "https://www.torn.com/discord",
  Staff: "https://www.torn.com/staff.php",
  Credits: "https://www.torn.com/credits.php",
  Settings: "https://www.torn.com/preferences.php",
  Logout: "https://www.torn.com/logout.php",
  Merits: "https://www.torn.com/awards.php#/merits",
  Education: "https://www.torn.com/page.php?sid=education",
  "Loan Shark": "https://www.torn.com/loan.php",
  "Item Market": "https://www.torn.com/imarket.php",
  "Torn City": "https://www.torn.com/city.php#",
  Messages: "https://www.torn.com/messages.php",
  Events: "https://www.torn.com/page.php?sid=events",
  Awards: "https://www.torn.com/awards.php",
  Job: "https://www.torn.com/jobs.php",
  Missions: "https://www.torn.com/loader.php?sid=missions",
  Newspaper: "https://www.torn.com/newspaper.php",
  "Hall of Fame": "https://www.torn.com/page.php?sid=hof",
  "My Faction": "https://www.torn.com/factions.php?step=your",
  Logs: "https://www.torn.com/page.php?sid=log",
  "Recruit Citizens": "https://www.torn.com/bringafriend.php",
  "Weapon Mods": "https://www.torn.com/loader.php?sid=itemsMods",
  Calendar: "https://www.torn.com/calendar.php",
  Friends: "https://www.torn.com/friendlist.php",
  Enemies: "https://www.torn.com/blacklist.php",
  "Points Store": "https://www.torn.com/points.php",
  "(Casino) Russian Roulette":
    "https://www.torn.com/page.php?sid=russianRoulette",
  "(Casino) Slots": "https://www.torn.com/page.php?sid=slots",
  "(Casino) Roulette": "https://www.torn.com/page.php?sid=roulette",
  "(Casino) Poker": "https://www.torn.com/page.php?sid=holdem",
  "(Casino) High Low": "https://www.torn.com/page.php?sid=highlow",
  "(Casino) Blackjack": "https://www.torn.com/page.php?sid=blackjack",
  "(Casino) Bookie": "https://www.torn.com/page.php?sid=bookie",
  "(Casino) Lottery": "https://www.torn.com/page.php?sid=lottery",
  Craps: "https://www.torn.com/page.php?sid=craps",
  "(Faction) Warfare": "https://www.torn.com/page.php?sid=factionWarfare",
  "Bits 'n' Bobs": "https://www.torn.com/shops.php?step=bitsnbobs",
  Bounties: "https://www.torn.com/bounties.php",
  "Chronicle Archives": "https://www.torn.com/archives.php",
  "Classified Ads": "https://www.torn.com/newspaper_class.php",
  Docks: "https://www.torn.com/shops.php?step=docks",
  "Jewelry Store": "https://www.torn.com/shops.php?step=jewelry",
  "Cyber Force": "https://www.torn.com/shops.php?step=cyberforce",
  "Big Al's Gun Shop": "https://www.torn.com/bigalgunshop.php",
  Museum: "https://www.torn.com/museum.php",
  "Print Store": "https://www.torn.com/shops.php?step=printstore",
  "Organized Crimes": "https://www.torn.com/factions.php?step=your#/tab=crimes",
  "(Faction) Controls":
    "https://www.torn.com/factions.php?step=your#/tab=controls",
  "TC Clothing": "https://www.torn.com/shops.php?step=clothes",
  "Sweet Shop": "https://www.torn.com/shops.php?step=candy",
  "Post Office": "https://www.torn.com/shops.php?step=postoffice",
  "Pawn Shop": "https://www.torn.com/shops.php?step=pawnshop",
  "Big Al's Bunker": "https://www.torn.com/page.php?sid=bunker",
  "Stock Market": "https://www.torn.com/page.php?sid=stocks",
  Church: "https://www.torn.com/church.php",
  "Company Funds": "https://www.torn.com/companies.php#/option=funds",
  "Manage Display Case": "https://www.torn.com/displaycase.php#manage",
  Trades: "https://www.torn.com/trade.php",
  "Display Case": "https://www.torn.com/displaycase.php",
  "Ammo Locker": "https://www.torn.com/page.php?sid=ammo",
  "Donator House": "https://www.torn.com/donator.php",
  "City Hall": "https://www.torn.com/citystats.php",
  "Points Market": "https://www.torn.com/pmarket.php",
  "Auction House": "https://www.torn.com/amarket.php",
  Dump: "https://www.torn.com/dump.php",
  "Points Building": "https://www.torn.com/points.php",
  Home: "https://www.torn.com/index.php",
  Properties: "https://www.torn.com/properties.php",
  "Travel Agency": "https://www.torn.com/travelagency.php",
  Items: "https://www.torn.com/item.php",
  City: "https://www.torn.com/city.php",
  Bazaar: "https://www.torn.com/bazaar.php",
  Gym: "https://www.torn.com/gym.php",
  Crimes: "https://www.torn.com/crimes.php#/step=main",
  Raceway: "https://www.torn.com/page.php?sid=racing",
  Jail: "https://www.torn.com/jailview.php",
  Hospital: "https://www.torn.com/hospitalview.php",
  "City Bank": "https://www.torn.com/bank.php",
  Casino: "https://www.torn.com/casino.php",
  Log: "https://www.torn.com/page.php?sid=log",
  Pharmacy: "https://www.torn.com/shops.php?step=pharmacy",
  "Nikeh Sports": "https://www.torn.com/shops.php?step=nikeh",
  "Personal Stats": "https://www.torn.com/personalstats.php",
  "Property Vault": "https://www.torn.com/properties.php#/p=options&tab=vault",
  "Manage Bazaar": "https://www.torn.com/bazaar.php#/manage",
  "Estate Agents": "https://www.torn.com/estateagents.php",
  "Recycling Center": "https://www.torn.com/shops.php?step=recyclingcenter",
  "Super Store": "https://www.torn.com/shops.php?step=super",
  "Token Shop": "https://www.torn.com/token_shop.php",
  "(Faction) Armory":
    "https://www.torn.com/factions.php?step=your#/tab=armoury",
  Keno: "https://www.torn.com/page.php?sid=keno",
  "Bugs & Issues": "https://www.torn.com/forums.php#/p=forums&f=19",
  "Spin the Wheel": "https://www.torn.com/page.php?sid=spinTheWheel",
  Company: "https://www.torn.com/companies.php",
  "Spotlight Settings": "https://www.torn.com/spotlight-settings.php",
};

const marketItems = {
  Hammer: "Hammer",
  "Fine Chisel": "Fine Chisel",
  "Lead Pipe": "Lead Pipe",
  "Baseball Bat": "Baseball Bat",
  "Pair of Ice Skates": "Pair of Ice Skates",
  Crowbar: "Crowbar",
  Spear: "Spear",
  "Knuckle Dusters": "Knuckle Dusters",
  "Leather Bullwhip": "Leather Bullwhip",
  Sai: "Sai",
  "Pen Knife": "Pen Knife",
  "Kitchen Knife": "Kitchen Knife",
  "Bo Staff": "Bo Staff",
  "Butterfly Knife": "Butterfly Knife",
  Dagger: "Dagger",
  "Swiss Army Knife": "Swiss Army Knife",
  "Golf Club": "Golf Club",
  "Pair of High Heels": "Pair of High Heels",
  "Chain Whip": "Chain Whip",
  Axe: "Axe",
  "Wooden Nunchaku": "Wooden Nunchaku",
  "Ninja Claws": "Ninja Claws",
  "Frying Pan": "Frying Pan",
  Scimitar: "Scimitar",
  Pillow: "Pillow",
  "Plastic Sword": "Plastic Sword",
  "Cricket Bat": "Cricket Bat",
  Chainsaw: "Chainsaw",
  Katana: "Katana",
  "Ice Pick": "Ice Pick",
  Kama: "Kama",
  "Twin Tiger Hooks": "Twin Tiger Hooks",
  "Samurai Sword": "Samurai Sword",
  "Bone Saw": "Bone Saw",
  "Wushu Double Axes": "Wushu Double Axes",
  "Claymore Sword": "Claymore Sword",
  "Rusty Sword": "Rusty Sword",
  Macana: "Macana",
  Kodachi: "Kodachi",
  Guandao: "Guandao",
  "Diamond Icicle": "Diamond Icicle",
  "Metal Nunchaku": "Metal Nunchaku",
  "Diamond Bladed Knife": "Diamond Bladed Knife",
  "Yasukuni Sword": "Yasukuni Sword",
  "Cattle Prod": "Cattle Prod",
  Flail: "Flail",
  Madball: "Madball",
  "Ivory Walking Cane": "Ivory Walking Cane",
  "Meat Hook": "Meat Hook",
  "Blood Spattered Sickle": "Blood Spattered Sickle",
  "Naval Cutlass": "Naval Cutlass",
  Cleaver: "Cleaver",
  "Petrified Humerus": "Petrified Humerus",
  "Golden Broomstick": "Golden Broomstick",
  "Riding Crop": "Riding Crop",
  "Devil's Pitchfork": "Devil's Pitchfork",
  "Dual Hammers": "Dual Hammers",
  Sledgehammer: "Sledgehammer",
  "Dual Scimitars": "Dual Scimitars",
  "Poison Umbrella": "Poison Umbrella",
  "Dual Axes": "Dual Axes",
  "Dual Samurai Swords": "Dual Samurai Swords",
  "Bread Knife": "Bread Knife",
  Handbag: "Handbag",
  Thompson: "Thompson",
  "Sawed-Off Shotgun": "Sawed-Off Shotgun",
  "Benelli M1 Tactical": "Benelli M1 Tactical",
  "MP5 Navy": "MP5 Navy",
  "SKS Carbine": "SKS Carbine",
  "Vektor CR-21": "Vektor CR-21",
  P90: "P90",
  "Ithaca 37": "Ithaca 37",
  AK74U: "AK74U",
  "MP 40": "MP 40",
  "XM8 Rifle": "XM8 Rifle",
  "AK-47": "AK-47",
  "Bushmaster Carbon 15": "Bushmaster Carbon 15",
  "M4A1 Colt Carbine": "M4A1 Colt Carbine",
  "Benelli M4 Super": "Benelli M4 Super",
  "Heckler & Koch SL8": "Heckler & Koch SL8",
  "M16 A2 Rifle": "M16 A2 Rifle",
  "Mag 7": "Mag 7",
  "SIG 550": "SIG 550",
  "Steyr AUG": "Steyr AUG",
  "Enfield SA-80": "Enfield SA-80",
  "Tavor TAR-21": "Tavor TAR-21",
  "9mm Uzi": "9mm Uzi",
  "M249 SAW": "M249 SAW",
  Minigun: "Minigun",
  Jackhammer: "Jackhammer",
  "SIG 552": "SIG 552",
  "ArmaLite M-15A4": "ArmaLite M-15A4",
  "Negev NG-5": "Negev NG-5",
  PKM: "PKM",
  "Stoner 96": "Stoner 96",
  "Nock Gun": "Nock Gun",
  "Snow Cannon": "Snow Cannon",
  "Rheinmetall MG 3": "Rheinmetall MG 3",
  "Gold Plated AK-47": "Gold Plated AK-47",
  "Dual MP5s": "Dual MP5s",
  Slingshot: "Slingshot",
  "Flare Gun": "Flare Gun",
  "Glock 17": "Glock 17",
  "Lorcin 380": "Lorcin 380",
  Skorpion: "Skorpion",
  Taurus: "Taurus",
  "Raven MP25": "Raven MP25",
  "Springfield 1911": "Springfield 1911",
  TMP: "TMP",
  Luger: "Luger",
  MP5k: "MP5k",
  "Ruger 57": "Ruger 57",
  Crossbow: "Crossbow",
  "S&W Revolver": "S&W Revolver",
  "Beretta M9": "Beretta M9",
  USP: "USP",
  Blowgun: "Blowgun",
  Taser: "Taser",
  Fiveseven: "Fiveseven",
  Blunderbuss: "Blunderbuss",
  Magnum: "Magnum",
  "Desert Eagle": "Desert Eagle",
  "BT MP9": "BT MP9",
  "Cobra Derringer": "Cobra Derringer",
  "Qsz-92": "Qsz-92",
  "S&W M29": "S&W M29",
  Harpoon: "Harpoon",
  "Beretta 92FS": "Beretta 92FS",
  Flamethrower: "Flamethrower",
  "Dual 92G Berettas": "Dual 92G Berettas",
  "Beretta Pico": "Beretta Pico",
  "Type 98 Anti Tank": "Type 98 Anti Tank",
  "Homemade Pocket Shotgun": "Homemade Pocket Shotgun",
  "RPG Launcher": "RPG Launcher",
  "SMAW Launcher": "SMAW Launcher",
  "China Lake": "China Lake",
  "Milkor MGL": "Milkor MGL",
  Wrench: "Wrench",
  Fireworks: "Fireworks",
  Brick: "Brick",
  "Ninja Star": "Ninja Star",
  "Pepper Spray": "Pepper Spray",
  Grenade: "Grenade",
  "Stick Grenade": "Stick Grenade",
  Snowball: "Snowball",
  "Claymore Mine": "Claymore Mine",
  Trout: "Trout",
  HEG: "HEG",
  "Flash Grenade": "Flash Grenade",
  "Throwing Knife": "Throwing Knife",
  "Tear Gas": "Tear Gas",
  "Molotov Cocktail": "Molotov Cocktail",
  "Glitter Bomb": "Glitter Bomb",
  "Smoke Grenade": "Smoke Grenade",
  "Party Popper": "Party Popper",
  Melatonin: "Melatonin",
  Tyrosine: "Tyrosine",
  Epinephrine: "Epinephrine",
  Serotonin: "Serotonin",
  "Nail Bomb": "Nail Bomb",
  "Concussion Grenade": "Concussion Grenade",
  Book: "Book",
  Sand: "Sand",
  "Leather Gloves": "Leather Gloves",
  "Leather Boots": "Leather Boots",
  "Leather Helmet": "Leather Helmet",
  "Leather Pants": "Leather Pants",
  "Leather Vest": "Leather Vest",
  "Chain Mail": "Chain Mail",
  "Hiking Boots": "Hiking Boots",
  "Flak Jacket": "Flak Jacket",
  "Police Vest": "Police Vest",
  "Construction Helmet": "Construction Helmet",
  "Bulletproof Vest": "Bulletproof Vest",
  "Safety Boots": "Safety Boots",
  "Full Body Armor": "Full Body Armor",
  "WWII Helmet": "WWII Helmet",
  "Kevlar Gloves": "Kevlar Gloves",
  "Outer Tactical Vest": "Outer Tactical Vest",
  "Combat Gloves": "Combat Gloves",
  "Combat Boots": "Combat Boots",
  "Combat Pants": "Combat Pants",
  "Combat Helmet": "Combat Helmet",
  "Combat Vest": "Combat Vest",
  "Liquid Body Armor": "Liquid Body Armor",
  "Flexible Body Armor": "Flexible Body Armor",
  "Medieval Helmet": "Medieval Helmet",
  "Motorcycle Helmet": "Motorcycle Helmet",
  "Dune Pants": "Dune Pants",
  "Dune Boots": "Dune Boots",
  "Dune Vest": "Dune Vest",
  "Dune Gloves": "Dune Gloves",
  "Riot Boots": "Riot Boots",
  "Dune Helmet": "Dune Helmet",
  "Assault Helmet": "Assault Helmet",
  "Riot Gloves": "Riot Gloves",
  "Riot Pants": "Riot Pants",
  "Assault Gloves": "Assault Gloves",
  "Riot Helmet": "Riot Helmet",
  "Riot Body": "Riot Body",
  "Assault Boots": "Assault Boots",
  "Assault Pants": "Assault Pants",
  "Assault Body": "Assault Body",
  "Marauder Gloves": "Marauder Gloves",
  "Delta Gloves": "Delta Gloves",
  "Delta Boots": "Delta Boots",
  "Delta Pants": "Delta Pants",
  "Marauder Pants": "Marauder Pants",
  "Marauder Boots": "Marauder Boots",
  "Delta Body": "Delta Body",
  "Vanguard Boots": "Vanguard Boots",
  "Marauder Face Mask": "Marauder Face Mask",
  "Welding Helmet": "Welding Helmet",
  "Vanguard Gloves": "Vanguard Gloves",
  "Marauder Body": "Marauder Body",
  "Vanguard Pants": "Vanguard Pants",
  "Delta Gas Mask": "Delta Gas Mask",
  "Vanguard Body": "Vanguard Body",
  "Sentinel Boots": "Sentinel Boots",
  "Sentinel Helmet": "Sentinel Helmet",
  "Sentinel Gloves": "Sentinel Gloves",
  "Sentinel Pants": "Sentinel Pants",
  "Sentinel Apron": "Sentinel Apron",
  "EOD Boots": "EOD Boots",
  "EOD Gloves": "EOD Gloves",
  "Vanguard Respirator": "Vanguard Respirator",
  "EOD Helmet": "EOD Helmet",
  "EOD Apron": "EOD Apron",
  "Hazmat Suit": "Hazmat Suit",
  "Small First Aid Kit": "Small First Aid Kit",
  "First Aid Kit": "First Aid Kit",
  Morphine: "Morphine",
  "Blood Bag : O+": "Blood Bag : O+",
  "Blood Bag : A+": "Blood Bag : A+",
  "Blood Bag : A-": "Blood Bag : A-",
  "Empty Blood Bag": "Empty Blood Bag",
  "Blood Bag : B+": "Blood Bag : B+",
  "Blood Bag : AB+": "Blood Bag : AB+",
  "Blood Bag : O-": "Blood Bag : O-",
  "Blood Bag : B-": "Blood Bag : B-",
  "Blood Bag : AB-": "Blood Bag : AB-",
  "Blood Bag : Irradiated": "Blood Bag : Irradiated",
  "Ipecac Syrup": "Ipecac Syrup",
  "Neumune Tablet": "Neumune Tablet",
  Antidote: "Antidote",
  Shrooms: "Shrooms",
  Vicodin: "Vicodin",
  Ketamine: "Ketamine",
  Cannabis: "Cannabis",
  PCP: "PCP",
  Speed: "Speed",
  Ecstasy: "Ecstasy",
  Opium: "Opium",
  LSD: "LSD",
  Xanax: "Xanax",
  "Love Juice": "Love Juice",
  "Can of Goose Juice": "Can of Goose Juice",
  "Can of Damp Valley": "Can of Damp Valley",
  "Can of Crocozade": "Can of Crocozade",
  "Can of Munster": "Can of Munster",
  "Can of Santa Shooters": "Can of Santa Shooters",
  "Can of Red Cow": "Can of Red Cow",
  "Can of Rockstar Rudolph": "Can of Rockstar Rudolph",
  "Can of X-MASS": "Can of X-MASS",
  "Can of Taurine Elite": "Can of Taurine Elite",
  "Bottle of Tequila": "Bottle of Tequila",
  "Bottle of Beer": "Bottle of Beer",
  "Bottle of Sake": "Bottle of Sake",
  "Bottle of Champagne": "Bottle of Champagne",
  "Bottle of Kandy Kane": "Bottle of Kandy Kane",
  "Bottle of Pumpkin Brew": "Bottle of Pumpkin Brew",
  "Bottle of Wicked Witch": "Bottle of Wicked Witch",
  "Bottle of Minty Mayhem": "Bottle of Minty Mayhem",
  "Bottle of Christmas Cocktail": "Bottle of Christmas Cocktail",
  "Bottle of Mistletoe Madness": "Bottle of Mistletoe Madness",
  "Bottle of Stinky Swamp Punch": "Bottle of Stinky Swamp Punch",
  "Bottle of Green Stout": "Bottle of Green Stout",
  "Bottle of Moonshine": "Bottle of Moonshine",
  "Bottle of Christmas Spirit": "Bottle of Christmas Spirit",
  "Bag of Bon Bons": "Bag of Bon Bons",
  "Bag of Chocolate Kisses": "Bag of Chocolate Kisses",
  Lollipop: "Lollipop",
  "Box of Sweet Hearts": "Box of Sweet Hearts",
  "Box of Chocolate Bars": "Box of Chocolate Bars",
  "Box of Bon Bons": "Box of Bon Bons",
  "Box of Extra Strong Mints": "Box of Extra Strong Mints",
  "Big Box of Chocolate Bars": "Big Box of Chocolate Bars",
  "Bag of Candy Kisses": "Bag of Candy Kisses",
  "Bag of Tootsie Rolls": "Bag of Tootsie Rolls",
  "Bag of Bloody Eyeballs": "Bag of Bloody Eyeballs",
  "Bag of Chocolate Truffles": "Bag of Chocolate Truffles",
  "Bag of Reindeer Droppings": "Bag of Reindeer Droppings",
  "Chocolate Egg": "Chocolate Egg",
  "Pixie Sticks": "Pixie Sticks",
  "Bag of Sherbet": "Bag of Sherbet",
  Jawbreaker: "Jawbreaker",
  "Bag of Humbugs": "Bag of Humbugs",
  "Birthday Cupcake": "Birthday Cupcake",
  "Lawyer's Business Card": "Lawyer's Business Card",
  "Gift Card": "Gift Card",
  "Erotic DVD": "Erotic DVD",
  "Feathery Hotel Coupon": "Feathery Hotel Coupon",
  "Book of Carols": "Book of Carols",
  Skateboard: "Skateboard",
  Dumbbells: "Dumbbells",
  Parachute: "Parachute",
  "Boxing Gloves": "Boxing Gloves",
  "Cut-Throat Razor": "Cut-Throat Razor",
  Glasses: "Glasses",
  Chloroform: "Chloroform",
  "Tracking Device": "Tracking Device",
  "Fanny Pack": "Fanny Pack",
  "Advanced Driving Manual": "Advanced Driving Manual",
  Flashlight: "Flashlight",
  "Tumble Dryer": "Tumble Dryer",
  "High-Speed Drive": "High-Speed Drive",
  "Mountain Bike": "Mountain Bike",
  "Wireless Dongle": "Wireless Dongle",
  "Heavy Duty Padlock": "Heavy Duty Padlock",
  Megaphone: "Megaphone",
  "Duct Tape": "Duct Tape",
  "Paint Mask": "Paint Mask",
  Screwdriver: "Screwdriver",
  "Latex Gloves": "Latex Gloves",
  "Ergonomic Keyboard": "Ergonomic Keyboard",
  Balaclava: "Balaclava",
  "Rosary Beads": "Rosary Beads",
  "Small Suitcase": "Small Suitcase",
  "Magnifying Glass": "Magnifying Glass",
  "Windproof Lighter": "Windproof Lighter",
  "Medium Suitcase": "Medium Suitcase",
  "Office Chair": "Office Chair",
  "Large Suitcase": "Large Suitcase",
  "MP3 Player": "MP3 Player",
  "CD Player": "CD Player",
  "Empty Box": "Empty Box",
  "Box of Tissues": "Box of Tissues",
  Television: "Television",
  "Game Console": "Game Console",
  "Vanity Hand Mirror": "Vanity Hand Mirror",
  "Christmas Cracker": "Christmas Cracker",
  "Stink Bombs": "Stink Bombs",
  "Toilet Paper": "Toilet Paper",
  "Dog Poop": "Dog Poop",
  "Horse's Head": "Horse's Head",
  "Small Explosive Device": "Small Explosive Device",
  "Business Class Ticket": "Business Class Ticket",
  "Casino Pass": "Casino Pass",
  "Donator Pack": "Donator Pack",
  "Strippogram Voucher": "Strippogram Voucher",
  "Poison Mistletoe": "Poison Mistletoe",
  "Cesium-137": "Cesium-137",
  "Dirty Bomb": "Dirty Bomb",
  "Computer Fan": "Computer Fan",
  Handkerchief: "Handkerchief",
  "Bolt Cutters": "Bolt Cutters",
  "Double Cut File": "Double Cut File",
  Shovel: "Shovel",
  "Credit Card": "Credit Card",
  CPU: "CPU",
  PSU: "PSU",
  eCPU: "eCPU",
  "Fountain Pen": "Fountain Pen",
  "Personal Computer": "Personal Computer",
  Drill: "Drill",
  Laptop: "Laptop",
  "Spy Camera": "Spy Camera",
  Ladder: "Ladder",
  Jemmy: "Jemmy",
  "Card Skimmer": "Card Skimmer",
  Wheelbarrow: "Wheelbarrow",
  "Torn City Times": "Torn City Times",
  "Simple Virus": "Simple Virus",
  "Lump of Coal": "Lump of Coal",
  "Permanent Marker": "Permanent Marker",
  "Sewing Kit": "Sewing Kit",
  "Wire Cutters": "Wire Cutters",
  "Water Block": "Water Block",
  Lockpicks: "Lockpicks",
  Graver: "Graver",
  Scissors: "Scissors",
  "Coat Hanger": "Coat Hanger",
  "Tunneling Virus": "Tunneling Virus",
  "Heat Sink": "Heat Sink",
  Typewriter: "Typewriter",
  "Polymorphic Virus": "Polymorphic Virus",
  "Grinding Stone": "Grinding Stone",
  Crucible: "Crucible",
  "Skeleton Key": "Skeleton Key",
  Perforator: "Perforator",
  "Firewalk Virus": "Firewalk Virus",
  "Window Breaker": "Window Breaker",
  "Armored Virus": "Armored Virus",
  "Polishing Pad": "Polishing Pad",
  "Stealth Virus": "Stealth Virus",
  "Police Badge": "Police Badge",
  Printer: "Printer",
  HPCPU: "HPCPU",
  "Lost and Found Office Key": "Lost and Found Office Key",
  "Wax Seal Stamp": "Wax Seal Stamp",
  "Metal Detector": "Metal Detector",
  Embosser: "Embosser",
  "Hot Foil Stamper": "Hot Foil Stamper",
  "Cemetery Key": "Cemetery Key",
  "Generic Wrapping Paper": "Generic Wrapping Paper",
  Fruitcake: "Fruitcake",
  "Christmas Wrapping Paper": "Christmas Wrapping Paper",
  "Birthday Wrapping Paper": "Birthday Wrapping Paper",
  Glue: "Glue",
  "Blank DVDs": "Blank DVDs",
  "Spray Paint : Orange": "Spray Paint : Orange",
  "Bond Paper": "Bond Paper",
  "Spray Paint : Green": "Spray Paint : Green",
  "Spray Paint : Blue": "Spray Paint : Blue",
  "Adhesive Plastic": "Adhesive Plastic",
  "Spray Paint : Red": "Spray Paint : Red",
  "Spray Paint : Purple": "Spray Paint : Purple",
  Rope: "Rope",
  Cardstock: "Cardstock",
  Gasoline: "Gasoline",
  Toner: "Toner",
  "Spray Paint : Pink": "Spray Paint : Pink",
  "Spray Paint : Black": "Spray Paint : Black",
  "Spray Paint : White": "Spray Paint : White",
  "Paper Towels": "Paper Towels",
  "Aluminum Plate": "Aluminum Plate",
  "Crushed Enamel": "Crushed Enamel",
  "Brass Ingot": "Brass Ingot",
  Bleach: "Bleach",
  Lye: "Lye",
  "PVC Cards": "PVC Cards",
  Inkwell: "Inkwell",
  "Insurance Policy": "Insurance Policy",
  "Hydrochloric Acid": "Hydrochloric Acid",
  "Glow Stick": "Glow Stick",
  Candle: "Candle",
  "Blank Tokens": "Blank Tokens",
  "Printing Paper": "Printing Paper",
  "Medical Bill": "Medical Bill",
  Blowtorch: "Blowtorch",
  "Bank Statement": "Bank Statement",
  Anchor: "Anchor",
  "Certificate Seal": "Certificate Seal",
  "Bonded Latex": "Bonded Latex",
  "Coin Purse": "Coin Purse",
  Cardholder: "Cardholder",
  "Old Wallet": "Old Wallet",
  Clutch: "Clutch",
  "Zip Wallet": "Zip Wallet",
  Billfold: "Billfold",
  "Stash Box": "Stash Box",
  "Box of Medical Supplies": "Box of Medical Supplies",
  "Denim Cache": "Denim Cache",
  "Lottery Voucher": "Lottery Voucher",
  "Tin of Treats": "Tin of Treats",
  "Box of Grenades": "Box of Grenades",
  "Elderly Cache": "Elderly Cache",
  "Six-Pack of Alcohol": "Six-Pack of Alcohol",
  "Cutesy Cache": "Cutesy Cache",
  "Gentleman Cache": "Gentleman Cache",
  "Elegant Cache": "Elegant Cache",
  "Wannabe Cache": "Wannabe Cache",
  "Drug Pack": "Drug Pack",
  "Injury Cache": "Injury Cache",
  "Naughty Cache": "Naughty Cache",
  "Keg of Beer": "Keg of Beer",
  "Six-Pack of Energy Drink": "Six-Pack of Energy Drink",
  "Goodie Bag": "Goodie Bag",
  "Small Arms Cache": "Small Arms Cache",
  "Anniversary Present": "Anniversary Present",
  "Melee Cache": "Melee Cache",
  "Medium Arms Cache": "Medium Arms Cache",
  "Armor Cache": "Armor Cache",
  "Heavy Arms Cache": "Heavy Arms Cache",
  Parcel: "Parcel",
  "Plastic Watch": "Plastic Watch",
  "Silver Necklace": "Silver Necklace",
  "Pearl Necklace": "Pearl Necklace",
  "Stainless Steel Watch": "Stainless Steel Watch",
  "Plain Silver Ring": "Plain Silver Ring",
  "Gold Necklace": "Gold Necklace",
  "Gold Watch": "Gold Watch",
  "Gold Ring": "Gold Ring",
  "Sapphire Ring": "Sapphire Ring",
  "Diamond Ring": "Diamond Ring",
  "Cocktail Ring": "Cocktail Ring",
  "Crystal Bracelet": "Crystal Bracelet",
  "Statement Necklace": "Statement Necklace",
  "Gold Chain": "Gold Chain",
  "Peplum Top": "Peplum Top",
  "Pencil Skirt": "Pencil Skirt",
  Pantyhose: "Pantyhose",
  Camisole: "Camisole",
  Bermudas: "Bermudas",
  "Yoga Pants": "Yoga Pants",
  "Gym Shorts": "Gym Shorts",
  "Tank Top": "Tank Top",
  Sweater: "Sweater",
  Blouse: "Blouse",
  "Capri Pants": "Capri Pants",
  Skirt: "Skirt",
  "Mediocre T-Shirt": "Mediocre T-Shirt",
  Turtleneck: "Turtleneck",
  "Travel Socks": "Travel Socks",
  Halterneck: "Halterneck",
  Jacket: "Jacket",
  Shorts: "Shorts",
  "Puffer Vest": "Puffer Vest",
  "Baseball Cap": "Baseball Cap",
  "Boob Tube": "Boob Tube",
  "Polo Shirt": "Polo Shirt",
  Cardigan: "Cardigan",
  Trainers: "Trainers",
  "Festive Socks": "Festive Socks",
  "Cork Hat": "Cork Hat",
  Bandana: "Bandana",
  "Disposable Mask": "Disposable Mask",
  "Proda Sunglasses": "Proda Sunglasses",
  "Sports Shades": "Sports Shades",
  "Diving Gloves": "Diving Gloves",
  Speedo: "Speedo",
  Bikini: "Bikini",
  "Crop Top": "Crop Top",
  "Kabuki Mask": "Kabuki Mask",
  Flippers: "Flippers",
  "Fisherman Hat": "Fisherman Hat",
  Thong: "Thong",
  "Moustache Man Mask": "Moustache Man Mask",
  Snorkel: "Snorkel",
  "Scarred Man Mask": "Scarred Man Mask",
  Mackintosh: "Mackintosh",
  "Exotic Gentleman Mask": "Exotic Gentleman Mask",
  Cassock: "Cassock",
  Raincoat: "Raincoat",
  "Nun Mask": "Nun Mask",
  "Old Lady Mask": "Old Lady Mask",
  "Bush Hat": "Bush Hat",
  Wetsuit: "Wetsuit",
  "Golf Socks": "Golf Socks",
  "Mountie Hat": "Mountie Hat",
  "Classic Fedora": "Classic Fedora",
  "Young Lady Mask": "Young Lady Mask",
  "Ginger Kid Mask": "Ginger Kid Mask",
  "Denim Cap": "Denim Cap",
  "Denim Jacket": "Denim Jacket",
  "Denim Vest": "Denim Vest",
  Poncho: "Poncho",
  Pullover: "Pullover",
  "Psycho Clown Mask": "Psycho Clown Mask",
  Dungarees: "Dungarees",
  "Paper Crown : Yellow": "Paper Crown : Yellow",
  "Paper Crown : Red": "Paper Crown : Red",
  "Pleated Skirt": "Pleated Skirt",
  "Knee Socks": "Knee Socks",
  "Paper Crown : Green": "Paper Crown : Green",
  "Bucket Hat": "Bucket Hat",
  "Reading Glasses": "Reading Glasses",
  "Paper Crown : Blue": "Paper Crown : Blue",
  "Denim Shirt": "Denim Shirt",
  "Snapback Hat": "Snapback Hat",
  Sandals: "Sandals",
  "Coconut Bra": "Coconut Bra",
  "Trench Coat": "Trench Coat",
  "Santa Trousers": "Santa Trousers",
  "Denim Shoes": "Denim Shoes",
  "Booty Shorts": "Booty Shorts",
  "Santa Gloves": "Santa Gloves",
  "Silver Flats": "Silver Flats",
  Sweatpants: "Sweatpants",
  "Ballet Shoes": "Ballet Shoes",
  Shrug: "Shrug",
  "Hair Bow": "Hair Bow",
  "Floral Dress": "Floral Dress",
  "Bloody Apron": "Bloody Apron",
  "Santa Jacket": "Santa Jacket",
  "Santa Boots": "Santa Boots",
  "String Vest": "String Vest",
  "Baseball Jacket": "Baseball Jacket",
  Chinos: "Chinos",
  "Pinstripe Suit Trousers": "Pinstripe Suit Trousers",
  "Maid Hat": "Maid Hat",
  "Oversized Shirt": "Oversized Shirt",
  "Assless Chaps": "Assless Chaps",
  "Bow Tie": "Bow Tie",
  "Bandit Mask": "Bandit Mask",
  "Puppy Ears": "Puppy Ears",
  "Hospital Gown": "Hospital Gown",
  "Sun Hat": "Sun Hat",
  "Chest Harness": "Chest Harness",
  "Fishnet Stockings": "Fishnet Stockings",
  "Denim Jeans": "Denim Jeans",
  "Panama Hat": "Panama Hat",
  "Head Scarf": "Head Scarf",
  "Platform Shoes": "Platform Shoes",
  Tutu: "Tutu",
  "Neck Brace": "Neck Brace",
  "Basketball Shirt": "Basketball Shirt",
  "Knee Brace": "Knee Brace",
  "Santa Hat": "Santa Hat",
  "Fur Scarf": "Fur Scarf",
  "Bowler Hat": "Bowler Hat",
  "Medical Diaper": "Medical Diaper",
  "Fur Hat": "Fur Hat",
  "Tighty Whities": "Tighty Whities",
  "Tube Dress": "Tube Dress",
  "Party Hat '19": "Party Hat '19",
  Braces: "Braces",
  "Flip Flops": "Flip Flops",
  Choker: "Choker",
  "Knee-high Boots": "Knee-high Boots",
  "Silver Hoodie": "Silver Hoodie",
  "Plaster Cast Arm": "Plaster Cast Arm",
  "Neck Tie": "Neck Tie",
  "Plaster Cast Leg": "Plaster Cast Leg",
  Durag: "Durag",
  "Badge : 15th Anniversary": "Badge : 15th Anniversary",
  "Sports Jacket": "Sports Jacket",
  Waistcoat: "Waistcoat",
  "Collared Shawl": "Collared Shawl",
  "Cat Ears": "Cat Ears",
  "Medical Eye Patch": "Medical Eye Patch",
  "Square Sunglasses": "Square Sunglasses",
  "Mini Skirt": "Mini Skirt",
  "Derby Shoes": "Derby Shoes",
  "Puffer Jacket": "Puffer Jacket",
  "Lolita Dress": "Lolita Dress",
  Blindfold: "Blindfold",
  "Fitted Shirt": "Fitted Shirt",
  "Halo Vest": "Halo Vest",
  "Shutter Shades": "Shutter Shades",
  "Fur Coat": "Fur Coat",
  "Opera Gloves": "Opera Gloves",
  Nightgown: "Nightgown",
  Lingerie: "Lingerie",
  Blazer: "Blazer",
  "Check Skirt": "Check Skirt",
  "Shoulder Sweater": "Shoulder Sweater",
  Tights: "Tights",
  "Suit Trousers": "Suit Trousers",
  "Bingo Visor": "Bingo Visor",
  "Black Oxfords": "Black Oxfords",
  "Bunny Ears": "Bunny Ears",
  "Saggy Pants": "Saggy Pants",
  "Chin Diaper": "Chin Diaper",
  "Cover-ups": "Cover-ups",
  "Kitty Shoes": "Kitty Shoes",
  "Fascinator Hat": "Fascinator Hat",
  "Torso Bandage": "Torso Bandage",
  "Head Bandage": "Head Bandage",
  "Ripped Jeans": "Ripped Jeans",
  Crutches: "Crutches",
  Slippers: "Slippers",
  "Polka Dot Dress": "Polka Dot Dress",
  "Smoking Jacket": "Smoking Jacket",
  "Maid Uniform": "Maid Uniform",
  "Band-Aids": "Band-Aids",
  Monocle: "Monocle",
  "Reindeer Antlers": "Reindeer Antlers",
  "Rudolph's Nose": "Rudolph's Nose",
  "Nipple Tassels": "Nipple Tassels",
  Bathrobe: "Bathrobe",
  "Parachute Pants": "Parachute Pants",
  Collar: "Collar",
  "Scrooge's Gloves": "Scrooge's Gloves",
  "Prosthetic Arm": "Prosthetic Arm",
  "Gold Sneakers": "Gold Sneakers",
  "Peg Leg": "Peg Leg",
  Onesie: "Onesie",
  "Scrooge's Boots": "Scrooge's Boots",
  Mankini: "Mankini",
  "Heart Sunglasses": "Heart Sunglasses",
  "Wedding Veil": "Wedding Veil",
  "Ball Gown": "Ball Gown",
  "Prosthetic Leg": "Prosthetic Leg",
  "Scrooge's Trousers": "Scrooge's Trousers",
  Pipe: "Pipe",
  "Scrooge's Top Hat": "Scrooge's Top Hat",
  "Ski Mask": "Ski Mask",
  "Wedding Dress": "Wedding Dress",
  "Ball Gag": "Ball Gag",
  "Hook Hand": "Hook Hand",
  "Scrooge's Topcoat": "Scrooge's Topcoat",
  "Christmas Sweater '15": "Christmas Sweater '15",
  Duster: "Duster",
  "Unicorn Horn": "Unicorn Horn",
  "Bunny Nose": "Bunny Nose",
  Straitjacket: "Straitjacket",
  "Santa Beard": "Santa Beard",
  "Witch's Hat": "Witch's Hat",
  "Queen Elizabeth II Mask '22": "Queen Elizabeth II Mask '22",
  "Turkey Head '23": "Turkey Head '23",
  "Prince Philip Mask '21": "Prince Philip Mask '21",
  "Evil Winnie Mask '23": "Evil Winnie Mask '23",
  "Tiger King Mask '20": "Tiger King Mask '20",
  "Krampus Mask '21": "Krampus Mask '21",
  "Hell Priest Mask '22": "Hell Priest Mask '22",
  "Pennywise Mask '20": "Pennywise Mask '20",
  "Jigsaw Mask '19": "Jigsaw Mask '19",
  "Elon Musk Mask '17": "Elon Musk Mask '17",
  "Greta Mask '19": "Greta Mask '19",
  "Michael Myers Mask '18": "Michael Myers Mask '18",
  "Sandworm Mask '21": "Sandworm Mask '21",
  "Anatoly Mask '19": "Anatoly Mask '19",
  "Donald Trump Mask '16": "Donald Trump Mask '16",
  "Gronch Mask '18": "Gronch Mask '18",
  "Bunny Suit": "Bunny Suit",
  "Bunch of Flowers": "Bunch of Flowers",
  "Funeral Wreath": "Funeral Wreath",
  Daffodil: "Daffodil",
  "Bunch of Carnations": "Bunch of Carnations",
  "Single Red Rose": "Single Red Rose",
  "Dozen Roses": "Dozen Roses",
  "Bunch of Black Roses": "Bunch of Black Roses",
  Dahlia: "Dahlia",
  Edelweiss: "Edelweiss",
  "White Lily": "White Lily",
  Crocus: "Crocus",
  "Banana Orchid": "Banana Orchid",
  Orchid: "Orchid",
  "Ceibo Flower": "Ceibo Flower",
  Heather: "Heather",
  "Cherry Blossom": "Cherry Blossom",
  "African Violet": "African Violet",
  Peony: "Peony",
  "Tribulus Omanense": "Tribulus Omanense",
  "Sheep Plushie": "Sheep Plushie",
  "Teddy Bear Plushie": "Teddy Bear Plushie",
  "Kitten Plushie": "Kitten Plushie",
  "Stingray Plushie": "Stingray Plushie",
  "Wolverine Plushie": "Wolverine Plushie",
  "Chamois Plushie": "Chamois Plushie",
  "Jaguar Plushie": "Jaguar Plushie",
  "Nessie Plushie": "Nessie Plushie",
  "Red Fox Plushie": "Red Fox Plushie",
  "Monkey Plushie": "Monkey Plushie",
  "Panda Plushie": "Panda Plushie",
  "Lion Plushie": "Lion Plushie",
  "Camel Plushie": "Camel Plushie",
  "Chevrolet Cavalier": "Chevrolet Cavalier",
  "Peugeot 106": "Peugeot 106",
  "Vauxhall Corsa": "Vauxhall Corsa",
  "Classic Mini": "Classic Mini",
  "Volkswagen Golf GTI": "Volkswagen Golf GTI",
  "Reliant Robin": "Reliant Robin",
  "Honda Civic": "Honda Civic",
  "Renault Clio": "Renault Clio",
  "Audi S4": "Audi S4",
  "Volkswagen Beetle": "Volkswagen Beetle",
  "Alfa Romeo 156": "Alfa Romeo 156",
  "Seat Leon Cupra": "Seat Leon Cupra",
  "Honda Integra R": "Honda Integra R",
  "Nissan Micra": "Nissan Micra",
  "Ford Mustang": "Ford Mustang",
  "Lotus Exige": "Lotus Exige",
  "Hummer H3": "Hummer H3",
  "Honda Accord": "Honda Accord",
  "Holden SS": "Holden SS",
  "Vauxhall Astra GSI": "Vauxhall Astra GSI",
  "Toyota MR2": "Toyota MR2",
  "BMW X5": "BMW X5",
  "Honda S2000": "Honda S2000",
  "Honda NSX": "Honda NSX",
  "BMW M5": "BMW M5",
  "Chevrolet Corvette Z06": "Chevrolet Corvette Z06",
  "TVR Sagaris": "TVR Sagaris",
  "Citroen Saxo": "Citroen Saxo",
  "Audi TT Quattro": "Audi TT Quattro",
  "Ford Focus RS": "Ford Focus RS",
  "Subaru Impreza STI": "Subaru Impreza STI",
  "Pontiac Firebird": "Pontiac Firebird",
  "Dodge Charger": "Dodge Charger",
  "BMW Z8": "BMW Z8",
  "Porsche 911 GT3": "Porsche 911 GT3",
  "Mitsubishi Evo X": "Mitsubishi Evo X",
  "Mini Cooper S": "Mini Cooper S",
  "Ford GT40": "Ford GT40",
  "Audi R8": "Audi R8",
  "Nissan GT-R": "Nissan GT-R",
  "Fiat Punto": "Fiat Punto",
  "Volvo 850": "Volvo 850",
  "Aston Martin One-77": "Aston Martin One-77",
  "Lamborghini Gallardo": "Lamborghini Gallardo",
  "Lexus LFA": "Lexus LFA",
  "Ferrari 458": "Ferrari 458",
  "Mercedes SLR": "Mercedes SLR",
  "Sierra Cosworth": "Sierra Cosworth",
  "Bugatti Veyron": "Bugatti Veyron",
  "Senet Board": "Senet Board",
  "Leopard Coin": "Leopard Coin",
  "Florin Coin": "Florin Coin",
  "Gold Noble Coin": "Gold Noble Coin",
  "Vairocana Buddha Sculpture": "Vairocana Buddha Sculpture",
  "Black Senet Pawn": "Black Senet Pawn",
  "White Senet Pawn": "White Senet Pawn",
  "Ganesha Sculpture": "Ganesha Sculpture",
  "Quran Script : Ibn Masud": "Quran Script : Ibn Masud",
  "Quran Script : Ali": "Quran Script : Ali",
  "Quran Script : Ubay Ibn Ka'b": "Quran Script : Ubay Ibn Ka'b",
  "Shabti Sculpture": "Shabti Sculpture",
  "Egyptian Amulet": "Egyptian Amulet",
  "Dancing Santa Claus '09": "Dancing Santa Claus '09",
  "Dong : Greg": "Dong : Greg",
  "Dong : Jeremy": "Dong : Jeremy",
  "Dong : Holly": "Dong : Holly",
  "Dong : Effy": "Dong : Effy",
  "Deputy Star": "Deputy Star",
  "Dong : Thomas": "Dong : Thomas",
  "Gold Nugget": "Gold Nugget",
  "Medal of Honor": "Medal of Honor",
  "Snow Globe '09": "Snow Globe '09",
  "Birthday Cake '14": "Birthday Cake '14",
  "Rusty Dog Tag": "Rusty Dog Tag",
  "Zombie Brain": "Zombie Brain",
  "Human Head": "Human Head",
  "Piece of Cake '13": "Piece of Cake '13",
  "Bronze Rosette": "Bronze Rosette",
  "Donkey Adoption Certificate": "Donkey Adoption Certificate",
  "Silver Rosette": "Silver Rosette",
  "Metal Dog Tag": "Metal Dog Tag",
  "Rabbit Foot": "Rabbit Foot",
  "Poker Chip": "Poker Chip",
  "Santa's Elf '09": "Santa's Elf '09",
  "Gold Rosette": "Gold Rosette",
  "Coin : Estate Agents": "Coin : Estate Agents",
  "Coin : Church": "Coin : Church",
  "Paper Bag": "Paper Bag",
  "Bunch of Balloons '05": "Bunch of Balloons '05",
  "Coin : Jail": "Coin : Jail",
  "Jack-O-Lantern '05": "Jack-O-Lantern '05",
  "Coin : Race Track": "Coin : Race Track",
  "Bronze Paint Brush": "Bronze Paint Brush",
  "Birthday Cake '05": "Birthday Cake '05",
  "Coin : Museum": "Coin : Museum",
  "Coin : Travel Agency": "Coin : Travel Agency",
  "Coin : Stock Exchange": "Coin : Stock Exchange",
  "Coin : Hospital": "Coin : Hospital",
  "Coin : Factions": "Coin : Factions",
  "Coin : Dump": "Coin : Dump",
  "Coin : Drugs": "Coin : Drugs",
  "Coin : Companies": "Coin : Companies",
  "Coin : Auction House": "Coin : Auction House",
  "Cheesus '18": "Cheesus '18",
  "Bronze Microphone": "Bronze Microphone",
  "Coin : Education": "Coin : Education",
  "Santa's List '17": "Santa's List '17",
  "Silver Microphone": "Silver Microphone",
  "Bronze Dog Tag": "Bronze Dog Tag",
  "Scammer in the Slammer '18": "Scammer in the Slammer '18",
  "Voodoo Doll": "Voodoo Doll",
  "Toast Jesus '18": "Toast Jesus '18",
  "Snowflake '05": "Snowflake '05",
  "Amazon Doll": "Amazon Doll",
  "Gold Paint Brush": "Gold Paint Brush",
  Soapbox: "Soapbox",
  "Flea Collar": "Flea Collar",
  "YouYou Yo Yo": "YouYou Yo Yo",
  "Kevlar Helmet": "Kevlar Helmet",
  "Poker Doll": "Poker Doll",
  "Gold Microphone": "Gold Microphone",
  "Yorkshire Pudding": "Yorkshire Pudding",
  "Cursed Moon Pendant": "Cursed Moon Pendant",
  "Backstage Pass": "Backstage Pass",
  "Burmese Flag": "Burmese Flag",
  "Yoda Figurine": "Yoda Figurine",
  "Barbie Doll": "Barbie Doll",
  "Single White Rose": "Single White Rose",
  "Non-Anon Doll": "Non-Anon Doll",
  Dreamcatcher: "Dreamcatcher",
  "Mr Brownstone Doll": "Mr Brownstone Doll",
  "China Tea Set": "China Tea Set",
  "Trojan Horse": "Trojan Horse",
  "Monkey Cuffs": "Monkey Cuffs",
  "Christmas Card '09": "Christmas Card '09",
  "Christmas Stocking '09": "Christmas Stocking '09",
  "Mouser Doll": "Mouser Doll",
  "Santa Hat '04": "Santa Hat '04",
  "Jester's Cap": "Jester's Cap",
  "Lucky Dime": "Lucky Dime",
  "Official Ninja Kit": "Official Ninja Kit",
  "Octopus Toy": "Octopus Toy",
  "Dollar Bill Collectible": "Dollar Bill Collectible",
  "Silver Paint Brush": "Silver Paint Brush",
  Lipstick: "Lipstick",
  "RS232 Cable": "RS232 Cable",
  Shampoo: "Shampoo",
  "Soap on a Rope": "Soap on a Rope",
  "DVD Player": "DVD Player",
  "Shaving Foam": "Shaving Foam",
  "Mix CD": "Mix CD",
  "Travel Mug": "Travel Mug",
  Umbrella: "Umbrella",
  Receipt: "Receipt",
  "Phone Card": "Phone Card",
  "Scrap Metal": "Scrap Metal",
  Microwave: "Microwave",
  "Cosmetics Case": "Cosmetics Case",
  "Moldy Pizza": "Moldy Pizza",
  Vitamins: "Vitamins",
  Bucket: "Bucket",
  Towel: "Towel",
  "Tin Can": "Tin Can",
  "Rotten Apple": "Rotten Apple",
  "Cell Phone": "Cell Phone",
  Notepad: "Notepad",
  "Soccer Ball": "Soccer Ball",
  Mouthwash: "Mouthwash",
  "Hard Drive": "Hard Drive",
  Broom: "Broom",
  "Floor Cleaner": "Floor Cleaner",
  Headphones: "Headphones",
  "Festering Chicken": "Festering Chicken",
  "Beach Ball": "Beach Ball",
  Detergent: "Detergent",
  "Pack of Music CDs": "Pack of Music CDs",
  "Pack of Cuban Cigars": "Pack of Cuban Cigars",
  Clippers: "Clippers",
  Lubricant: "Lubricant",
  Magazine: "Magazine",
  Stapler: "Stapler",
  "Car Battery": "Car Battery",
  "Sour Milk": "Sour Milk",
  "Spoiled Fish": "Spoiled Fish",
  Bone: "Bone",
  "Oxygen Tank": "Oxygen Tank",
  Syringe: "Syringe",
  Tire: "Tire",
  "Crazy Straw": "Crazy Straw",
  "Cough Syrup": "Cough Syrup",
  "Stale Bread": "Stale Bread",
  "Scalp Massager": "Scalp Massager",
  "Jigsaw Puzzle": "Jigsaw Puzzle",
  Horseshoe: "Horseshoe",
  "Bottle Cap": "Bottle Cap",
  "Hockey Stick": "Hockey Stick",
  "Cigar Cutter": "Cigar Cutter",
  "Picture Frame": "Picture Frame",
  "Dart Board": "Dart Board",
  "Bleaching Tray": "Bleaching Tray",
  Perfume: "Perfume",
  Blanket: "Blanket",
  "Subway Pass": "Subway Pass",
  Ammonia: "Ammonia",
  "Massage Oil": "Massage Oil",
  Formaldehyde: "Formaldehyde",
  "Family Photo": "Family Photo",
  Sensu: "Sensu",
  Dentures: "Dentures",
  "Smelly Cheese": "Smelly Cheese",
  Grain: "Grain",
  "Steel Drum": "Steel Drum",
  "Paper Weight": "Paper Weight",
  Tampon: "Tampon",
  Mop: "Mop",
  Fertilizer: "Fertilizer",
  Chopsticks: "Chopsticks",
  Toothbrush: "Toothbrush",
  "Car Keys": "Car Keys",
  "Yakitori Lantern": "Yakitori Lantern",
  "Mayan Statue": "Mayan Statue",
  "Gold Tooth": "Gold Tooth",
  "Concert Ticket": "Concert Ticket",
  Toothpaste: "Toothpaste",
  "Elephant Statue": "Elephant Statue",
  "Pele Charm": "Pele Charm",
  "Nodding Turtle": "Nodding Turtle",
  Snowboard: "Snowboard",
  "Garden Gnome": "Garden Gnome",
  "Sumo Doll": "Sumo Doll",
  "Driver's License": "Driver's License",
  Hoe: "Hoe",
  Spoon: "Spoon",
  Urea: "Urea",
  "Salt Shaker": "Salt Shaker",
  "Certificate of Lame": "Certificate of Lame",
  "Parking Permit": "Parking Permit",
  Compass: "Compass",
  "Certificate of Awesome": "Certificate of Awesome",
  "Tailor's Dummy": "Tailor's Dummy",
  "Yucca Plant": "Yucca Plant",
  "Razor Wire": "Razor Wire",
  "Croquet Set": "Croquet Set",
  "Fishing Rod": "Fishing Rod",
  "Tractor Part": "Tractor Part",
  "Machine Part": "Machine Part",
  "Hit Contract": "Hit Contract",
  "Igniter Cord": "Igniter Cord",
  "Christmas Lights": "Christmas Lights",
  "Electronic Pumpkin": "Electronic Pumpkin",
  "Hole Punch": "Hole Punch",
  Binoculars: "Binoculars",
  "Remote Detonator": "Remote Detonator",
  "Silver Cutlery Set": "Silver Cutlery Set",
  "Model Space Ship": "Model Space Ship",
  "Model Spine": "Model Spine",
  "Fire Hydrant": "Fire Hydrant",
  "Advent Calendar": "Advent Calendar",
  Sextant: "Sextant",
  Plunger: "Plunger",
  Crockpot: "Crockpot",
  Phosphorus: "Phosphorus",
  "Jade Buddha": "Jade Buddha",
  "Dental Mirror": "Dental Mirror",
  "Turkey Baster": "Turkey Baster",
  Paperclips: "Paperclips",
  "Nitrous Tank": "Nitrous Tank",
  "Potassium Nitrate": "Potassium Nitrate",
  "Massage Table": "Massage Table",
  "Ship in a Bottle": "Ship in a Bottle",
  Handcuffs: "Handcuffs",
  "Silver Coin": "Silver Coin",
  "Afro Comb": "Afro Comb",
  "Santa's Snot": "Santa's Snot",
  "Stick of Dynamite": "Stick of Dynamite",
  "C4 Explosive": "C4 Explosive",
  "Broken Bauble": "Broken Bauble",
  "Christmas Angel": "Christmas Angel",
  "Hunting Trophy": "Hunting Trophy",
  Diploma: "Diploma",
  "Maneki Neko": "Maneki Neko",
  "Polar Bear Toy": "Polar Bear Toy",
  "Birth Certificate": "Birth Certificate",
  "Sprig of Holly": "Sprig of Holly",
  "Cinnamon Decoration": "Cinnamon Decoration",
  "Boat Engine": "Boat Engine",
  Prescription: "Prescription",
  "Raw Ivory": "Raw Ivory",
  "Mini Sleigh": "Mini Sleigh",
  "Gingerbread Man": "Gingerbread Man",
  "Golden Wreath": "Golden Wreath",
  Casket: "Casket",
  Thimble: "Thimble",
  "License Plate": "License Plate",
  Tangerine: "Tangerine",
  "Gingerbread House": "Gingerbread House",
  Snowman: "Snowman",
  "Golden Candy Cane": "Golden Candy Cane",
  "Stamp Collection": "Stamp Collection",
  "Christmas Express": "Christmas Express",
  "Travel Visa": "Travel Visa",
  "Bank Check": "Bank Check",
  "Persian Rug": "Persian Rug",
  Mistletoe: "Mistletoe",
  "Bull Semen": "Bull Semen",
  "Lucky Quarter": "Lucky Quarter",
  "Bowling Trophy": "Bowling Trophy",
  "Spooky Paper Weight": "Spooky Paper Weight",
  "Sticky Notes": "Sticky Notes",
  "Christmas Gnome": "Christmas Gnome",
  "Silver Bead": "Silver Bead",
  "Jack O'Lantern Lamp": "Jack O'Lantern Lamp",
  "Pile of Vomit": "Pile of Vomit",
  "Memory Locket": "Memory Locket",
  Eggnog: "Eggnog",
  Cauldron: "Cauldron",
  Passport: "Passport",
  "Truck Nuts": "Truck Nuts",
  Chandelier: "Chandelier",
  "Witch's Cauldron": "Witch's Cauldron",
  "Oriental Log": "Oriental Log",
  "Japanese\\/English Dictionary": "Japanese\\/English Dictionary",
  "Loaf of Bread": "Loaf of Bread",
  Photographs: "Photographs",
  "Pack of Trojans": "Pack of Trojans",
  "Oriental Log Translation": "Oriental Log Translation",
  "Rotten Eggs": "Rotten Eggs",
  "Article on Crime": "Article on Crime",
  Lint: "Lint",
};

const NOTICE_NOT_OFFICIAL =
  "Note. This isn't an official page. This page is overwritten by Spotlight Search. And is under construction.";
let overlay = createOverlay();
overlay.style.display = "none";

function addStylesAndFonts() {
  // Add Bootstrap CSS
  const bootstrapLink = document.createElement("link");
  bootstrapLink.rel = "stylesheet";
  bootstrapLink.href =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
  document.head.appendChild(bootstrapLink);

  // Add Google Fonts
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap";
  document.head.appendChild(fontLink);

  // Add custom styles
  const style = document.createElement("style");
  style.textContent = `
        body {
            font-family: 'Bricolage Grotesque', sans-serif;
            background-color: #f8f9fa;
        }
        h1, h3 {
            font-weight: 700;
        }
        .custom-combo {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    `;
  document.head.appendChild(style);
}
function createOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "spotlight-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.backdropFilter = "blur(5px)";
  overlay.style.WebkitBackdropFilter = "blur(5px)"; // For Safari
  overlay.style.zIndex = "9999999999999"; // One less than spotlight
  overlay.style.display = "none";
  document.body.appendChild(overlay);
  return overlay;
}

// const overlay = createOverlay();

const spotlightDiv = document.createElement("div");
spotlightDiv.style.zIndex = 100000000000000;
spotlightDiv.style.position = "fixed";
spotlightDiv.style.left = "50%";
spotlightDiv.style.transform = "translateX(-50%)";
spotlightDiv.style.width = "500px";
spotlightDiv.style.top = "100px";

const spotlight = document.createElement("input");
spotlight.setAttribute("type", "text");
spotlight.setAttribute("id", "spotlight");
spotlight.setAttribute("placeholder", "Spotlight Search");
spotlight.classList.add("spotlight");
// spotlight.style.width = "100%";
spotlight.style.visibility = "hidden";

spotlightDiv.appendChild(spotlight);
document.body.appendChild(spotlightDiv);

function showSpotlight(dictionary, onSelect, previewURL = true) {
  const spotlightDiv = document.createElement("div");
  spotlightDiv.style.zIndex = 100000000000000;
  spotlightDiv.style.position = "fixed";
  spotlightDiv.style.left = "50%";
  spotlightDiv.style.transform = "translateX(-50%)";
  spotlightDiv.style.width = "500px";
  spotlightDiv.style.top = "100px";

  const spotlight = document.createElement("input");
  spotlight.setAttribute("type", "text");
  spotlight.setAttribute("id", "spotlight");
  spotlight.setAttribute("placeholder", "Spotlight Search");
  spotlight.classList.add("spotlight");

  spotlightDiv.appendChild(spotlight);
  document.body.appendChild(spotlightDiv);

  const overlay = createOverlay();
  overlay.style.display = "block";
  overlay.style.zIndex = "99999";

  spotlight.style.visibility = "visible";
  spotlight.value = "";
  spotlight.focus();

  setupAutocomplete(
    spotlight,
    dictionary,
    (selectedKey) => {
      document.body.removeChild(spotlightDiv);
      overlay.style.display = "none";
      onSelect(selectedKey);
    },
    previewURL,
  );

  spotlight.dispatchEvent(new Event("input"));
  document.addEventListener("click", function closeSpotlight(event) {
    if (event.target.id !== "spotlight") {
      document.body.removeChild(spotlightDiv);
      overlay.style.display = "none";
      document.removeEventListener("click", closeSpotlight);
    }
  });
}

function KeyPress(e) {
  var evtobj = window.event ? event : e;
  const mainSpotlight = loadSetting(
    "mainSpotlight",
    DEFAULT_MAIN_SPOTLIGHT_KEY_COMBINATION,
  );
  const marketSpotlight = loadSetting(
    "marketSpotlight",
    DEFAULT_MARKET_KEY_COMBINATION,
  );
  const customCombinations = loadSetting("customCombinations", {});

  function checkKeyCombo(combo) {
    const [key, ...modifiers] = combo.split("+").reverse();
    return (
      evtobj.ctrlKey === modifiers.includes("Ctrl") &&
      evtobj.altKey === modifiers.includes("Alt") &&
      evtobj.shiftKey === modifiers.includes("Shift") &&
      evtobj.key.toUpperCase() === key
    );
  }

  // Check for main spotlight
  let keys = initializeSpotlightDictionary();
  if (checkKeyCombo(mainSpotlight)) {
    showSpotlight(keys, (selectedValue) => {
      window.location.href = keys[selectedValue];
    });
    return;
  }

  // Check for market spotlight
  if (checkKeyCombo(marketSpotlight)) {
    showSpotlight(
      marketItems,
      (selectedItem) => {
        const marketSearchUrl =
          "https://www.torn.com/imarket.php#/p=shop&step=shop&type=&searchname={q}";
        const url = marketSearchUrl.replace(
          "{q}",
          encodeURIComponent(selectedItem),
        );
        window.location.href = url;
      },
      (previewURL = false),
    );
    return;
  }

  // Check for custom combinations
  for (const [combo, action] of Object.entries(customCombinations)) {
    if (checkKeyCombo(combo)) {
      if (urlDictionary[action]) {
        window.location.href = urlDictionary[action];
      } else {
        window.location.href = action;
      }
      return;
    }
  }

  // Check for /add command
  if (
    evtobj.key === "Enter" &&
    document.activeElement.tagName === "INPUT" &&
    document.activeElement.value.startsWith("/add")
  ) {
    if (handleAddCommand(document.activeElement.value)) {
      document.activeElement.value = "";
      return;
    }
  }
}
function matchScore(word, string) {
  word = word.toLowerCase();
  string = string.toLowerCase();

  // Split the string into words
  const words = string.split(/\s+/);

  // Check for exact word match
  if (words.includes(word)) return [2, 0];

  // Check for partial word match
  for (let w of words) {
    if (w.includes(word)) return [1, w.indexOf(word)];
  }

  // Check for ordered character match
  let i = 0;
  let gaps = 0;
  for (let char of string) {
    if (char === word[i]) {
      i++;
      if (i === word.length) return [0, gaps];
    } else {
      gaps++;
    }
  }

  return [-1, Infinity]; // No match
}

function sortKeys(input, dictionary) {
  return Object.keys(dictionary).sort((a, b) => {
    const [scoreA, gapsA] = matchScore(input, a);
    const [scoreB, gapsB] = matchScore(input, b);

    if (scoreA !== scoreB) return scoreB - scoreA;
    if (gapsA !== gapsB) return gapsA - gapsB;
    return a.localeCompare(b);
  });
}

let currentFocus = 0;
function setupAutocomplete(
  inputElement,
  dictionary,
  onSelect,
  previewURL = true,
) {
  let currentFocus = 0;

  inputElement.addEventListener("input", function () {
    closeAllLists();
    currentFocus = 0;
    const autocompleteList = document.createElement("div");
    autocompleteList.setAttribute("id", this.id + "-autocomplete-list");
    autocompleteList.setAttribute("class", "autocomplete-items");
    autocompleteList.classList.add("spotlight-suggestion-box");
    autocompleteList.style.maxHeight = "400px";
    autocompleteList.style.overflowY = "scroll";
    this.parentNode.appendChild(autocompleteList);

    const sortedKeys = sortKeys(this.value, dictionary);

    for (let i = 0; i < sortedKeys.length; i++) {
      const key = sortedKeys[i];
      const [score, _] = matchScore(this.value, key);
      if (score >= 0 || !this.value) {
        const item = document.createElement("DIV");
        item.innerHTML = key;
        if (dictionary[key] && previewURL === true) {
          item.innerHTML +=
            "<br><small style='font-size: 12px'>" +
            dictionary[key] +
            "</small>";
        }
        item.innerHTML += "<input type='hidden' value='" + key + "'>";
        item.addEventListener("click", function () {
          inputElement.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
          onSelect(inputElement.value);
        });
        item.classList.add("spotlight-suggestion-item");
        if (i === currentFocus) {
          item.classList.add("spotlight-suggestion-active");
        }
        autocompleteList.appendChild(item);
      }
    }
  });

  inputElement.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "-autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      } else {
        onSelect(this.value);
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("spotlight-suggestion-active");
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("spotlight-suggestion-active");
    }
  }

  function closeAllLists(elmnt) {
    const x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inputElement) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

document.onkeydown = KeyPress;

document.addEventListener("click", function (event) {
  if (event.target.id != "spotlight") {
    const spotlight = document.getElementById("spotlight");
    if (spotlight) {
      spotlight.style.visibility = "hidden";
      overlay.style.display = "none";
    }
  }
});

let styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    .spotlight {
        list-style: none;
        font: inherit;
        font-size: 18px;
        vertical-align: middle;
        border: 0;
        text-shadow: none;
        background: linear-gradient(0deg,#111,#000);
        border-radius: 5px;
        box-shadow: 0 1px 0 hsla(0,0%,100%,.102);
        box-sizing: border-box;
        color: #9f9f9f;
        display: inline;
        font-weight: 600;
        height: 36px;
        margin: 0;
        outline: none;
        padding: 0 25px 0 10px;
        width: 100%;
        line-height: 26px;
        padding-right: 26px;

        position: relative;
        zIndex: 1;
    }

    .spotlight-suggestion-item {
        text-shadow: 0 1px 0 #333;
        list-style: none;
        scrollbar-color: #666 #333;
        margin: 0;
        border: 0;
        font: inherit;
        vertical-align: baseline;
        text-decoration: none;
        color: #ccc;
        cursor: pointer;
        display: block;
        font-size: 12px;
        line-height: 18px;
        padding: 4px 10px;
        background: #333;
    }

    .spotlight-suggestion-box {
        text-shadow: 0 1px 0 #333;
        list-style: none;
        color: #666;
        scrollbar-color: #666 #333;
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        vertical-align: baseline;
    }

    .spotlight-suggestion-active {
        background-color: rgba(0,0,0);
    }

    .spotlight-input {
      list-style: none;
      margin: 0;
      font: inherit;
      font-family: Arial, serif;
      color: var(--input-color);
      background: var(--input-background-color);
      border: 1px solid;
      border-color: var(--input-border-color);
      line-height: 14px;
      height: 14px;
      border-radius: 5px;
      text-align: left;
      padding-top: 4px;
      padding-right: 5px;
      padding-bottom: 4px;
      display: inline-block;
      vertical-align: middle;
      padding-left: 5px;
      width: 212px;
    }

    #settingsContainer {
      padding: 50px;
    }
`;

document.body.appendChild(styleSheet);

function createSettingsPage() {
  addNotificationOfNotTornPage();

  // Create settings container
  const settingsContainer = document.createElement("div");
  settingsContainer.id = "settingsContainer";
  // settingsContainer.id = 'spotlight-settings';
  // settingsContainer.style.padding = '20px';
  // settingsContainer.style.maxWidth = '800px';
  // settingsContainer.style.margin = '0 auto';

  // Add title
  // const title = document.createElement('h1');
  // title.textContent = 'Torn Spotlight Search Settings';
  // settingsContainer.appendChild(title);

  // const additionalConfig = createOtherSettingsDivision();
  // settingsContainer.appendChild(additionalConfig);
  //

  // Donation Links
  const donationDiv = createDonationLinks();
  settingsContainer.appendChild(donationDiv);

  // 1. Main Spotlight
  const mainSpotlightSection = createKeyBindingSection(
    "Main Spotlight",
    "mainSpotlight",
    loadSetting("mainSpotlight", DEFAULT_MAIN_SPOTLIGHT_KEY_COMBINATION),
  );
  settingsContainer.appendChild(mainSpotlightSection);

  // 2. Market Spotlight
  const marketSpotlightSection = createKeyBindingSection(
    "Market Spotlight",
    "marketSpotlight",
    loadSetting("marketSpotlight", DEFAULT_MARKET_KEY_COMBINATION),
  );
  settingsContainer.appendChild(marketSpotlightSection);

  // Custom key combinations section
  const customSection = document.createElement("div");
  customSection.id = "custom-key-combinations";
  const customTitle = document.createElement("h3");
  customTitle.textContent = "Custom Key Combinations";
  customSection.appendChild(customTitle);

  // Add button for new custom combination
  const addButton = document.createElement("button");
  addButton.textContent = "Add Custom Combination";
  addButton.classList.add("torn-btn");
  addButton.classList.add("btn-small");
  addButton.addEventListener("click", () =>
    addCustomCombination(customSection),
  );
  customSection.appendChild(addButton);

  settingsContainer.appendChild(customSection);

  // Load existing custom combinations
  const customCombinations = loadSetting("customCombinations", {});
  for (const [key, value] of Object.entries(customCombinations)) {
    addCustomCombination(customSection, key, value);
  }

  // Custom Pages
  // Spotlight Dictionary section
  const dictionarySection = document.createElement("div");
  dictionarySection.id = "spotlight-dictionary";
  dictionarySection.className = "mt-4";
  const dictionaryTitle = document.createElement("h3");
  dictionaryTitle.textContent = "Spotlight Dictionary";
  dictionaryTitle.className = "mb-3";
  dictionarySection.appendChild(dictionaryTitle);

  const spotlightDict = initializeSpotlightDictionary();
  for (const [name, url] of Object.entries(spotlightDict)) {
    addDictionaryItemToSettings(dictionarySection, name, url);
  }

  // Add new item button
  const addButton2 = document.createElement("button");
  addButton2.textContent = "Add New Page";
  addButton2.className = "torn-btn btn-small";
  addButton2.addEventListener("click", () =>
    addDictionaryItemToSettings(dictionarySection, "", ""),
  );
  dictionarySection.appendChild(addButton2);

  settingsContainer.appendChild(dictionarySection);
  // const customPagesSection = document.createElement("div");
  // customPagesSection.id = "custom-pages";
  // customPagesSection.className = "mt-4";
  // const customPagesTitle = document.createElement("h3");
  // customPagesTitle.textContent = "Custom Pages";
  // customPagesTitle.className = "mb-3";
  // customPagesSection.appendChild(customPagesTitle);

  // const customPages = loadSetting("customPages", {});
  // for (const [name, url] of Object.entries(customPages)) {
  //   addCustomPageToSettings(customPagesSection, name, url);
  // }

  // settingsContainer.appendChild(customPagesSection);

  // Save button
  const footerDiv = document.createElement("div");
  footerDiv.style.position = "fixed";
  footerDiv.style.bottom = "0";
  footerDiv.style.width = "100%";
  settingsContainer.appendChild(footerDiv);
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save Settings";
  saveButton.classList.add("torn-btn");
  saveButton.style.marginTop = "20px";
  saveButton.addEventListener("click", saveSettings);
  footerDiv.appendChild(saveButton);

  // Change title of Page
  document.title = "Settings | Spotlight Search";

  // Add settings to main container
  const defaultMainContainer = document.getElementById("mainContainer");
  defaultMainContainer.innerHTML = "";
  defaultMainContainer.appendChild(settingsContainer);
}

function createKeyBindingSection(label, id, defaultValue) {
  const section = document.createElement("div");
  section.style.marginBottom = "20px";

  const sectionLabel = document.createElement("p");
  sectionLabel.textContent = label;
  section.appendChild(sectionLabel);

  const input = document.createElement("input");
  input.type = "text";
  input.id = id;
  input.value = defaultValue;
  input.classList.add("input-text");
  input.classList.add("spotlight-input");
  input.addEventListener("keydown", captureKeyCombo);
  section.appendChild(input);

  return section;
}

function addCustomCombination(
  parentElement,
  existingKey = "",
  existingValue = "",
) {
  const combinationDiv = document.createElement("div");
  combinationDiv.style.marginBottom = "10px";

  const keyInput = document.createElement("input");
  keyInput.type = "text";
  keyInput.placeholder = "Key Combination";
  keyInput.value = existingKey;
  keyInput.classList.add("spotlight-input");
  keyInput.addEventListener("keydown", captureKeyCombo);
  combinationDiv.appendChild(keyInput);

  const selectElement = document.createElement("select");
  selectElement.style.marginLeft = "10px";

  // Add options from urlDictionary
  for (const key of Object.keys(urlDictionary)) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = key;
    option.classList.add("item");
    selectElement.appendChild(option);
  }

  // Add 'Other' option
  const otherOption = document.createElement("option");
  otherOption.value = "other";
  otherOption.textContent = "Other";
  selectElement.appendChild(otherOption);

  combinationDiv.appendChild(selectElement);

  const urlInput = document.createElement("input");
  urlInput.type = "text";
  urlInput.placeholder = "Custom URL";
  urlInput.style.display = "none";
  urlInput.style.marginLeft = "10px";
  urlInput.classList.add("spotlight-input");
  combinationDiv.appendChild(urlInput);

  if (existingValue && !urlDictionary[existingValue]) {
    selectElement.value = "other";
    urlInput.style.display = "inline-block";
    urlInput.value = existingValue;
  } else if (existingValue) {
    selectElement.value = existingValue;
  }

  selectElement.addEventListener("change", () => {
    if (selectElement.value === "other") {
      urlInput.style.display = "inline-block";
    } else {
      urlInput.style.display = "none";
    }
  });

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.style.marginLeft = "10px";
  removeButton.classList.add("torn-btn");
  removeButton.classList.add("btn-small");
  removeButton.addEventListener("click", () =>
    parentElement.removeChild(combinationDiv),
  );
  combinationDiv.appendChild(removeButton);

  parentElement.insertBefore(combinationDiv, parentElement.lastElementChild);
}

function saveSettings() {
  const mainSpotlight = document.getElementById("mainSpotlight").value;
  const marketSpotlight = document.getElementById("marketSpotlight").value;

  saveSetting("mainSpotlight", mainSpotlight);
  saveSetting("marketSpotlight", marketSpotlight);

  const customCombinations = {};
  const customSection = document.getElementById("custom-key-combinations");
  const combinationDivs = customSection.getElementsByTagName("div");

  for (const div of combinationDivs) {
    const keyCombo = div.getElementsByTagName("input")[0].value;
    const selectElement = div.getElementsByTagName("select")[0];
    const urlInput = div.getElementsByTagName("input")[1];

    if (keyCombo) {
      if (selectElement.value === "other") {
        customCombinations[keyCombo] = urlInput.value;
      } else {
        customCombinations[keyCombo] = selectElement.value;
      }
    }
  }

  // const customPages = {};
  // const customPagesSection = document.getElementById("custom-pages");
  // const pageDivs = customPagesSection.getElementsByClassName("custom-page");
  // for (const div of pageDivs) {
  //   const nameInput = div.getElementsByTagName("input")[0];
  //   const urlInput = div.getElementsByTagName("input")[1];
  //   customPages[nameInput.value] = urlInput.value;
  // }
  // saveSetting("customPages", customPages);

  const spotlightDict = {};
  const dictionarySection = document.getElementById("spotlight-dictionary");
  const itemDivs = dictionarySection.getElementsByClassName("dictionary-item");
  for (const div of itemDivs) {
    const nameInput = div.getElementsByTagName("input")[0];
    const urlInput = div.getElementsByTagName("input")[1];
    if (nameInput.value && urlInput.value) {
      spotlightDict[nameInput.value] = urlInput.value;
    }
  }
  saveSetting("spotlightDictionary", spotlightDict);

  saveSetting("customCombinations", customCombinations);

  alert("Settings saved successfully!");
}

function loadSetting(key, defaultValue) {
  const value = localStorage.getItem(`spotlightSearch_${key}`);
  return value !== null ? JSON.parse(value) : defaultValue;
}

function saveSetting(key, value) {
  localStorage.setItem(`spotlightSearch_${key}`, JSON.stringify(value));
}

function captureKeyCombo(event) {
  event.preventDefault();
  const key = event.key.toUpperCase();
  const combo = [];
  if (event.ctrlKey) combo.push("Ctrl");
  if (event.altKey) combo.push("Alt");
  if (event.shiftKey) combo.push("Shift");
  combo.push(key);
  event.target.value = combo.join("+");
}

// Add this near the top of your script
if (window.location.pathname === SETTINGS_PAGE) {
  styleSheet += `
    * {
    font-family: 'Bricolage Grotesque';
    }
    `;
  createSettingsPage();
  return;
}

function createOtherSettingsDivision() {
  const mainDivision = document.createElement("div");

  // Preview URL
  const previewURL = document.createElement("div");
  const previewURLCheckbox = document.createElement("input");
  previewURLCheckbox.type = "checkbox";
  previewURLCheckbox.id = "previewURLCheckbox";
  previewURLCheckbox.checked = loadSetting("previewURL", true);
  previewURL.appendChild(previewURLCheckbox);
  previewURL.appendChild(document.createTextNode("Preview URL"));

  // Add all childs
  mainDivision.appendChild(previewURL);

  return mainDivision;
}

function addCustomPageToSettings(parentElement, name, url) {
  const pageDiv = document.createElement("div");
  pageDiv.className = "custom-page mb-3 p-3 custom-combo";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "form-control mb-2 spotlight-input";
  nameInput.value = name;
  pageDiv.appendChild(nameInput);

  const urlInput = document.createElement("input");
  urlInput.type = "text";
  urlInput.className = "form-control mb-2 spotlight-input";
  urlInput.value = url;
  pageDiv.appendChild(urlInput);

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.className = "btn btn-danger btn-sm torn-btn btn-small";
  removeButton.addEventListener("click", () => {
    parentElement.removeChild(pageDiv);
    const customPages = loadSetting("customPages", {});
    delete customPages[name];
    saveSetting("customPages", customPages);
  });
  pageDiv.appendChild(removeButton);

  parentElement.appendChild(pageDiv);
}

/**
 * Add a notification that this is not an official Torn page.
 */
function addNotificationOfNotTornPage() {
  const headerRootElement = document.getElementById("header-root");
  const notifyUser = document.createElement("div");
  const notifyUserText = document.createElement("h4");
  notifyUserText.textContent = NOTICE_NOT_OFFICIAL;
  notifyUser.style.color = "#f00";
  notifyUser.style.marginTop = "20px";
  notifyUserText.style.fontSize = "12px";
  notifyUser.appendChild(notifyUserText);
  headerRootElement.appendChild(notifyUser);
}

function handleAddCommand(command) {
  const match = command.match(/^\/add\s*(.*)$/);
  if (match) {
    const pageName = match[1].trim() || `Custom Page ${Date.now()}`;
    const currentUrl = window.location.href;
    addCustomPage(pageName, currentUrl);
    return true;
  }
  return false;
}

function addCustomPage(name, url) {
  const spotlightDict = loadSetting("spotlightDictionary", {});
  spotlightDict[name] = url;
  saveSetting("spotlightDictionary", spotlightDict);
  alert(`Added "${name}" to spotlight dictionary.`);
}

function addDictionaryItemToSettings(parentElement, name, url) {
  const itemDiv = document.createElement("div");
  itemDiv.className = "dictionary-item mb-3 p-3 custom-combo";
  itemDiv.style.marginBottom = "10px";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "form-control mb-2 spotlight-input";
  nameInput.value = name;
  nameInput.placeholder = "Name";
  itemDiv.appendChild(nameInput);

  const urlInput = document.createElement("input");
  urlInput.type = "text";
  urlInput.className = "form-control spotlight-input";
  urlInput.value = url;
  urlInput.placeholder = "URL";
  itemDiv.appendChild(urlInput);

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.className = "btn btn-danger btn-sm torn-btn btn-small";
  removeButton.addEventListener("click", () => {
    parentElement.removeChild(itemDiv);
  });
  itemDiv.appendChild(removeButton);

  parentElement.appendChild(itemDiv);
}

function initializeSpotlightDictionary() {
  const storedDictionary = loadSetting("spotlightDictionary", null);
  if (storedDictionary === null) {
    saveSetting("spotlightDictionary", urlDictionary);
    return urlDictionary;
  }
  return storedDictionary;
}

function createDonationLinks() {
  const donationLinks = document.createElement("div");

  const buyMeACoffee = document.createElement("a");
  buyMeACoffee.href = "https://www.buymeacoffee.com/jayampatel";
  buyMeACoffee.target = "_blank";
  buyMeACoffee.className = "btn btn-primary btn-sm torn-btn btn-big";
  buyMeACoffee.textContent = "Buy me a Coffee";

  buyMeACoffee.style.marginRight = "10px";

  const orBuySomeXanax = document.createElement("a");
  orBuySomeXanax.href = "https://www.torn.com/profiles.php?XID=3165209";
  orBuySomeXanax.target = "_blank";
  orBuySomeXanax.className = "btn btn-primary btn-sm torn-btn btn-big";
  orBuySomeXanax.textContent = "Or buy some Xanax";

  const notice = document.createElement("p");
  notice.textContent =
    "You are donating to me (developer of this extension) and NOT to Torn.";
  notice.style.marginTop = "10px";
  notice.style.marginBottom = "10px";
  notice.style.fontSize = "12px";
  notice.style.color = "#088";

  donationLinks.appendChild(buyMeACoffee);
  donationLinks.appendChild(orBuySomeXanax);
  donationLinks.appendChild(notice);
  return donationLinks;
}

// Add Spotlight Icon in Status Icons
addIconInStatusIcons(
  SETTINGS_PAGE,
  "https://raw.githubusercontent.com/jayam04/torn-scripts/master/tornSpotlightSearch/icon.png",
);
