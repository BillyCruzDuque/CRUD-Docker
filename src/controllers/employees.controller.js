import {pool} from "../db.js";

export const getEmployees = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM empleados');
        res.status(200).json(rows);
    }catch (error){
        res.status(500).json({
            message: "Error al obtener los empleados",
        });
    }
}
export const getEmployee = async (req, res) => {
    const id = req.params.id;
    try{
        const [row] = await pool.query('SELECT * FROM empleados WHERE id = ?', [id]);

        if (row.length <= 0)
            return res.status(404).json({message: 'Empleado no encontrado'});

        res.status(200).json(row[0]);
    }catch (error){
        res.status(500).json({
            message: "Error al obtener el empleado",
        });
    }
}

export const createEmployee = async (req, res) => {
    const {nombre, salario} = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO empleados(nombre, salario) values (?, ?)', [nombre, salario]);

        res.status(200).json({
            message: 'Empleado creado',
            body: {
                id: rows.insertId,
                empleado: {nombre, salario}
            }
        });
    }catch (error){
        res.status(500).json({
            message: "Error al crear el empleado",
        });
    }
}

export const updateEmployee = async (req, res) => {
    const id = req.params.id;
    const {nombre, salario} = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM empleados WHERE id = ?', [id]);

        if (rows.length <= 0)
            return res.status(404).json({message: 'Empleado no encontrado'});

        const [result] = await pool.query('UPDATE empleados SET nombre = IFNULL(?, nombre), salario = IFNULL(?, salario) WHERE id = ?', [nombre, salario, id]);

        if (result.affectedRows < 0)
            return res.status(500).json({message: 'Error al actualizar el empleado'});


        const [row] = await pool.query('SELECT * FROM empleados WHERE id = ?', [id]);

        res.status(200).json({message: 'Empleado actualizado', empleado: row[0]});
    }catch (error){
        res.status(500).json({
            message: "Error al actualizar el empleado",
        });
    }
}

export const deleteEmployee = async (req, res) => {
    const id = req.params.id;
    try {
        const [result] = await pool.query('DELETE FROM empleados  WHERE id = ?', [id]);

        if (result.affectedRows <= 0)
            return res.status(404).json({message: 'Empleado no encontrado'});

        res.sendStatus(204);
    }catch (error){
        res.status(500).json({
            message: "Error al eliminar el empleado",
        });
    }
}
