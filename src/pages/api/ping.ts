// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { conn } from '../../utils/db';

type Data = {
  msg: string,
  timestamp: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await conn.query("SELECT NOW()")
  res.status(200).json({ msg: 'La db funciona correctamente', timestamp: response.rows[0].now })
}
