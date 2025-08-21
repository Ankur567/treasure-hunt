export function normalize(str = '') {
    return String(str)
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '') // diacritics
      .replace(/[^a-z0-9 ]+/g, ' ')      // keep alnum + space
      .replace(/\s+/g, ' ')             // collapse spaces
      .trim()
  }
  