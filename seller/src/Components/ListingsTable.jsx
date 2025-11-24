import React from 'react'
import { FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi'


const rows = [
{title:'Vintage Wooden Chair', price:'$45.00', status:'Active'},
{title:'Set of Ceramic Mugs', price:'$18.50', status:'Active'},
{title:'Antique Brass Lamp', price:'$75.00', status:'Sold Out'},
]


export default function ListingsTable(){
return (
<section className="listings">
<h2>My Listings</h2>
<table>
<thead>
<tr>
<th>Product</th>
<th>Price</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{rows.map((r,i)=> (
<tr key={i}>
<td className="product">
<img src="/mnt/data/screen.png" alt="thumb" />
<div>
<div className="title">{r.title}</div>
</div>
</td>
<td>{r.price}</td>
<td><span className={`badge ${r.status==='Active'? 'active':''}`}>{r.status}</span></td>
<td className="actions">
<FiEdit2 />
<FiEye />
<FiTrash2 />
</td>
</tr>
))}
</tbody>
</table>
</section>
)
}