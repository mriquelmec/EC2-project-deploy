import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const UpdateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/pet/${id}`)
            .then((res) => {
                setPet(res.data);
                formik.setValues({
                    name: res.data.name || '',
                    type: res.data.type || '',
                    description: res.data.description || '',
                    skillOne: res.data.skillOne || '',
                    skillTwo: res.data.skillTwo || '',
                    skillThree: res.data.skillThree || '',
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const formik = useFormik({
        initialValues: {
            name: '',
            type: '',
            description: '',
            skillOne: '',
            skillTwo: '',
            skillThree: '',
        },
        validationSchema: Yup.object({
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
        }),
        onSubmit: (values, { setSubmitting, setErrors }) => {
            axios.put(`http://localhost:8000/pet/update/${id}`, values)
                .then((res) => {
                    console.log(res);
                    navigate('/pet/getPets');
                })
                .catch((err) => {
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
            <div className='col mx-auto d-flex flex-row'>
                <h1>Edit: {pet ? pet.name : 'Loading...'}</h1>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className='forms'>
                    <div className='formLeft'>
                        <div className='form-group m-2'>
                            <label className='form-label'>Pet Name:</label>
                            <input
                                className={`form-control mt-2 ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <span className='text-danger m-3'>{formik.errors.name}</span>
                            )}
                        </div>
                        <div className='form-group m-2'>
                            <label className='form-label'>Pet Type:</label>
                            <input
                                className={`form-control mt-2 ${formik.touched.type && formik.errors.type ? 'is-invalid' : ''}`}
                                type="text"
                                name="type"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.type}
                            />
                            {formik.touched.type && formik.errors.type && (
                                <span className='text-danger m-3'>{formik.errors.type}</span>
                            )}
                        </div>
                        <div className='form-group m-2'>
                            <label className='form-label'>Pet Description:</label>
                            <input
                                className={`form-control mt-2 ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                type="text"
                                name="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <span className='text-danger m-3'>{formik.errors.description}</span>
                            )}
                        </div>
                    </div>
                    <div className='formRight'>
                        <div className='form-group m-2'>
                            <label className='form-label'>Skill 1:</label>
                            <input
                                className={`form-control mt-2 ${formik.touched.skillOne && formik.errors.skillOne ? 'is-invalid' : ''}`}
                                type="text"
                                name="skillOne"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.skillOne}
                            />
                            {formik.touched.skillOne && formik.errors.skillOne && (
                                <span className='text-danger m-3'>{formik.errors.skillOne}</span>
                            )}
                        </div>
                        <div className='form-group m-2'>
                            <label className='form-label'>Skill 2:</label>
                            <input
                                className={`form-control mt-2 ${formik.touched.skillTwo && formik.errors.skillTwo ? 'is-invalid' : ''}`}
                                type="text"
                                name="skillTwo"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.skillTwo}
                            />
                            {formik.touched.skillTwo && formik.errors.skillTwo && (
                                <span className='text-danger m-3'>{formik.errors.skillTwo}</span>
                            )}
                        </div>
                        <div className='form-group m-2'>
                            <label className='form-label'>Skill 3:</label>
                            <input
                                className={`form-control mt-2 ${formik.touched.skillThree && formik.errors.skillThree ? 'is-invalid' : ''}`}
                                type="text"
                                name="skillThree"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.skillThree}
                            />
                            {formik.touched.skillThree && formik.errors.skillThree && (
                                <span className='text-danger m-3'>{formik.errors.skillThree}</span>
                            )}
                        </div>
                    </div>
                </div>
                <button className='btn btn-primary' type="submit" disabled={formik.isSubmitting}>
                    Update Pet!
                </button>
            </form>
        </div>
    );
};

export default UpdateForm;

 