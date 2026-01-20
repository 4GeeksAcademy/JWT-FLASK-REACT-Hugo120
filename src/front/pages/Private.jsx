import React from "react";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getBackendURL } from "../utils/getBackendURL";

export const Private = () => {
    const [store] = useGlobalReducer();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const validateToken = async () => {
            if (!store.token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(`${getBackendURL()}/api/private`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    }
                });

                if (response.ok) {
                    navigate("/login");
                } else {
                    setLoading(false);
                }
            } catch (error) {
                setError("Error de red. Por favor, inténtalo de nuevo.");
                console.error("Error during token validation:", error);
                setLoading(false);
            }
        };
        validateToken();
    }, [store.token, navigate]);
    if (loading) {
        return (
        <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
            <div className="text-center">
                {/* Un spinner más estilizado y grande */}
                <div className="spinner-grow text-info mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <h5 className="text-secondary fw-light animate-pulse">
                    Preparando tu panel de control...
                </h5>
            </div>
            {/* Pequeño estilo CSS inline para el efecto de pulsación del texto */}
            <style>{`
                .animate-pulse { animation: pulse 1.5s infinite; }
                @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
            `}</style>
        </div>
    );
}
    return (
        <div className="container-fluid min-vh-100 bg-light py-5">
        <div className="container">
            <div className="row">
                //columna del perfil de usuario
                <div className="col-lg-4 mb-4">
                    <div className="card border-0 shadow-sm rounded-4 text-center p-4">
                        <div className="mx-auto mb-3 bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
                            <i className="fa-solid fa-user-shield fa-2x text-info"></i>
                        </div>
                        <h4 className="fw-bold mb-1">{store.user?.email.split('@')[0]}</h4>
                        <p className="text-muted small">Usuario Verificado</p>
                        <hr />
                        <div className="text-start">
                            <p className="small mb-1 text-secondary">ID Único:</p>
                            <code className="text-dark fw-bold">{store.user?.id}</code>
                        </div>
                    </div>
                </div>

                //COlumna principal del panel
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                        <div className="d-flex align-items-center mb-4">
                            <div className="flex-grow-1">
                                <h2 className="fw-bold text-dark m-0">Panel de Control</h2>
                                <p className="text-muted">Gestión de sesión y seguridad</p>
                            </div>
                            <span className="badge bg-success-subtle text-success border border-success px-3 py-2 rounded-pill">
                                <i className="fa-solid fa-circle-check me-1"></i> Sesión Activa
                            </span>
                        </div>

                        {error && (
                            <div className="alert alert-danger border-0 rounded-3 shadow-sm" role="alert">
                                <i className="fa-solid fa-triangle-exclamation me-2"></i> {error}
                            </div>
                        )}

                        <div className="bg-info bg-opacity-10 border border-info border-start-4 rounded-3 p-3 mb-4">
                            <h5 className="text-info fw-bold mb-1">¡Hola de nuevo!</h5>
                            <p className="mb-0 text-dark opacity-75">Tu correo actual es: <strong>{store.user?.email}</strong></p>
                        </div>

                        <div className="mt-2">
                            <h6 className="fw-bold text-secondary text-uppercase small mb-3">Token de Acceso (JWT)</h6>
                            <div className="position-relative">
                                <div className="bg-dark rounded-3 p-3 text-info font-monospace small" style={{ wordBreak: "break-all", maxHeight: "150px", overflowY: "auto" }}>
                                    {store.token}
                                </div>
                                <div className="mt-2 text-end text-muted x-small">
                                    <i className="fa-solid fa-shield-halved me-1"></i> Este token es privado y cifra tus datos.
                                </div>
                            </div>
                        </div>
                    </div>

                    //acceso rápido a otras secciones
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link to="/" className="btn btn-outline-secondary rounded-pill px-4">
                            <i className="fa-solid fa-house me-2"></i>Ir a Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);      
};import { useNavigate, Link } from "react-router-dom";