import con from "./connection.js";


export async function inserirCanalPrograma(canalPrograma){
    const comando = `
    insert into tb_canal_programa (id_canal,nm_programa,ds_genero,hr_programa) 
           values (?, ?, ?, ?);
    
    `;
    let resposta = await con.query(comando, [canalPrograma.id, canalPrograma.nome, canalPrograma.genero,
    canalPrograma.poha]);
    let info = resposta[0];

    return info.insertId;
}


export async function consultarCanalPrograma(){
    const comando = `
    SELECT 
    s.id_canal_programa,
    s.id_canal,
    s.nm_programa,
    s.ds_genero,
    s.hr_programa,
    c.nm_canal,
    c.nr_canal,
    c.bt_aberto
FROM 
   tb_canal_programa s
JOIN 
    tb_canal c ON s.id_canal = c.id_canal;
    `;

    let resposta = await con.query(comando);
    let registros = resposta[0];

    return registros;
}


export async function alterarCanalPrograma(id, canalPrograma){
    const comando = `
       
    update tb_canal_programa
    set id_canal = ?,
        nm_programa =?,
        ds_genero = ?,
        hr_programa =?
    where id_canal_programa = ? ;
    `;

    let resposta = await con.query(comando, [canalPrograma.id, canalPrograma.nome, canalPrograma.genero,
    canalPrograma.poha , id]);
    let info = resposta[0];

    return info.affectedRows;
}


export async function removerCanalPrograma(id){
    const comando = `
    delete from tb_canal_programa
    where id_canal_programa = ?;
    `;

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}
