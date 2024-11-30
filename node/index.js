const express = require('express')
const app = express()
const port = 3000
const config = {
    host:"db",
    user: "root",
    password: "root",
    database: "nodedb"
}

const query = (connection, sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

app.get('/', async (req,res) => {
    const mysql = require('mysql')
    const connection = mysql.createConnection(config)

    try {
        await query(connection, `INSERT INTO people(name) VALUES('Otavio');`);

        const results = await query(connection, 'SELECT * FROM people;');
        const nomes = results.map(person => `Nome: ${person.name} </br>`).join('');

        connection.end();

        res.send('<h1>Full Cycle rocks!!</h1></br>' + nomes);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro no servidor');
    }
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})