export default function AdminControlBox({ box, selected, setSelected }) {
    return (
        <div className="tabs">
            {box.map((item) => {
                const isSelected = selected === item.name;
                return (
                    <div
                        key={item.name}
                        onClick={() => setSelected(item.name)}
                        className={` tab-option ${isSelected ? 'selected-tab' : ''}`}
                    >
                        <button
                            className='tab'
                            
                        >
                            <span
                                className="icon"
                                style={{ display: 'inline', verticalAlign: 'middle', marginRight: '5px' }}
                            >
                                {item.icon}
                            </span>
                            {item.name}
                        </button>
                    </div>
                )
            })}
        </div>
    );
}
