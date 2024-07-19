'use client';
import React, {useState} from 'react';
import Input from "@components/input/Input";
import InputDatePicker from "@components/input/InputDatePicker";
import {motion} from "framer-motion";
import clsx from "clsx";
import i18next from "i18next";
import './../../../../utils/i18n.js'

// import Select from "@components/input/Select";
// import CountrySelect from "@components/Countries/CountrySelect";
import Select from 'react-select';
const Step1 = ({values, handleChange, handleDescriptionChange, descriptionMaxLength, setValues, countries, user, showError = 0}) => {
    return (
        <motion.div
            className='grid md:grid-cols-2 gap-4'
            initial={{opacity: 0.5, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >
            <Input
                error={values.title.length === 0 && showError === 1}
                type='text' value={values.title} name='title' label={i18next.t("Title") + '*'} onChange={handleChange}
                   placeholder={i18next.t("Title") + '...'} />
        
            <div>
                <label htmlFor={'country'}>{i18next.t("Country")}*:</label>
                <Select
                    className={clsx("border-2 bg-transparent rounded-md shadow-md", (values.location.length === 0 && showError === 1) ? 'border-red-600 shadow-md shadow-red-600': 'border-gray-200')}
                    classNamePrefix="select"
                    defaultValue={{label: `${values.location}`, value: `${values.location}`}}
                    // isDisabled={isDisabled}
                    // isLoading={isLoading}
                    // isClearable={true}
                    // isRtl={isRtl}
                    isSearchable={true}
                    name="color"
                    options={
                        countries.map((country) => {
                            // return {label: `${country.name} (${country.native})`, value: country.name}
                            return {label: country.name, value: country.name}
                        })
                    }
                    onChange={(selectedOption) => {
                        // setSelected(selectedOption)
                        setValues({
                            ...values, location: selectedOption.value, phone_code: selectedOption.value
                        })
                    }}
                />
            </div>

            <InputDatePicker
                label={i18next.t("Start Date")+"*"}
                value={values.date_start}
                minDate={user?.role !== 'admin' ? new Date() : null}
                name='date_start'
                handleChange={(e) => {
                    setValues({
                        ...values, ['date_start']: new Date(e)
                    })
                }}/>
            <InputDatePicker
                error={values.date_end === null && showError === 1}
                label={i18next.t("End Date")+"*"}
                value={values.date_end}
                name='date_end'
                minDate={values.date_start || new Date()}
                handleChange={(e) => {
                    setValues({
                        ...values, ['date_end']: new Date(e)
                    })
                }}/>
            <motion.div
                className='relative md:col-span-2'
                initial={{opacity: 0.5, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7}}
            >
                <label>{i18next.t("Event_details")}*:</label>
                <div className="">
                    <textarea
                        className={clsx('w-full h-40 p-2 border-2 bg-transparent px-4 py-2 rounded-md shadow-md text-white bg-white bg-opacity-10', ((values.description.replace(/(<([^>]+)>)/gi, "").length > descriptionMaxLength || values.description === '') && showError === 1) && 'border-red-600 shadow-red-600')}
                        name='description'
                        value={values.description}
                        onChange={handleDescriptionChange}
                        placeholder={i18next.t("description")+"..."}
                    />
                    {/*<Editor*/}
                    {/*    name='description'*/}
                    {/*    value={values.description}*/}
                    {/*    onChange={handleDescriptionChange}*/}
                    {/*/>*/}
                </div>
                <p className={clsx('text-right text-gray-200', values.description.replace(/(<([^>]+)>)/gi, "").length > descriptionMaxLength && 'text-red-600')}>
                    {values.description.replace(/(<([^>]+)>)/gi, "").length}/{descriptionMaxLength}</p>
            </motion.div>
        </motion.div>
    );
};

export default Step1;