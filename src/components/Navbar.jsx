import {useState} from "react";
export default function Navbar({cartCount,onCartOpen,onSearch}){
 const [open,setOpen]=useState(false);
 const links=[["Productos","#productos"],["Servicios","#servicios"],["Nosotros","#nosotros"],["Preguntas frecuentes","#faq"],["Contacto","#contacto"]];
 return <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm border-bottom"><div className="container-fluid px-3 px-lg-5">
  <a className="navbar-brand d-flex align-items-center gap-2 fw-semibold" href="#inicio"><img src={`${import.meta.env.BASE_URL}assets/images/logo.png`} alt="Gas El Volcan" style={{height:42}}/>
  <button className="navbar-toggler" aria-label="Abrir menu" aria-expanded={open} onClick={()=>setOpen(!open)}><span className="navbar-toggler-icon"/></button>
  <div className={`collapse navbar-collapse ${open?"show":""}`}><ul className="navbar-nav mx-auto">{links.map(([t,h])=><li className="nav-item" key={h}><a className="nav-link" href={h} onClick={()=>setOpen(false)}>{t}</a></li>)}</ul>
   <div className="d-flex flex-column flex-lg-row gap-2"><button className="btn btn-outline-secondary" onClick={onSearch}>🔎 Buscar</button><a className="btn btn-outline-dark" href="#login">Cuenta</a><button className="btn btn-primary position-relative" onClick={onCartOpen}>🛒 Carrito{cartCount>0&&<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartCount}</span>}</button></div>
  </div>
 </div></nav>;
}
