import React from "react";
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_SENSOR = gql`
    query GetSensor($idSensor: ID!) {
        getSensor(idSensor: $idSensor){
            idSensor
            equipmentId
            timestamp
            value
        }    
    }
`

const Dashboard = () => {
    const { id } = useParams();

    const { loading, error, data} = useQuery(GET_SENSOR, {
        variables: {idSensor: id},
    });

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar o sensor</p>;

    const { equipmentId, timestamp, value } = data.getSensor;
    
    return (
        <div>{equipmentId}</div>
    );

}

export default Dashboard;