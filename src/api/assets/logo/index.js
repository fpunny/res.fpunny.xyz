import fs from 'fs';
const contents = fs.readFileSync(require.resolve('./logo.svg'));

export default async function handler(req, res) {
  const { color = 'currentColor' } = req.query;
  const payload = contents.toString().replace('{{COLOR}}', color);

  res.set('Content-Type', 'image/svg+xml');
  res.status(200).send(payload);
}
