export const Input = (props) => {

    const {
        onInput,
        value,
        className,
        id,
        max,
        step
    } = props;


    return (
        <input
            onInput={onInput}
            value={value}
            // defaultValue={value}
            className={className}
            id={id}
            min="0"
            max={max}
            type="range"
            step={step}
        />
    )
}