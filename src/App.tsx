import { useRef, useEffect, useState } from "react";
import ProductList from "./ProductList";
import axios from "axios";

interface User {
    id: number;
    name: string;
}

const connect = () => console.log("Connecting");
const disconnect = () => console.log("Disconnecting");

const App = () => {
    useEffect(() => {
        connect();
        return () => disconnect();
    });
    const ref = useRef<HTMLInputElement>(null);
    //afterRender
    useEffect(() => {
        //side effect
        if (ref.current) ref.current.focus();
    });
    useEffect(() => {
        document.title = "My App";
    });
    const [category, setCategory] = useState("");

    // Axios Example
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        axios.get<User[]>("https://jsonplaceholder.typicode.com/users")
            .then(res => setUsers(res.data))
    }, [])
    return (
        <div className="container">
            <input ref={ref} type="text" className="form-control" />
            <select
                title="category"
                name="category"
                className="form-select"
                onChange={(event) => setCategory(event.target.value)}
            >
                <option value="">*</option>
                <option value="Clothing">Clothing</option>
                <option value="Household">Household</option>
            </select>
            <ProductList category={category} />
            <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>
        </div>
    );
};

export default App;
