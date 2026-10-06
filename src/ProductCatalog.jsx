import {useMemo,useState} from "react";
import ProductCard from "./components/ProductCard.jsx";
export default function ProductCatalog({products,onAdd}){
 const [category,setCategory]=useState("Todos"); const [query,setQuery]=useState("");
 const categories=["Todos",...new Set(products.map(p=>p.category))];
 const filtered=useMemo(()=>products.filter(p=>(category==="Todos"||p.category===category)&&`${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase())),[products,category,query]);
 return <section id="productos" className="py-5 bg-light"><div className="container"><div className="row align-items-end mb-4"><div className="col-lg-7"><span className="text-primary fw-semibold">CATALOGO</span><h2 className="display-6 fw-bold">Productos para tu hogar y negocio</h2></div><div className="col-lg-5 mt-3"><input id="product-search" className="form-control" placeholder="Buscar producto..." value={query} onChange={e=>setQuery(e.target.value)}/></div></div><div className="d-flex flex-wrap gap-2 mb-4">{categories.map(c=><button key={c} className={`btn ${category===c?"btn-primary":"btn-outline-primary"}`} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="row g-4">{filtered.map(p=><div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={p.id}><ProductCard product={p} onAdd={onAdd}/></div>)}</div>{filtered.length===0&&<div className="alert alert-warning mt-4">No encontramos productos para tu busqueda.</div>}</div></section>;
}
