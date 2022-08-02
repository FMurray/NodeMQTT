import React,{useState} from "react";
import MqttDisplay  from './mqtt'
import ToggleSwitch from './UI Components/ToggleSwitch'
 function App() {

    //////Light Switch/////
    const [LightIsOn, setLightIsOn] = useState(false);

    const handleLightToggle = () => {
        setLightIsOn(!LightIsOn);
      };


    return (
        <div className="App">
            <h1>Mqtt App</h1>
            <MqttDisplay />
            <p>Light</p>
            <ToggleSwitch 
            isOn={LightIsOn}
            handleToggle={handleLightToggle}
            onColor="#17b306"
            item="Light"/>
        </div>
    );
}
export default App;