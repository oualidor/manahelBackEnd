const mysql = require('../apis/conection');


class Store{
    constructor(){

    }

    async creat(name, image, category, wilaya, x, y){
        let sql = "INSERT INTO stores (name, image) VALUES (?, ?, ?, ?, ?)";
        try {
            const res = await mysql.query(sql, [name, image, category, wilaya, x, y]);
            return {"finalResult": true, "sqlResult": res};
        }catch (err) {
            return { "finalResult": false, "sqlResult": err};
        }
    }

    async getById(id){
        let sql = "SELECT * from stores where id = ?";
        try {
            const res = await mysql.query(sql, [id]);
            if(res[0].length > 0){
                return {"finalResult": true, "sqlResult": res[0]};
            }else{
                return { "finalResult": false, "err": "no store with this id"};
            }
        }catch (err) {
            return { "finalResult": false, "sqlResult": err};
        }
    }

    async getAll(){
        let sql = "SELECT * from stores";
        try {
            const res = await mysql.query(sql);
            if(res[0].length > 0){
                return {"finalResult": true, "Result": res[0]};
            }else{
                return { "finalResult": false, "err": "no store found"};
            }
        }catch (err) {
            return { "finalResult": false, "sqlResult": err};
        }
    }

    async update(id, name, image, category, wilaya, x, y){
        let sql = "UPDATE stores SET name = ?, image = ?, category= ?, wilaya= ?, x=?, y=? where id = ?";
        try {
            const res = await mysql.query(sql, [name, image,  category, wilaya, x, y, id]);
            if(res[0].length > 0){
                return {"finalResult": true, "sqlResult": res[0]};
            }else{
                return { "finalResult": false, "err": "no store with this id"};
            }
        }catch (err) {
            return { "finalResult": false, "sqlResult": err};
        }
    }

    async delete(id){
        let sql = "DELETE FROM  stores WHERE id = ?";
        try {
            const res = await mysql.query(sql);
            return {"finalResult": true, "sqlResult": res};
        }catch (err) {
            return { "finalResult": false, "sqlResult": err};
        }
    }
}

module.exports = Store;