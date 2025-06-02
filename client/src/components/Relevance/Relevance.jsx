import './Relevance.css';

export default function Relevance({relevance}) {

    return (
        <div className="relevance">
            {
                relevance.map((link) => (
                    <div className={link.name} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',gap:'10px'
                    }}>
                        <img src={link.img} alt="" />
                        <div style={{fontSize:'1.26rem' , fontWeight:500}}>{link.name} </div>
                    </div>
                ))
            }
        </div>
    )
}