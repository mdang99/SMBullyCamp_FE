export function transformToTree(pets) {
    if (!Array.isArray(pets)) return null;
  
    const petMap = new Map();
    pets.forEach((pet) => petMap.set(pet.code, { ...pet, children: [] }));
  
    let root = null;
  
    pets.forEach((pet) => {
      const current = petMap.get(pet.code);
      if (pet.father && petMap.has(pet.father)) {
        petMap.get(pet.father).children.push(current);
      } else if (pet.mother && petMap.has(pet.mother)) {
        petMap.get(pet.mother).children.push(current);
      } else {
        root = current; // pet không có cha mẹ => gốc
      }
    });
  
    return root;
  }
  