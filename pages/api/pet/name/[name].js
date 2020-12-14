import pets from '../../../../data/pets';

export default function petsHandler({ query: { name } }, res) {
    const filtered = pets.filter((p) => String(p.name).toUpperCase() === String(name).toUpperCase())

  if (filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    res.status(404).json({ message: `Pet with name: ${name} not found.` })
  }
}