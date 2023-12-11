import { useRef, useEffect, useState } from "react";
import ProductList from "./ProductList";
import { CanceledError } from './services/api-client'
import userService, { User } from "./services/user-service";




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
    /*********************************************** Beginning of Axios ***************************************************/
    // Axios Get Example ( .then , .catch )
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const { request, cancel } = userService.getAllUsers();
        request.then((res) => {
            setUsers(res.data);
            setLoading(false);
        })
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            })
        return () => cancel();
    }, [])

    // working with async and await (try{} , catch(err){}) and adding cancelling a fetch request with controller func
    /*
    useEffect(() => {
        const fetchUsers = async () => {
            const controller = new AbortController(); // cancelling a fetch request
            try {
                const res = await apiClient.get<User[]>("/users", { signal: controller.signal })
                setUsers(res.data);
            }
            catch (err) {
                if (err instanceof CanceledError) return; //cancelling a fetch request
                setError((err as AxiosError).message);
            }
        }
        fetchUsers();
        return () => controller.abort(); //cancelling a fetch request
    }, []) 
    */
    /*
        // cancelling a fetch request
        useEffect(() => {
            const controller = new AbortController();
            setLoading(true);
            apiClient
                .get<User[]>("/users", { signal: controller.signal })
                .then(res => setUsers(res.data))
                .catch(err => {
                    if (err instanceof CanceledError) return;
                    setError(err.message);
                })
                .finally(() => {
                    setTimeout(() => { setError('') }, 5000);
                    setLoading(false)
                })
            return () => controller.abort();
        }, [])
        */

    // Deleting Data
    const deleteUser = (user: User) => {
        const originalUsers = [...users];
        setUsers(users.filter(u => u.id !== user.id));
        userService.deleteUser(user.id).catch((err) => {
                setError(err.message);
                setUsers(originalUsers);
            })
    }

    // Creating Data
    const createUser = () => {
        const originalUsers = [...users];
        const newUser = { id: 0, name: "Mohamed Adel" };
        setUsers([newUser, ...users]);
        userService.createUser(newUser)
            .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
            .catch(err => {
                setError(err.message);
                setUsers(originalUsers);
            });
    }

    // Updating Data
    const updateUser = (user: User) => {
        const originalUsers = [...users];
        const updatedUser = {
            ...user,
            name: `updated : ${user.name}` + "!"
        }
        setUsers(users.map(u => u.id === user.id ? updatedUser : u))

        userService.updateUser(updatedUser)
            .catch(err => {
                setError(err.message)
                setUsers(originalUsers);
            })
    }
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
            {isLoading && <div className="spinner-border"></div>}
            {error && <p className="text-danger">{error}</p>}
            <button className="btn btn-primary mb-3" onClick={createUser}>Create User</button>
            <ul className="list-group">
                {users.map(user =>
                    <li key={user.id} className="list-group-item d-flex justify-content-between">
                        {user.name}
                        <div >
                            <button className="btn btn-outline-secondary mx-1" onClick={() => updateUser(user)}>Update</button>
                            <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button>
                        </div>
                    </li>)}
            </ul>
        </div>
    );
};

export default App;
