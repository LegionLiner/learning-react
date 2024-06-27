import classes from './MyInput.module.css'

const MyInput = ({children, ...props}) => {
    return (
        <input className={classes.myInput} {...props} />
    )
}

export default MyInput;