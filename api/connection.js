import clientPromise from "../lib/mongo.js";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('logbox');

  switch (req.method) {
    // POST: Register new user (only name/phone/idnum)
    case 'POST':
      try {
        const { name, phone, idnum } = req.body;

        // Validate required fields
        if (!name || !phone || !idnum) {
          return res.status(400).json({ error: 'Missing name, phone, or ID number' });
        }

        // Check for duplicates (phone OR idnum)
        const existingUser = await db.collection('users').findOne({
          $or: [{ phone }, { idnum }]
        });

        if (existingUser) {
          const error = existingUser.phone === phone 
            ? 'Phone number already registered' 
            : 'School ID already registered';
          return res.status(400).json({ error });
        }

        // Insert new user (only allowed fields + defaults)
        const newUser = {
          name,
          phone,
          idnum,
          isActive: false,
        };

        const result = await db.collection('users').insertOne(newUser);
        return res.status(201).json(result);

      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }

    // GET: Check duplicates (optional)
    case 'GET':
      const { phone, idnum } = req.query;
      
      if (phone) {
        const user = await db.collection('users').findOne({ phone });
        return res.status(200).json({ exists: !!user });
      }

      if (idnum) {
        const user = await db.collection('users').findOne({ idnum });
        return res.status(200).json({ exists: !!user });
      }

      return res.status(400).json({ error: 'Missing phone or ID number query' });

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: 'Method not allowed' });
  }
}