import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getBackendURL } from "../utils/getBackendURL";

export const Signup = () => {
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
            const response = await fetch(`${getBackendURL()}/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            if (response.ok) {
                alert("Registro exitoso. Ahora puedes iniciar sesión.");
                navigate("/login");
            } else {
                setError(data.message || "Error al registrarse");
            }
        } catch (error) {
            setError("Error de red. Por favor, inténtalo de nuevo.");
            console.error("Error during signup:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                        <div className="card border-0 shadow-lg overflow-hidden rounded-4">
                            <div className="row g-0">
                                {/* Columna de Imagen/Gradiente decorativo */}
                                <div className="col-md-5 d-none d-md-block bg-gradient" 
                                     style={{ 
                                        background: "linear-gradient(45deg, #0dcaf0, #198754)",
                                        minHeight: "500px" 
                                     }}>
                                    <div className="h-100 d-flex flex-column justify-content-center align-items-center text-white p-4">
                                        <i className="fa-solid fa-user-plus fa-4x mb-4 opacity-50"></i>
                                        <h2 className="fw-bold">Únete a nosotros</h2>
                                        <p className="text-center opacity-75">Crea tu cuenta en menos de un minuto y empieza a explorar.</p>
                                    </div>
                                </div>

                                {/* Columna del Formulario */}
                                <div className="col-md-7 bg-white p-4 p-lg-5">
                                    <div className="text-center text-md-start mb-4">
                                        <h2 className="fw-bold text-dark">Nueva Cuenta</h2>
                                        <p className="text-muted small">Completa tus datos para registrarte</p>
                                    </div>

                                    {error && (
                                        <div className="alert alert-danger border-0 small py-2" role="alert">
                                            <i className="fa-solid fa-circle-exclamation me-2"></i>
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-secondary">Correo Electrónico</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-0"><i className="fa-regular fa-envelope text-muted"></i></span>
                                                <input
                                                    type="email"
                                                    className="form-control bg-light border-0 shadow-none"
                                                    placeholder="ejemplo@correo.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label small fw-bold text-secondary">Contraseña Segura</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-0"><i className="fa-solid fa-key text-muted"></i></span>
                                                <input
                                                    type="password"
                                                    className="form-control bg-light border-0 shadow-none"
                                                    placeholder="Mínimo 6 caracteres"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    minLength="6"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-success w-100 py-3 rounded-pill fw-bold shadow-sm"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                            ) : (
                                                <i className="fa-solid fa-paper-plane me-2"></i>
                                            )}
                                            {loading ? "Procesando..." : "Crear mi cuenta"}
                                        </button>
                                    </form>

                                    <div className="text-center mt-4 pt-2">
                                        <p className="text-muted small">
                                            ¿Ya eres parte de la comunidad? <br />
                                            <Link to="/login" className="text-success fw-bold text-decoration-none">
                                                Inicia sesión aquí
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};