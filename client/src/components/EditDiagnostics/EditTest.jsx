import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import './edit-test.css'

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function EditTest() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        price: '',
        discountPrice: '',
        patientPreparation: '',
        relevance: '',
        category: '',
        popular: false,
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const res = await fetch(`${BackendURL}/api/tests/${id}`, {
                    credentials: 'include'
                });

                const data = await res.json();

                if (data.success) {
                    return setForm({
                        name: data.test.name || '',
                        price: data.test.price || '',
                        discountPrice: data.test.discountPrice,
                        patientPreparation: data.test.patientPreparation || '',
                        relevance: data.test.relevance || '',
                        category: data.test.category || '',
                        popular: data.test.popular || false,
                    });
                }

                setMessage(data.message);
            } catch (err) {
                setMessage(err.message);
            }
        };
        fetchTest();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BackendURL}/api/tests/edit/${id}`, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (data.success) {
                setMessage(data.message);
                navigate(-1);
            } else {
                setMessage(data.message || 'Update failed.');
            }
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="edit-test-page">

            <div className="edit-test-cont">
                <h3>Edit Test</h3>
                {message && <p className="edit-message">{message}</p>}
                <form className="edit-test-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Name</label>
                        <input name="name" value={form.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <input name="category" value={form.category} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Relevance</label>
                        <input name="relevance" value={form.relevance} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Patient Preparation</label>
                        <textarea name="patientPreparation" value={form.patientPreparation} onChange={handleChange} rows={3} />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Price</label>
                            <input name="price" type="number" value={form.price} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Discount Price</label>
                            <input name="discountPrice" type="number" value={form.discountPrice} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group form-checkbox">
                        <input name="popular" type="checkbox" checked={form.popular} onChange={handleChange} id="popular" />
                        <label htmlFor="popular">Mark as Popular</label>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="submit" className="btn-save">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}