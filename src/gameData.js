import { normalize } from "./utils/normalise.js";

// Helper to match answers robustly (synonyms + substring match after normalization)
const matcher = (accepts) => (input) => {
  const n = normalize(input);
  return accepts.some((a) => n.includes(normalize(a)));
};

export const steps = [
  {
    id: 1,
    title: "The Will of Fire's First Spark",
    style: "Konoha",
    clue: "“A shinobi’s journey begins where life quietly thrives. Seek the guardian that stands still, drinking sunlight, where roots never wander.”",
    giftclue:
      "“A tribute to the Jinchuriki’s burden—the raging beast sealed within.”",
    accepts: ["plant", "potted plant", "pot", "planter"],
    gift: ["Naruto Nine Tails", "Nine Tails Naruto"],
    passcode: "563214",
    check: matcher([
      "plant",
      "potted plant",
      "planter",
      "pot",
      "Naruto Nine Tails",
      "Nine Tails Naruto",
    ]),
    hint: "Think green and still.",
  },
  {
    id: 2,
    title: "The Chakra Cauldron",
    style: "Katon",
    clue: "“Where swirling energy fuels the soul, and warmth gathers in a vessel of sustenance.”",
    accepts: ["kitchen"],
    giftclue: "“The legendary meal from Teuchi's stand, served with a smile.”",
    gift: ["Ramen Bowl", "Ramen"],
    passcode: "654376",
    check: matcher(["bowl", "ramen", "noodle", "kitchen"]),
    hint: "Think of the heart of the home",
  },
  {
    id: 3,
    style: "Kara",
    title: "Copy Ninja’s Test",
    clue: "“I am an archive of identities.”",
    accepts: ["wardrobe", "closet", "almirah", "cupboard"],
    gift: ["Tobirama Senju", "Tobirama"],
    giftclue:
      "“The master of water who created jutsu to conquer both space and death.”",
    passcode: "106745",
    check: matcher([
      "wardrobe",
      "Tobirama Senju",
      "Tobirama",
      "closet",
      "almirah",
      "cupboard",
    ]),
    hint: "clothes",
  },
  {
    id: 4,
    style: "Genjutsu",
    title: "Training Ground Seven",
    clue: "“Where shadows rest during the day, and the weight of the world is lifted at night.”",
    gift: ["Speaker", "Bluetooth Speaker"],
    giftclue:
      "“A relic that waves genjutsu, which carries on an invisible chakra thread.”",
    accepts: ["sofa", "couch", "under sofa", "under couch"],
    check: matcher([
      "sofa",
      "couch",
      "under sofa",
      "under couch",
      "speaker",
      "bluetooth speaker",
    ]),
    passcode: "627984",
    hint: "Think of a place where you relax.",
  },
  {
    id: 5,
    style: "Sharingan",
    title: "Sharingan Saga",
    clue: "13-9-18-18-15-18",
    accepts: ["mirror", "dressing table"],
    gift: ["Hashirama Senju", "Hashirama"],
    giftclue:
      "“A tribute to the First Shadow whose hands could weave life from the earth.”",
    passcode: "831254",
    check: matcher([
      "mirror",
      "dressing table",
      "Hashirama Senju",
      "Hashirama",
    ]),
    hint: "Decode to a common reflective surface in bedrooms/washrooms.",
  },
  {
    id: 6,
    style: "Fuinjutsu",
    title: "Seal of service",
    clue: "“The beast mimics the Uzumaki's vortex, not for destruction, but to wash away the traces of a mission, leaving a fresh start in its wake.”",
    accepts: ["washing machine", "washer", "laundry machine"],
    gift: ["Naruto Hokage", "Hokage Naruto"],
    giftclue:
      "“A tribute to the hero who shouldered the world's hatred and fulfilled his promise, finally earning the title of the Leaf's Shadow.”",
    passcode: "721654",
    check: matcher([
      "washing machine",
      "washer",
      "laundry machine",
      "Naruto Hokage",
      "Hokage Naruto",
    ]),
    hint: "Think of where dirty clothes go to be reborn.",
  },
  {
    id: 7,
    style: "Rinnegan",
    title: "Hokage’s Office → Final Portal",
    clue: "“Paper, pens, and plans—where a Hokage signs decrees. Seek the place where missions are approved.”",
    accepts: ["library"],
    gift: ["Harry Voldemort Final Battle", "Harry Voldemort Funko"],
    giftclue:
      "“A moment frozen in time, proving that love is the one magic that cannot be conquered.”",
    check: matcher([
      "library",
      "Harry Voldemort Final Battle",
      "Harry Voldemort Funko",
    ]),
    hint: "First: your work/study surface.",
  },
];

export const finale = {
  locationLabel: "Wardrobe / Closet",
  message: "From Konoha to Hogwarts — enjoy your Harry Potter Funko!",
};

// speaker - 627984
// naruto hookage - 721654
// naruto nine tails - 563214
// ramen - 654376
// hashirama - 831254
// tobirama - 106745
