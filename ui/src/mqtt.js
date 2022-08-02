import react, { useState, useEffect, useCallback } from "react";
import mqtt from "precompiled-mqtt";

export default function Mqtt() {
  const connectionString = "mqtt://192.xxx.xx.xx";
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [subscribedToTopics, setSubscribedToTopics] = useState(false);
  const topics = ["humidity/current", "temp/current"];

  const client = mqtt.connect(connectionString);

  useEffect(() => {
    client.on("connect", () => {
      setConnectionStatus(true);
      client.subscribe(topics, () => {
        setSubscribedToTopics(true);
      });
      client.publish("Clients", "Node App Connected");
      client.on("message", (topic, message) => {
        if (topic === "humidity/current") {
          setHumidity(message.toString());
        }
        if (topic === "temp/current") {
          setTemp(message.toString());
        }
      });
    });
  }, []);

  return (
    <div className="MQTT Container">
      <h1>MQTT</h1>
      <p>
        Connection Status:{" "}
        {connectionStatus
          ? `Connected to ${connectionString}`
          : "Not Connected"}
      </p>
      <div>
        Subscribed to Topics:{" "}
        {subscribedToTopics ? topics.map((val)=>{return(<div key={val}>{val}</div>)}) : "Not Subscribed"}
        </div>
      <p>Temp: {temp}</p>
      <p>Humidity: {humidity}</p>
    </div>
  );
}
