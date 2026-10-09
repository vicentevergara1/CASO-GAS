import React,{useEffect,useMemo,useState} from "react";
import {createRoot} from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Navbar from "./components/Navbar.jsx";
import ProductCatalog from "./ProductCatalog.jsx";
import Cart from "./components/Cart.jsx";
import SearchModal from "./components/SearchModal.jsx";
import Checkout from "./components/Checkout.jsx";
import Login from "./Login.jsx";
import Admin from "./components/Admin.jsx";
import {createProduct,deleteProduct,readCart,readProducts,saveCart,saveProducts,updateProduct} from "./data/products.js";
function App(){
 const [products,setProducts]=useState(readProducts);
 const [cart,setCart]=useState(()=>readCart(readProducts()));
 const [cartOpen,setCartOpen]=useState(false);
 const [searchOpen,setSearchOpen]=useState(false);
 const [checkoutOpen,setCheckoutOpen]=useState(false);
 const [adminOpen,setAdminOpen]=useState(false);
 const [query,setQuery]=useState("");
 const currentCart=useMemo(()=>cart.flatMap(item=>{
  const product=products.find(p=>p.id===item.id);
  return product?[{...product,qty:item.qty}]:[];
 }),[cart,products]);
 const count=useMemo(()=>currentCart.reduce((sum,item)=>sum+item.qty,0),[currentCart]);
 useEffect(()=>{saveProducts(products)},[products]);
 useEffect(()=>{saveCart(cart)},[cart]);
 const add=(product,quantity=1)=>{
  const amount=Math.max(1,Math.floor(Number(quantity)||1));
  setCart(current=>{
   const found=current.find(item=>item.id===product.id);
   return found?current.map(item=>item.id===product.id?{...item,qty:item.qty+amount}:item):[...current,{id:product.id,qty:amount}];
  });
  setSearchOpen(false);
  setQuery("");
  setCartOpen(true);
 };
 const qty=(id,change)=>setCart(current=>current.map(item=>item.id===id?{...item,qty:item.qty+change}:item).filter(item=>item.qty>0));
 const saveProduct=(fields,id)=>{
  const next=id?updateProduct(products,id,fields):createProduct(products,fields);
  setProducts(next);
 };
 const removeProduct=(id)=>{
  const next=deleteProduct(products,id);
  setProducts(next);
  setCart(current=>current.filter(item=>item.id!==id));
 };
 const showAdmin=()=>{
  setAdminOpen(true);
  setCartOpen(false);
  setSearchOpen(false);
  setCheckoutOpen(false);
  window.scrollTo({top:0,behavior:"smooth"});
 };
 const showStore=()=>{
  setAdminOpen(false);
  window.scrollTo({top:0,behavior:"smooth"});
 };
 return <><Navbar cartCount={count} onCartOpen={()=>{setAdminOpen(false);setCartOpen(true)}} onSearch={()=>{setAdminOpen(false);setSearchOpen(true)}} onAdminOpen={showAdmin} onNavigate={()=>setAdminOpen(false)}/>{adminOpen?<main style={{paddingTop:70}}><Admin products={products} onSave={saveProduct} onDelete={removeProduct} onClose={showStore}/></main>:<main id="inicio" style={{paddingTop:70}}><section className="hero py-5"><div className="container py-5"><div className="row align-items-center g-4"><div className="col-lg-7"><span className="badge text-bg-info mb-3">Gas El Volcan</span><h1 className="display-4 fw-bold">Gas para tu hogar, con servicio cercano y confiable.</h1><p className="lead text-secondary">Compra cilindros, accesorios y soluciones para gas de manera simple.</p><a className="btn btn-primary btn-lg" href="#productos">Ver productos</a></div><div className="col-lg-5 text-center"><img src={`${import.meta.env.BASE_URL}assets/images/volcan.png`} className="img-fluid" alt="Gas El Volcan"/></div></div></div></section><ProductCatalog products={products} onAdd={add}/><section id="servicios" className="py-5"><div className="container"><h2 className="fw-bold">Nuestros servicios</h2><div className="row g-4 mt-1">{[["Venta de cilindros","Formatos para distintos niveles de consumo."],["Accesorios","Mangueras, reguladores y productos complementarios."],["Atencion al cliente","Orientacion para elegir la alternativa adecuada."]].map(x=><div className="col-12 col-md-4" key={x[0]}><div className="card h-100 shadow-sm border-0"><div className="card-body"><h3 className="h5">{x[0]}</h3><p>{x[1]}</p></div></div></div>)}</div></div></section><section id="nosotros" className="py-5 bg-light"><div className="container"><h2>Sobre Gas El Volcan</h2><p className="text-secondary">Propuesta digital para facilitar la consulta y compra de productos de gas.</p></div></section><section id="faq" className="py-5"><div className="container"><h2>Preguntas frecuentes</h2><div className="accordion mt-3"><div className="accordion-item"><h3 className="accordion-header"><button className="accordion-button">¿Que productos puedo encontrar?</button></h3><div className="accordion-body">Cilindros, mangueras, reguladores y accesorios.</div></div></div></div></section><Login/><section id="contacto" className="py-5 bg-dark text-white"><div className="container"><h2>Contacto</h2><p>Gas El Volcan - Atencion y productos para tu hogar.</p></div></section></main>}{cartOpen&&<Cart items={currentCart} onClose={()=>setCartOpen(false)} onIncrease={id=>qty(id,1)} onDecrease={id=>qty(id,-1)} onRemove={id=>setCart(c=>c.filter(i=>i.id!==id))} onCheckout={()=>{setCartOpen(false);setCheckoutOpen(true)}}/>} {checkoutOpen&&<Checkout items={currentCart} onClose={()=>setCheckoutOpen(false)} onFinish={()=>{setCheckoutOpen(false);setCart([]);}}/>} {searchOpen&&<><div className="modal-backdrop show" onClick={()=>{setSearchOpen(false);setQuery("")}}/><SearchModal products={products} query={query} setQuery={setQuery} onAdd={add} onClose={()=>{setSearchOpen(false);setQuery("")}}/></>}</>}
createRoot(document.getElementById("root")).render(<App/>);
