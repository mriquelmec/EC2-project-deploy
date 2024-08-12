import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { extractErrors } from '../../utils/funciones.js';
import Loading from "../utils/Loading.jsx";
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .required('El nombre es obligatorio'),
    type: Yup.string()
        .min(3, 'El tipo debe tener al menos 3 caracteres')
        .required('El tipo es obligatorio'),
    description: Yup.string()
        .min(3, 'La descripción debe tener al menos 3 caracteres')
        .required('La descripción es obligatoria'),
    skillOne: Yup.string()
        .min(3, 'La habilidad 1 debe tener al menos 3 caracteres'),
    skillTwo: Yup.string()
        .min(3, 'La habilidad 2 debe tener al menos 3 caracteres'),
    skillThree: Yup.string()
        .min(3, 'La habilidad 3 debe tener al menos 3 caracteres'),
});

const Form = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            type: '',
            description: '',
            skillOne: '',
            skillTwo: '',
            skillThree: '',
        },
        validationSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            axios.post('https://13.60.193.203:8000/pet/create', values)
                .then(res => {
                    console.log(res);
                    navigate('/pet/getPets');
                })
                .catch(err => {
                    console.log(err);
                    if (err.response && err.response.data.field === 'name') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: err.response.data.message,
                        });
                    } else if (err.response && err.response.data.errors) {
                        setErrors(err.response.data.errors);
                    }
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return (
        <div className='col-6 mx-auto'>
            <div className='d-flex justify-content-between align-items-center'>
                <h2>Know a pet needing a home?</h2>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className='row'>
                    <div className='col'>
                        <div className='form-group mb-3'>
                            <label className='form-label'>Pet Name:</label>
                            <input
                                className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="invalid-feedback">{formik.errors.name}</div>
                            )}
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label'>Pet Type:</label>
                            <input
                                className={`form-control ${formik.touched.type && formik.errors.type ? 'is-invalid' : ''}`}
                                type="text"
                                name="type"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.type}
                            />
                            {formik.touched.type && formik.errors.type && (
                                <div className="invalid-feedback">{formik.errors.type}</div>
                            )}
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label'>Pet Description:</label>
                            <input
                                className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                type="text"
                                name="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <div className="invalid-feedback">{formik.errors.description}</div>
                            )}
                        </div>
                    </div>
                    <div className='col'>
                        <div className='form-group mb-3'>
                            <label className='form-label'>Skill 1:</label>
                            <input
                                className={`form-control ${formik.touched.skillOne && formik.errors.skillOne ? 'is-invalid' : ''}`}
                                type="text"
                                name="skillOne"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.skillOne}
                            />
                            {formik.touched.skillOne && formik.errors.skillOne && (
                                <div className="invalid-feedback">{formik.errors.skillOne}</div>
                            )}
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label'>Skill 2:</label>
                            <input
                                className={`form-control ${formik.touched.skillTwo && formik.errors.skillTwo ? 'is-invalid' : ''}`}
                                type="text"
                                name="skillTwo"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.skillTwo}
                            />
                            {formik.touched.skillTwo && formik.errors.skillTwo && (
                                <div className="invalid-feedback">{formik.errors.skillTwo}</div>
                            )}
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label'>Skill 3:</label>
                            <input
                                className={`form-control ${formik.touched.skillThree && formik.errors.skillThree ? 'is-invalid' : ''}`}
                                type="text"
                                name="skillThree"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.skillThree}
                            />
                            {formik.touched.skillThree && formik.errors.skillThree && (
                                <div className="invalid-feedback">{formik.errors.skillThree}</div>
                            )}
                        </div>
                    </div>
                </div>
                <button className='btn btn-primary' type="submit" disabled={formik.isSubmitting}>Add Pet!</button>
            </form>
        </div>
    );
};

export default Form;



