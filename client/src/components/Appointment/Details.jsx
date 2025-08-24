import './Details.css'

export default function Details({ Radio, Date, Time }) {

    return (
        <div className="table-cont">
            <table className="review-table">
                <tbody>
                    <tr>
                        <td className="heading heading1">Sample Collection at</td>
                        <td className="data data1">{Radio}</td>
                    </tr>
                    <tr>
                        <td className="heading heading2">Selected Date</td>
                        <td className="data data2">{Date.format("DD-MM-YYYY")}</td>
                    </tr>
                    <tr>
                        <td className="heading heading3">Time Slot</td>
                        <td className="data data3">{Time}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}