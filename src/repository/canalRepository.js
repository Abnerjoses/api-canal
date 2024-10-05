import con from "./connection.js";



export async function inserirCanal(canal){
    const comando = `
    insert into tb_canal (nm_canal, nr_canal, bt_aberto)
           values (?, ?, ?);
    `;

    let resposta = await con.query(comando, [canal.nome, canal.numero, canal.aberto]);
    let info = resposta[0];

    return info.insertId;
}


export async function consultarCanal(){
    const comando = `
        select  id_canal,
            nm_canal,
            nr_canal,
            bt_aberto
        from tb_canal;
    `;

    let resposta = await con.query(comando);
    let registros = resposta[0];

    return registros;
}


export async function alterarCanal(id, canal){
    const comando = `
        update tb_canal
        set nm_canal = ?,
            nr_canal = ?,
            bt_aberto = ?
        where id_canal = ?;
    `;

    let resposta = await con.query(comando, [canal.nome, canal.numero, canal.aberto, id]);
    let info = resposta[0];

    return info.affectedRows;
}


export async function removerCanal(id){
    const comando = `
    delete from tb_canal
    where id_canal = ?;
    `;

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}
