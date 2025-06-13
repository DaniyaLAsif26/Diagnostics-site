import './Relevance.css';

export default function Relevance({ relevance, onClick, selected }) {

    return (
        <div className="relevance">
            {
                relevance.map((link) => (
                    <div className='relevance-link'
                        onClick={() => onClick(link.name)}
                        style={{
                            

                        }}>
                        <img src={link.img} alt="" className='relevance-img' style={{
                            border: selected === link.name ? '2px solid blue' : 'none',
                            borderRadius: '50%'
                        }} />
                        <div style={{ fontSize: '1.26rem', fontWeight: 500 }}>{link.name} </div>
                    </div>
                ))
            }
        </div >
    )
}