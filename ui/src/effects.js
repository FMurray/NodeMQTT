import { useEffect, useState } from "react";
import mqtt from "precompiled-mqtt"
import { CONSTANTS } from "./constants";

export const useMqttClient = () => {

    const [client, setClient] = useState(null);
    // const [payload, setPayload] = useState({});
    const [connectStatus, setConnectStatus] = useState('Connect');

    const mqttConnect = (mqttOption) => {
        setConnectStatus('Connecting...');
        setClient(mqtt.connect(`${CONSTANTS['BROKER_URL']}`, mqttOption));
    };

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                setConnectStatus('Connected!');
            });
            client.on('error', (err) => {
                console.error('Connection error: ', err);
            client.end();
            });
            client.on('reconnect', () => {
                setConnectStatus('Reconnecting');
            });
            // client.on('message', (topic, message) => {
            //     const payload = { topic, message: message.toString() };
            //     setPayload(payload);
            // });
        } else {
            mqttConnect({});
        }
    });

    return client
}

export const useMqttMessages = () => {
    const client = useMqttClient();
    const [payload, setPayload] = useState(null)

    useEffect(() => {
        if (client) {
            client.on('message', (topic, message) => {
                console.log('message: ', topic, message.toString());
                const payload = { topic, message: message.toString() };
                setPayload(payload);
            });
        }
    })

    return payload
}