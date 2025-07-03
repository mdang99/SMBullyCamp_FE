export const buildPetTree = (pets, selectedCode) => {
  const validPets = pets.filter((p) => p && p.code);
  const petMap = {};
  validPets.forEach((p) => (petMap[p.code] = { ...p, children: [] }));

  validPets.forEach((p) => {
    const node = petMap[p.code];
    const father = p.father && petMap[p.father];
    const mother = p.mother && petMap[p.mother];

    if (father) father.children.push(node);
    if (mother && mother !== father) mother.children.push(node);
  });

  const selectedPet = petMap[selectedCode];
  if (!selectedPet) return [];

  const roots = [];
  if (selectedPet.father && petMap[selectedPet.father]) {
    roots.push(petMap[selectedPet.father]);
  }
  if (selectedPet.mother && petMap[selectedPet.mother]) {
    roots.push(petMap[selectedPet.mother]);
  }

  // Nếu không có cha mẹ → selectedPet là root
  if (roots.length === 0) roots.push(selectedPet);

  return roots;
};
