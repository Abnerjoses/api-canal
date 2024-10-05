import con from "./connection.js";



export async function inserirCanalFavorito(favorito){
    const comando = `
    insert into tb_programa_favorito(id_usuario, id_canal_programa,vl_avaliacao)
    values (? , ?, ?);
    
    `;

    let resposta = await con.query(comando, [favorito.idUsuario, favorito.idCanalPro, favorito.avaliacao]);
    let info = resposta[0];

    return info.insertId;
}



export async function consultarCanalFavorito(){
    const comando = `
     
    SELECT 
    pf.id_programa_favorito,
    pf.id_canal_programa,
    pf.vl_avaliacao,
    u.id_usuario,
    u.nm_usuario,
    cp.id_canal,
    cp.nm_programa,
    cp.ds_genero,
    cp.hr_programa,
    c.nm_canal,
    c.nr_canal,
    c.bt_aberto
FROM 
    tb_programa_favorito pf
JOIN 
    tb_usuario u ON pf.id_usuario = u.id_usuario
JOIN 
    tb_canal_programa cp ON pf.id_canal_programa = cp.id_canal_programa
JOIN
    tb_canal c ON cp.id_canal = c.id_canal;

    `;

    let resposta = await con.query(comando);
    let registros = resposta[0];

    return registros;
}


export async function alterarCanalFavorito(id, favorito){
    const comando = `
    update tb_programa_favorito
    set id_usuario = ?,
        id_canal_programa = ?,
        vl_avaliacao  = ?
  where id_programa_favorito = ? ;
    `;
    let resposta = await con.query(comando, [favorito.idUsuario, favorito.idCanalPro, favorito.avaliacao, id]);
    let info = resposta[0];

    return info.affectedRows;
}


export async function removerCanalFavorito(id){
    const comando = `
    delete from tb_programa_favorito
    where id_programa_favorito = ?;
    `;

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}
