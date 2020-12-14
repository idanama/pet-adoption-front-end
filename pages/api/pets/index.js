import pets from '../../../data/pets';

export default function handler(req, res) {
  res.status(200).json(pets);
}
