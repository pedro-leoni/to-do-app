import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from '../../../utils/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try{
        const { method, query: { id } } = req 
        const cmd = 'SELECT * FROM tasks where id = $1'
        const values = [id]
        const response = await conn.query(cmd, values)
        if(response.rows.length){
            res.status(200).json({ data: response.rows[0]})
        } else {
            res.status(400).json({ msg: 'Not exist'})
        }
    } catch(err){
        console.log(err)
        res.status(404).json({msg: 'Not Found'})
    }
}