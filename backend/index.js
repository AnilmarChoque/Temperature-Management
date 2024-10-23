const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 4000;

app.use(cors());

const schema = buildSchema(`

    type Sensor {
        idSensor: ID!
        equipmentId: String!
        idEmpresa: ID!
    }

    type Funcionario {
        idFuncionario: ID!
        nome: String!
        email: String!
        senha: String!
        idEmpresa: ID!
    }

    type Dados {
        idDados: ID!
        timestamp: String!
        value: Float!
        idSensor: ID!
    }

    type AuthData {
        idFuncionario: ID!
        nome: String!
        email: String!
        idEmpresa: ID!
    }

    input DadosInput {
        timestamp: String!
        value: Float!
        idSensor: ID!
    }

    type RootQuery {
        login(email: String!, senha: String!): AuthData!
        sensoresPorEmpresa(idEmpresa: ID!): [Sensor!]
        getSensor(idSensor: ID!): Sensor
        ultimosDados(idSensor: ID!): Dados
        getAllDados(idSensor: ID!): [Dados!]
    }

    type RootMutation {
        addDados(dadosInput: DadosInput): Dados
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'F4m1l145!',
    database: 'gerenciamentoTemperatura'
};

let connection;

const connectToDatabase = async () => {
    connection = await mysql.createConnection(dbConfig);
};

const login = async ({ email, senha }) => {
    const [rows] = await connection.execute('SELECT * FROM funcionario WHERE email = ? AND senha = ?', [email, senha]);
    if (rows.length === 0) {
        throw new Error('Usuário não encontrado ou senha incorreta.');
    }

    const funcionario = rows[0];
    return { 
        idFuncionario: funcionario.idFuncionario,
        nome: funcionario.nome,
        email: funcionario.email,
        idEmpresa: funcionario.fkEmpresa
    };
};

const addDados = async ({ dadosInput }) => {
    const { timestamp, value, idSensor } = dadosInput;

    const [result] = await connection.execute(
        'INSERT INTO dados (timestamp, value, fkSensor) VALUES (?, ?, ?)',
        [timestamp, value, idSensor]
    );

    return {
        idDados: result.insertId,
        timestamp,
        value,
        idSensor
    }
};

const sensoresPorEmpresa = async ({ idEmpresa }) => {
    const [rows] = await connection.execute('SELECT * FROM sensor WHERE fkEmpresa = ?', [idEmpresa]);
    return rows.map(sensor => ({
        idSensor: sensor.idSensor,
        equipmentId: sensor.equipmentId,
    }));
};

const getSensor = async ({ idSensor }) => {
    const [rows] = await connection.execute('SELECT * FROM sensor WHERE idSensor = ?', [idSensor]);
    if( rows.length === 0) {
        throw new Error('Sensor não encontrado');
    }

    const sensor = rows[0];
    
    return {
        idSensor: sensor.idSensor,
        equipmentId: sensor.equipmentId
    };
};

const ultimosDados = async ({ idSensor }) => {
    const [rows] = await connection.execute('SELECT * FROM dados WHERE fkSensor = ? ORDER BY timestamp DESC LIMIT 1', [idSensor]);
    if(rows.length === 0) {
        throw new Error('Dados não encontrados')
    }

    const dados = rows[0];

    return {
        idDados: dados.idDados,
        timestamp: dados.timestamp,
        value: dados.value,
    }
};

const getAllDados = async ({ idSensor }) => {
    const [rows] = await connection.execute('SELECT * FROM dados WHERE fkSensor = ? ORDER BY timestamp', [idSensor]);

    return rows.map(dados => ({
        idDados: dados.idDados,
        timestamp: dados.timestamp,
        value: dados.value
    }));
};

const root = {
    login,
    sensoresPorEmpresa,
    getSensor,
    ultimosDados,
    getAllDados,
    addDados
};

connectToDatabase().then(() => {
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
});
