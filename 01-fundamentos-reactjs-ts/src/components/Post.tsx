import { FormEvent, useState, ChangeEvent, InvalidEvent } from "react";
import { Avatar } from "./Avatar"
import { Comment } from "./Comment";
import styles from "./Post.module.css";

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: "paragraph" | "link";
    content: string;

}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}

export function Post({ author: Author, publishedAt, content }:PostProps) {

    const [comments, setComments] = useState([
        "Post da hora !!!"  
    ])

    const [newCommentText, setNewCommentText] = useState("")

    const publishedDateFormatted = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
    }).format(publishedAt);

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();

        setComments([...comments, newCommentText ]);
        setNewCommentText('');
       
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("")
        setNewCommentText(event.target.value)
    }

    function handleNewCommandInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("Este campo é obrigatório!")
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })
        setComments(commentsWithoutDeleteOne);
        //console.log(`Deletar Comentários ${comment}`)
    }

    const isNewCommentEmpty = newCommentText.length === 0;
   
    return (
       
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={Author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{Author.name}</strong>
                        <span>{Author.role}</span>
                    </div>
                </div>
                <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:30">{publishedDateFormatted}</time>
            </header>
            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === "paragraph") {
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type === "link") {
                        return <p key={line.content}><a href="#">{line.content}</a></p>;
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    name = "comment"
                    placeholder="Deixe um comentário"
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommandInvalid}
                    required
                />
                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
                
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>
                })}
            </div>
        </article>
        
    )
}