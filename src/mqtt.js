import react,{useState,useEffect, useCallback} from 'react';
import mqtt from 'precompiled-mqtt';

export default function Mqtt() {
    const[connectionStatus,setConnectionStatus] = useState(false);
    const[message,setMessage] = useState('');
    const[subscribedToTopics,setSubscribedToTopics] = useState(false);
    const topics=['temp/current','huimidity/current']

    const client = mqtt.connect('mqtt://192.168.1.146:9001');

useEffect(()=>{
    client.on('connect',  ()=> {
        setConnectionStatus(true);
        client.subscribe(topics,()=>{
            setSubscribedToTopics(true);
        })
        client.publish('Clients', 'Node App Connected');
        client.on("message", (topic, message)=> {
            setMessage([`${topic} : `,message.toString()]);
            console.log(message)
        });
    })
    
},[])

return(
    <div className='MQTT Container'>
        <h1>MQTT</h1>
        <p>Connection Status: {connectionStatus ? 'Connected' : 'Not Connected'}</p>
        <p>Subscribed to Topics: {subscribedToTopics ? 'Subscribed' : 'Not Subscribed'}</p>
        <p>Message: {message}</p>
    </div>
)


}