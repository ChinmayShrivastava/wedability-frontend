import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    // navivgate to the login page
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/login');
    }
    );
    return (
        <div>
        </div>
    );
}