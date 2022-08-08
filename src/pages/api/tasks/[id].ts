import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from '../../../utils/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { body, method, query: { id } } = req 
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

        case "DELETE":
                try{
                    const cmd ='delete from tasks where id = $1 returning *;'
                    const value = [id]
                    const response = await conn.query(cmd,value)
                    if(response.rows.length){
                        return res.status(200).json({msg: `Task id ${response.rows[0].id} Deleted`})
                    } else {
                        return res.status(400).json({msg: 'Not exist'})
                    }
                } catch(err) {
                    console.log(err)
                    return res.status(404).json({msg: 'Insert correct id type, only integers'})
                }
            
        case "PUT":
                try{
                    const {
                        title,
                        description,
                        priority,
                        state,
                        term
                    } = body
                    // const cmd = `UPDATE tasks SET title = $1, description = $2, priority = $3, state = $4, term = $5  WHERE id=$6  RETURNING *`
                    
                    //              UPDATE tasks SET title = $1, description = $2, priority = $3, state = $4, state = $5 WHERE id=23  RETURNING *
                    // const values = [title,description,priority,state,term,id]
                    const values: any = []
                    const cmdformer: any = []
                    if( title.length ){
                        cmdformer.push(`title = $${cmdformer.length + 1}`);
                        values.push(title)
                    }
                    if( description.length ){
                        cmdformer.push(`description = $${cmdformer.length + 1}`)
                        values.push(description)
                    }
                    if( priority !== 0 ){
                        cmdformer.push(`priority = $${cmdformer.length + 1}`)
                        values.push(priority)
                    }
                    if( state.length ) {
                        cmdformer.push(`state = $${cmdformer.length + 1}`)
                        values.push(state)
                    }
                    if( term.length ){
                        cmdformer.push(`term = $${cmdformer.length + 1}`)
                        values.push(term)
                    }
                    values.push(id)
                    const cm = cmdformer.join(', ')
                    const cmd = `UPDATE tasks SET ${cm} WHERE id=$${values.length}  RETURNING *`
                    console.log(cmd)
                    const resp = await conn.query(cmd, values)
                    if(resp.rows.length){
                        return res.status(200).json({msg: `Task ${resp.rows[0].id} updated`})
                    } else {
                        return res.status(400).json({msg: 'not found'})
                    }
                } catch(err){
                    console.log('catch del put \nError: ',err)
                    return res.status(404).json({msg: `catch del put \nError: ${err}`})
                }
        default:
            return res.status(404).json({msg: 'Method not allowed'})
    }
}