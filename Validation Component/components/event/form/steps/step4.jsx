import React from 'react';
import {motion} from "@node_modules/framer-motion";
import Select from "@components/input/Select";
import Input from "@components/input/Input";
import {ACCESSIBILITY_OPTIONS} from "@utils/enums";
import Image from "next/image";
import {FaSave, FaTrash, FaUpload} from "react-icons/fa";
import Button from "@components/Button";
import {getFilesSize, validateLink} from "@utils/hofs";
import API_URL from "@utils/api";
import i18next from "i18next";
import './../../../../utils/i18n.js'

function Step4({values, setValues, handleChange, handleFileChange, showError}) {
    return (
        <div className='grid md:grid-cols-2 gap-4'>
            <motion.div
                initial={{opacity: 0.5, x: -50}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
            >
                <Select
                    error={showError === 4 && !values.target}
                    name='target'
                        onChange={handleChange}
                        className=''
                        value={values.target}
                        label={i18next.t("Target Audience")}
                        options={[
                            {label: i18next.t("All Public") , value: "All Public", selected: false},
                            {label: i18next.t("Scientists"), value: "Scientists", selected: false},
                            {label: i18next.t("Breeders"), value: "Breeders", selected: false},
                            {label: i18next.t("Produce Makers"), value: "Produce Makers", selected: false},
                            {label: i18next.t("Technicians"), value: "Technicians", selected: false},
                            {label: i18next.t("Event Organizers"), value: "Event Organizers", selected: false},
                            {label: i18next.t("Trainers"), value: "Trainers", selected: false},
                            {label: i18next.t("Veterinarians"), value: "Veterinarians", selected: false},
                            {label: i18next.t("Educators"), value: "Educators", selected: false},
                            {label: i18next.t("Government Agencies"), value: "Government Agencies", selected: false},
                            {label: i18next.t("Suppliers"), value: "Suppliers", selected: false},
                            {label: i18next.t("Enthusiasts"), value: "Enthusiasts", selected: false},
                        ]}
                />
            </motion.div>
            <motion.div
                initial={{opacity: 0.5, x: 50}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
            >
                <Input
                    error={showError === 4 && (!values.registration || !validateLink(values.registration))}
                    type='text' value={values.registration} name='registration'
                       label={i18next.t("Registration/Ticketing Details")}
                       onChange={handleChange} placeholder='https://...'/>
            </motion.div>
            <motion.div
                initial={{opacity: 0.5, x: -50}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
            >
                <Input
                    error={showError === 4 && (!values.max_participants || values.max_participants < 1)}
                    type='number' value={values.max_participants} name='max_participants'
                       label={i18next.t('Maximum Capacity')}
                       onChange={handleChange} placeholder={i18next.t('max participants')}/>
            </motion.div>
            <motion.div
                initial={{opacity: 0.5, x: 50}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
            >
                <Input
                    error={showError === 4 && (!validateLink(values.lodging))}
                    type='text' value={values.lodging} name='lodging'
                       label={i18next.t('Lodging Recommendations')}
                       onChange={handleChange}
                       placeholder='https://...'/>
            </motion.div>
            <motion.div
                className='md:col-span-2'
                initial={{opacity: 0.5, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <label htmlFor={'accessibility'}>{i18next.t("Accessibility")}</label>
                <div id={'accessibility'}
                     className="md:col-span-2 grid md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 border border-gray-500 p-4 rounded-2xl">
                    {ACCESSIBILITY_OPTIONS.map((access, i) => (
                        <div key={i}
                             className="flex items-center text-white w-full rounded-lg shadow-md relative">
                            <input
                                id={access.name}
                                type='checkbox'
                                   name='accessibility'
                                   value={access.name}
                                   checked={values.accessibility.includes(access.name)}
                                   onChange={(e) => {
                                       if (e.target.checked) {
                                           setValues({
                                               ...values,
                                               accessibility: [...values.accessibility, e.target.value]
                                           })
                                       } else {
                                           setValues({
                                               ...values,
                                               accessibility: values.accessibility.filter((acc) => acc !== e.target.value)
                                           })
                                       }
                                   }

                                   }/>
                            <label htmlFor={access.name} className='ml-2'>{access.name}</label>
                        </div>
                    ))}
                </div>
            </motion.div>


            <motion.div
                className='md:col-span-2 gap-2 text-white'
                initial={{opacity: 0.5, y: -50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <label htmlFor={'sponsors'}>{i18next.t("Sponsors")}</label>
                <Input type='drag'
                       multiple={true}
                       id={'sponsors'}
                          size={getFilesSize(values.sponsors)?.toFixed(1)}
                            maxSize={3}
                       name='sponsors'
                       label={i18next.t("Upload your sponsors logos here")} 
                       subLabel={<span>JPG, PNG {i18next.t("only_is_autorized")} <br/> {i18next.t("Max_size")} : 3 MB</span>}
                       onChange={handleFileChange}
                       accept={'image/*'}
                />
                {/*//show uploaded sponsors in a row and when it hits the end automatically go to line*/}
                <div className='grid grid-cols-4 gap-4 mt-4'>
                    {values.sponsors && Array.from(values.sponsors).filter(Boolean).map((pic, i) => (
                        <div key={i}
                             className="col-span-2 flex items-center border border-gray-500 p-2 justify-between rounded-2xl">
                            <div className="flex items-center gap-2">
                                <Image src={
                                    typeof pic === "string" ? `${API_URL}/uploads/sponsors/${pic}` : URL.createObjectURL(pic)
                                } alt={pic.name} width={80}
                                       height={80}
                                       className='rounded-2xl'/>
                                {pic.size && <p>{(pic.size / 1000000).toFixed(2)} MB</p>}
                            </div>
                            <button type='button'
                                    className="p-2 bg-gray-200 rounded-full hover:bg-blue-600 hover:text-white"
                                    onClick={() => {
                                        setValues({
                                            ...values,
                                            sponsors: Array.from(values.sponsors).filter((pic, index) => index !== i)
                                        })
                                    }}
                            >
                                <FaTrash className='text-red-600'/>
                            </button>
                        </div>))}
                </div>
            </motion.div>



        </div>
    );
}

export default Step4;