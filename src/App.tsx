import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

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

// type CardParameter = {
//   post: Post
// }

// export function BasicCard({ post }: CardParameter) {
//   return (
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//         <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
//           {post.title}
//         </Typography>
//         <Typography variant="h5" component="div">
//           {post.user.name}
//         </Typography>
//         <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{post.created}</Typography>
//         <Typography variant="body2">
//           {post.content}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//   );
// }


function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sort, setSort] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const getuserInfo = await fetch("/api/post", {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
      })
      const data = await getuserInfo.json();
      console.log(data);
      setPosts(data.records);
    }
    getPosts();
  }, [])

  const sortedPost = useMemo(() => {
    if (sort) {
      const duplicate = [...posts];
      return duplicate.sort((a, b) => {
        return a.user.name.localeCompare(b.user.name)
      });
    } else {
      return posts;
    }
  }, [sort, posts]);


  return <div>
    <Button variant="contained" onClick={() => {
      if (sort) {
        setSort(false);
      } else {
        setSort(true);
      }
    }}>Sort Post</Button>
    {sortedPost.map((postYangLagiDibaca) => {
      return (
        <Card sx={{ minWidth: 275 }} key={postYangLagiDibaca.id}>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              {postYangLagiDibaca.title}
            </Typography>
            <Typography variant="h5" component="div">
              {postYangLagiDibaca.user.name}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{postYangLagiDibaca.created}</Typography>
            <Typography variant="body2">
              {postYangLagiDibaca.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => {
              navigate("/post/" + postYangLagiDibaca.id)
            }}>Learn More</Button>
          </CardActions>
        </Card>
      )
    })}
  </div>
}

export default App