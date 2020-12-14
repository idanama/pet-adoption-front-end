import pets from '../../../data/pets';

export default function petsHandler(query, res) {
  const randomIndex = Math.floor(Math.random() * pets.length);
  res.status(200).json(pets[randomIndex]);
}
