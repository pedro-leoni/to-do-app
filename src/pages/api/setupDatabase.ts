import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from '../../utils/db';

export default async function handler ( 
    req: NextApiRequest, 
    res:NextApiResponse
) {
    const { method } = req;
    if ( method === "GET"){ 
        try{
            const query = `CREATE TABLE IF NOT EXISTS tasks(
                id SERIAL PRIMARY KEY,
                title VARCHAR(100) UNIQUE NOT NULL,
                description VARCHAR(200) NOT NULL,
                priority INTEGER NOT NULL,
                state VARCHAR(20) NOT NULL,
                term DATE NOT NULL,
                created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );`
            await conn.query(query)
            return res.status(200).json({
                message: "La tabla fue creada exitosamente"
            })

        } catch(err:any) {
            res.json({
                status: 500,
                message: 'Error en SETUP DATABASE',
                err: err.message
            })  
        }

    } else {
        res.status(404).json({msg: 'Method not allowed'})
    }
}