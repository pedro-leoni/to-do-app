import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from '../../../utils/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { query: { id } } = req 
    res.status(200).json( id )
}