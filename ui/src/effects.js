import { useEffect, useState } from "react";
import mqtt from "precompiled-mqtt"

export const useMqttClient = (connConfig) => {

    const [client, setClient] = useState(null);
    // const [payload, setPayload] = useState({});
    const [connectStatus, setConnectStatus] = useState('Connect');

    const mqttConnect = (connConfig, mqttOption) => {
        const hostname = connConfig.hostname || "localhost";
        const port = connConfig.port || 1883;
        setConnectStatus('Connecting...');
        setClient(mqtt.connect(`ws://${hostname}:${port}`, mqttOption));
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
        } else if (connConfig) {
            mqttConnect(connConfig, {});
        }
    });

    return connectStatus
}