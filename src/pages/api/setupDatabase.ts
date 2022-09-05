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
            return res.status(200).send({
                message: "La tabla fue creada exitosamente"
            })

        } catch(err) {
            let errM = 'No message error'
            if(err instanceof Error){
                errM = err.message
            }
            res.send({
                status: 500,
                message: 'Error en SETUP DATABASE',
                err: errM
            })  
        }

    } else {
        res.status(404).send({msg: 'Method not allowed'})
    }
}