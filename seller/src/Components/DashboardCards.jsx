import React from 'react'


function Card({title, children, small}){
return (
<div className={`card ${small? 'card-small':''}`}>
<div className="card-title">{title}</div>
<div className="card-content">{children}</div>
</div>
)
}


export default function DashboardCards(){
return (
<section className="cards-row">
<Card title="Total Revenue">
<div className="big">$1,250.00</div>
<div className="muted">+5.2% this month</div>
</Card>
<Card title="Active Listings">
<div className="big">82</div>
<div className="muted">+2 this week</div>
</Card>
<Card title="Unread Messages" small>
<div className="big">5</div>
</Card>
<Card title="Pending Orders" small>
<div className="big">12</div>
<div className="muted">+3 today</div>
</Card>
</section>
)
}