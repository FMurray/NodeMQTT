import React from "react";

export const MqttDisplay = ({connStatus}) => {

    return (
        <div className="MQTT Container">
            <h1>MQTT</h1>
            <p>
            Connection Status: {connStatus}
            </p>
        </div>
    );
}
