import  React from "react";

export function FormHeader({ form }) {
    return (
        <>
            <img className='form-header-img' src={form.bannerUrl} />

            <div className="card text-center bg-light py-4">
               <h1> {form.title} </h1>

               <p>{form.description}</p>
                <p className="text-danger m-0"> * Obligatoire</p>
            </div>
        </>
    )
}
