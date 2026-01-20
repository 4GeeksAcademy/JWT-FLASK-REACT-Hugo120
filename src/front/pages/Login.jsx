import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import {getBackendURL} from "../utils/getBackendURL";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useGlobalReducer();    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${getBackendURL()}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                //Cuando el Login esta ok te guarda el token y la info del usuario en el global store
                dispatch({ type: "LOGIN", payload: { 
                    token: data.token,
                    user: data.user } });
                navigate("/private");
            } else {
                setError(data.message || "Error al iniciar sesión");
            }
        } catch (error) {
            setError("Error de red. Por favor, inténtalo de nuevo.");
            console.error("Error during login:", error);
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="shadow-lg bg-white rounded-4 overflow-hidden d-flex flex-column flex-md-row" style={{ maxWidth: "900px", width: "100%" }}>
                
                {/* Lado izquierdo: Decorativo o Informativo (Diferenciador visual) */}
                <div className="bg-dark p-5 text-white d-flex flex-column justify-content-center align-items-center text-center d-none d-md-flex" style={{ width: "40%" }}>
                    <h2 className="fw-bold mb-3">¡Bienvenido de nuevo!</h2>
                    <p className="opacity-75">Accede a tu panel personal para gestionar todos tus proyectos.</p>
                    <div className="mt-4 border border-info rounded-circle p-3">
                        <i className="fa-solid fa-lock fa-2x text-info"></i>
                    </div>
                </div>

                {/* Lado derecho: Formulario */}
                <div className="p-5 flex-grow-1">
                    <div className="mb-4 text-center text-md-start">
                        <h3 className="fw-bold text-dark">Identificarse</h3>
                        <p className="text-muted small">Por favor, introduce tus datos para continuar.</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger py-2 border-0 rounded-3 small" role="alert">
                            <i className="fa-solid fa-triangle-exclamation me-2"></i>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control bg-light border-0 shadow-sm"
                                id="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="email">Correo Electrónico</label>
                        </div>

                        <div className="form-floating mb-4">
                            <input
                                type="password"
                                className="form-control bg-light border-0 shadow-sm"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Contraseña</label>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-info text-white fw-bold w-100 py-3 rounded-pill shadow-sm mb-3"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm me-2"></span>
                            ) : null}
                            {loading ? "Verificando..." : "Entrar al Sistema"}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <span className="text-muted small">¿Todavía no eres miembro? </span>
                        <Link to="/signup" className="text-info fw-bold text-decoration-none small">
                            Crea una cuenta gratis
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};