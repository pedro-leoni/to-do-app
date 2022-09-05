import type { NextApiRequest, NextApiResponse } from 'next';
import { conn } from '../../../utils/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        body,
        method
    } = req;
    switch(method){
        case "POST":
            try{
                const {
                    title,
                    description,
                    priority,
                    state,
                    term
                } = body
                const query = "INSERT INTO tasks(title, description, priority, state, term) VALUES($1, $2, $3, $4, $5) RETURNING *"
                const values = [title, description, priority, state, term]
                const response = await conn.query(query, values)
                return res.status(200).send({msg: `Task ${response.rows[0].id} created`});
            } catch(err) {
                // console.log('Error en el POST => ', err)
                return res.status(404).send({msg: 'Not found'})
            }
        case "GET":
                try{
                    const query = "SELECT * FROM tasks"
                    const response = await conn.query(query)
                    return res.status(200).send(response.rows)
                } catch(err){
                    // console.log(err)
                    return res.status(404).send({msg: 'soy un error'})
                }
             
        default:
            return res.status(404).send({msg: 'Method Not Allowed'});
    }


}
