import pets from '../../../../data/pets';

export default function petsHandler({ query: { name } }, res) {
  const filtered = pets.find((p) => String(p.name).toUpperCase() === String(name).toUpperCase())
  if (filtered !== undefined) {
    res.status(200).json(filtered)
  } else {
    res.status(404).json({ message: `Pet with name: ${name} not found.` })
  }
}