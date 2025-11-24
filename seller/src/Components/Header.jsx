import React from 'react'


export default function Header(){
return (
<header className="header">
<div>
<h1>Welcome, Eco Seller!</h1>
<p className="subtitle">Here's your sales and activity summary for today.</p>
</div>
<div className="search-box">
<input placeholder="Search listings..." />
</div>
</header>
)
}