import { Link, useNavigate} from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const [store, dispatch] = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch({ type: "logout" });
		navigate("/login");
	};

	return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary shadow-sm py-3">
            <div className="container">
                {/* Logo con un estilo más atrevido */}
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <span className="fw-light text-info">My</span>
                    <span className="fw-bold text-white">JWT Project</span>
                    <div className="ms-2 badge bg-info text-dark" style={{fontSize: "0.6rem"}}>Hugo</div>
                </Link>

                <div className="ms-auto d-flex align-items-center">
                    {!store.token ? (
                        /* Diseño de botones moderno con bordes redondeados */
                        <div className="d-flex gap-2">
                            <Link to="/login">
                                <button className="btn btn-outline-info rounded-pill px-4 btn-sm">
                                    Acceder
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-info rounded-pill px-4 btn-sm">
                                    Registrarse
                                </button>
                            </Link>
                        </div>
                    ) : (
                        /* Vista de usuario logueado con estilo de 'Perfil' */
                        <div className="d-flex align-items-center bg-secondary bg-opacity-25 rounded-pill ps-3 pe-1 py-1 border border-secondary">
                            <span className="text-light small me-3 d-none d-md-inline">
                                Conectado como: <strong>{store.user?.email.split('@')[0]}</strong>
                            </span>
                            
                            <div className="d-flex gap-1">
                                <Link to="/private">
                                    <button className="btn btn-sm btn-light rounded-pill px-3">
                                        Panel
                                    </button>
                                </Link>
                                <button 
                                    className="btn btn-sm btn-danger rounded-pill px-3" 
                                    onClick={handleLogout}
                                >
                                    <i className="fa-solid fa-power-off"></i> Salir
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};