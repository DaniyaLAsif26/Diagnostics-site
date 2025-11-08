import './Choose-us.css';

export default function ChooseUs({ choose }) {

    return (
        <div className="choose-us">
            {choose.map((item) => (
                <div className="choose-item" key={item.id}>
                    <img src={item.img} alt="" />
                    <h4>{item.head}</h4>
                    <div className="choose-desc">{item.desc}</div>
                </div>
            ))}
        </div>
    )
}