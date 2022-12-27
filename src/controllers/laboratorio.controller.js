import {pool} from '../db.js';

export const postTipoMuestra = async (req, res) => {
    const {clave, descripcion, tubo, imp_codigo, estatus_pendiente} = req.body;

    try{

        const [rows] = await pool.query('INSERT INTO tipo_muestra(clave, descripcion, tubo, imp_codigo_barra, estatus_inicial_pendiente) values (?, ?, ?, ?, ?)', [clave, descripcion, tubo, imp_codigo, estatus_pendiente]);
        if (rows.affectedRows < 0)
            return res.status(500).json({
                ok: false,
                msg: 'Error al registrar el usuario'
            });

        res.status(200).json({
            ok: true,
            msg: 'Tipo de muestra creado',
            id: rows.insertId,
            data: {clave, descripcion, tubo, imp_codigo, estatus_pendiente}
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }



}