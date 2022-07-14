import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from '../../../utils/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { method, query: { id } } = req 
    switch(method){
        case "GET":
            try{
            const cmd = 'SELECT * FROM tasks where id = $1'
            const values = [id]
            const response = await conn.query(cmd, values)
                if(response.rows.length){
                   return res.status(200).json({ data: response.rows[0]})
                } else {
                   return res.status(400).json({ msg: 'Not exist'})
                }
            } catch(err){
                console.log(err)
                return res.status(404).json({msg: 'Not Found'})
            }
        default:
            return res.status(404).json({msg: 'Method not allowed'})
    }
}