import { useState, useEffect, useMemo } from 'react';
import '../styles/App.css';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePost';
import PostService from '../api/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetch } from '../hooks/useFetch';
import { getPagesCount } from '../utils/pages';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [visible, setVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isLoading, error] = useFetch(async () => {
    const res = await PostService.getAll(limit, page);
    const data = await res.json();
    const totalCount = res.headers.get('X-Total-Count');
    setTotalPages(getPagesCount(totalCount, limit));
    setPosts(data);
  });

  const pages = useMemo(() => {
    let pagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }, [totalPages]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setVisible(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  useEffect(() => {
    fetchPosts();
  }, [page])

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={fetchPosts}>Загрузить посты</MyButton>
      <MyButton style={{ marginTop: 30 }} onClick={() => setVisible(true)}>Добавить пост</MyButton>
      <MyModal visible={visible} setVisible={() => setVisible(false)}>
        <PostForm create={createPost}></PostForm>
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter}></PostFilter>
      {error && <h1>Произошла ошибка {error}</h1>}
      {
        isLoading ?
          <Loader />
          :
          <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов" />
      }
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
        {pages.map(p => 
          <MyButton key={p} onClick={() => setPage(p)}>{p}</MyButton>
        )}
      </div>
    </div>
  );
}

export default Posts;
