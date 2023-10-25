import { useRef, useEffect, useState } from "react";
import ProductList from "./ProductList";

const App = () => {
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
    return (
        <div>
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
        </div>
    );
};

export default App;
