import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import './edit-test.css'

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function EditPack() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        relevance: [],
        tests: [],
        price: '',
        discountPrice: '',
        category: '',
        popular: false,
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const res = await fetch(`${BackendURL}/api/packs/${id}`, {
                    credentials: 'include'
                });

                const data = await res.json();

                if (data.success) {
                    return setForm({
                        name: data.pack.name || '',
                        relevance: data.pack.relevance || [],
                        tests: data.pack.tests || [],
                        price: data.pack.price || '',
                        discountPrice: data.pack.discountPrice,
                        category: data.pack.category || '',
                        popular: data.pack.popular || false,
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
            const res = await fetch(`${BackendURL}/api/packs/edit/${id}`, {
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
                <h3>Edit Package</h3>
                {message && <p className="edit-message">{message}</p>}
                <form className="edit-test-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Name</label>
                        <input name="name" value={form.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Relevance</label>
                        <textarea name="relevance"
                            value={form.relevance.join('\n')}
                            onChange={(e) => setForm(prev => ({ ...prev, relevance: e.target.value.split('\n') }))}
                            rows={form.relevance.length} 
                            required
                            />
                    </div>

                    <div className="form-group">
                        <label>Tests</label>
                        <textarea name="tests" value={form.tests.join('\n')}
                            onChange={(e) => setForm(prev => ({ ...prev, tests: e.target.value.split('\n') }))}
                            rows={form.tests.length} 
                            required
                            />
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