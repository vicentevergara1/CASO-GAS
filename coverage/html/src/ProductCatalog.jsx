
<!doctype html>
<html lang="en">

<head>
    <title>Code coverage report for src/ProductCatalog.jsx</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="../prettify.css" />
    <link rel="stylesheet" href="../base.css" />
    <link rel="shortcut icon" type="image/x-icon" href="../favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type='text/css'>
        .coverage-summary .sorter {
            background-image: url(../sort-arrow-sprite.png);
        }
    </style>
</head>
    
<body>
<div class='wrapper'>
    <div class='pad1'>
        <h1><a href="../index.html">All files</a> / <a href="index.html">src</a> ProductCatalog.jsx</h1>
        <div class='clearfix'>
            
            <div class='fl pad1y space-right2'>
                <span class="strong">93.75% </span>
                <span class="quiet">Statements</span>
                <span class='fraction'>15/16</span>
            </div>
        
            
            <div class='fl pad1y space-right2'>
                <span class="strong">85.71% </span>
                <span class="quiet">Branches</span>
                <span class='fraction'>6/7</span>
            </div>
        
            
            <div class='fl pad1y space-right2'>
                <span class="strong">87.5% </span>
                <span class="quiet">Functions</span>
                <span class='fraction'>7/8</span>
            </div>
        
            
            <div class='fl pad1y space-right2'>
                <span class="strong">100% </span>
                <span class="quiet">Lines</span>
                <span class='fraction'>6/6</span>
            </div>
        
            
        </div>
        <p class="quiet">
            Press <em>n</em> or <em>j</em> to go to the next uncovered block, <em>b</em>, <em>p</em> or <em>k</em> for the previous block.
        </p>
        <template id="filterTemplate">
            <div class="quiet">
                Filter:
                <input type="search" id="fileSearch">
            </div>
        </template>
    </div>
    <div class='status-line high'></div>
    <pre><table class="coverage">
<tr><td class="line-count quiet"><a name='L1'></a><a href='#L1'>1</a>
<a name='L2'></a><a href='#L2'>2</a>
<a name='L3'></a><a href='#L3'>3</a>
<a name='L4'></a><a href='#L4'>4</a>
<a name='L5'></a><a href='#L5'>5</a>
<a name='L6'></a><a href='#L6'>6</a>
<a name='L7'></a><a href='#L7'>7</a>
<a name='L8'></a><a href='#L8'>8</a>
<a name='L9'></a><a href='#L9'>9</a></td><td class="line-coverage quiet"><span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">3x</span>
<span class="cline-any cline-yes">42x</span>
<span class="cline-any cline-yes">42x</span>
<span class="cline-any cline-yes">32x</span>
<span class="cline-any cline-yes">1x</span>
<span class="cline-any cline-neutral">&nbsp;</span></td><td class="text"><pre class="prettyprint lang-js">import {useMemo,useState} from "react";
import ProductCard from "./components/ProductCard.jsx";
export default function ProductCatalog({products,onAdd}){
 const [category,setCategory]=useState("Todos"); const [query,setQuery]=useState("");
 const categories=["Todos",...new Set(products.map(p=&gt;p.category))];
 const filtered=useMemo(()=&gt;products.filter(p=&gt;(category==="Todos"||p.category===category)&amp;&amp;`${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase())),[products,category,query]);
 return &lt;section id="productos" className="py-5 bg-light"&gt;&lt;div className="container"&gt;&lt;div className="row align-items-end mb-4"&gt;&lt;div className="col-lg-7"&gt;&lt;span className="text-primary fw-semibold"&gt;CATALOGO&lt;/span&gt;&lt;h2 className="display-6 fw-bold"&gt;Productos para tu hogar y negocio&lt;/h2&gt;&lt;/div&gt;&lt;div className="col-lg-5 mt-3"&gt;&lt;input id="product-search" className="form-control" placeholder="Buscar producto..." value={query} onChange={<span class="fstat-no" title="function not covered" >e=&gt;<span class="cstat-no" title="statement not covered" >s</span>etQuery(e.target.value)}/</span>&gt;&lt;/div&gt;&lt;/div&gt;&lt;div className="d-flex flex-wrap gap-2 mb-4"&gt;{categories.map(c=&gt;&lt;button key={c} className={`btn ${category===c?"btn-primary":"btn-outline-primary"}`} onClick={()=&gt;setCategory(c)}&gt;{c}&lt;/button&gt;)}&lt;/div&gt;&lt;div className="row g-4"&gt;{filtered.map(p=&gt;&lt;div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={p.id}&gt;&lt;ProductCard product={p} onAdd={onAdd}/&gt;&lt;/div&gt;)}&lt;/div&gt;{filtered.length===0&amp;&amp;<span class="branch-1 cbranch-no" title="branch not covered" >&lt;div className="alert alert-warning mt-4"&gt;No encontramos productos para tu busqueda.&lt;/div&gt;}&lt;</span>/div&gt;&lt;/section&gt;;
}
&nbsp;</pre></td></tr></table></pre>

                <div class='push'></div><!-- for sticky footer -->
            </div><!-- /wrapper -->
            <div class='footer quiet pad2 space-top1 center small'>
                Code coverage generated by
                <a href="https://istanbul.js.org/" target="_blank" rel="noopener noreferrer">istanbul</a>
                at 2026-10-06T18:26:46.322Z
            </div>
        <script src="../prettify.js"></script>
        <script>
            window.onload = function () {
                prettyPrint();
            };
        </script>
        <script src="../sorter.js"></script>
        <script src="../block-navigation.js"></script>
    </body>
</html>
    
