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
        timestamp: String!
        value: Float!
    }

    type Funcionario {
        idFuncionario: ID!
        nome: String!
        email: String!
        senha: String!
        idEmpresa: ID!
    }

    type AuthData {
        idFuncionario: ID!
        nome: String!
        email: String!
        idEmpresa: ID!
    }

    input FuncionarioInput {
        email: String!
        senha: String!
    }

    type RootQuery {
        login(email: String!, senha: String!): AuthData!
        sensoresPorEmpresa(idEmpresa: ID!): [Sensor!]
    }

    type RootMutation {
        createFuncionario(funcionarioInput: FuncionarioInput): Funcionario
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

const sensoresPorEmpresa = async ({ idEmpresa }) => {
    const [rows] = await connection.execute('SELECT * FROM sensor WHERE fkEmpresa = ?', [idEmpresa]);
    return rows.map(sensor => ({
        idSensor: sensor.idSensor,
        equipmentId: sensor.equipmentId,
        timestamp: sensor.timestamp,
        value: sensor.value
    }));
};

const root = {
    login,
    sensoresPorEmpresa
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
