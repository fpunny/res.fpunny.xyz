import content from '!raw-loader!./logo.svg';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'image/svg+xml');
  res
    .status(200)
    .send(content.replace('{{COLOR}}', req.query.color ?? 'currentColor'));
}
