export const Input = (props) => {

    const {
        onInput,
        value,
        className,
        id,
        max,
        step,
        onMouseMove
    } = props;

    return (
        <input
            onInput={onInput}
            value={value}
            className={className}
            id={id}
            min="0"
            max={max}
            type="range"
            step={step}
            onMouseMove={onMouseMove}
        />
    )
}