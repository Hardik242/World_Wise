import styles from "./Message.module.css";

function Message({message, children, emoji = true}) {
    return (
        <p className={styles.message}>
            {children ? (
                <>
                    <span role="img">👋</span> {message}
                    <br />
                    <br />
                    {children}
                </>
            ) : (
                <>
                    {emoji && <span role="img"> 👋</span>} {message}
                </>
            )}
        </p>
    );
}

export default Message;
