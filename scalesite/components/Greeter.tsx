'use client'
import React, { useEffect, useState } from 'react';
import { useWasm } from '@/contexts/WasmContext';

export const Greeter: React.FC = () => {
    const [fibonacciNumber, setFibonacciNumber] = useState(0);
    const { wasmModule } = useWasm();
    
    useEffect(() => {
        wasmModule.then((wasm) => {
            const num = wasm.fibonnaci(10);
            setFibonacciNumber(num);
        });
    }, []);
    
    return (
        <div>
            <h1>Hello, World!</h1>
            <p>Fibonacci(10): {fibonacciNumber}</p>
        </div>
    );
};

    
    



