import dayjs from 'dayjs';
import './Details.css'

export default function Details({ Radio, Date, Time }) {
    // Convert to dayjs if it's a native Date object
    const formatDate = (date) => {
        if (dayjs.isDayjs(date)) {
            return date.format("DD-MM-YYYY");
        }
        // If it's a native Date object, convert it first
        return dayjs(date).format("DD-MM-YYYY");
    };

    return (
        <div className="table-cont">
            <table className="review-table">
                <tbody className='table-details-body'>
                    <tr>
                        <td className="heading heading1">Sample Collection at</td>
                        <td className="data data1">{Radio}</td>
                    </tr>
                    <tr>
                        <td className="heading heading2">Selected Date</td>
                        <td className="data data2">{formatDate(Date)}</td>
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