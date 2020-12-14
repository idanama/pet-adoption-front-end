import pets from '../../../data/pets';

export default function petsHandler({ query: { id } }, res) {
    const filtered = pets.filter((p) => String(p.id) === String(id))

  if (filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    res.status(404).json({ message: `Pet with id: ${id} not found.` })
  }
}