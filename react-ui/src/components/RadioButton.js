function RadioButton({value,name})
{
    return <div>
        <div class="ps-5">
            <input class="form-check-input" type="radio" name={name}/>
            <label class="form-check-label ms-2"> {value} </label>
        </div>

    </div>
}

export default RadioButton