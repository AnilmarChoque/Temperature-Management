const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 4000;

const typeDefs = gql`
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
        idDados: ID
        timestamp: String!
        value: Float!
        idSensor: ID!
    }

    type Query {
        login(email: String!, senha: String!): AuthData!
        sensoresPorEmpresa(idEmpresa: ID!): [Sensor!]
        getSensor(idSensor: ID!): Sensor
        ultimosDados(idSensor: ID!): Dados
        getAllDados(idSensor: ID!): [Dados!]
    }

    type Mutation {
        addDados(dadosInput: DadosInput): Dados
        salvarDadosCsv(dadosInput: [DadosInput!]!): [Dados!]!

    }
`;

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

const resolvers = {
    Query: {
        login: async (_, { email, senha }) => {
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
        },
        sensoresPorEmpresa: async (_, { idEmpresa }) => {
            const [rows] = await connection.execute('SELECT * FROM sensor WHERE fkEmpresa = ?', [idEmpresa]);
            return rows.map(sensor => ({
                idSensor: sensor.idSensor,
                equipmentId: sensor.equipmentId,
                idEmpresa: sensor.fkEmpresa
            }));
        },
        getSensor: async (_, { idSensor }) => {
            const [rows] = await connection.execute('SELECT * FROM sensor WHERE idSensor = ?', [idSensor]);
            if (rows.length === 0) {
                throw new Error('Sensor não encontrado.');
            }
            return rows[0];
        },
        ultimosDados: async (_, { idSensor }) => {
            const [rows] = await connection.execute('SELECT * FROM dados WHERE fkSensor = ? ORDER BY timestamp DESC LIMIT 1', [idSensor]);
            if (rows.length === 0) {
                throw new Error('Dados não encontrados.');
            }
            return rows[0];
        },
        getAllDados: async (_, { idSensor }) => {
            const [rows] = await connection.execute('SELECT * FROM dados WHERE fkSensor = ? ORDER BY timestamp', [idSensor]);
            return rows;
        }
    },
    Mutation: {
        addDados: async (_, { dadosInput }) => {
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
            };
        },
        salvarDadosCsv: async (_, { dadosInput }) => {
            const insertedData = [];

            for (const dado of dadosInput) {
                const { idDados, timestamp, value, idSensor } = dado;
                const [result] = await connection.execute(
                    'INSERT INTO dados (idDados, timestamp, value, fkSensor) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE timestamp = VALUES(timestamp), value = VALUES(value), fkSensor = VALUES(fkSensor)',
                    [idDados, timestamp, value, idSensor]
                );
                insertedData.push({
                    idDados: idDados || result.insertId,
                    timestamp,
                    value,
                    idSensor
                });
            }

            return insertedData;
        }
    }
};

const startApolloServer = async () => {
    await connectToDatabase();
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
};

startApolloServer();
