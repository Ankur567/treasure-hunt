import { normalize } from './utils/normalise.js'

// Helper to match answers robustly (synonyms + substring match after normalization)
const matcher = (accepts) => (input) => {
  const n = normalize(input)
  return accepts.some(a => n.includes(normalize(a)))
}

export const steps = [
  {
    id: 1,
    title: 'Mission 1 — The Hidden Leaf Awakens',
    style: 'konoha',
    clue: 'Every ninja begins under a **leaf**. Seek the quiet green that drinks sunlight; your first ally waits where roots never walk.',
    accepts: ['plant', 'potted plant', 'pot', 'planter'],
    gift: ['Naruto Nine Tails', 'Nine Tails Naruto'],
    passcode: "627984",
    check: matcher(['plant','potted plant','planter','pot','Naruto Nine Tails','Nine Tails Naruto']),
    hint: 'Think green + window. Where do you water something that is alive but rooted in soil indoors?'
  },
  {
    id: 2,
    title: 'Mission 2 — Ichiraku Initiation',
    clue: 'Fuel a shinobi’s spirit with swirls like a Rasengan—find the bowl that hosts warm whirlpools.',
    accepts: ['bowl','ramen bowl','noodle bowl','kitchen bowl'],
    check: matcher(['bowl','ramen','noodle']),
    hint: 'Kitchen → look where you’d serve noodles. (Not the pot, the thing you eat from.)'
  },
  {
    id: 3,
    title: 'Mission 3 — Tools of the Trade',
    clue: '“I travel in pairs and guard your steps. I have tongues but never speak. Where kunai would rest by the door, I keep the squad ready to run.”',
    accepts: ['shoe rack','shoes','shoe cabinet'],
    check: matcher(['shoe rack','shoes','shoe cabinet']),
    hint: 'By the entrance. Think pairs with laces and tongues.'
  },
  {
    id: 4,
    title: 'Mission 4 — Copy Ninja’s Library Test',
    clue: 'Acrostic (read first letters):\n**B**etween stories and spines I wait,\n**O**ld paper guarding secret fate.\n**O**pen the place of words and lore—\n**K**nowledge points you to the next door.\n**S**eek me where legends always score.',
    accepts: ['bookshelf','book shelf','books'],
    check: matcher(['bookshelf','books']),
    hint: 'Spines, shelves, pages.'
  },
  {
    id: 5,
    title: 'Mission 5 — Sharingan Reflection',
    clue: 'A1Z26 code (A=1…Z=26): **13-9-18-18-15-18**',
    accepts: ['mirror','dressing table'],
    check: matcher(['mirror','dressing table']),
    hint: 'Decode to a common reflective surface in bedrooms/washrooms.'
  },
  {
    id: 6,
    title: 'Mission 6 — Training Ground Seven',
    clue: 'Caesar cipher (shift each letter back 3): **FRXFK**',
    accepts: ['couch','sofa'],
    check: matcher(['couch','sofa']),
    hint: 'TV time spot. Check under a cushion.'
  },
  {
    id: 7,
    title: 'Mission 7 — Hokage’s Office → Final Portal',
    clue: '“Paper, pens, and plans—where a Hokage signs decrees. Seek the desk where missions are approved. Then whisper **Lumos** and find the room that changes to what you need most… where outfits gather.”',
    accepts: ['desk','study desk','table','office','wardrobe','closet'],
    // We allow either two-step answer or the final location directly; consider correct if they type desk first, then the final wardrobe.
    check: (input, ctx) => {
      const n = normalize(input)
      const isDesk = ['desk','study desk','table','office'].some(a => n.includes(normalize(a)))
      const isWardrobe = ['wardrobe','closet','almirah','cupboard'].some(a => n.includes(normalize(a)))
      if (!ctx) return isDesk || isWardrobe
      // If player already typed something for step 7, treat any of the two as correct
      return isDesk || isWardrobe
    },
    hint: 'First: your work/study surface. Final magic: the wardrobe/closet (Room of Requirement).'
  }
]

export const finale = {
  locationLabel: 'Wardrobe / Closet',
  message: 'From Konoha to Hogwarts — enjoy your Harry Potter Funko!'
}

// speaker - 627984