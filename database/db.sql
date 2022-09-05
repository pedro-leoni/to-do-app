-- Escribir esta sentencia en la sql shell, creara la tabla que necesitamos en caso de que no exista.
CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(200) NOT NULL,
    priority INTEGER NOT NULL,
    state VARCHAR(20) NOT NULL,
    term DATE NOT NULL,
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 


-- agregar una tarea de prueba 
insert into tasks (title, description, priority, state, term) VALUES('tituloprueba3','descripcion prueba',1,'estado prueba','2022-08-02 10:04:02.015516-03');

-- update task
UPDATE tasks SET title = $1, description = $2, priority = $3, state = $4, term = $5  WHERE id=$6  RETURNING *

-- delete task
delete from tasks where id = $1 returning *;