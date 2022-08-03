import { useState } from "react"
import { Switch, MqttDisplay } from '../components'
import { useMqttClient } from "../effects";

export const Home = () => {

    const [LightIsOn, setLightIsOn] = useState(false);

    const handleLightToggle = () => {
        setLightIsOn(!LightIsOn);
    };

    // connection 
    const connConfig = { hostname: "localhost", port: 1883 };
    const connStatus = useMqttClient(connConfig);

    return (
        <div className="Home">
            <h1>Home</h1>
            <MqttDisplay connStatus={connStatus}/>
            <Switch 
            isOn={LightIsOn}
            handleToggle={handleLightToggle}
            onColor="#17b306"
            item="Light"/>
        </div>
    );
}