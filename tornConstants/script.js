// ==UserScript==
// @name         Constants for Torn Scripts (for Developers)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Useful constants for Torn
// @author       Jayam Patel
// @match        https://www.torn.com/*
// @match        https://yata.yt/*
// @icon         https://raw.githubusercontent.com/jayam04/torn-scripts/master/tornSpotlightSearch/icon.png
// @license      Apache License 2.0
// @grant        none
// ==/UserScript==

const PAGES = {
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
    "Organized Crimes":
        "https://www.torn.com/factions.php?step=your#/tab=crimes",
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
    "Property Vault":
        "https://www.torn.com/properties.php#/p=options&tab=vault",
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

const MARKET_ITEMS = [
    "Hammer",
    "Fine Chisel",
    "Lead Pipe",
    "Baseball Bat",
    "Pair of Ice Skates",
    "Crowbar",
    "Spear",
    "Knuckle Dusters",
    "Leather Bullwhip",
    "Sai",
    "Pen Knife",
    "Kitchen Knife",
    "Bo Staff",
    "Butterfly Knife",
    "Dagger",
    "Swiss Army Knife",
    "Golf Club",
    "Pair of High Heels",
    "Chain Whip",
    "Axe",
    "Wooden Nunchaku",
    "Ninja Claws",
    "Frying Pan",
    "Scimitar",
    "Pillow",
    "Plastic Sword",
    "Cricket Bat",
    "Chainsaw",
    "Katana",
    "Ice Pick",
    "Kama",
    "Twin Tiger Hooks",
    "Samurai Sword",
    "Bone Saw",
    "Wushu Double Axes",
    "Claymore Sword",
    "Rusty Sword",
    "Macana",
    "Kodachi",
    "Guandao",
    "Diamond Icicle",
    "Metal Nunchaku",
    "Diamond Bladed Knife",
    "Yasukuni Sword",
    "Cattle Prod",
    "Flail",
    "Madball",
    "Ivory Walking Cane",
    "Meat Hook",
    "Blood Spattered Sickle",
    "Naval Cutlass",
    "Cleaver",
    "Petrified Humerus",
    "Golden Broomstick",
    "Riding Crop",
    "Devil's Pitchfork",
    "Dual Hammers",
    "Sledgehammer",
    "Dual Scimitars",
    "Poison Umbrella",
    "Dual Axes",
    "Dual Samurai Swords",
    "Bread Knife",
    "Handbag",
    "Thompson",
    "Sawed-Off Shotgun",
    "Benelli M1 Tactical",
    "MP5 Navy",
    "SKS Carbine",
    "Vektor CR-21",
    "P90",
    "Ithaca 37",
    "AK74U",
    "MP 40",
    "XM8 Rifle",
    "AK-47",
    "Bushmaster Carbon 15",
    "M4A1 Colt Carbine",
    "Benelli M4 Super",
    "Heckler & Koch SL8",
    "M16 A2 Rifle",
    "Mag 7",
    "SIG 550",
    "Steyr AUG",
    "Enfield SA-80",
    "Tavor TAR-21",
    "9mm Uzi",
    "M249 SAW",
    "Minigun",
    "Jackhammer",
    "SIG 552",
    "ArmaLite M-15A4",
    "Negev NG-5",
    "PKM",
    "Stoner 96",
    "Nock Gun",
    "Snow Cannon",
    "Rheinmetall MG 3",
    "Gold Plated AK-47",
    "Dual MP5s",
    "Slingshot",
    "Flare Gun",
    "Glock 17",
    "Lorcin 380",
    "Skorpion",
    "Taurus",
    "Raven MP25",
    "Springfield 1911",
    "TMP",
    "Luger",
    "MP5k",
    "Ruger 57",
    "Crossbow",
    "S&W Revolver",
    "Beretta M9",
    "USP",
    "Blowgun",
    "Taser",
    "Fiveseven",
    "Blunderbuss",
    "Magnum",
    "Desert Eagle",
    "BT MP9",
    "Cobra Derringer",
    "Qsz-92",
    "S&W M29",
    "Harpoon",
    "Beretta 92FS",
    "Flamethrower",
    "Dual 92G Berettas",
    "Beretta Pico",
    "Type 98 Anti Tank",
    "Homemade Pocket Shotgun",
    "RPG Launcher",
    "SMAW Launcher",
    "China Lake",
    "Milkor MGL",
    "Wrench",
    "Fireworks",
    "Brick",
    "Ninja Star",
    "Pepper Spray",
    "Grenade",
    "Stick Grenade",
    "Snowball",
    "Claymore Mine",
    "Trout",
    "HEG",
    "Flash Grenade",
    "Throwing Knife",
    "Tear Gas",
    "Molotov Cocktail",
    "Glitter Bomb",
    "Smoke Grenade",
    "Party Popper",
    "Melatonin",
    "Tyrosine",
    "Epinephrine",
    "Serotonin",
    "Nail Bomb",
    "Concussion Grenade",
    "Book",
    "Sand",
    "Leather Gloves",
    "Leather Boots",
    "Leather Helmet",
    "Leather Pants",
    "Leather Vest",
    "Chain Mail",
    "Hiking Boots",
    "Flak Jacket",
    "Police Vest",
    "Construction Helmet",
    "Bulletproof Vest",
    "Safety Boots",
    "Full Body Armor",
    "WWII Helmet",
    "Kevlar Gloves",
    "Outer Tactical Vest",
    "Combat Gloves",
    "Combat Boots",
    "Combat Pants",
    "Combat Helmet",
    "Combat Vest",
    "Liquid Body Armor",
    "Flexible Body Armor",
    "Medieval Helmet",
    "Motorcycle Helmet",
    "Dune Pants",
    "Dune Boots",
    "Dune Vest",
    "Dune Gloves",
    "Riot Boots",
    "Dune Helmet",
    "Assault Helmet",
    "Riot Gloves",
    "Riot Pants",
    "Assault Gloves",
    "Riot Helmet",
    "Riot Body",
    "Assault Boots",
    "Assault Pants",
    "Assault Body",
    "Marauder Gloves",
    "Delta Gloves",
    "Delta Boots",
    "Delta Pants",
    "Marauder Pants",
    "Marauder Boots",
    "Delta Body",
    "Vanguard Boots",
    "Marauder Face Mask",
    "Welding Helmet",
    "Vanguard Gloves",
    "Marauder Body",
    "Vanguard Pants",
    "Delta Gas Mask",
    "Vanguard Body",
    "Sentinel Boots",
    "Sentinel Helmet",
    "Sentinel Gloves",
    "Sentinel Pants",
    "Sentinel Apron",
    "EOD Boots",
    "EOD Gloves",
    "Vanguard Respirator",
    "EOD Helmet",
    "EOD Apron",
    "Hazmat Suit",
    "Small First Aid Kit",
    "First Aid Kit",
    "Morphine",
    "Blood Bag : O+",
    "Blood Bag : A+",
    "Blood Bag : A-",
    "Empty Blood Bag",
    "Blood Bag : B+",
    "Blood Bag : AB+",
    "Blood Bag : O-",
    "Blood Bag : B-",
    "Blood Bag : AB-",
    "Blood Bag : Irradiated",
    "Ipecac Syrup",
    "Neumune Tablet",
    "Antidote",
    "Shrooms",
    "Vicodin",
    "Ketamine",
    "Cannabis",
    "PCP",
    "Speed",
    "Ecstasy",
    "Opium",
    "LSD",
    "Xanax",
    "Love Juice",
    "Can of Goose Juice",
    "Can of Damp Valley",
    "Can of Crocozade",
    "Can of Munster",
    "Can of Santa Shooters",
    "Can of Red Cow",
    "Can of Rockstar Rudolph",
    "Can of X-MASS",
    "Can of Taurine Elite",
    "Bottle of Tequila",
    "Bottle of Beer",
    "Bottle of Sake",
    "Bottle of Champagne",
    "Bottle of Kandy Kane",
    "Bottle of Pumpkin Brew",
    "Bottle of Wicked Witch",
    "Bottle of Minty Mayhem",
    "Bottle of Christmas Cocktail",
    "Bottle of Mistletoe Madness",
    "Bottle of Stinky Swamp Punch",
    "Bottle of Green Stout",
    "Bottle of Moonshine",
    "Bottle of Christmas Spirit",
    "Bag of Bon Bons",
    "Bag of Chocolate Kisses",
    "Lollipop",
    "Box of Sweet Hearts",
    "Box of Chocolate Bars",
    "Box of Bon Bons",
    "Box of Extra Strong Mints",
    "Big Box of Chocolate Bars",
    "Bag of Candy Kisses",
    "Bag of Tootsie Rolls",
    "Bag of Bloody Eyeballs",
    "Bag of Chocolate Truffles",
    "Bag of Reindeer Droppings",
    "Chocolate Egg",
    "Pixie Sticks",
    "Bag of Sherbet",
    "Jawbreaker",
    "Bag of Humbugs",
    "Birthday Cupcake",
    "Lawyer's Business Card",
    "Gift Card",
    "Erotic DVD",
    "Feathery Hotel Coupon",
    "Book of Carols",
    "Skateboard",
    "Dumbbells",
    "Parachute",
    "Boxing Gloves",
    "Cut-Throat Razor",
    "Glasses",
    "Chloroform",
    "Tracking Device",
    "Fanny Pack",
    "Advanced Driving Manual",
    "Flashlight",
    "Tumble Dryer",
    "High-Speed Drive",
    "Mountain Bike",
    "Wireless Dongle",
    "Heavy Duty Padlock",
    "Megaphone",
    "Duct Tape",
    "Paint Mask",
    "Screwdriver",
    "Latex Gloves",
    "Ergonomic Keyboard",
    "Balaclava",
    "Rosary Beads",
    "Small Suitcase",
    "Magnifying Glass",
    "Windproof Lighter",
    "Medium Suitcase",
    "Office Chair",
    "Large Suitcase",
    "MP3 Player",
    "CD Player",
    "Empty Box",
    "Box of Tissues",
    "Television",
    "Game Console",
    "Vanity Hand Mirror",
    "Christmas Cracker",
    "Stink Bombs",
    "Toilet Paper",
    "Dog Poop",
    "Horse's Head",
    "Small Explosive Device",
    "Business Class Ticket",
    "Casino Pass",
    "Donator Pack",
    "Strippogram Voucher",
    "Poison Mistletoe",
    "Cesium-137",
    "Dirty Bomb",
    "Computer Fan",
    "Handkerchief",
    "Bolt Cutters",
    "Double Cut File",
    "Shovel",
    "Credit Card",
    "CPU",
    "PSU",
    "eCPU",
    "Fountain Pen",
    "Personal Computer",
    "Drill",
    "Laptop",
    "Spy Camera",
    "Ladder",
    "Jemmy",
    "Card Skimmer",
    "Wheelbarrow",
    "Torn City Times",
    "Simple Virus",
    "Lump of Coal",
    "Permanent Marker",
    "Sewing Kit",
    "Wire Cutters",
    "Water Block",
    "Lockpicks",
    "Graver",
    "Scissors",
    "Coat Hanger",
    "Tunneling Virus",
    "Heat Sink",
    "Typewriter",
    "Polymorphic Virus",
    "Grinding Stone",
    "Crucible",
    "Skeleton Key",
    "Perforator",
    "Firewalk Virus",
    "Window Breaker",
    "Armored Virus",
    "Polishing Pad",
    "Stealth Virus",
    "Police Badge",
    "Printer",
    "HPCPU",
    "Lost and Found Office Key",
    "Wax Seal Stamp",
    "Metal Detector",
    "Embosser",
    "Hot Foil Stamper",
    "Cemetery Key",
    "Generic Wrapping Paper",
    "Fruitcake",
    "Christmas Wrapping Paper",
    "Birthday Wrapping Paper",
    "Glue",
    "Blank DVDs",
    "Spray Paint : Orange",
    "Bond Paper",
    "Spray Paint : Green",
    "Spray Paint : Blue",
    "Adhesive Plastic",
    "Spray Paint : Red",
    "Spray Paint : Purple",
    "Rope",
    "Cardstock",
    "Gasoline",
    "Toner",
    "Spray Paint : Pink",
    "Spray Paint : Black",
    "Spray Paint : White",
    "Paper Towels",
    "Aluminum Plate",
    "Crushed Enamel",
    "Brass Ingot",
    "Bleach",
    "Lye",
    "PVC Cards",
    "Inkwell",
    "Insurance Policy",
    "Hydrochloric Acid",
    "Glow Stick",
    "Candle",
    "Blank Tokens",
    "Printing Paper",
    "Medical Bill",
    "Blowtorch",
    "Bank Statement",
    "Anchor",
    "Certificate Seal",
    "Bonded Latex",
    "Coin Purse",
    "Cardholder",
    "Old Wallet",
    "Clutch",
    "Zip Wallet",
    "Billfold",
    "Stash Box",
    "Box of Medical Supplies",
    "Denim Cache",
    "Lottery Voucher",
    "Tin of Treats",
    "Box of Grenades",
    "Elderly Cache",
    "Six-Pack of Alcohol",
    "Cutesy Cache",
    "Gentleman Cache",
    "Elegant Cache",
    "Wannabe Cache",
    "Drug Pack",
    "Injury Cache",
    "Naughty Cache",
    "Keg of Beer",
    "Six-Pack of Energy Drink",
    "Goodie Bag",
    "Small Arms Cache",
    "Anniversary Present",
    "Melee Cache",
    "Medium Arms Cache",
    "Armor Cache",
    "Heavy Arms Cache",
    "Parcel",
    "Plastic Watch",
    "Silver Necklace",
    "Pearl Necklace",
    "Stainless Steel Watch",
    "Plain Silver Ring",
    "Gold Necklace",
    "Gold Watch",
    "Gold Ring",
    "Sapphire Ring",
    "Diamond Ring",
    "Cocktail Ring",
    "Crystal Bracelet",
    "Statement Necklace",
    "Gold Chain",
    "Peplum Top",
    "Pencil Skirt",
    "Pantyhose",
    "Camisole",
    "Bermudas",
    "Yoga Pants",
    "Gym Shorts",
    "Tank Top",
    "Sweater",
    "Blouse",
    "Capri Pants",
    "Skirt",
    "Mediocre T-Shirt",
    "Turtleneck",
    "Travel Socks",
    "Halterneck",
    "Jacket",
    "Shorts",
    "Puffer Vest",
    "Baseball Cap",
    "Boob Tube",
    "Polo Shirt",
    "Cardigan",
    "Trainers",
    "Festive Socks",
    "Cork Hat",
    "Bandana",
    "Disposable Mask",
    "Proda Sunglasses",
    "Sports Shades",
    "Diving Gloves",
    "Speedo",
    "Bikini",
    "Crop Top",
    "Kabuki Mask",
    "Flippers",
    "Fisherman Hat",
    "Thong",
    "Moustache Man Mask",
    "Snorkel",
    "Scarred Man Mask",
    "Mackintosh",
    "Exotic Gentleman Mask",
    "Cassock",
    "Raincoat",
    "Nun Mask",
    "Old Lady Mask",
    "Bush Hat",
    "Wetsuit",
    "Golf Socks",
    "Mountie Hat",
    "Classic Fedora",
    "Young Lady Mask",
    "Ginger Kid Mask",
    "Denim Cap",
    "Denim Jacket",
    "Denim Vest",
    "Poncho",
    "Pullover",
    "Psycho Clown Mask",
    "Dungarees",
    "Paper Crown : Yellow",
    "Paper Crown : Red",
    "Pleated Skirt",
    "Knee Socks",
    "Paper Crown : Green",
    "Bucket Hat",
    "Reading Glasses",
    "Paper Crown : Blue",
    "Denim Shirt",
    "Snapback Hat",
    "Sandals",
    "Coconut Bra",
    "Trench Coat",
    "Santa Trousers",
    "Denim Shoes",
    "Booty Shorts",
    "Santa Gloves",
    "Silver Flats",
    "Sweatpants",
    "Ballet Shoes",
    "Shrug",
    "Hair Bow",
    "Floral Dress",
    "Bloody Apron",
    "Santa Jacket",
    "Santa Boots",
    "String Vest",
    "Baseball Jacket",
    "Chinos",
    "Pinstripe Suit Trousers",
    "Maid Hat",
    "Oversized Shirt",
    "Assless Chaps",
    "Bow Tie",
    "Bandit Mask",
    "Puppy Ears",
    "Hospital Gown",
    "Sun Hat",
    "Chest Harness",
    "Fishnet Stockings",
    "Denim Jeans",
    "Panama Hat",
    "Head Scarf",
    "Platform Shoes",
    "Tutu",
    "Neck Brace",
    "Basketball Shirt",
    "Knee Brace",
    "Santa Hat",
    "Fur Scarf",
    "Bowler Hat",
    "Medical Diaper",
    "Fur Hat",
    "Tighty Whities",
    "Tube Dress",
    "Party Hat '19",
    "Braces",
    "Flip Flops",
    "Choker",
    "Knee-high Boots",
    "Silver Hoodie",
    "Plaster Cast Arm",
    "Neck Tie",
    "Plaster Cast Leg",
    "Durag",
    "Badge : 15th Anniversary",
    "Sports Jacket",
    "Waistcoat",
    "Collared Shawl",
    "Cat Ears",
    "Medical Eye Patch",
    "Square Sunglasses",
    "Mini Skirt",
    "Derby Shoes",
    "Puffer Jacket",
    "Lolita Dress",
    "Blindfold",
    "Fitted Shirt",
    "Halo Vest",
    "Shutter Shades",
    "Fur Coat",
    "Opera Gloves",
    "Nightgown",
    "Lingerie",
    "Blazer",
    "Check Skirt",
    "Shoulder Sweater",
    "Tights",
    "Suit Trousers",
    "Bingo Visor",
    "Black Oxfords",
    "Bunny Ears",
    "Saggy Pants",
    "Chin Diaper",
    "Cover-ups",
    "Kitty Shoes",
    "Fascinator Hat",
    "Torso Bandage",
    "Head Bandage",
    "Ripped Jeans",
    "Crutches",
    "Slippers",
    "Polka Dot Dress",
    "Smoking Jacket",
    "Maid Uniform",
    "Band-Aids",
    "Monocle",
    "Reindeer Antlers",
    "Rudolph's Nose",
    "Nipple Tassels",
    "Bathrobe",
    "Parachute Pants",
    "Collar",
    "Scrooge's Gloves",
    "Prosthetic Arm",
    "Gold Sneakers",
    "Peg Leg",
    "Onesie",
    "Scrooge's Boots",
    "Mankini",
    "Heart Sunglasses",
    "Wedding Veil",
    "Ball Gown",
    "Prosthetic Leg",
    "Scrooge's Trousers",
    "Pipe",
    "Scrooge's Top Hat",
    "Ski Mask",
    "Wedding Dress",
    "Ball Gag",
    "Hook Hand",
    "Scrooge's Topcoat",
    "Christmas Sweater '15",
    "Duster",
    "Unicorn Horn",
    "Bunny Nose",
    "Straitjacket",
    "Santa Beard",
    "Witch's Hat",
    "Queen Elizabeth II Mask '22",
    "Turkey Head '23",
    "Prince Philip Mask '21",
    "Evil Winnie Mask '23",
    "Tiger King Mask '20",
    "Krampus Mask '21",
    "Hell Priest Mask '22",
    "Pennywise Mask '20",
    "Jigsaw Mask '19",
    "Elon Musk Mask '17",
    "Greta Mask '19",
    "Michael Myers Mask '18",
    "Sandworm Mask '21",
    "Anatoly Mask '19",
    "Donald Trump Mask '16",
    "Gronch Mask '18",
    "Bunny Suit",
    "Bunch of Flowers",
    "Funeral Wreath",
    "Daffodil",
    "Bunch of Carnations",
    "Single Red Rose",
    "Dozen Roses",
    "Bunch of Black Roses",
    "Dahlia",
    "Edelweiss",
    "White Lily",
    "Crocus",
    "Banana Orchid",
    "Orchid",
    "Ceibo Flower",
    "Heather",
    "Cherry Blossom",
    "African Violet",
    "Peony",
    "Tribulus Omanense",
    "Sheep Plushie",
    "Teddy Bear Plushie",
    "Kitten Plushie",
    "Stingray Plushie",
    "Wolverine Plushie",
    "Chamois Plushie",
    "Jaguar Plushie",
    "Nessie Plushie",
    "Red Fox Plushie",
    "Monkey Plushie",
    "Panda Plushie",
    "Lion Plushie",
    "Camel Plushie",
    "Chevrolet Cavalier",
    "Peugeot 106",
    "Vauxhall Corsa",
    "Classic Mini",
    "Volkswagen Golf GTI",
    "Reliant Robin",
    "Honda Civic",
    "Renault Clio",
    "Audi S4",
    "Volkswagen Beetle",
    "Alfa Romeo 156",
    "Seat Leon Cupra",
    "Honda Integra R",
    "Nissan Micra",
    "Ford Mustang",
    "Lotus Exige",
    "Hummer H3",
    "Honda Accord",
    "Holden SS",
    "Vauxhall Astra GSI",
    "Toyota MR2",
    "BMW X5",
    "Honda S2000",
    "Honda NSX",
    "BMW M5",
    "Chevrolet Corvette Z06",
    "TVR Sagaris",
    "Citroen Saxo",
    "Audi TT Quattro",
    "Ford Focus RS",
    "Subaru Impreza STI",
    "Pontiac Firebird",
    "Dodge Charger",
    "BMW Z8",
    "Porsche 911 GT3",
    "Mitsubishi Evo X",
    "Mini Cooper S",
    "Ford GT40",
    "Audi R8",
    "Nissan GT-R",
    "Fiat Punto",
    "Volvo 850",
    "Aston Martin One-77",
    "Lamborghini Gallardo",
    "Lexus LFA",
    "Ferrari 458",
    "Mercedes SLR",
    "Sierra Cosworth",
    "Bugatti Veyron",
    "Senet Board",
    "Leopard Coin",
    "Florin Coin",
    "Gold Noble Coin",
    "Vairocana Buddha Sculpture",
    "Black Senet Pawn",
    "White Senet Pawn",
    "Ganesha Sculpture",
    "Quran Script : Ibn Masud",
    "Quran Script : Ali",
    "Quran Script : Ubay Ibn Ka'b",
    "Shabti Sculpture",
    "Egyptian Amulet",
    "Dancing Santa Claus '09",
    "Dong : Greg",
    "Dong : Jeremy",
    "Dong : Holly",
    "Dong : Effy",
    "Deputy Star",
    "Dong : Thomas",
    "Gold Nugget",
    "Medal of Honor",
    "Snow Globe '09",
    "Birthday Cake '14",
    "Rusty Dog Tag",
    "Zombie Brain",
    "Human Head",
    "Piece of Cake '13",
    "Bronze Rosette",
    "Donkey Adoption Certificate",
    "Silver Rosette",
    "Metal Dog Tag",
    "Rabbit Foot",
    "Poker Chip",
    "Santa's Elf '09",
    "Gold Rosette",
    "Coin : Estate Agents",
    "Coin : Church",
    "Paper Bag",
    "Bunch of Balloons '05",
    "Coin : Jail",
    "Jack-O-Lantern '05",
    "Coin : Race Track",
    "Bronze Paint Brush",
    "Birthday Cake '05",
    "Coin : Museum",
    "Coin : Travel Agency",
    "Coin : Stock Exchange",
    "Coin : Hospital",
    "Coin : Factions",
    "Coin : Dump",
    "Coin : Drugs",
    "Coin : Companies",
    "Coin : Auction House",
    "Cheesus '18",
    "Bronze Microphone",
    "Coin : Education",
    "Santa's List '17",
    "Silver Microphone",
    "Bronze Dog Tag",
    "Scammer in the Slammer '18",
    "Voodoo Doll",
    "Toast Jesus '18",
    "Snowflake '05",
    "Amazon Doll",
    "Gold Paint Brush",
    "Soapbox",
    "Flea Collar",
    "YouYou Yo Yo",
    "Kevlar Helmet",
    "Poker Doll",
    "Gold Microphone",
    "Yorkshire Pudding",
    "Cursed Moon Pendant",
    "Backstage Pass",
    "Burmese Flag",
    "Yoda Figurine",
    "Barbie Doll",
    "Single White Rose",
    "Non-Anon Doll",
    "Dreamcatcher",
    "Mr Brownstone Doll",
    "China Tea Set",
    "Trojan Horse",
    "Monkey Cuffs",
    "Christmas Card '09",
    "Christmas Stocking '09",
    "Mouser Doll",
    "Santa Hat '04",
    "Jester's Cap",
    "Lucky Dime",
    "Official Ninja Kit",
    "Octopus Toy",
    "Dollar Bill Collectible",
    "Silver Paint Brush",
    "Lipstick",
    "RS232 Cable",
    "Shampoo",
    "Soap on a Rope",
    "DVD Player",
    "Shaving Foam",
    "Mix CD",
    "Travel Mug",
    "Umbrella",
    "Receipt",
    "Phone Card",
    "Scrap Metal",
    "Microwave",
    "Cosmetics Case",
    "Moldy Pizza",
    "Vitamins",
    "Bucket",
    "Towel",
    "Tin Can",
    "Rotten Apple",
    "Cell Phone",
    "Notepad",
    "Soccer Ball",
    "Mouthwash",
    "Hard Drive",
    "Broom",
    "Floor Cleaner",
    "Headphones",
    "Festering Chicken",
    "Beach Ball",
    "Detergent",
    "Pack of Music CDs",
    "Pack of Cuban Cigars",
    "Clippers",
    "Lubricant",
    "Magazine",
    "Stapler",
    "Car Battery",
    "Sour Milk",
    "Spoiled Fish",
    "Bone",
    "Oxygen Tank",
    "Syringe",
    "Tire",
    "Crazy Straw",
    "Cough Syrup",
    "Stale Bread",
    "Scalp Massager",
    "Jigsaw Puzzle",
    "Horseshoe",
    "Bottle Cap",
    "Hockey Stick",
    "Cigar Cutter",
    "Picture Frame",
    "Dart Board",
    "Bleaching Tray",
    "Perfume",
    "Blanket",
    "Subway Pass",
    "Ammonia",
    "Massage Oil",
    "Formaldehyde",
    "Family Photo",
    "Sensu",
    "Dentures",
    "Smelly Cheese",
    "Grain",
    "Steel Drum",
    "Paper Weight",
    "Tampon",
    "Mop",
    "Fertilizer",
    "Chopsticks",
    "Toothbrush",
    "Car Keys",
    "Yakitori Lantern",
    "Mayan Statue",
    "Gold Tooth",
    "Concert Ticket",
    "Toothpaste",
    "Elephant Statue",
    "Pele Charm",
    "Nodding Turtle",
    "Snowboard",
    "Garden Gnome",
    "Sumo Doll",
    "Driver's License",
    "Hoe",
    "Spoon",
    "Urea",
    "Salt Shaker",
    "Certificate of Lame",
    "Parking Permit",
    "Compass",
    "Certificate of Awesome",
    "Tailor's Dummy",
    "Yucca Plant",
    "Razor Wire",
    "Croquet Set",
    "Fishing Rod",
    "Tractor Part",
    "Machine Part",
    "Hit Contract",
    "Igniter Cord",
    "Christmas Lights",
    "Electronic Pumpkin",
    "Hole Punch",
    "Binoculars",
    "Remote Detonator",
    "Silver Cutlery Set",
    "Model Space Ship",
    "Model Spine",
    "Fire Hydrant",
    "Advent Calendar",
    "Sextant",
    "Plunger",
    "Crockpot",
    "Phosphorus",
    "Jade Buddha",
    "Dental Mirror",
    "Turkey Baster",
    "Paperclips",
    "Nitrous Tank",
    "Potassium Nitrate",
    "Massage Table",
    "Ship in a Bottle",
    "Handcuffs",
    "Silver Coin",
    "Afro Comb",
    "Santa's Snot",
    "Stick of Dynamite",
    "C4 Explosive",
    "Broken Bauble",
    "Christmas Angel",
    "Hunting Trophy",
    "Diploma",
    "Maneki Neko",
    "Polar Bear Toy",
    "Birth Certificate",
    "Sprig of Holly",
    "Cinnamon Decoration",
    "Boat Engine",
    "Prescription",
    "Raw Ivory",
    "Mini Sleigh",
    "Gingerbread Man",
    "Golden Wreath",
    "Casket",
    "Thimble",
    "License Plate",
    "Tangerine",
    "Gingerbread House",
    "Snowman",
    "Golden Candy Cane",
    "Stamp Collection",
    "Christmas Express",
    "Travel Visa",
    "Bank Check",
    "Persian Rug",
    "Mistletoe",
    "Bull Semen",
    "Lucky Quarter",
    "Bowling Trophy",
    "Spooky Paper Weight",
    "Sticky Notes",
    "Christmas Gnome",
    "Silver Bead",
    "Jack O'Lantern Lamp",
    "Pile of Vomit",
    "Memory Locket",
    "Eggnog",
    "Cauldron",
    "Passport",
    "Truck Nuts",
    "Chandelier",
    "Witch's Cauldron",
    "Oriental Log",
    "Japanese\\/English Dictionary",
    "Loaf of Bread",
    "Photographs",
    "Pack of Trojans",
    "Oriental Log Translation",
    "Rotten Eggs",
    "Article on Crime",
    "Lint",
];
