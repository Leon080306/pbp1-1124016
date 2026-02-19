import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Post = {
    created: string;
    deletedAt: string;
    id: string;
    updatedAt: string;
    content: string;
    status: string;
    title: string;
    user: {
        name: string;
    };
    userId: string;
}

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | undefined>(undefined);

    useEffect(() => {
        const getPostDetail = async () => {
            const getuserInfo = await fetch("/api/post/" + id, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
            })
            const data = await getuserInfo.json();
            // console.log(data);
            setPost(data);
        }
        getPostDetail();

    }, [])

    useEffect(() => {
        console.log("TEST")
    }, [post])

    // const sortedPost = useMemo(() => {
        
    // })

    return <div>
        <h1>Post Details</h1>
        <h1>{post?.user.name}</h1>
        <h1>{post?.title}</h1>
        <p>{post?.content}</p>

    </div>
}