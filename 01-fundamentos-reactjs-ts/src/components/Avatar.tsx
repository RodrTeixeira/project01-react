import styles from "./Avatar.module.css";

// interface AvatarProps {
//     hasBorder: boolean;
//     src: string;
// }

export function Avatar(props: { hasBorder?: boolean; src: string | undefined; }) {
    const hasBorder = props.hasBorder != false;
    return (
        <img
         className={hasBorder ? styles.avatarWithBorder : styles.avatar}
         src={props.src} 
         />
    );
}